import React from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import { useTheme } from '../context/Theme'

export default ({ data, ...props }) => {
  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  const defaultData = [
    { label: 'Lol', value: 'You should probably provide "data" variable...' },
  ]

  return (
    <View {...props}>
      <FlatList
        data={data || defaultData}
        style={styles.dataList}
        keyExtractor={({ label, value }) => `data-item-${label}-${value}`}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <View style={[styles.dataListItem, item.groupStart && { marginTop: 8 }]}>
              <Text style={styles.listLabel}>{item.label}</Text>
              <Text style={styles.listValue}>{item.value}</Text>
            </View>
          )
        }}
      />
    </View>
  )
}

const stylesGenerator = (theme) => (
  StyleSheet.create({
    dataList: {
      marginVertical: 10,
    },
    dataListItem: {
      marginBottom: 8,
      flex: 1,
      alignSelf: "stretch",
      flexDirection: "row",
    },
    listLabel: {
      flex: 1,
      alignSelf: "stretch",
      color: theme.colors.colorFontDark,
      fontFamily: "Orbitron-Regular"
    },
    listValue: {
      flex: 1,
      alignSelf: "stretch",
      color: theme.colors.colorAccentGreen,
      fontFamily: "Orbitron-Regular"
    },
  })
)
