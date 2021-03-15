import React from 'react'
import { View, FlatList } from 'react-native'
import { useGetter } from 'vuex-react'

import SatellitePass from '../components/SatellitePass'

export default () => {
  const [satellites] = useGetter('satellites/satellites')

  return (
    <View style={{ padding: 20, paddingTop: 10 }}>
      <FlatList
        keyExtractor={(_, index) => `pass-${index}`}
        data={satellites.member}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <SatellitePass data={item} />
          )
        }}
      />
    </View>
  )
}
