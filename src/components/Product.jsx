import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS, SHADOWS, SIZES, image } from '../constants'

export default function Product({ item, navigation}) {
  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate("ProductDetail", {id: item.id})}>
        <View style={styles.bottomContainer}>
            <Image source={image.item1} style={styles.image} />
            <Text style={styles.title}>Avocado Mix Green</Text>
            <Text style={styles.price}>Rs 150</Text>
        </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    container: {
        height: 320,
        width: 220,
        position: 'relative',
        marginLeft: 40,
    },

    image: {
        height: 165,
        width: 165,
        position: 'absolute',
        top: -55
    },

    bottomContainer: {
        height: 270,
        width: 220,
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    title: {
        fontSize: SIZES.xLarge,
        fontWeight: 900,
        width: 125,
        textAlign: 'center',
        marginTop: 70
    },
    price: {
        fontSize: SIZES.medium,
        fontWeight: 700,
        color: COLORS.primary
    }
})
