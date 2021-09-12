import React, { useState } from 'react'
import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import moment from 'moment'

import { useLocation } from '../context/LocationProvider'
import { useTheme } from '../context/Theme'

import { useSunPhases, useYearsRange } from '../hooks'

const DAY_TIME_ONLY_FORMAT = "hh:mm A"

export default () => {
  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  const defaultYear = new Date().getFullYear()

  const [year, setYear] = useState(defaultYear)

  const location = useLocation()
  const phases = useSunPhases({ location, year })
  const { years } = useYearsRange({ start: 1900, end: defaultYear + 1000 })

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 0 }}>
      <View style={styles.pageHeader}>
        <Text style={[styles.title, styles.orbitronFont]}>Phases in {phases.year}</Text>

        <Picker
          selectedValue={year}
          style={styles.yearPicker}
          onValueChange={(itemValue) => setYear(itemValue)}
        >
          {years.map((localYear) => (
            <Picker.Item
              key={localYear}
              label={String(localYear)}
              value={localYear}
            />
          ))}
        </Picker>
      </View>

      <FlatList
        data={phases.data}
        keyExtractor={(phase) => phase.monthName}
        renderItem={({ item: phase, index }) => (
          <TouchableHighlight
            key={phase.monthName}
            style={styles.phaseWrapper}
          >
            <View
              style={styles.monthPhaseBlock}
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
    </View>
  )
}

const stylesGenerator = ({ colors }) => ({
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  yearPicker: {
    display: "flex",
    alignItems: "center",
    color: colors.colorAccentGreen,
    backgroundColor: colors.colorBgLight,
    fontSize: 15,
    width: 50,
    height: 28,
  },
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
