import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopHeader from '../components/TopHeader'
import { StyleSheet,View } from 'react-native'
import SwipeProduct from '../components/SwipeProduct'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import CustomButton from '../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '../store/reducer/cart'



// const data = [{id: 1, quantity: 1}, {id: 2, quantity: 3},{id: 3, quantity: 1}, {id: 4, quantity: 3},{id: 5, quantity: 1}, {id: 6, quantity: 3},{id: 7, quantity: 1}, {id: 8, quantity: 3},{id: 9, quantity: 1}, {id: 10, quantity: 3}]
// const data = [{id: 1, quantity: 1}, {id: 2, quantity: 3}]

export default function Cart({ navigation }) {

  const cart = useSelector(state => state.cart.cart)
  const cartLen = useSelector(state => state.cart.cartLen)
  const dispatch = useDispatch()

  const [data, setData] = useState(cart)
  const [datalen, setDatalen] = useState(0)
  
  useEffect(() => {
    setData(cart)
    const newdata = [{id: 2, quantity: 4}]
    setData(newdata)
    dispatch(updateCart(newdata))
    console.log(data)
    setDatalen(data.length)
  }, [])


  return (
    <SafeAreaView style={styles.container}>
        <TopHeader title="Cart" goto={() => navigation.goBack()} />
        <View style={{marginBottom: 100}}>
          <SwipeProduct
              navigation={navigation}
              data={data}
              buttons={[
                  {
                      function: () => alert('toggle favorite'),
                      icon: <MaterialIcons name='favorite-outline' size={24} color="white" />
                  }, 
                  {
                      function: () => alert('delete item'),
                      icon: <MaterialCommunityIcons name='delete-outline' size={24} color="white" />
                  }
              ]}
          />
        </View>
         <CustomButton title="Checkout" goto={() => navigation.navigate("Checkout")} />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      paddingHorizontal: 35,
      flex: 1,
    }
  })