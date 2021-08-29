import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native'

import buttonLinks from '../assets/credit-buttons-links.json'
import { useTheme } from '../context/Theme'

export default () => {
  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  const loadInBrowser = ({ url }) => {
    Linking.openURL(url)
      .catch(() => Alert.alert('Failed to open the URL in browser...'));
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Story of the app</Text>
      <Text style={styles.contentText}>
        SatPredictor was built basically because of me
        being obsessed with good design and space.
        Since I didn't have a chance to encounter really
        pretty good looking app that would do what
        SatPredictor does.
      </Text>

      {buttonLinks.map(({ label, url }) => (
        <TouchableOpacity
          onPress={() => loadInBrowser({ url })}
          style={styles.referenceButtonBody}
        >
          <Text style={styles.referenceButtonText}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const stylesGenerator = (theme) => (
  StyleSheet.create({
    page: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 25,
      color: theme.colors.colorFontMain,
      fontFamily: "Orbitron-Bold",
      marginBottom: 5,
    },
    contentText: {
      fontSize: 15,
      marginBottom: 20,
      color: theme.colors.colorFontDark,
      lineHeight: 15 * 1.4,
      fontFamily: "Orbitron-Regular",
    },
    referenceButtonBody: {
      width: Dimensions.get('window').width - 40,
      backgroundColor: theme.colors.colorBgLight,
      paddingVertical: 10,
      marginBottom: 5,
      borderRadius: 2,
    },
    referenceButtonText: {
      color: theme.colors.colorFontMain,
      fontFamily: "Orbitron-Regular",
      textAlign: 'center'
    },
  })
)
