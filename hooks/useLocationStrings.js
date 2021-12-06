import _ from 'lodash'
import converter from 'coordinator'
import { latLngToLocator } from 'qth-locator'

import { useUserLocation } from '../hooks'

const PRECISION = 4

export const useLocationStrings = () => {
  const location = useUserLocation()
  const latitude = _.get(location, 'lat')
  const longitude = _.get(location, 'lon')

  if (!latitude || !longitude) {
    return {}
  }

  const qth = latLngToLocator(location.lat, location.lon)
  const mgrs = converter('latlong', 'mgrs')(location.lat, location.lon, PRECISION)
  const usng = converter('latlong', 'usng')(location.lat, location.lon, PRECISION)
  const utm = converter('latlong', 'utm')(location.lat, location.lon, PRECISION)

  const utmZone = `${utm.zoneNumber}${utm.zoneLetter}`
  const utmEasting = `${utm.easting}m E`
  const utmNorthing = `${utm.northing}m N`
  const utmString = `${utmZone} ${utmEasting} ${utmNorthing}`

  return {
    QTH: qth,
    USNG: usng,
    MGRS: mgrs,
    UTM: utmString,
  }
}
