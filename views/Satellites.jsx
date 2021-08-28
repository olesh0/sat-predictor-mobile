import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'
import { useGetter, useStore } from 'vuex-react'
import { useDebounce } from 'use-debounce'
import _ from 'lodash'

import { useNavigation } from '../context/Routes'

import Loader from '../components/Loader'
import { useTheme } from '../context/Theme'
import { useSatelliteLocation } from '../hooks'
import { getLocation } from '../utils/location'
import { getElevationString } from '../utils'

const MAX_SAT_NAME_LENGTH = 10

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
  const netInfo = useNetInfo()

  const [satInfos, setSatInfos] = useState([])
  const [search, setSearch] = useState('')
  const [searchDebounced] = useDebounce(search, 1000);

  const { dispatch } = useStore()
  const [satellites] = useGetter('satellites/satellites')

  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  const { changeScreen } = useNavigation()

  useEffect(() => {
    dispatch('satellites/fetchSats', { search: searchDebounced })
  }, [searchDebounced, netInfo.isInternetReachable])

  useEffect(() => {
    const evaluateSatsInfos = async () => {
      try {
        const { latitude, longitude } = await getLocation()
        const infos = satellites.member && satellites.member.map(({ name, line1, line2 }) => useSatelliteLocation({ name, line1, line2, latitude, longitude }))

        if (!infos) return

        setSatInfos([...infos])
      } catch (e) {
        console.error(e)
      }
    }

    const satsInfoUpdateInterval = setInterval(evaluateSatsInfos, 1000)

    evaluateSatsInfos()

    return () => clearInterval(satsInfoUpdateInterval)
  }, [satellites])

  if (netInfo.isInternetReachable === false || netInfo.isConnected === false) {
    return (
      <View style={styles.content}>
        <Text style={styles.noInternetPrimary}>
          Cannot fetch satellites list
        </Text>

        <Text style={styles.noInternetSecondary}>
          This section requires internet connection...
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.content}>
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
        data={(satellites.member || []).map((satellite, satIndex) => ({
          satellite,
          location: satInfos[satIndex],
        }))}
        numColumns={1}
        renderItem={({ item: { satellite, location = {} } }) => {
          const elevation = getElevationString(location.elevation && location.elevation.raw || 0)

          return (
            <TouchableOpacity
              onPress={() => changeScreen('__SATELLITE__', satellite)}
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
                  >
                    {satellite.name.length > MAX_SAT_NAME_LENGTH
                      ? `${satellite.name.substring(0, MAX_SAT_NAME_LENGTH).trim()}...`
                      : satellite.name}
                  </Text>

                  {location.elevation && location.elevation.raw > 0 && (
                    <PassInProgress elevation={elevation} />
                  )}
                </View>

                <Text
                  style={{
                    fontSize: 15,
                    color: theme.colors.colorFontMain,
                    fontFamily: "Orbitron-Regular",
                  }}
                >Elev. {location.elevation?.formatted ?? "-"}</Text>
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
    content: {
      padding: 20,
      paddingTop: 10,
    },
    noInternetPrimary: {
      color: theme.colors.colorAccentRed,
      fontSize: 25,
      fontFamily: "Orbitron-Bold",
      marginTop: 10,
      marginBottom: 5,
    },
    noInternetSecondary: {
      color: theme.colors.colorAccentRed,
      fontSize: 17,
      fontFamily: "Orbitron-Regular",
    },
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