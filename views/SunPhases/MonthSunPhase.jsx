import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../../context/Theme'

const MonthSunPhase = ({ params, ...rest }) => {
  const { theme } = useTheme()
  const styles = stylesGenerator(theme)

  return (
    <View style={styles.page}>
      <Text style={{ color: "#FFF" }}>MonthSunPhase.jsx - {params.monthName}</Text>
      <Text style={{ color: "#FFF", marginTop: 20 }}>{JSON.stringify({ params, ...rest }, null, 2)}</Text>
    </View>
  )
}

const stylesGenerator = () => ({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
})

export default MonthSunPhase