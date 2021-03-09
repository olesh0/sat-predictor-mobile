import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import DataList from '../components/DataList'
import Loader from '../components/Loader'

export default ({ params }) => {
  const progressWrapper = useRef()
  const [progressBarWidth, setProgressBarWidth] = useState(0)

  const calculateProgressWidth = (percents) => {
    if (!progressWrapper || !progressWrapper.current) return 0

    const progressBarTotalWidth = progressWrapper.current.clientWidth
    const width = progressBarTotalWidth * (percents / 100)

    return width || 0
  }

  useEffect(() => {
    let perc = 0
    setProgressBarWidth(calculateProgressWidth(0))

    const progressBarWidthInterval = setInterval(() => {
      perc += 0.5

      if (perc >= 100) perc = 0

      setProgressBarWidth(calculateProgressWidth(perc))
    }, 1000)

    return () => clearInterval(progressBarWidthInterval)
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
      {/* TODO: Debug why progress bar is not updating on mobile */}

      <View style={styles.content}>
        <Text style={styles.satName}>{params.satName}</Text>

        <DataList data={dataList} />
      </View>

      <View style={styles.progress}>
        <Loader />

        <View
          style={styles.progressBarWrapper}
          ref={progressWrapper}
        >
          <View style={[
            styles.progressBar,
            { width: progressBarWidth }
          ]}></View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  satName: {
    fontSize: 25,
    color: "#FFF",
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
    backgroundColor: "rgba(213, 34, 34, .2)",
  },
  progressBar: {
    height: 5,
    backgroundColor: "#D52222",
  },
})
