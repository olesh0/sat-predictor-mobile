import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import { THEMES_LIST } from '../themes'

export default () => {
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Themes</Text>

      <FlatList
        data={THEMES_LIST}
        keyExtractor={(theme) => `theme_${theme.slug}`}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <View style={styles.themeItem}>
              <Text style={styles.themeName}>{item.name}</Text>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingVertical: 10,
    padding: 20,
  },
  title: {
    color: "#FFF",
    fontSize: 25,
    fontFamily: "Orbitron-Medium",
  },
  themeItem: {
    marginVertical: 10,
    backgroundColor: "#242729",
    padding: 15,
    borderRadius: 3,
  },
  themeName: {
    fontSize: 18,
    color: "#5F6D77",
    fontFamily: "Orbitron-Regular",
  },
})
