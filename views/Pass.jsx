import React from 'react'
import { Text, Button, View } from 'react-native'

import { useNavigation } from '../context/Routes'

export default () => {
  const { changeScreen } = useNavigation()

  return (
    <View style={{ padding: 20 }}>
      <Text>
        pass... watch over your head :)
      </Text>

      <Button
        title="Go to passes..."
        onPress={() => changeScreen('__PASSES__', { lol: "kek" })}
      />
    </View>
  )
}
