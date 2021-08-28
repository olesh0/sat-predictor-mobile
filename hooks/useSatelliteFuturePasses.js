import jspredict from 'jspredict'
import { getLocation } from '../utils/location'

const PASSES_WINDOW_LENGTH = 86400 * 3 // 3 days

export const useSatelliteFuturePasses = async ({ name, line1, line2 }) => {
  const userLocation = await getLocation()

  const tle = `${name}\n${line1}\n${line2}`
  const qth = [userLocation.latitude, userLocation.longitude, 0.1]

  const windowStart = new Date()

  return jspredict.transits(
    tle,
    qth,
    windowStart.getTime() - 600,
    windowStart.getTime() + PASSES_WINDOW_LENGTH * 1000,
    5,
  )
}
