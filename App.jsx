import React from 'react';
import * as Font from 'expo-font';

import { Provider as StoreProvider } from 'vuex-react'

import store from './store'

import Navigation from './Navigation'
import ThemeProvider from './context/Theme'
import LoaderProvider from './context/Loader'
import { LocationProvider } from './context/LocationProvider';

console.disableYellowBox = true;

export default function App() {
  const [fontsLoaded, error] = Font.useFonts({
    'Orbitron-Black': require('./assets/orbitron/Orbitron-Black.ttf'),
    'Orbitron-Bold': require('./assets/orbitron/Orbitron-Bold.ttf'),
    'Orbitron-Medium': require('./assets/orbitron/Orbitron-Medium.ttf'),
    'Orbitron-Regular': require('./assets/orbitron/Orbitron-Regular.ttf'),
  })

  console.log({ areFontsLoaded: Font.isLoaded('Orbitron-Black') }, error)

  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <LoaderProvider>
          <LocationProvider>
            {fontsLoaded && <Navigation />}
          </LocationProvider>
        </LoaderProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
