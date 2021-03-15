import AsyncStorage from '@react-native-community/async-storage'
import { THEME } from './async-storage-keys'
import { DEFAULT_COLOR_THEME } from './contants'
import { THEMES_LIST } from '../themes'

export let currentTheme = {
  colors: {},
  name: null,
  slug: null,
}

export const getCurrentTheme = async () => {
  if (currentTheme && currentTheme.name) {
    return currentTheme
  }

  const theme = await AsyncStorage.getItem(THEME)
  const defaultSchema = THEMES_LIST.find(({ slug }) => slug === DEFAULT_COLOR_THEME)

  currentTheme = THEMES_LIST.find(({ slug }) => slug === theme) || defaultSchema

  return currentTheme
}

export const setTheme = async (themeSlug) => {
  const theme = THEMES_LIST.find(({ slug }) => slug === themeSlug)

  if (!theme) return

  currentTheme = theme

  return AsyncStorage.setItem(THEME, themeSlug)
}
