import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, Alert, TouchableOpacity } from 'react-native'
import { useTheme } from '../context/Theme'

export default () => {
  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

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

        <TextInput
          style={styles.TextInput}
          keyboardAppearance="dark"
          keyboardType="number-pad"
          onChangeText={(updatedLatitude) => setLatitude(updatedLatitude)}
          value={latitude}
          placeholder="Your Latitude..."
          placeholderTextColor={theme.colors.colorFontDark}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={styles.label}>Longitude</Text>

        <TextInput
          style={styles.TextInput}
          keyboardAppearance="dark"
          keyboardType="number-pad"
          onChangeText={(updatedLongitude) => setLongitude(updatedLongitude)}
          value={longitude}
          placeholder="Your Longitude..."
          placeholderTextColor={theme.colors.colorFontDark}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={() => Alert.alert("All saved")}
      >
        <Text style={styles.saveButtonText}>Save my coords</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.autoFetchCoordsButton]}
        onPress={() => Alert.alert("Fetched.")}
      >
        <Text style={styles.saveButtonText}>Auto-fetch coords</Text>
      </TouchableOpacity>
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
    label: {
      color: theme.colors.colorFontDark,
      marginBottom: 5,
    },
    TextInput: {
      height: 40,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 3,
      color: theme.colors.colorFontMain,
      backgroundColor: theme.colors.colorBgUserCoordsInput,
    },
    button: {
      flex: 1,
      flexDirection: "column",
      marginTop: 10,
      borderRadius: 3,
    },
    saveButton: {
      backgroundColor: theme.colors.colorAccentGreen,
    },
    saveButtonText: {
      color: theme.colors.coordsButtonFontColor,
      fontFamily: "Orbitron-Regular",
      fontSize: 18,
      textAlign: "center",
      padding: 10,
    },
    autoFetchCoordsButton: {
      backgroundColor: theme.colors.colorAccentRed,
    },
  })
)
