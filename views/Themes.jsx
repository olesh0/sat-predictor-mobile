import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Alert, Text, StyleSheet, FlatList } from 'react-native'
import { useTheme } from '../context/Theme'

import { THEMES_LIST } from '../themes'


export default () => {
  const { theme, setTheme } = useTheme()
  let styles = stylesGenerator(theme)

  useEffect(() => {
    styles = stylesGenerator(theme)
  }, [theme])

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Themes</Text>

      <FlatList
        style={{ marginTop: 10 }}
        data={THEMES_LIST}
        keyExtractor={(theme) => `theme_${theme.slug}`}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[
                styles.themeItem,
                theme.slug === item.slug && styles.selected,
              ]}
              onPress={() => setTheme(item.slug)}
            >
              <Text style={styles.themeName}>{item.name}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const stylesGenerator = (theme) => (
  StyleSheet.create({
    main: {
      paddingVertical: 10,
      padding: 20,
    },
    title: {
      color: theme.colors.colorFontMain,
      fontSize: 25,
      fontFamily: "Orbitron-Medium",
    },
    themeItem: {
      marginBottom: 10,
      backgroundColor: theme.colors.colorBgLight,
      padding: 15,
      borderRadius: 3,
      borderWidth: 2,
      borderColor: "transparent",
    },
    themeName: {
      fontSize: 18,
      color: theme.colors.colorFontDark,
      fontFamily: "Orbitron-Regular",
    },
    selected: {
      borderColor: theme.colors.colorAccentGreen,
    },
  })
)
