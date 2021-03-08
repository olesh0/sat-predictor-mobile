import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';

import { NavigationProvider, Routes } from './context/Routes'

console.disableYellowBox = true;

export default function App() {
  const [fontsLoaded, error] = Font.useFonts({
    'Orbitron-Black': require('./assets/orbitron/Orbitron-Black.ttf'),
    'Orbitron-Bold': require('./assets/orbitron/Orbitron-Bold.ttf'),
    'Orbitron-Medium': require('./assets/orbitron/Orbitron-Medium.ttf'),
    'Orbitron-Regular': require('./assets/orbitron/Orbitron-Regular.ttf'),
  })

  console.log({ isFontsLoaded: Font.isLoaded('Orbitron-Black') }, error)

  return (
    <NavigationProvider>
      <SafeAreaView style={styles.container}>
        {fontsLoaded && <Routes />}
      </SafeAreaView>
    </NavigationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17191A",
  },
});
