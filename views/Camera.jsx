import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Camera } from 'expo-camera'

import { useLocation } from '../context/LocationProvider'
import { useSunData, useMoonData } from '../hooks'

export default () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [camera, setCamera] = useState(null)

  const [qrCodeData, setQrCodeData] = useState(null)

  const location = useLocation()
  const moonData = useMoonData(location)
  const sunData = useSunData(location)

  console.log({ moonData, sunData })

  useEffect(() => {
    Camera.requestPermissionsAsync()
      .then(({ status }) => {
        setHasPermission(status === 'granted')
      })
  }, [])

  if (qrCodeData) {
    return (
      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <Text style={{ color: '#FFF' }}>Data: {qrCodeData}</Text>
        <TouchableOpacity style={{ color: '#FFF' }}>
          <Text style={{ color: '#FFF' }} onPress={() => setQrCodeData(null)}>RESET</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (!hasPermission) {
    return (
      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <Text style={{ color: '#FFF' }}>No permission granted for the camera...</Text>
      </View>
    )
  }

  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCamera(ref)
        }}
        onBarCodeScanned={({ data }) => setQrCodeData(data)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }}
          >
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <TouchableOpacity
        style={styles.takeShotButton}
        onPress={async () => {
          if (camera) {
            let photo = await camera.takePictureAsync({ base64: true })

            console.log(photo)
          }
        }}
      >
        <Text style={styles.takeShot}>Take a shot</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  camera: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height - 200,
  },
  text: {
    color: "#FFF"
  },
  takeShotButton: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#444',
    padding: 15,
  },
  takeShot: {
    color: '#FFF',
    textAlign: 'center'
  },
});
