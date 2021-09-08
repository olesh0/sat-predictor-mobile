import React, { useState } from 'react'
import { View, Text, FlatList, TouchableHighlight, Dimensions } from 'react-native'
import moment from 'moment'

import { useLocation } from '../context/LocationProvider'
import { useTheme } from '../context/Theme'

import { useSunPhases } from '../hooks'

const SCREEN_WIDTH = Dimensions.get('window').width
const DAY_TIME_ONLY_FORMAT = "hh:mm A"

export default () => {
  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  const defaultYear = new Date().getFullYear()

  const [selectedMonth, setSelectedMonth] = useState(null)
  const [year, setYear] = useState(defaultYear)

  const location = useLocation()
  const phases = useSunPhases({ location, year })

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 0 }}>
      <Text style={[styles.title, styles.orbitronFont]}>Phases in {phases.year}</Text>

      <FlatList
        data={phases.data}
        keyExtractor={(phase) => phase.monthName}
        renderItem={({ item: phase, index }) => (
          <TouchableHighlight
            key={phase.monthName}
            onPress={() => setSelectedMonth(index)}
            style={styles.phaseWrapper}
          >
            <View
              style={[
                styles.monthPhaseBlock,
                index === selectedMonth ? styles.selectedMonth : {}
              ]}
            >
              <View style={styles.monthPhaseBlockHeader}>
                <Text style={[styles.headerMonthName, styles.orbitronFont]}>{phase.monthName}</Text>
                <Text style={[styles.headerSubtitle, styles.orbitronFont]}>the first of {phase.monthName}</Text>
              </View>

              <FlatList
                data={[
                  {
                    fieldName: 'Sunrise',
                    value: moment(phase.sunData.sunrise.raw).format(DAY_TIME_ONLY_FORMAT),
                  },
                  {
                    fieldName: 'Sunset',
                    value: moment(phase.sunData.sunset.raw).format(DAY_TIME_ONLY_FORMAT),
                  },
                ]}
                style={styles.monthPhaseBlockShortContent}
                keyExtractor={(item) => item.fieldName}
                renderItem={({ item }) => (
                  <View style={styles.monthPhaseBlockShortContentItem}>
                    <Text style={[styles.shortContentKey, styles.orbitronFont]}>{item.fieldName}</Text>
                    <Text style={[styles.shortContentValue, styles.orbitronFont]}>{item.value}</Text>
                  </View>
                )}
              />
            </View>
          </TouchableHighlight>
        )}
      />

      <Text
        style={{
          marginTop: 20,
          color: "#FFF",
          fontSize: 15,
          fontFamily: "Orbitron-Regular",
        }}
      >{JSON.stringify(phases, null, 2)}</Text>
    </View>
  )
}

const stylesGenerator = ({ colors }) => ({
  title: {
    color: colors.colorFontMain,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  phaseWrapper: {
    marginVertical: 3,
  },
  monthPhaseBlock: {
    backgroundColor: colors.colorBgLight,
    padding: 20,
  },
  monthPhaseBlockHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  monthPhaseBlockShortContent: {
    marginTop: 15,
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
    flexDirection: "row",
  },
  monthPhaseBlockShortContentItem: {
    marginBottom: 8,
  },
  shortContentKey: {
    marginRight: 10,
    color: colors.colorFontDark,
    fontSize: 14,
  },
  shortContentValue: {
    color: colors.colorAccentGreen,
    fontSize: 23,
  },
  selectedMonth: {
    backgroundColor: colors.colorUltraHighlightGreen,
  },
  orbitronFont: {
    fontFamily: "Orbitron-Regular",
  },
  headerMonthName: {
    color: colors.colorFontMain,
    fontSize: 18,
  },
  headerSubtitle: {
    color: colors.colorFontDark,
    fontSize: 13,
    marginLeft: 10,
  },
})
