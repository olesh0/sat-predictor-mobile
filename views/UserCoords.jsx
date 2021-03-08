import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, Alert, TouchableOpacity } from 'react-native'

export default ({ params }) => {
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
          placeholderTextColor="#5F6D77"
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
          placeholderTextColor="#5F6D77"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={() => Alert.alert("All saved")}
      >
        <Text
          style={{
            color: "#000",
            fontFamily: "Orbitron-Regular",
            fontSize: 18,
            textAlign: "center",
            padding: 10,
          }}
        >Save my coords</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.autoFetchCoordsButton]}
        onPress={() => Alert.alert("Fetched.")}
      >
        <Text
          style={{
            color: "#000",
            fontFamily: "Orbitron-Regular",
            fontSize: 18,
            textAlign: "center",
            padding: 10,
          }}
        >Auto-fetch coords</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  satName: {
    fontSize: 25,
    color: "#FFF",
    fontFamily: "Orbitron-Bold",
  },
  label: {
    color: "#5F6D77",
    marginBottom: 5,
  },
  TextInput: {
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    color: "#FFF",
    backgroundColor: "rgba(255, 255, 255, .04)",
  },
  button: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    borderRadius: 3,
  },
  saveButton: {
    backgroundColor: "#22D5A4",
  },
  autoFetchCoordsButton: {
    backgroundColor: "#D52222",
  },
})
