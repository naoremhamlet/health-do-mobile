import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopHeader from './TopHeader'
import ProductSmall from './ProductSmall'
import { useSelector } from 'react-redux'
import Error from './Error'
import { MaterialCommunityIcons } from '@expo/vector-icons'


export default function History({navigation}) {

  const history = useSelector(state => state.history.history)

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="History" goto={() => navigation.goBack()} />
      {history && history.length <= 0 && 
        <Error
          icon={<MaterialCommunityIcons name="basket-off" size={120} color="#00000025" />}
          title="No History yet"
          desc="Product you search or check will appear here."
        />
      }
      {history && history.length > 0 &&
        <FlatList
          style={{marginTop: 30}}
          data={history}
          numColumns={2}
          // columnWrapperStyle="row"
          renderItem={(item) => <ProductSmall item={item.item} navigation={navigation} />}
          keyExtractor={item => item.id}
        />
      }
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
