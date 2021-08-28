import jspredict from 'jspredict'

export const formatLocation = (location) => {
  return {
    raw: location,
    formatted: `${location.toFixed(5)}°`,
  }
}

export const useSatelliteLocation = ({ name, line1, line2, latitude, longitude }) => {
  const satInfo = jspredict.observe(`${name}\n${line1}\n${line2}`, [latitude, longitude, 0.1])

  if (!satInfo) {
    return {
      latitude: {},
      longitude: {},
      altitude: {},
      rangeSat: {},
      elevation: {},
    }
  }

  return {
    ...satInfo,
    latitude: formatLocation(satInfo.latitude),
    longitude: formatLocation(satInfo.longitude),
    altitude: {
      raw: satInfo.altitude,
      formatted: `${satInfo.altitude.toFixed(2)}km`,
    },
    rangeSat: {
      raw: satInfo.rangeSat,
      formatted: `${satInfo.rangeSat.toFixed(2)}km`,
    },
    elevation: {
      raw: satInfo.elevation,
      formatted: `${satInfo.elevation.toFixed(2)}°`
    },
  }
}
