import { SPEED_OF_LIGHT } from './contants'

export const calculatePing = (distance, { decimal = 4 } = {}) => {
  if (!distance) return

  const distanceInMeters = distance * 1000
  const ping = distanceInMeters / SPEED_OF_LIGHT

  return {
    raw: ping,
    formatted: ping.toFixed(decimal),
  }
}
