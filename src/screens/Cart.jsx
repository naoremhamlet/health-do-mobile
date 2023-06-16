import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopHeader from '../components/TopHeader'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import CustomButton from '../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '../store/reducer/cart'
import HorizonatalProduct from '../components/HorizonatalProduct'
import { COLORS } from '../constants'
import { SwipeListView } from 'react-native-swipe-list-view'
import { updateFavourites } from '../store/reducer/favourites'



function SwipeProduct({ navigation }) {

  const cart = useSelector(state => state.cart.cart)
  const favourites = useSelector(state => state.favourites.favourites)
  const dispatch = useDispatch()
  const [rerenderCount, setRerenderCount] = useState(0)

  const increaseQuantity = (id) => {
    const idx = cart.findIndex(el => el.id == id)
    cart[idx].quantity += 1
    dispatch(updateFavourites(cart))
    setRerenderCount(rerenderCount+1)
  }

  const decreaseQuantity = (id) => {
    const idx = cart.findIndex(el => el.id == id)
    cart[idx].quantity = Math.max(1, parseInt(cart[idx].quantity)-1)
    dispatch(updateFavourites(cart))
    setRerenderCount(rerenderCount+1)
  }

  const toggleFavourite = (id) => {
    if(favourites.filter(el => el.id==id).length) {
      const newFavs = favourites.filter(el => el.id != id)
      dispatch(updateFavourites(newFavs))
    } else {
      const newFavs = [...favourites, {id:id}]
      dispatch(updateFavourites(newFavs))
    }
  }

  const closeRow = (rowMap, id) => {
    if (rowMap[id]) {
      rowMap[id].closeRow();
    }
  }
  const deleteItem = (rowMap, id) => {
    closeRow(rowMap, id)
    const newCart = cart.filter(el => el.id != id)
    dispatch(updateCart(newCart))
  }

  const renderItem = ({ item }) => (
    <Animated.View style={{ height: 120 }}>
      <HorizonatalProduct 
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        item={item} 
        navigation={navigation} />
    </Animated.View>
  );

  const renderHiddenItem = (data, rowMap) => {
    const containInFav = favourites.filter(el => el.id==data.item.id).length

    return (
      <View style={styles.rowBack}>
        <View style={styles.backRightBtn}>
          <Pressable onPress={() => toggleFavourite(data.item.id)}>
            <View style={{...styles.buttonIcon, backgroundColor: COLORS.primary}}>
              <MaterialIcons name={containInFav? "favorite": "favorite-outline"} size={24} color="white" />
            </View>
          </Pressable>
          <Pressable onPress={() => deleteItem(rowMap, data.item.id)}>
            <View style={{...styles.buttonIcon, backgroundColor: COLORS.red}}>
              <MaterialCommunityIcons name='delete-outline' size={24} color="white" />
            </View>
          </Pressable>
        </View>
      </View>
    )
  };

  return (
    <View style={styles.cartContainer}>
      <SwipeListView
        disableRightSwipe
        data={cart}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-140}
        useNativeDriver={false}
        keyExtractor={item => item.id}
      />
    </View>
  );
}


export default function Cart({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Cart" goto={() => navigation.goBack()} />
      <View style={{ marginBottom: 100 }}>
        <SwipeProduct navigation={navigation} />
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
  },
  cartContainer: {
    display: 'flex',
    marginTop: 50
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    display: 'flex',
    flexDirection: 'row'
  },
  buttonIcon: {
    width: 45,
    height: 45,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 17
  }
})