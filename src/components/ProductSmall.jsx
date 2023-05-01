import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS, SHADOWS, SIZES, image } from '../constants'

export default function ProductSmall({item, navigation}) {

  return (
    <Pressable 
        style={styles.container}
        onPress={() => navigation.navigate("ProductDetail", {id: item.id})}
    >
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
        height: 250,
        width: 150,
        position: 'relative',
        marginRight:35,
    },

    image: {
        height: 128,
        width: 128,
        position: 'absolute',
        top: -35
    },

    bottomContainer: {
        height: 212,
        width: 156,
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    title: {
        fontSize: SIZES.medium,
        fontWeight: 900,
        width: 125,
        textAlign: 'center',
        marginTop: 70
    },
    price: {
        fontSize: SIZES.small,
        fontWeight: 700,
        color: COLORS.primary
    }
})