import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons' // Added for the star
import { COLORS, SHADOWS, SIZES, image } from '../constants'

export default function ProductSmall({ item, navigation }) {

  const price = item?.price;
  const originalPrice = item?.originalPrice || price;
  const discount = Math.ceil((originalPrice-price)*100/originalPrice);

  return (
    <Pressable 
        style={styles.container}
        onPress={() => navigation.navigate("ProductDetail", {id: item.id})}
    >
        <View style={[styles.card, SHADOWS.small]}>
            {/* 1. PRODUCT IMAGE */}
            <View style={styles.imageContainer}>
                <Image source={item?.image?.[0]} style={styles.image} resizeMode="contain" />
            </View>

            {/* 2. PRODUCT INFO */}
            <View style={styles.infoContainer}>
                <Text style={styles.brand}>{item?.category.toUpperCase()}</Text>
                <Text style={styles.title} numberOfLines={1}>{item?.name}</Text>
                
                {/* 3. RATING SECTION (New) */}
                <View style={styles.ratingRow}>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>{item?.rating}</Text>
                        <Ionicons name="star" size={10} color={COLORS.white} />
                    </View>
                    <Text style={styles.reviewText}>({item?.reviewCount})</Text>
                </View>

                {/* 4. E-COMMERCE PRICE ROW */}
                <View style={styles.priceRow}>
                    <Text style={styles.price}>{`₹${item?.price}`}</Text>
                    <Text style={styles.oldPrice}>{item?.originalPrice? `₹${item?.originalPrice}` : ""}</Text>
                </View>
                <Text style={styles.discountText}>{discount ? `${discount}% off` : " "}</Text>
            </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        marginBottom: 5,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    imageContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        width: '100%',
    },
    brand: {
        fontSize: 10,
        fontWeight: '800',
        color: COLORS.gray,
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.titleDark,
        marginBottom: 4,
    },
    // RATING STYLES
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.ratingGreen, // E-commerce Green
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        color: COLORS.white,
        fontSize: 11,
        fontWeight: '900',
        marginRight: 2,
    },
    reviewText: {
        fontSize: 11,
        color: COLORS.gray,
        marginLeft: 4,
        fontWeight: '600',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    price: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.black,
    },
    oldPrice: {
        fontSize: 12,
        color: COLORS.gray,
        textDecorationLine: 'line-through',
        opacity: 0.6,
    },
    discountText: {
        fontSize: 12,
        fontWeight: '800',
        color: COLORS.ratingGreen, 
        marginTop: 1,
    }
})