import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import ViewShot, { captureRef } from 'react-native-view-shot'

import { useLocation } from '../context/LocationProvider'
import { useTheme } from '../context/Theme'
import { useSunData, useMoonData } from '../hooks'

const PAGE_HORIZONTAL_PADDING = 20
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export default () => {
  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [camera, setCamera] = useState(null)
  const [assetInformation, setAssetInformation] = useState(null)
  const viewShotRef = useRef(null)

  const location = useLocation()
  const moonData = useMoonData(location)
  const sunData = useSunData(location)

  const saveImage = async () => {
    await MediaLibrary.createAssetAsync(assetInformation.uri);
    setAssetInformation(null)
    alert('Image saved!')
  }

  useEffect(() => {
    Promise.all([
      MediaLibrary.requestPermissionsAsync(),
      Camera.requestPermissionsAsync(),
    ]).then(([{ status: cameraRollPermissionStatus }, { status: cameraPermissionStatus }]) => {
      setHasPermission(cameraRollPermissionStatus === "granted" && cameraPermissionStatus === "granted")
    })
  }, [])

  if (!hasPermission) {
    return (
      <View style={styles.pageContainer}>
        <Text style={{ color: '#FFF' }}>
          No permission granted for the camera or storage...
        </Text>
      </View>
    )
  }

  if (assetInformation) {
    return (
      <View style={styles.pageContainer}>
        <Image
          source={{ uri: assetInformation.uri }}
          style={styles.camera}
        />

        <View style={styles.controlButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.flipControlButton,
              {
                width: ((screenWidth - (PAGE_HORIZONTAL_PADDING * 2)) / 2) - 50,
                backgroundColor: theme.colors.colorHighlightRed,
                borderRightColor: 0,
              }
            ]}
            onPress={() => setAssetInformation(null)}
          >
            <Text style={styles.controlButtonText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.takeShotButton,
              {
                width: ((screenWidth - (PAGE_HORIZONTAL_PADDING * 2)) / 2) + 50,
              }
            ]}
            onPress={saveImage}
          >
            <Text style={styles.controlButtonText}>Save the image</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.pageContainer}>
      <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
        <Camera
          style={[
            styles.camera,
            { position: 'relative' }
          ]}
          type={type}
          ref={(ref) => {
            setCamera(ref)
          }}
        />

        <View
          style={{
            backgroundColor: '#000',
            width: screenWidth - (PAGE_HORIZONTAL_PADDING * 2),
            position: 'absolute',
            bottom: 50,
            left: 0,
          }}
        >
          <Text style={{ color: '#FFF' }}>kek lol</Text>
        </View>
      </ViewShot>

      <View style={styles.controlButtonsContainer}>
        <TouchableOpacity
          style={styles.flipControlButton}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }}
        >
          <Text style={styles.controlButtonText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.takeShotButton}
          onPress={async () => {
            if (camera) {
              const uri = await captureRef(viewShotRef, {
                format: "jpg",
                quality: 0.8,
              })

              setAssetInformation({ uri })
            }
          }}
        >
          <Text style={styles.controlButtonText}>Take a picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const stylesGenerator = ({ colors }) => (
  StyleSheet.create({
    pageContainer: {
      paddingVertical: 10,
      paddingHorizontal: PAGE_HORIZONTAL_PADDING,
    },
    controlButtonsContainer: {
      marginTop: 10,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    camera: {
      width: screenWidth - (PAGE_HORIZONTAL_PADDING * 2),
      height: screenHeight - 200,
    },
    text: {
      color: colors.colorFontMain,
    },
    flipControlButton: {
      backgroundColor: colors.colorHighlightGreen,
      borderRightColor: colors.colorAccentGreen,
      borderRightWidth: 1,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      width: ((screenWidth - (PAGE_HORIZONTAL_PADDING * 2)) / 2) - 100,
      borderRadius: 2,
      padding: 15,
    },
    takeShotButton: {
      backgroundColor: colors.colorHighlightGreen,
      width: ((screenWidth - (PAGE_HORIZONTAL_PADDING * 2)) / 2) + 100,
      borderRadius: 2,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      padding: 15,
    },
    controlButtonText: {
      color: '#FFF',
      textAlign: 'center',
      fontFamily: 'Orbitron-Regular',
    },
  })
)
