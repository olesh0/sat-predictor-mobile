import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default ({ params }) => {
  return (
    <View style={{ paddingTop: 5, padding: 20 }}>
      <Text style={styles.header}>
        Sun & Moon
      </Text>

      <Text>
        {JSON.stringify(params, null, 2)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    color: "#FFF",
    fontFamily: "Orbitron-Bold",
  },
})
