import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../context/Theme'

import { getCurrentTheme } from '../utils'

export default () => {
  getCurrentTheme()
  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Sat Predictor</Text>
    </View>
  )
}

const stylesGenerator = (theme) => (
  StyleSheet.create({
    main: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 30,
      color: theme.colors.colorFontMain,
      fontFamily: "Orbitron-Regular",
      textTransform: "uppercase",
    },
  })
)
