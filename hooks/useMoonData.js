import SunCalc from 'suncalc'

import { getLocation } from '../utils/location'
import { formatTime, radiansToDegress } from './useSunData'

export const normalizeNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export const useMoonData = async () => {
  const { latitude, longitude } = await getLocation()

  const times = SunCalc.getMoonTimes(new Date(), latitude, longitude)
  const current = SunCalc.getMoonPosition(new Date(), latitude, longitude)

  const results = {
    current: {
      distance: {
        raw: current.distance,
        formatted: `${normalizeNumber(Math.round(current.distance))}km`,
      },
      paralacticAngle: radiansToDegress(current.parallacticAngle, { isAltitude: true }),
      azimuth: radiansToDegress(current.azimuth),
      altitude: radiansToDegress(current.altitude, { isAltitude: true })
    },
  }

  if (times.set) results.set = formatTime(times.set)
  if (times.rise) results.rise = formatTime(times.rise)

  return results
}
