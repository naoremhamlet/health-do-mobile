import React, { useState, useEffect } from 'react';
import { 
    Text, View, StyleSheet, Image, ScrollView, 
    TouchableOpacity, Dimensions, Animated 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, SIZES, SHADOWS, image, PADDINGS } from '../constants';
import CustomButton from '../components/CustomButton';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { updateFavourites } from '../store/reducer/favourites';
import { updateCart } from '../store/reducer/cart';
import TopHeader from '../components/TopHeader';

const { width } = Dimensions.get('window');

/** 1. TOP SECTION COMPONENT **/
const TopSection = ({isFav, toggleFavourite}) => {
    return (
        <TouchableOpacity 
            style={[styles.iconCircle, SHADOWS.medium]} 
            onPress={toggleFavourite}
        >
            <MaterialIcons 
                name={isFav ? 'favorite' : 'favorite-outline'} 
                size={24} 
                color={isFav ? COLORS.red : COLORS.black} 
            />
        </TouchableOpacity>
    )
}

/** 2. FRESHNESS INDICATOR (Elite Pulse) **/
const FreshnessIndicator = () => {
    return (
        <View style={styles.freshContainer}>
            <View style={styles.pulseDot} />
            <Text style={styles.freshText}>FRESHLY PREPARED</Text>
        </View>
    )
}

/** 3. PRODUCT IMAGES COMPONENT **/
const ProductImages = () => {
    return (
        <View style={styles.imageBox}>
            <Swiper
                height={320}
                loop={false}
                showsPagination={true}
                activeDotColor={COLORS.primary}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                removeClippedSubviews={false}
            >
                {[1, 2, 3].map((_, i) => (
                    <View key={i} style={styles.slide}>
                        <Image 
                            source={image.item1} 
                            style={styles.heroImage} 
                            resizeMode="contain" 
                        />
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

const RatingInfo = ({ rating, reviews }) => {
    return (
        <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={18} color="#FFB800" />
            <Text style={styles.ratingText}>{rating}</Text>
            <Text style={styles.reviewText}>({reviews} reviews)</Text>
        </View>
    )
}

/** 4. PRODUCT INFO WITH OFFER PRICING **/
const ProductInfo = ({ title, price, offerPrice, rating, reviews }) => {
    const discount = Math.round(((price - offerPrice) / price) * 100);
    
    return (
        <View style={styles.infoWrapper}>
            <View style={styles.topRow}>
                <FreshnessIndicator />
                <RatingInfo rating={rating} reviews={reviews} />
            </View>
            <View style={styles.titleRow}>
                <Text style={styles.mainTitle}>{title}</Text>
            </View>
            <View style={styles.priceContainer}>
                <View style={styles.priceRow}>
                    <Text style={styles.mainPrice}>₹{offerPrice}</Text>
                    <Text style={styles.originalPrice}>₹{price}</Text>
                </View>
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{discount}% OFF</Text>
                </View>
            </View>
        </View>
    )
}

/** 5. SERVICE INFO COMPONENT **/
const ServiceInfo = () => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <MaterialIcons name="delivery-dining" size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Delivery info</Text>
            </View>
            <Text style={styles.sectionDesc}>
                Delivered between Monday to Thursday from 10am to 5pm
            </Text>
        </View>
    )
}

/** 6. CUSTOMIZATION COMPONENT **/
const Customization = ({customIn, setCustomIn, ingredientsList}) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <MaterialIcons name="restaurant-menu" size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Ingredients Customization</Text>
            </View>
            <Text style={styles.sectionDesc}>Choose what stays in your bowl:</Text>
            <View style={styles.grid}>
                {ingredientsList.map((item, idx) => (
                    <View key={idx} style={styles.gridItem}>
                        <CustomCheckbox
                            label={item}
                            status={customIn.includes(item)}
                            onPress={() => {
                                customIn.includes(item) 
                                    ? setCustomIn(customIn.filter(d => d !== item))
                                    : setCustomIn([...customIn, item]);
                            }}
                        />
                    </View>
                ))}
            </View>
        </View>
    )
}

/** 7. AFTER SERVICE INFO COMPONENT **/
const AfterServiceInfo = () => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <MaterialIcons name="policy" size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Return Policy</Text>
            </View>
            <Text style={styles.sectionDesc}>
                Ensuring quality: contact our hotline immediately if your order is not perfect.
            </Text>
        </View>
    )
}

const DeliverySelection = ({ address, onEdit }) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Delivery Address</Text>
                <TouchableOpacity onPress={onEdit} style={styles.editLink}>
                    <Text style={styles.editText}>Change</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.addressCard}>
                <Text style={styles.addressName}>Home</Text>
                <Text style={styles.addressDetail} numberOfLines={1}>
                    {address || "Set your delivery location..."}
                </Text>
            </View>
        </View>
    )
}

/** MAIN COMPONENT **/
export default function ProductDetail({ navigation }) {
    const route = useRoute();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const favourites = useSelector(state => state.favourites.favourites);
    
    const ingredientsList = ["Avocado", "Tortilla Chips", "Blackened Chicken", "Tomato", "Raw Carrot", "Hot Sauce", "Baby Spinach"];
    const [customIn, setCustomIn] = useState(ingredientsList);

    const productId = route.params?.id || 1;
    const isFav = favourites.some(el => el.id === productId);
    const isAlreadyInCart = cart.some(el => el.id === productId);

    // Dynamic Data for the "Elite" Update
    const originalPrice = 200;
    const currentOfferPrice = 160;
    const productTitle = "Avocado Mix Green";

    const toggleFavourite = () => {
        if (isFav) {
            dispatch(updateFavourites(favourites.filter(el => el.id !== productId)));
        } else {
            dispatch(updateFavourites([...favourites, { id: productId }]));
        }
    };

    const handleAddToCart = () => {
        if(isAlreadyInCart) {
            navigation.navigate('Cart')
        } else {
            const newItem = {
                id: productId,
                name: productTitle,
                price: currentOfferPrice,
                quantity: 1,
                ingredients: customIn,
                image: image.item1
            };
            dispatch(updateCart([...cart, newItem]));
            navigation.navigate("Cart");
        }
    };

    const [selectedAddress, setSelectedAddress] = useState("Naorem Hemlet, Nambol Naorem, 795134");

    return (
        <SafeAreaView style={styles.container}>
            <TopHeader 
                title="" 
                goto={() => navigation.goBack()}
                component={<TopSection isFav={isFav} toggleFavourite={toggleFavourite} />} />
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <ProductImages />
                <View style={styles.contentBody}>
                    <ProductInfo 
                        title={productTitle} 
                        price={originalPrice} 
                        offerPrice={currentOfferPrice}
                        rating={4.8}
                        reviews={124}
                    />
                    
                    <View style={styles.divider} />

                    <DeliverySelection 
                        address={selectedAddress} 
                        onEdit={() => navigation.navigate('Address')} 
                    />
                    
                    <ServiceInfo />
                    <Customization 
                        customIn={customIn}
                        setCustomIn={setCustomIn}
                        ingredientsList={ingredientsList} />
                    <AfterServiceInfo />
                </View>
            </ScrollView>

            <CustomButton 
                title={isAlreadyInCart ? "Go to Cart" : "Add to Cart"} 
                goto={handleAddToCart}
                additionalStyle={{ backgroundColor: COLORS.white }}
                buttonStyle={isAlreadyInCart ? { backgroundColor: COLORS.secondary } : { backgroundColor: COLORS.primary }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBox: {
        overflow: 'hidden',
        paddingVertical: 10,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImage: {
        width: width * 0.7,
        height: width * 0.7,
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.1)',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
    },
    activeDot: {
        backgroundColor: COLORS.primary,
        width: 20,
        height: 8,
        borderRadius: 4,
        margin: 3,
    },
    contentBody: {
        paddingHorizontal: PADDINGS.horizonatal,
        backgroundColor: COLORS.white,
        paddingBottom: 100,
    },
    infoWrapper: {
        marginTop: 10,
    },
    freshContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary + '15',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 12,
    },
    pulseDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4ADE80',
        marginRight: 6,
    },
    freshText: {
        fontSize: 10,
        fontWeight: '900',
        color: COLORS.primary,
        letterSpacing: 1,
    },
    titleRow: {
        marginBottom: 8,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.black,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    mainPrice: {
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.primary,
    },
    originalPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.gray,
        textDecorationLine: 'line-through',
        marginLeft: 10,
    },
    discountBadge: {
        backgroundColor: COLORS.red + '10',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    discountText: {
        color: COLORS.red,
        fontWeight: '900',
        fontSize: 12,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9E5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFB800',
        marginLeft: 4,
    },
    reviewText: {
        fontSize: 12,
        color: COLORS.gray,
        marginLeft: 4,
    },
    editLink: {
        marginLeft: 'auto',
    },
    editText: {
        color: COLORS.primary,
        fontWeight: '900',
        fontSize: 14,
    },
    addressCard: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#F9F9F9',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    addressName: {
        fontSize: 14,
        fontWeight: '900',
        color: COLORS.black,
        marginBottom: 4,
    },
    addressDetail: {
        fontSize: 13,
        color: COLORS.gray,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 25,
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.black,
        marginLeft: 10,
    },
    sectionDesc: {
        fontSize: 14,
        color: COLORS.gray,
        lineHeight: 22,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15,
    },
    gridItem: {
        width: '50%',
        marginBottom: 10,
    }
});