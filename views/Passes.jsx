import React from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import _ from 'lodash'

import { useNavigation } from '../context/Routes'

export default () => {
  const { changeScreen } = useNavigation()

  return (
    <View style={{ padding: 20, paddingTop: 10 }}>
      <Text style={styles.header}>Upcoming passes</Text>

      <FlatList
        keyExtractor={(_, index) => `pass-${index}`}
        data={[1, 2, 3, 4, 5]}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => changeScreen('__PASS__')}
              style={[styles.pass, _.sample([styles.lowElevation, styles.midElevation, styles.highElevation])]}
            >
              <Text style={{ fontSize: 25, color: "#FFF" }}>NOAA 18</Text>
              <Text style={{ fontSize: 15, color: "#FFF" }}>Elev. 17*</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 10,
  },
  highElevation: {
    backgroundColor: "rgba(34, 213, 184, .2)",
    borderLeftColor: "#22D5A4",
  },
  lowElevation: {
    backgroundColor: "rgba(213, 34, 34, .2)",
    borderLeftColor: "#D52222",
  },
  midElevation: {
    backgroundColor: "rgba(142, 34, 213, .2)",
    borderLeftColor: "#8E22D5",
  },
  pass: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})
