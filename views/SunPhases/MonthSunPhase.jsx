import moment from 'moment'
import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import { useLocation, useNavigation, useTheme } from '../../context'
import { useMonthSunPhases } from '../../hooks'
import { shortEnglishHumanizer } from '../../utils'

const TIME_ONLY_FORMAT = "hh:mm A"

const getDayLength = ({ sunrise, sunset }) => {
  const diff = moment(sunset).diff(sunrise)

  return {
    raw: diff,
    formatted: shortEnglishHumanizer(diff),
  }
}

const MonthSunPhase = ({ params }) => {
  const { theme } = useTheme()
  const styles = stylesGenerator(theme)
  const { changeScreen } = useNavigation()
  const location = useLocation()

  const { monthData, monthName } = useMonthSunPhases({
    location,
    year: params.year,
    month: params.month,
  })

  return (
    <View style={styles.page}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>{monthName}, {params.year}</Text>

        <TouchableOpacity
          onPress={() => changeScreen('__SUN_PHASES__', { year: params.year })}
        >
          <View style={styles.backToPhasesView}>
            <Text style={styles.backToPhasesText}>
              Back to phases
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.dataList}>
        <View style={styles.listItem}>
          <Text style={[styles.listItemDayIndex, styles.textGray]}>
            Day
          </Text>

          <Text style={[styles.listItemSunrise, styles.textGray]}>
            Sunrise
          </Text>

          <Text style={[styles.listItemSunset, styles.textGray]}>
            Sunset
          </Text>

          <Text style={[styles.listItemElevation, styles.textGray]}>
            Sun elev.
          </Text>

          <Text style={[styles.listItemDayDuration, styles.textGray]}>
            Day duration
          </Text>
        </View>

        <FlatList
          data={monthData}
          keyExtractor={(_, dayIndex) => dayIndex}
          renderItem={({ item: dayInfo, index }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemDayIndex}>
                {index + 1}
              </Text>

              <Text style={[styles.listItemSunrise, styles.textWhite]}>
                {moment(dayInfo.sunrise.raw).format(TIME_ONLY_FORMAT)}
              </Text>

              <Text style={[styles.listItemSunset, styles.textWhite]}>
                {moment(dayInfo.sunset.raw).format(TIME_ONLY_FORMAT)}
              </Text>

              <Text style={[styles.listItemElevation, styles.textWhite]}>
                {dayInfo.maxElevation.elevation.toFixed(2)}°
              </Text>

              <Text style={[styles.listItemDayDuration, styles.textWhite]}>
                {getDayLength({
                  sunrise: dayInfo.sunrise.raw,
                  sunset: dayInfo.sunset.raw,
                }).formatted}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const stylesGenerator = ({ colors }) => ({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pageHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageTitle: {
    fontSize: 23,
    fontFamily: "Orbitron-Medium",
    color: colors.colorFontMain,
  },
  dataList: {
    marginVertical: 10,
  },
  listItem: {
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
  },
  textGray: {
    color: colors.colorFontDark,
  },
  textWhite: {
    color: colors.colorFontMain,
  },
  listItemDayIndex: {
    color: colors.colorAccentGreen,
    flex: 1,
  },
  listItemSunrise: { flex: 2 },
  listItemSunset: { flex: 2 },
  listItemElevation: { flex: 2 },
  listItemDayDuration: { flex: 2 },
  backToPhasesView: {
    backgroundColor: colors.colorHighlightGreen,
    borderRadius: 3,
  },
  backToPhasesText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: colors.colorAccentGreen,
  },
})

export default MonthSunPhase
