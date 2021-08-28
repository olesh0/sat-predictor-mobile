import { useEffect, useState } from 'react'
import { getLocation } from '../utils/location'
import { useStoredValue } from '../hooks/useStoredValue'

export const useUserLocation = () => {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  useEffect(() => {
    useStoredValue({
      key: 'USER_LOCATION_LATITUDE',
      evaluationHandler: async () => {
        return new Promise((resolve) => {
          getLocation({
            onLocationReceive: ({ latitude }) => {
              resolve(latitude)
              setLatitude(latitude)
            },
          })
        })
      },
      onEvaluated: (latitude) => setLatitude(latitude),
    })

    useStoredValue({
      key: 'USER_LOCATION_LONGITUDE',
      evaluationHandler: async () => {
        return new Promise((resolve) => {
          getLocation({
            onLocationReceive: ({ longitude }) => {
              setLongitude(longitude)
              resolve(longitude)
            },
          })
        })
      },
      onEvaluated: (longitude) => setLongitude(longitude),
    })
  }, [])

  return {
    lon: longitude,
    lat: latitude,
  }
}
