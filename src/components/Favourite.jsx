import React from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopHeader from './TopHeader'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import HorizonatalProduct from './HorizonatalProduct'
import { COLORS } from '../constants'
import { SwipeListView } from 'react-native-swipe-list-view'
import { updateFavourites } from '../store/reducer/favourites'
import { updateCart } from '../store/reducer/cart'
import Error from './Error'


function SwipeProduct({ navigation }) {

  const favourites = useSelector(state => state.favourites.favourites)
  const cart = useSelector(state => state.cart.cart)
  const dispatch = useDispatch()

  const addToCart = (id) => {
    if(cart.filter(el => el.id==id).length == 0) {
      const newCart = [...cart, {id: id, quantity: 1}]
      dispatch(updateCart(newCart))
    }
  }

  const closeRow = (rowMap, id) => {
    if (rowMap[id]) {
      rowMap[id].closeRow();
    }
  }
  const deleteItem = (rowMap, id) => {
    closeRow(rowMap, id)
    const newFavs = favourites.filter(el => el.id != id)
    dispatch(updateFavourites(newFavs))
  }

  const renderItem = ({ item }) => (
    <Animated.View style={{ height: 120 }}>
      <HorizonatalProduct 
        item={item} 
        navigation={navigation} />
    </Animated.View>
  );

  const renderHiddenItem = (data, rowMap) => {
    const containInCart = cart.filter(el => el.id==data.item.id).length

    return (
      <View style={styles.rowBack}>
        <View style={styles.backRightBtn}>
          <Pressable style={{ opacity: containInCart? 0.5 : 1}} onPress={() => addToCart(data.item.id)}>
            <View style={{...styles.buttonIcon, backgroundColor: COLORS.primary}}>
              <Ionicons name='cart-outline' size={24} color="white" />
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
    <View style={styles.favContainer}>
      <SwipeListView
        disableRightSwipe
        data={favourites}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-140}
        useNativeDriver={false}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default function Favourite({navigation}) {
  const favourites = useSelector(state => state.favourites.favourites)

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Favourites" goto={() => navigation.goBack()} />
      {favourites && favourites.length <= 0 &&
        <Error
          icon={<MaterialCommunityIcons name="basket-off" size={120} color="#00000025" />}
          title="No favourites added"
          desc="Products you mark as favourites appear here."
        />
      }
      {favourites && favourites.length > 0 &&
        <SwipeProduct navigation={navigation} />
      }
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 35
  },
  favContainer: {
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