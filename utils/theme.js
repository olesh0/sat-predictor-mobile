import AsyncStorage from '@react-native-community/async-storage'
import { THEME } from './async-storage-keys'
import { DEFAULT_COLOR_THEME } from './contants'
import { THEMES_LIST } from '../themes'

export const getCurrentTheme = async () => {
  const theme = await AsyncStorage.getItem(THEME) || DEFAULT_COLOR_THEME

  return THEMES_LIST.find(({ slug }) => slug === theme)
}

export const setTheme = (themeName) => AsyncStorage.setItem(THEME, themeName)
