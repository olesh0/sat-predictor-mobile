import _ from 'lodash'
import { latLngToLocator } from 'qth-locator'

// NOTE For some reason this lib does not work with react native...
// import converter from 'coordinator'

import { useUserLocation } from '../hooks'

const PRECISION = 4

export const useLocationStrings = () => {
  const location = useUserLocation()
  const latitude = _.get(location, 'lat')
  const longitude = _.get(location, 'lon')

  if (!latitude || !longitude) {
    return {}
  }

  const qth = latLngToLocator(latitude, longitude)
  // const mgrs = converter('latlong', 'mgrs')(latitude, longitude, PRECISION)
  // const usng = converter('latlong', 'usng')(latitude, longitude, PRECISION)
  // const utm = converter('latlong', 'utm')(latitude, longitude, PRECISION)

  // const utmZone = `${utm.zoneNumber}${utm.zoneLetter}`
  // const utmEasting = `${utm.easting}m E`
  // const utmNorthing = `${utm.northing}m N`
  // const utmString = `${utmZone} ${utmEasting} ${utmNorthing}`

  return {
    QTH: qth,
    // USNG: usng,
    // MGRS: mgrs,
    // UTM: utmString,
  }
}
