import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useGetter } from 'vuex-react'
import moment from 'moment'
import formatCoords from 'formatcoords'
import _ from 'lodash'

import DataList from '../components/DataList'
import { useTheme } from '../context/Theme'
import { useNavigation } from '../context/Routes'
import { useSatelliteLocation, useSatelliteFuturePasses } from '../hooks'
import { useSatelliteTle } from '../hooks'
import { getElevationString } from '../utils'
import { useStoredValue } from '../hooks/useStoredValue'
import { useLocation } from '../context/LocationProvider'

const INTERVAL_TIME = 1000

export default ({ params, meta }) => {
  const { lat: latitude, lon: longitude } = useLocation()
  const [tleInfo, setTleInfo] = useState({
    name: null,
    line1: null,
    line2: null,
  })

  const { changeScreen } = useNavigation()

  const { theme } = useTheme()
  const styles = useMemo(() => stylesGenerator(theme), [theme])

  const [futurePasses, setFuturePasses] = useState([])
  const [satellite = {}, setSatellite] = useGetter('satellites/satellite')

  const satelliteName = useMemo(() => _.get(params, 'name') || _.get(tleInfo, 'name'), [params, tleInfo])

  const getSatInfo = useCallback(async (tle) => {
    const satInfo = useSatelliteLocation({
      ...(tle || tleInfo),
      latitude,
      longitude,
    })

    setSatellite(satInfo)
  }, [tleInfo, useSatelliteLocation])

  useEffect(() => {
    const interval = setInterval(getSatInfo, INTERVAL_TIME)
    const tleInfoName = _.get(tleInfo, 'name')

    const evaluateFuturePasses = async () => {
      const passes = await useSatelliteFuturePasses({
        ...(tleInfo || {}),
        latitude,
        longitude,
      })

      setFuturePasses(passes)
    }

    if (tleInfoName) {
      evaluateFuturePasses()
    }

    if (meta.satelliteNoradId && !tleInfoName) {
      // in a case of in-menu satellite usage we cache the tle for sometime
      useStoredValue({
        key: `SAT_STORED_VALUE_${meta.satelliteNoradId}`,
        evaluationHandler: async () => {
          const data = await useSatelliteTle({
            noradId: meta.satelliteNoradId,
          })

          return Promise.resolve(data)
        },
        onEvaluated: (tleInfo) => {
          setTleInfo(tleInfo)
          getSatInfo(tleInfo)
        },
      })
    } else if (!tleInfoName) {
      const tle = {
        name: params.name,
        line1: params.line1,
        line2: params.line2,
      }

      setTleInfo(tle)
      getSatInfo(tle)
    }

    return () => clearInterval(interval)
  }, [tleInfo])

  const dataList = useMemo(() => {
    try {
      const formattedCoords = formatCoords({
        lat: satellite.latitude.raw,
        lng: satellite.longitude.raw,
      }).format({
        latLonSeparator: '|',
        decimalPlaces: 1,
      })

      const [latitude, longitude] = formattedCoords.split('|')

      return [
        { label: 'NORAD ID', value: params.satelliteId || meta.satelliteNoradId },
        { label: 'Current elevation', value: satellite.elevation.formatted },
        { label: 'Distance', value: satellite.rangeSat.formatted },
        { label: 'Latitude', value: latitude },
        { label: 'Longitude', value: longitude },
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
        <Text style={styles.satName}>{satelliteName}</Text>

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
                    satellite: {
                      name: satelliteName,
                      line1: tleInfo.line1,
                      line2: tleInfo.line2
                    },
                    goBackParams: {
                      name: satelliteName,
                      line1: tleInfo.line1,
                      line2: tleInfo.line2
                    },
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
                    {moment(item.start).format("hh:mm:ss A")} - {moment(item.end).format("HH:mm:ss A")}
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
