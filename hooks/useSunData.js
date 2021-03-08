import SunCalc from 'suncalc'
import moment from 'moment'

import { useUserLocation } from './useUserLocation'
import { TIME_FORMAT } from '../utils'

export const formatTime = (date) => {
  return {
    formatted: moment(date).format(TIME_FORMAT),
    raw: date,
  }
}

export const radiansToDegress = (radians, { isAltitude = false } = {}) => {
  const degress = radians / Math.PI * 180

  // In a case if azimuth is less than 0
  // (we want to see azimuth 330deg rather than -30deg)
  // of course, unless it is an altitude
  return !isAltitude && degress < 0 ? degress + 360 : degress
}

export const useSunData = () => {
  const { lat, lon } = useUserLocation()

  const times = SunCalc.getTimes(new Date(), lat, lon)
  const maxElevation = SunCalc.getPosition(times.solarNoon, lat, lon)

  const current = SunCalc.getPosition(new Date(), lat, lon)

  return {
    dawn: formatTime(times.dawn),
    dusk: formatTime(times.dusk),
    sunset: formatTime(times.sunset),
    sunrise: formatTime(times.sunrise),
    nadir: formatTime(times.nadir),
    noon: formatTime(times.solarNoon),
    current: {
      azimuth: radiansToDegress(current.azimuth),
      elevation: radiansToDegress(current.altitude, { isAltitude: true }),
    },
    maxElevation: {
      azimuth: radiansToDegress(maxElevation.azimuth),
      elevation: radiansToDegress(maxElevation.altitude, { isAltitude: true }),
    },
  }
}
