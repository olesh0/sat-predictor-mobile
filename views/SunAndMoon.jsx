import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Sun from '../components/icons/Sun'
import Moon from '../components/icons/Moon'

import DataList from '../components/DataList'

import { useSunData } from '../hooks/useSunData'

export default () => {
  const sun = useSunData()

  return (
    <View style={{ paddingTop: 5, padding: 20 }}>
      <Text style={styles.header}>
        Sun & Moon
      </Text>

      <View style={{ marginTop: 20 }}>
        <View style={styles.sectionHeader}>
          <Sun width={50} height={50} />

          <Text style={styles.currentLocation}>
            Bear. {sun.current.azimuth.toFixed(0)}°
            | Elev. {sun.current.elevation.toFixed(2)}°
          </Text>
        </View>

        <DataList
          style={{ marginTop: 5 }}
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

      <View style={{ marginTop: 20 }}>
        <View style={styles.sectionHeader}>
          <Moon width={50} height={50} />

          <Text style={styles.currentLocation}>Bear. 84 | Elev. 79</Text>
        </View>

        <DataList
          style={{ marginTop: 5 }}
          data={[
            { label: 'Set', value: '08/03 12:36 PM' },
            { label: 'Rise', value: '08/03 04:22 AM' },
            { label: 'Distance', value: '375 196 km' },
            { label: 'Fraction', value: '0.22' },
            { label: 'Parallactic angle', value: '22.47°' },
          ]}
        />
      </View>

      {/* <Text>
        {JSON.stringify(params, null, 2)}
      </Text> */}
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
