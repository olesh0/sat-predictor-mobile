import React, { useState } from 'react'
import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import moment from 'moment'

import { useLocation, useNavigation, useTheme } from '../../context'
import { useSunPhases, useRange } from '../../hooks'

const DAY_TIME_ONLY_FORMAT = "hh:mm A"

export default ({ params }) => {
  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  const currentDate = new Date()
  const defaultYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const [year, setYear] = useState(params.year || defaultYear)

  const { changeScreen } = useNavigation()
  const location = useLocation()
  const phases = useSunPhases({ location, year })
  const years = useRange({ start: defaultYear - 100, end: defaultYear + 100 })

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 0 }}>
      <View style={styles.pageHeader}>
        <Text style={[styles.title, styles.orbitronFont]}>Phases in {phases.year}</Text>

        <View style={styles.pickerView}>
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
      </View>

      <FlatList
        data={phases.data}
        keyExtractor={(phase) => phase.monthName}
        renderItem={({ item: phase, index: monthIndex }) => (
          <TouchableHighlight
            key={phase.monthName}
            style={styles.phaseWrapper}
            onPress={() =>
              changeScreen(
                '__MONTH_SUN_PHASES__',
                {
                  monthName: phase.monthName,
                  month: monthIndex,
                  year,
                }
              )
            }
          >
            <View
              style={[
                styles.monthPhaseBlock,
                currentMonth === monthIndex && styles.activeMonth,
              ]}
            >
              <View style={styles.monthPhaseBlockHeader}>
                <Text style={[styles.headerMonthName, styles.orbitronFont]}>{phase.monthName}</Text>

                <Text
                  style={[
                    styles.headerSubtitle,
                    styles.orbitronFont,
                    currentMonth === monthIndex && styles.colorWhite,
                  ]}
                  >
                    the first of {phase.monthName}
                  </Text>
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
                    <Text
                      style={[
                        styles.shortContentKey,
                        currentMonth === monthIndex && styles.colorWhite,
                        styles.orbitronFont
                      ]}
                    >
                      {item.fieldName}
                    </Text>

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
  pickerView: {
    backgroundColor: colors.colorHighlightGreen,
    borderRadius: 3,
    width: 90,
    height: 28,
  },
  yearPicker: {
    display: "flex",
    alignItems: "center",
    color: colors.colorAccentGreen,
    fontSize: 15,
    width: 100,
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
  activeMonth: {
    backgroundColor: colors.colorHighlightGreen,
  },
  colorWhite: {
    color: colors.colorFontMain,
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
