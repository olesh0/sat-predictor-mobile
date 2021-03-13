import React, { useEffect, useRef, useState } from 'react'
import { Text, View, StyleSheet, Dimensions, Animated } from 'react-native'

const DURATION = 200

export default ({ show }) => {
  const animation = new Animated.Value(0)
  const opacity = useRef(animation).current

  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    animation.addListener(({ value }) => {
      if (value > 0) setShowLoader(true)
      else setShowLoader(false)
    })
  }, [])

  useEffect(() => {
    const toValue = show ? 1 : 0

    Animated.timing(
      opacity,
      {
        toValue: toValue,
        duration: DURATION,
        useNativeDriver: false,
      }
    ).start()
  }, [show])

  return (
    <Animated.View style={[
      styles.loader,
      {
        opacity,
        display: showLoader ? "flex" : "none",
        elevation: showLoader ? 10 : -5,
      },
    ]}>
      <Text style={{ color: "#FFF" }}>Loading... {show ? 'show' : 'never'}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    elevation: 10,
    backgroundColor: "rgba(0, 0, 0, 1)",
    zIndex: 100,
    opacity: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})
