import { Alert } from 'react-native'
import _ from 'lodash'

export const getLocation = ({ onLocationReceive } = {}) => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((location) => {
      const latitude = _.get(location, 'coords.latitude')
      const longitude = _.get(location, 'coords.longitude')

      onLocationReceive && onLocationReceive({ latitude, longitude })
      resolve({ latitude, longitude })
    }, () => {
      onLocationReceive && onLocationReceive({ latitude: 0, longitude: 0 })
      Alert.alert('No luck evaluating your coords...')
    }, {
      timeout: 10000,
      enableHighAccuracy: false,
    })
  })
}
