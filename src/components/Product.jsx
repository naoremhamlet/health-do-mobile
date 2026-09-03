import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { COLORS, PADDINGS, SHADOWS, image } from '../constants';

export default function Product({ item, navigation }) {
  const price = item?.price;
  const originalPrice = item?.originalPrice || price;
  const discount = Math.ceil((originalPrice-price)*100/originalPrice);

  return (
    <Pressable 
        style={styles.container} 
        onPress={() => navigation.navigate("ProductDetail", {id: item.id})}
    >
        <View style={[styles.mainCard, SHADOWS.small]}>
            
            {/* 1. TOP BADGES & WISHLIST */}
            <View style={styles.topRow}>
                {item?.fresh && <View style={styles.freshBadge}>
                    <MaterialCommunityIcons name="leaf" size={12} color="#388e3c" />
                    <Text style={styles.freshText}>FRESH</Text>
                </View>}
            </View>

            {/* 2. PRODUCT IMAGE */}
            <View style={styles.imageWrapper}>
                <Image source={item?.image?.[0]} style={styles.productImage} resizeMode="contain" />
            </View>

            {/* 3. CONTENT AREA */}
            <View style={styles.bottomContent}>
                <Text style={styles.brandName}>{item?.category.toUpperCase()}</Text>
                <Text style={styles.productTitle} numberOfLines={1}>{item?.name}</Text>
                
                {/* 4. PRICING ROW (Aligned horizontally like the screenshot) */}
                <View style={styles.priceRow}>
                    <Text style={styles.currentPrice}>{`₹${item?.price}`}</Text>
                    <Text style={styles.oldPrice}>{item?.originalPrice? `₹${item?.originalPrice}` : ""}</Text>
                    <Text style={styles.discountText}>{discount ? `${discount}% off` : " "}</Text>
                </View>

                {/* 5. TRUST/RATING FOOTER */}
                <View style={styles.footerRow}>
                    <View style={styles.ratingBox}>
                        <Text style={styles.ratingText}>{item?.rating}</Text>
                        <Ionicons name="star" size={10} color={COLORS.white} />
                    </View>
                    <Text style={styles.reviewCount}>({item?.reviewCount})</Text>
                </View>
            </View>
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        width: 220,
        height: 280,
        marginTop: 40,
        marginLeft: 20,
        justifyContent: 'flex-end',
    },
    mainCard: {
        width: '100%',
        height: 260,
        backgroundColor: COLORS.white,
        borderRadius: 24, 
        padding: 15,
        borderWidth: 1,
        borderColor: COLORS.border,
        margin: 5
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
    },
    freshBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.freshTint, // Very light green
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
    },
    freshText: {
        fontSize: 10,
        fontWeight: '900',
        color: COLORS.ratingGreen,
        marginLeft: 3,
    },
    imageWrapper: {
        position: 'absolute',
        top: -45,
        alignSelf: 'center',
        width: 140,
        height: 140,
        zIndex: 5,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    bottomContent: {
        marginTop: 90, 
    },
    brandName: {
        fontSize: 10,
        fontWeight: '800',
        color: COLORS.gray,
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.titleDark,
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    currentPrice: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.black,
    },
    oldPrice: {
        fontSize: 13,
        color: COLORS.gray,
        textDecorationLine: 'line-through',
        opacity: 0.7,
    },
    discountText: {
        fontSize: 13,
        fontWeight: '800',
        color: COLORS.ratingGreen, 
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.ratingGreen,
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
    reviewCount: {
        fontSize: 11,
        color: COLORS.gray,
        marginLeft: 6,
        fontWeight: '600'
    }
});
