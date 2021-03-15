import React, { useEffect, useMemo, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useGetter } from 'vuex-react'
import moment from 'moment'

import DataList from '../components/DataList'
import Loader from '../components/Loader'
import { useTheme } from '../context/Theme'
import { useSatelliteLocation } from '../hooks'

export default ({ params }) => {
  const tleInfo = {
    name: params.satellite.name,
    line1: params.satellite.line1,
    line2: params.satellite.line2,
  }

  const { theme } = useTheme()
  const styles = useMemo(() => stylesGenerator(theme), [theme])

  const [satellite = {}, setSatellite] = useGetter('satellites/satellite')

  useEffect(() => {
    const getSatInfo = () => {
      const satInfo = useSatelliteLocation(tleInfo)

      setSatellite(satInfo)
    }

    getSatInfo()

    const interval = setInterval(getSatInfo, 2500)

    return () => clearInterval(interval)
  }, [])

  const [percents, setPercents] = useState(0)
  const [progressBarTotalWidth, setProgressBarTotalWidth] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const {
          pass: {
            start,
            end,
          },
        } = params

        const startTime = new Date(start)
        const endTime = new Date(end)

        const duration = (endTime - startTime)
        const timePassed = new Date() - startTime

        setPercents((timePassed / duration) * 100)
      } catch (e) {
        console.error(e)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const dataList = useMemo(() => {
    try {
      const { pass } = params

      return [
        ...(percents > 0 && percents <= 100 ? [
          { label: 'Current elevation', value: satellite.elevation.formatted },
          { label: 'Latitude', value: satellite.latitude.formatted },
          { label: 'Longitude', value: satellite.longitude.formatted },
          { label: 'Altitude', value: satellite.altitude.formatted },
          { label: 'Distance', value: satellite.rangeSat.formatted },
        ] : []),

        { label: 'Max elevation', value: `${pass.maxElevation.toFixed(0)}°` },
        { label: 'Start time', value: moment(new Date(pass.start)).format('DD/MM HH:mm:ss') },
        { label: 'End time', value: moment(new Date(pass.end)).format('DD/MM HH:mm:ss') },
      ]
    } catch (e) {
      console.error(e)

      return []
    }
  }, [params.pass, satellite, percents])

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 5,
        padding: 20,
      }}
    >
      <View style={styles.content}>
        <Text style={styles.satName}>{params.satellite.name}</Text>

        <DataList data={dataList} />
      </View>

      <View
        style={[
          styles.progress,
          { display: percents > 0 && percents <= 100 ? "flex" : "none" }
        ]}
      >
        <Loader />

        <View
          style={styles.progressBarWrapper}
          onLayout={(event) => setProgressBarTotalWidth(event.nativeEvent.layout.width)}
        >
          <View style={[
            styles.progressBar,
            { width: progressBarTotalWidth * (percents / 100) }
          ]}></View>
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
    progress: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
    },
    progressBarWrapper: {
      flex: 1,
      marginLeft: 10,
      height: 5,
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: theme.colors.colorHighlightRed,
    },
    progressBar: {
      height: 5,
      backgroundColor: theme.colors.colorAccentRed,
    },
  })
)
