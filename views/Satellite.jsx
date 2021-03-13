import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useGetter } from 'vuex-react'
import moment from 'moment'

import DataList from '../components/DataList'
import { useTheme } from '../context/Theme'
import { useNavigation } from '../context/Routes'
import { useSatelliteLocation, useSatelliteFuturePasses } from '../hooks'
import { getElevationString } from '../utils'

export default ({ params }) => {
  const tleInfo = {
    name: params.name,
    line1: params.line1,
    line2: params.line2,
  }

  const { changeScreen } = useNavigation()

  const { theme } = useTheme()
  const styles = useMemo(() => stylesGenerator(theme), [theme])

  const [futurePasses, setFuturePasses] = useState([])
  const [satellite = {}, setSatellite] = useGetter('satellites/satellite')

  const getSatInfo = useCallback(() => {
    const satInfo = useSatelliteLocation(tleInfo)

    setSatellite(satInfo)
  }, [tleInfo, useSatelliteLocation])

  useEffect(() => {
    const interval = setInterval(getSatInfo, 2500)

    getSatInfo()

    const passes = useSatelliteFuturePasses(tleInfo)
    setFuturePasses(passes)

    return () => clearInterval(interval)
  }, [])

  const dataList = useMemo(() => {
    try {
      return [
        { label: 'Current elevation', value: satellite.elevation.formatted },
        { label: 'Distance', value: satellite.rangeSat.formatted },
        { label: 'Latitude', value: satellite.latitude.formatted },
        { label: 'Longitude', value: satellite.longitude.formatted },
        { label: 'Altitude', value: satellite.altitude.formatted },
      ]
    } catch (e) {
      return []
    }
  }, [satellite])

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 5,
        padding: 20,
      }}
    >
      <View style={styles.content}>
        <Text style={styles.satName}>{params.name}</Text>

        <DataList data={dataList} />

        <View style={{
          marginTop: 20,
          display: futurePasses.length ? "flex" : "none",
        }}>
          <Text style={styles.upcomingPasses}>Upcoming passes</Text>

          <FlatList
            data={futurePasses || []}
            keyExtractor={(_, index) => `pass-${index}`}
            numColumns={1}
            renderItem={({ item }) => {
              const elevationString = getElevationString(item.maxElevation)

              return (
                <TouchableOpacity
                  onPress={() => changeScreen('__PASS__', {
                    pass: item,
                    satellite: params,
                  })}
                  style={[
                    styles.pass,
                    styles[`${elevationString}Elevation`],
                  ]}
                >
                  <Text style={styles.passTime}>
                    {item.maxElevation.toFixed(0)}° {moment(item.start).format("DD/MM")}
                  </Text>

                  <Text style={styles.passTime}>
                    {moment(item.start).format("HH:mm:ss")} - {moment(item.end).format("HH:mm:ss")}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    </View>
  )
}

const stylesGenerator = (theme) => (
  StyleSheet.create({
    satName: {
      marginTop: 10,
      fontSize: 25,
      color: theme.colors.colorFontMain,
      fontFamily: "Orbitron-Bold",
    },
    highElevation: {
      backgroundColor: theme.colors.colorHighlightGreen,
      borderLeftColor: theme.colors.colorAccentGreen,
    },
    lowElevation: {
      backgroundColor: theme.colors.colorHighlightRed,
      borderLeftColor: theme.colors.colorAccentRed,
    },
    midElevation: {
      backgroundColor: theme.colors.colorHighlightPurple,
      borderLeftColor: theme.colors.colorAccentPurple,
    },
    passTime: {
      color: theme.colors.colorFontMain,
      fontFamily: "Orbitron-Regular",
      fontSize: 15,
    },
    upcomingPasses: {
      fontFamily: "Orbitron-Medium",
      color: theme.colors.colorFontMain,
      marginBottom: 10,
      fontSize: 22,
    },
    pass: {
      borderLeftWidth: 5,
      width: "100%",
      paddingTop: 19,
      padding: 15,
      marginBottom: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
)
