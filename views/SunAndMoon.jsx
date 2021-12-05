import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Sun from '../components/icons/Sun'
import Moon from '../components/icons/Moon'

import DataList from '../components/DataList'

import { useSunData, useMoonData } from '../hooks'
import { calculatePing } from '../utils'
import { useTheme } from '../context/Theme'
import { useLocation } from '../context/LocationProvider'

const DATA_CALCULATION_INTERVAL = 1500

export default () => {
  const { theme } = useTheme()
  const { lat, lon } = useLocation()
  const styles = stylesGenerator(theme)

  const [sun, setSun] = useState(null)
  const [moon, setMoon] = useState(null)

  const calculateData = async (location) => {
    setSun(useSunData(location))
    setMoon(useMoonData(location))
  }

  useEffect(() => {
    calculateData({ lat, lon })

    const internal = setInterval(() => calculateData({ lat, lon }), DATA_CALCULATION_INTERVAL)

    return () => clearInterval(internal)
  }, [lat, lon])

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
            { label: 'Max elevation today', value: `${sun.maxElevation.elevation.toFixed(2)}°` },
            { label: 'Daylight duration', value: sun.daylightDuration.formatted },

            { label: 'Sunrise', value: sun.sunrise.formatted, groupStart: true },
            { label: 'Sunset', value: sun.sunset.formatted },

            { label: 'Dawn', value: sun.dawn.formatted, groupStart: true },
            { label: 'Dusk', value: sun.dusk.formatted },

            { label: 'Nadir', value: sun.nadir.formatted, groupStart: true },
            { label: 'Solar Noon', value: sun.noon.formatted },
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
            { label: 'Set', value: moon.set ? moon.set.formatted : '-' },
            { label: 'Rise', value: moon.rise ? moon.rise.formatted : '-' },

            { label: 'Distance', value: moon.current.distance.formatted, groupStart: true },
            {
              label: 'Ping to moon',
              value: `${calculatePing(moon.current.distance.raw, { decimal: 2 }).formatted}s`,
            },
            { label: 'Parallactic angle', value: `${moon.current.paralacticAngle.toFixed(2)}°`, groupStart: true },
          ]}
        />
      </View>
    </View>
  )
}

const stylesGenerator = (theme) => (
  StyleSheet.create({
    header: {
      fontSize: 25,
      color: theme.colors.colorFontMain,
      fontFamily: "Orbitron-Bold",
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center"
    },
    currentLocation: {
      color: theme.colors.colorFontMain,
      fontSize: 17,
      fontFamily: "Orbitron-Regular",
    },
  })
)
