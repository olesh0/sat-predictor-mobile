import React, { useRef, useEffect } from 'react'
import { Animated, StyleSheet } from 'react-native'

const DURATION = 300

export default ({ color = "#22D5A4" }) => {
  const middleBarAnim = useRef(new Animated.Value(0)).current
  const sideBarsAnim = useRef(new Animated.Value(15)).current
  const styles = stylesGenerator(color)

  // side => -1 means to the initial values, side => +1 means the opposite
  const runAnimation = (side = -1) => {
    Animated.timing(
      middleBarAnim,
      {
        toValue: side < 0 ? 15 : 0,
        duration: DURATION,
        useNativeDriver: false,
      }
    ).start()

    Animated.timing(
      sideBarsAnim,
      {
        toValue: side < 0 ? 0 : 15,
        duration: DURATION,
        useNativeDriver: false,
      }
    ).start(() => runAnimation(side * (-1)))
  }

  useEffect(() => {
    runAnimation()
  }, [middleBarAnim, sideBarsAnim])

  return (
    <Animated.View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.bar,
          styles.barSide,
          { height: sideBarsAnim }
        ]}
      />

      <Animated.View
        style={[
          styles.bar,
          styles.barMiddle,
          { height: middleBarAnim },
        ]}
      />

      <Animated.View
        style={[
          styles.bar,
          styles.barSide,
          { height: sideBarsAnim }
        ]}
      />
    </Animated.View>
  )
}

const stylesGenerator = (barColor) => (
  StyleSheet.create({
    wrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      height: 15,
    },
    bar: {
      borderRadius: 10,
      width: 2,
      backgroundColor: barColor,
      marginHorizontal: 2,
    },
    barSide: {
      height: 5,
    },
    barMiddle: {
      height: 15,
    },
  })
)
