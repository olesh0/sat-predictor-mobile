import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import { NavigationProvider, Routes } from './context/Routes'

export default function App() {
  return (
    <NavigationProvider>
      <SafeAreaView style={styles.container}>
        <Routes />
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
