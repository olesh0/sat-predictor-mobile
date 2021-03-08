import React from 'react'
import { Text, Button, View, StyleSheet } from 'react-native'

import { useNavigation } from '../context/Routes'

export default ({ params }) => {
  const { changeScreen } = useNavigation()

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.satName}>{params.satName}</Text>

      <Text style={{ color: "#FFF" }}>{JSON.stringify(params, null, 2)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  satName: {
    fontSize: 25,
    color: "#FFF",
    fontFamily: "Orbitron-Bold",
  },
})