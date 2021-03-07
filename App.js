import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Trying to see myself in mobile dev again... Lol</Text>
      <View style={styles.bottomLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 30,
    margin: 10,
    color: '#eee',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  bottomLine: {
    width: '50%',
    height: 2,
    backgroundColor: '#00aeff',
    borderRadius: 20,
  },
});
