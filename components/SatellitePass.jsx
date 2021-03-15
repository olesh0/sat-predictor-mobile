import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import _ from 'lodash'

import Loader from '../components/Loader'
import { useNavigation } from '../context/Routes'
import { useTheme } from '../context/Theme'

export const PassInProgress = ({ elevation }) => {
  const { theme } = useTheme()
  const styles = {
    ...stylesGenerator(theme),
    high: {
      color: theme.colors.colorAccentGreen,
    },
    low: {
      color: theme.colors.colorAccentRed,
    },
    mid: {
      color: theme.colors.colorAccentPurple,
    },
  }

  return (
    <View
      style={{
        marginTop: 5,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Loader color={styles[elevation].color} />

      <Text
        style={[
          {
            marginLeft: 5,
            fontFamily: "Orbitron-Regular",
          },
          styles[elevation],
        ]}
      >Pass in progress...</Text>
    </View>
  )
}

export default ({ data }) => {
  const elevation = _.sample(['high', 'low', 'mid'])

  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  const { changeScreen } = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => changeScreen('__PASS__', data)}
      style={[
        {
          borderLeftWidth: 5,
          marginBottom: 10,
          paddingVertical: 10,
        },
        styles[`${elevation}Elevation`],
      ]}
    >
      <View style={styles.pass}>
        <View>
          <Text
            style={{
              fontFamily: "Orbitron-Regular",
              fontSize: 25,
              color: theme.colors.colorFontMain,
            }}
          >{data.name}</Text>

          {1 < 2 && (
            <PassInProgress elevation={elevation} />
          )}
        </View>

        <Text
          style={{
            fontSize: 15,
            color: theme.colors.colorFontMain,
            fontFamily: "Orbitron-Regular",
          }}
        >Elev. 17°</Text>
      </View>
    </TouchableOpacity>
  )
}

const stylesGenerator = (theme) => (
  StyleSheet.create({
    searchTextInput: {
      fontSize: 17,
      fontFamily: "Orbitron-Regular",
      backgroundColor: theme.colors.colorBgLight,
      padding: 15,
      color: theme.colors.colorFontMain,
      marginBottom: 10,
    },
    highElevation: {
      backgroundColor: theme.colors.colorHighlightGreen,
      borderLeftColor: theme.colors.colorAccentGreen,
    },
    lowElevation: {
      backgroundColor: theme.colors.colorHighlightRed,
      borderLeftColor: theme.colors.colorAccentRed,
    },
    midElevation: {
      backgroundColor: theme.colors.colorHighlightPurple,
      borderLeftColor: theme.colors.colorAccentPurple,
    },
    pass: {
      width: "100%",
      padding: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
)