import React from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'

export default ({ data }) => {
  const defaultData = [
    { label: 'Lol', value: 'You should probably provide "data" variable...' },
  ]

  return (
    <FlatList
      style={styles.dataList}
      data={data || defaultData}
      keyExtractor={({ label, value }) => `data-item-${label}-${value}`}
      numColumns={1}
      renderItem={({ item }) => {
        return (
          <View style={styles.dataListItem}>
            <Text style={styles.listLabel}>{item.label}</Text>
            <Text style={styles.listValue}>{item.value}</Text>
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  dataList: {
    marginVertical: 10,
  },
  dataListItem: {
    marginBottom: 5,
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  listLabel: {
    flex: 1,
    alignSelf: "stretch",
    color: "#5F6D77",
    fontFamily: "Orbitron-Regular"
  },
  listValue: {
    flex: 1,
    alignSelf: "stretch",
    color: "#22D5A4",
    fontFamily: "Orbitron-Regular"
  },
})