import SunCalc from 'suncalc'

import { useUserLocation } from './useUserLocation'
import { formatTime, radiansToDegress } from './useSunData'

export const normalizeNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export const useMoonData = () => {
  const { lat, lon } = useUserLocation()

  const times = SunCalc.getMoonTimes(new Date(), lat, lon)
  const current = SunCalc.getMoonPosition(new Date(), lat, lon)

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
