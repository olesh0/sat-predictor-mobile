import React from 'react'
import { NavigationProvider, Routes } from './context/Routes'
import { StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from './context/Theme';

export default () => {
  const { theme } = useTheme()

  return (
    <NavigationProvider>
      <SafeAreaView style={styles(theme).container}>
        <Routes />
      </SafeAreaView>
    </NavigationProvider>
  )
}

const styles = (theme) => (
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.colorBgDark,
    },
  })
)
