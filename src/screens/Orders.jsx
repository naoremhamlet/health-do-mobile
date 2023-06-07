import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopHeader from '../components/TopHeader'
import { Image, StyleSheet,Text,TouchableHighlight,View } from 'react-native'
import SwipeProduct from '../components/SwipeProduct'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import CustomButton from '../components/CustomButton'
import { image } from '../constants'


const Item = () => {
    return (
        <View style={styles.itemContainer}>
            <Image source={image.item1} style={styles.item} />
            <View>
                <Text style={styles.title}>Vegetable Mix Omlete</Text>
                <Text style={styles.price}>Rs 160</Text>
            </View>
        </View>
    )
}

// const data = [{id: 1, quantity: 1}, {id: 2, quantity: 3},{id: 3, quantity: 1}, {id: 4, quantity: 3},{id: 5, quantity: 1}, {id: 6, quantity: 3},{id: 7, quantity: 1}, {id: 8, quantity: 3},{id: 9, quantity: 1}, {id: 10, quantity: 3}]
const data = [{id: 1, quantity: 1}, {id: 2, quantity: 3}]

export default function Orders({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        <TopHeader title="Orders" goto={() => navigation.goBack()} />
        <TouchableHighlight style={styles.container} >
            <Item />
        </TouchableHighlight>
         {/* <CustomButton title="Checkout" goto={() => navigation.navigate("Checkout")} /> */}
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