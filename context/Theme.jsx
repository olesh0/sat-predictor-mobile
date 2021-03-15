import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { THEMES_LIST } from '../themes'
import { getCurrentTheme } from '../utils'
import { THEME } from '../utils/async-storage-keys'

const noTheme = {
  name: null,
  slug: null,
  colors: {},
}

const themeContext = createContext(noTheme)

export default ({ children }) => {
  const [theme, setTheme] = useState(noTheme)
  const { Provider } = themeContext

  useEffect(() => {
    console.log('getting current theme...')
    getCurrentTheme().then(setTheme)

    return () => setTheme(noTheme)
  }, [])

  return (
    <Provider
      value={{
        setTheme: async (themeSlug) => {
          setTheme(THEMES_LIST.find(({ slug }) => themeSlug === slug))
          return AsyncStorage.setItem(THEME, themeSlug)
        },
        theme,
      }}
    >
      {children}
    </Provider>
  )
}

export const useTheme = () => {
  return useContext(themeContext)
}
