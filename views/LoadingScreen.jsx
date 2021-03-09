import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default () => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Sat Predictor</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: "#FFF",
    fontFamily: "Orbitron-Regular",
    textTransform: "uppercase",
  },
})
