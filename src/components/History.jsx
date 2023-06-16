import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopHeader from './TopHeader'
import ProductSmall from './ProductSmall'
import { useDispatch, useSelector } from 'react-redux'
import { updateHistory } from '../store/reducer/history'


export default function History({navigation}) {

  const history = useSelector(state => state.history.history)
  const dispatch = useDispatch()

  const [data, setData] = useState(history)

  useEffect(() => {
    setData([{id: 1}, {id: 2},{id: 3}])
    dispatch(updateHistory(data))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="History" goto={() => navigation.goBack()} />
      <FlatList
        style={{marginTop: 30}}
        data={data}
        numColumns={2}
        // columnWrapperStyle="row"
        renderItem={(item) => <ProductSmall item={item.item} navigation={navigation} />}
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
