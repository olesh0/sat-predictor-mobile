import React, { useMemo } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'

import DataList from '../components/DataList'
import Loader from '../components/Loader'

export default ({ params }) => {
  const dataList = useMemo(() => [
    { label: 'Current elevation', value: '16°' },
    { label: 'Max elevation', value: '78°' },
    { label: 'Start time', value: '02/12/2021 12:30 AM' },
    { label: 'End time', value: '02/12/2021 12:40 AM' },
    { label: 'Latitude', value: '48.436233°' },
    { label: 'Longitude', value: '23.866857°' },
    { label: 'Altitude', value: '893km' },
    { label: 'Distance', value: '1364km' },
  ], [])

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 5,
        padding: 20,
      }}
    >
      <View style={styles.content}>
        <Text style={styles.satName}>{params.satName}</Text>

        <DataList data={dataList} />

        <Text style={{ color: "#FFF" }}>{JSON.stringify(params, null, 2)}</Text>
      </View>

      <View style={styles.progress}>
        <Loader />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  satName: {
    fontSize: 25,
    color: "#FFF",
    fontFamily: "Orbitron-Bold",
  },
})
