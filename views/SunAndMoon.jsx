import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Sun from '../components/icons/Sun'
import Moon from '../components/icons/Moon'

import DataList from '../components/DataList'

import { useSunData, useMoonData } from '../hooks'
import { calculatePing } from '../utils'

export default () => {
  const [sun, setSun] = useState(null)
  const [moon, setMoon] = useState(null)

  const calculateData = () => {
    setSun(useSunData())
    setMoon(useMoonData())
  }

  useEffect(() => {
    calculateData()

    const internal = setInterval(calculateData, 1000)

    return () => clearInterval(internal)
  }, [])

  if (!sun || !moon) return <></>

  return (
    <View style={{ paddingTop: 5, padding: 20 }}>
      <Text style={styles.header}>
        Sun & Moon
      </Text>

      <View style={{ marginTop: 30 }}>
        <View style={styles.sectionHeader}>
          <Sun width={50} height={50} />

          <Text style={styles.currentLocation}>
            Bear. {sun.current.azimuth.toFixed(0)}°
            | Elev. {sun.current.elevation.toFixed(2)}°
          </Text>
        </View>

        <DataList
          style={{ marginTop: 10 }}
          data={[
            { label: 'Today\'s max. elevation', value: `${sun.maxElevation.elevation.toFixed(2)}°` },
            { label: 'Solar Noon', value: sun.noon.formatted },
            { label: 'Sunrise', value: sun.sunrise.formatted },
            { label: 'Sunset', value: sun.sunset.formatted },
            { label: 'Dawn', value: sun.dawn.formatted },
            { label: 'Dusk', value: sun.dusk.formatted },
            { label: 'Nadir', value: sun.nadir.formatted },
          ]}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <View style={styles.sectionHeader}>
          <Moon width={50} height={50} />

          <Text style={styles.currentLocation}>
            Bear. {moon.current.azimuth.toFixed(0)}°
            | Elev. {moon.current.altitude.toFixed(2)}°
          </Text>
        </View>

        <DataList
          style={{ marginTop: 10 }}
          data={[
            { label: 'Set', value: '08/03 12:36 PM' },
            { label: 'Rise', value: '08/03 04:22 AM' },
            { label: 'Distance', value: moon.current.distance.formatted },
            {
              label: 'Ping to moon',
              value: `${calculatePing(moon.current.distance.raw, { decimal: 2 }).formatted}s`,
            },
            { label: 'Parallactic angle', value: `${moon.current.paralacticAngle.toFixed(2)}°` },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    color: "#FFF",
    fontFamily: "Orbitron-Bold",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  currentLocation: {
    color: "#FFF",
    fontSize: 17,
    fontFamily: "Orbitron-Regular",
  },
})
