import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopHeader from '../components/TopHeader'
import { StyleSheet,View } from 'react-native'
import SwipeProduct from '../components/SwipeProduct'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import CustomButton from '../components/CustomButton'



// const data = [{id: 1, quantity: 1}, {id: 2, quantity: 3},{id: 3, quantity: 1}, {id: 4, quantity: 3},{id: 5, quantity: 1}, {id: 6, quantity: 3},{id: 7, quantity: 1}, {id: 8, quantity: 3},{id: 9, quantity: 1}, {id: 10, quantity: 3}]
const data = [{id: 1, quantity: 1}, {id: 2, quantity: 3}]

export default function Cart({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        <TopHeader title="Cart" navigation={navigation} />
        <View style={{marginBottom: 100}}>
          <SwipeProduct
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
         <CustomButton title="Checkout" />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      paddingVertical: 50,
      paddingHorizontal: 35,
      flex: 1,
    }
  })