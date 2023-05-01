import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopHeader from './TopHeader'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import SwipeProduct from './SwipeProduct'

const data = [{id: 1}, {id: 2}, {id: 3}]

export default function Favourite({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Favourites" navigation={navigation} />
      <SwipeProduct data={data} 
        buttons={[
          { 
            function: () => alert('toggle favorite'),
            icon: <MaterialIcons name='favorite' size={24} color="white" /> 
          },
          {
            function: () => alert('toggle cart'),
            icon: <Ionicons name='cart-outline' size={24} color="white" />
          }
        ]} />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 35
  }
})