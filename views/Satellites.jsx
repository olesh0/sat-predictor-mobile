import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { useGetter, useStore } from 'vuex-react'
import { useDebounce } from 'use-debounce'
import _ from 'lodash'

import { useNavigation } from '../context/Routes'

import Loader from '../components/Loader'
import { useTheme } from '../context/Theme'
import { useSatelliteLocation } from '../hooks'
import { getElevationString } from '../utils'

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
  const [search, setSearch] = useState('')
  const [searchDebounced] = useDebounce(search, 1000);

  const { dispatch } = useStore()
  const [satellites] = useGetter('satellites/satellites')

  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  const { changeScreen } = useNavigation()

  useEffect(() => {
    dispatch('satellites/fetchSats', { search: searchDebounced })
  }, [searchDebounced])

  return (
    <View style={{ padding: 20, paddingTop: 10 }}>
      <TextInput
        style={styles.searchTextInput}
        keyboardAppearance="dark"
        keyboardType="default"
        onChangeText={(term) => setSearch(term)}
        value={search}
        placeholder="Search satellite"
        placeholderTextColor={theme.colors.colorFontDark}
      />

      <FlatList
        keyExtractor={(_, index) => `pass-${index}`}
        data={satellites.member}
        numColumns={1}
        renderItem={({ item, index }) => {
          const satInfo = useSatelliteLocation({
            name: item.name,
            line1: item.line1,
            line2: item.line2,
          })
          const elevation = getElevationString(satInfo.elevation.raw)

          return (
            <TouchableOpacity
              onPress={() => changeScreen('__SATELLITE__', item)}
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
                  >{item.name}</Text>

                  {satInfo.elevation.raw > 0 && (
                    <PassInProgress elevation={elevation} />
                  )}
                </View>

                <Text
                  style={{
                    fontSize: 15,
                    color: theme.colors.colorFontMain,
                    fontFamily: "Orbitron-Regular",
                  }}
                >Elev. {satInfo.elevation.formatted}</Text>
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