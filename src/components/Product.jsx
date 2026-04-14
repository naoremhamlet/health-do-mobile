import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { COLORS, SHADOWS, image } from '../constants';

export default function Product({ item, navigation }) {
  const title = item?.title || "Avocado Mix Green";
  const price = 150;
  const originalPrice = 190;
  const discount = "21% off";

  return (
    <Pressable 
        style={styles.container} 
        onPress={() => navigation.navigate("ProductDetail", {id: item.id})}
    >
        <View style={[styles.mainCard, SHADOWS.small]}>
            
            {/* 1. TOP BADGES & WISHLIST */}
            <View style={styles.topRow}>
                <View style={styles.freshBadge}>
                    <MaterialCommunityIcons name="leaf" size={12} color="#388e3c" />
                    <Text style={styles.freshText}>FRESH</Text>
                </View>
                {/* <TouchableOpacity activeOpacity={0.7}>
                    <Ionicons name="heart-outline" size={20} color={COLORS.gray} />
                </TouchableOpacity> */}
            </View>

            {/* 2. PRODUCT IMAGE */}
            <View style={styles.imageWrapper}>
                <Image source={image.item1} style={styles.productImage} resizeMode="contain" />
            </View>

            {/* 3. CONTENT AREA */}
            <View style={styles.bottomContent}>
                <Text style={styles.brandName}>HEALTHY BOWL</Text>
                <Text style={styles.productTitle} numberOfLines={1}>{title}</Text>
                
                {/* 4. PRICING ROW (Aligned horizontally like the screenshot) */}
                <View style={styles.priceRow}>
                    <Text style={styles.currentPrice}>₹{price}</Text>
                    <Text style={styles.oldPrice}>₹{originalPrice}</Text>
                    <Text style={styles.discountText}>{discount}</Text>
                </View>

                {/* 5. TRUST/RATING FOOTER */}
                <View style={styles.footerRow}>
                    <View style={styles.ratingBox}>
                        <Text style={styles.ratingText}>4.5</Text>
                        <Ionicons name="star" size={10} color={COLORS.white} />
                    </View>
                    <Text style={styles.reviewCount}>(120 reviews)</Text>
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
        marginRight: 20,
        justifyContent: 'flex-end',
    },
    mainCard: {
        width: '100%',
        height: 260,
        backgroundColor: COLORS.white,
        borderRadius: 24, 
        padding: 15,
        borderWidth: 1,
        borderColor: '#F0F0F0',
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
        backgroundColor: '#e8f5e9', // Very light green
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
    },
    freshText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#388e3c',
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
        color: '#212121',
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
        color: '#388e3c', 
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#388e3c',
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
// import React from 'react'
// import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
// import { COLORS, SHADOWS, SIZES, image } from '../constants'

// export default function Product({ item, navigation}) {
//   return (
//     <Pressable style={styles.container} onPress={() => navigation.navigate("ProductDetail", {id: item.id})}>
//         <View style={styles.bottomContainer}>
//             <Image source={image.item1} style={styles.image} />
//             <Text style={styles.title}>Avocado Mix Green</Text>
//             <Text style={styles.price}>Rs 150</Text>
//         </View>
//     </Pressable>
//   )
// }


// const styles = StyleSheet.create({
//     container: {
//         height: 320,
//         width: 220,
//         position: 'relative',
//         marginLeft: 40,
//     },

//     image: {
//         height: 165,
//         width: 165,
//         position: 'absolute',
//         top: -55
//     },

//     bottomContainer: {
//         height: 270,
//         width: 220,
//         backgroundColor: COLORS.white,
//         position: 'absolute',
//         bottom: 0,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 30
//     },
//     title: {
//         fontSize: SIZES.xLarge,
//         fontWeight: 900,
//         width: 125,
//         textAlign: 'center',
//         marginTop: 70
//     },
//     price: {
//         fontSize: SIZES.medium,
//         fontWeight: 700,
//         color: COLORS.primary
//     }
// })
