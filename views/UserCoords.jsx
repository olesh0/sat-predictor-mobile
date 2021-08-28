import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native'
import _ from 'lodash'

import { useStoredValue } from '../hooks/useStoredValue'
import { useTheme } from '../context/Theme'

export default () => {
  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [disableButtons, setDisableButtons] = useState(false)

  const getLocation = ({ onLocationReceive }) => {
    navigator.geolocation.getCurrentPosition((location) => {
      const latitude = _.get(location, 'coords.latitude')
      const longitude = _.get(location, 'coords.longitude')

      onLocationReceive({ latitude, longitude })
    }, () => {
      onLocationReceive({ latitude: 0, longitude: 0 })
      Alert.alert('No luck evaluating your coords...')
    }, {
      timeout: 10000,
      enableHighAccuracy: false,
    })
  }

  const evaluateLocation = () => {
    setDisableButtons(true)

    getLocation({
      onLocationReceive: ({ latitude, longitude }) => {
        setLatitude(latitude)
        setLongitude(longitude)
        setDisableButtons(false)

        Alert.alert('Location set successfully!')
      }
    })
  }

  useStoredValue({
    key: 'USER_LOCATION_LATITUDE',
    evaluationHandler: async () => {
      return new Promise((resolve) => {
        getLocation({
          onLocationReceive: ({ latitude }) => {
            resolve(latitude)
            setLatitude(latitude)
          },
        })
      })
    },
    onEvaluated: (data) => setLatitude(data.value),
  })

  useStoredValue({
    key: 'USER_LOCATION_LONGITUDE',
    evaluationHandler: async () => {
      return new Promise((resolve) => {
        getLocation({
          onLocationReceive: ({ longitude }) => {
            setLongitude(longitude)
            resolve(longitude)
          },
        })
      })
    },
    onEvaluated: ({ value: longitude }) => setLongitude(longitude),
  })

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 5,
        padding: 20,
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.label}>Latitude</Text>
        <Text style={styles.userCoordValue}>{latitude}</Text>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={styles.label}>Longitude</Text>
        <Text style={styles.userCoordValue}>{longitude}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.autoFetchCoordsButton, disableButtons && styles.disabledButton]}
        onPress={() => Alert.alert("Fetched.")}
      >
        <Text
          style={styles.saveButtonText}
          onPress={evaluateLocation}
        >
          {disableButtons
            ? 'Setting location...'
            : 'Set location automatically'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const stylesGenerator = (theme) => (
  StyleSheet.create({
    disabledButton: {
      backgroundColor: theme.colors.colorFontDark,
    },
    userCoordValue: {
      color: theme.colors.colorFontMain,
      fontFamily: "Orbitron-Regular",
      fontSize: 20,
      marginBottom: 20,
    },
    label: {
      color: theme.colors.colorFontDark,
      fontFamily: "Orbitron-Regular",
      marginBottom: 5,
    },
    button: {
      flex: 1,
      flexDirection: "column",
      marginTop: 10,
      borderRadius: 3,
    },
    autoFetchCoordsButton: {
      backgroundColor: theme.colors.colorAccentGreen,
    },
    saveButtonText: {
      color: theme.colors.coordsButtonFontColor,
      fontFamily: "Orbitron-Regular",
      fontSize: 18,
      textAlign: "center",
      padding: 10,
    },
  })
)
