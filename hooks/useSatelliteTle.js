import AsyncStorage from '@react-native-community/async-storage'
import axios from '../utils/axios'

const CACHED_SAT_KEY_PREFIX = 'SAT_'

export const useSatelliteTle = async ({ noradId, onFetch }) => {
  const STORAGE_KEY = CACHED_SAT_KEY_PREFIX + noradId
  const cachedTle = await AsyncStorage.getItem(STORAGE_KEY)

  const fetchTleFromServer = async () => {
    const { data, status } = axios.get(`/api/tle/${noradId}`)

    if (status >= 200 && status < 300) {
      const tleData = {
        name: data.name,
        line1: data.line1,
        line2: data.line2,
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tleData))
      onFetch(tleData)

      return Promise.resolve(tleData)
    }
  }

  if (cachedTle) {
    try {
      const parsedTle = JSON.parse(cachedTle)

      if (!parsedTle.name || !parsedTle.line1 || !parsedTle.line2) {
        throw 'Cached TLE is invalid'
      }

      onFetch && onFetch(parsedTle)

      return Promise.resolve(parsedTle)
    } catch (e) {
      console.error(e)
      const tleData = await fetchTleFromServer()

      return Promise.resolve(tleData)
    }
  } else {
    const data = await fetchTleFromServer()
    return Promise.resolve(data)
  }
}
