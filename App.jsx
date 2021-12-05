import React from 'react'
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar'

import { Provider as StoreProvider } from 'vuex-react'

import store from './store'

import Navigation from './Navigation'
import ThemeProvider, { useTheme } from './context/Theme'
import LoaderProvider from './context/Loader'
import { LocationProvider } from './context/LocationProvider'

import { THEME_DARK } from './themes/types'

console.disableYellowBox = true;

const AppStatusBar = () => {
  const { theme } = useTheme()
  const isThemeDark = theme.type === THEME_DARK

  return <StatusBar style={isThemeDark ? "light" : "dark"} />
}

export default function App() {
  const [fontsLoaded, error] = Font.useFonts({
    'Orbitron-Black': require('./assets/orbitron/Orbitron-Black.ttf'),
    'Orbitron-Bold': require('./assets/orbitron/Orbitron-Bold.ttf'),
    'Orbitron-Medium': require('./assets/orbitron/Orbitron-Medium.ttf'),
    'Orbitron-Regular': require('./assets/orbitron/Orbitron-Regular.ttf'),
  })

  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <LoaderProvider>
          <LocationProvider>
            <AppStatusBar />

            {fontsLoaded && <Navigation />}
          </LocationProvider>
        </LoaderProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
