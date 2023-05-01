import React from 'react'
import { Animated, TouchableHighlight, View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { COLORS, SIZES, image } from '../constants'
import { Entypo, FontAwesome } from '@expo/vector-icons'

export default function HorizonatalProduct({ item }) {
  return (
    <TouchableHighlight
        onPress={() => console.log('You touched me')}
        style={styles.container}
    >
        <View style={styles.itemContainer}>
            <Image source={image.item1} style={styles.item} />
            <View>
                <Text style={styles.title}>Vegetable Mix Omlete</Text>
                <Text style={styles.price}>Rs 160</Text>
            </View>
            {item.quantity && 
                <View style={styles.quantityContainer}>
                    <Pressable>
                        <FontAwesome name='minus' size={12} color="white" />
                    </Pressable>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <Pressable>
                        <FontAwesome name='plus' size={12} color="white" />
                    </Pressable>
                </View>
            }
        </View>
    </TouchableHighlight>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        height: 100,
        borderRadius: 20,
        position: 'relative'
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        height: 70,
        width: 70,
        marginHorizontal: 20
    },
    title: {
        fontSize: SIZES.medium,
        fontWeight: 900
    },
    price: {
        fontSize: 15,
        fontWeight: 900,
        color: COLORS.primary
    }, 
    quantityContainer: {
        backgroundColor: COLORS.primary,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        position: 'absolute',
        bottom: 0,
        right: 20
    },
    itemQuantity: {
        fontSize: 15,
        fontWeight: 900,
        color: COLORS.white,
        paddingHorizontal: 10
    }
})