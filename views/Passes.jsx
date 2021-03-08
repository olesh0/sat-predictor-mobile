import React from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import _ from 'lodash'

import { useNavigation } from '../context/Routes'

export default () => {
  const { changeScreen } = useNavigation()

  const randomSatsList = [1, 2, 3, 4, 5, 6, 7].map(() => ({ satName: _.sample(['NOAA-18', 'NOAA-19', 'NOAA-20', 'ISS']) }))

  return (
    <View style={{ padding: 20, paddingTop: 10 }}>
      <FlatList
        keyExtractor={(_, index) => `pass-${index}`}
        data={randomSatsList}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => changeScreen('__PASS__', { satName: item.satName })}
              style={[styles.pass, _.sample([styles.lowElevation, styles.midElevation, styles.highElevation])]}
            >
              <Text
                style={{
                  fontFamily: "Orbitron-Regular",
                  fontSize: 25,
                  color: "#FFF",
                }}
              >{item.satName}</Text>

              <Text
                style={{
                  fontSize: 15,
                  color: "#FFF"
                }}
              >Elev. 17*</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
