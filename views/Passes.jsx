import React from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import _ from 'lodash'

import { useNavigation } from '../context/Routes'

import Loader from '../components/Loader'
import { useTheme } from '../context/Theme'

const PassInProgress = ({ elevation }) => {
  const { theme } = useTheme()

  const styles = {
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

export default () => {
  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  const { changeScreen } = useNavigation()

  const randomSatsList = [1, 2, 3, 4, 5, 6, 7].map(() => ({ satName: _.sample(['NOAA-18', 'NOAA-19', 'NOAA-20', 'ISS']) }))

  return (
    <View style={{ padding: 20, paddingTop: 10 }}>
      <FlatList
        keyExtractor={(_, index) => `pass-${index}`}
        data={randomSatsList}
        numColumns={1}
        renderItem={({ item, index }) => {
          const elevation = _.sample(['high', 'low', 'mid'])

          return (
            <TouchableOpacity
              onPress={() => changeScreen('__PASS__', { satName: item.satName })}
              style={[
                {
                  borderLeftWidth: 5,
                  marginBottom: 10,
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
                  >{item.satName}</Text>

                  {index < 2 && (
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
        }}
      />
    </View>
  )
}

const stylesGenerator = (theme) => (
  StyleSheet.create({
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