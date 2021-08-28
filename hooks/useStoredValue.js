import AsyncStorage from '@react-native-community/async-storage'

// TODO Add activity time (like cache has)
export const useStoredValue = async ({ key, evaluationHandler, onEvaluated }) => {
  const storedKey = await AsyncStorage.getItem(key)

  const fetchValue = async () => {
    const itemValue = await evaluationHandler()
    const storeValue = {
      setOn: Date.now(),
      value: itemValue,
      value: itemValue,
    }
    AsyncStorage.setItem(key, JSON.stringify(storeValue))

    return Promise.resolve(storeValue)
  }

  if (storedKey) {
    console.log('using stored value...', key)

    try {
      const parsedStoredKey = JSON.parse(storedKey)
      onEvaluated && onEvaluated(parsedStoredKey.value)

      return Promise.resolve(parsedStoredKey)
    } catch (e) {
      const itemValue = await fetchValue()
      onEvaluated && onEvaluated(itemValue.value)

      return Promise.resolve(itemValue.value)
    }
  } else {
    console.log('storing value...', key)

    const itemValue = await fetchValue()
    onEvaluated && onEvaluated(itemValue.value)

    return Promise.resolve(itemValue.value)
  }
}
