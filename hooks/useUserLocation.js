import { useEffect, useState } from 'react'
import { getLocation } from '../utils/location'
import { useStoredValue } from '../hooks/useStoredValue'

export const useUserLocation = () => {
  const [latitude, setLatitude] = useState(0)
  const [longitute, setLongitude] = useState(0)

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
      onEvaluated: (data) => setLatitude(data.value),
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
      onEvaluated: ({ value: longitude }) => setLongitude(longitude),
    })
  }, [])

  return {
    lon: longitute,
    lat: latitude,
  }
}
