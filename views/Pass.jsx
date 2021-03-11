import React, { useEffect, useMemo, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import DataList from '../components/DataList'
import Loader from '../components/Loader'
import { useTheme } from '../context/Theme'

export default ({ params }) => {
  const { theme } = useTheme()
  const styles = useMemo(() => stylesGenerator(theme), [theme])

  const [percents, setPercents] = useState(0)
  const [progressBarTotalWidth, setProgressBarTotalWidth] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setPercents((perc) => perc < 100 ? perc += 0.5 : 0), 500)

    return () => clearInterval(interval)
  }, [])

  const dataList = useMemo(() => [
    { label: 'Current elevation', value: '16°' },
    { label: 'Max elevation', value: '78°' },
    { label: 'Start time', value: '02/12/2021 12:30 AM' },
    { label: 'End time', value: '02/12/2021 12:40 AM' },
    { label: 'Latitude', value: '48.436233°' },
    { label: 'Longitude', value: '23.866857°' },
    { label: 'Altitude', value: '893km' },
    { label: 'Distance', value: '1364km' },
  ], [])

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 5,
        padding: 20,
      }}
    >
      <View style={styles.content}>
        <Text style={styles.satName}>{params.satName}</Text>

        <DataList data={dataList} />
      </View>

      <View style={styles.progress}>
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
