import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopHeader from './TopHeader'
import ProductSmall from './ProductSmall'

const data = [{id: 1}, {id: 2},{id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}]

export default function History({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="History" navigation={navigation} />
      <FlatList
        style={{marginTop: 30}}
        data={data}
        numColumns={2}
        columnWrapperStyle="row"
        renderItem={() => <ProductSmall />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 35,
  }
})
