import React, { useState } from 'react';
import { 
    Text, View, StyleSheet, Image, ScrollView, 
    TouchableOpacity, Dimensions, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SIZES, SHADOWS, image, PADDINGS } from '../constants';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { updateFavourites } from '../store/reducer/favourites';
import { updateCart } from '../store/reducer/cart';
import TopHeader from '../components/TopHeader';
import { getProductById } from '../helper';

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

const PrepTimeChip = ({ time }) => {
    return (
        <View style={styles.prepChip}>
            <MaterialIcons name="schedule" size={13} color={COLORS.gray} />
            <Text style={styles.prepChipText}>{time}</Text>
        </View>
    )
}

/** 3. PRODUCT IMAGES COMPONENT **/
const ProductImages = ({image}) => {
    const images = image?.length ? image : [];
    return (
        <View style={styles.imageBox}>
            <View style={styles.imageBoxBlobTop} />
            <View style={styles.imageBoxBlobBottom} />
            <Swiper
                height={320}
                loop={false}
                showsPagination={images.length > 1}
                activeDotColor={COLORS.primary}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                removeClippedSubviews={false}
            >
                {images.map((img, i) => (
                    <View key={i} style={styles.slide}>
                        <View style={styles.imagePodium} />
                        <Image 
                            source={img} 
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
const ProductInfo = ({ title, price, originalPrice, rating, reviews, fresh, preparationTime, description }) => {

    const new_originalPrice = originalPrice || price;
    const discount = Math.ceil((new_originalPrice-price)*100/new_originalPrice);

    return (
        <View style={styles.infoWrapper}>
            <View style={styles.topRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    {fresh && <FreshnessIndicator />}
                    {preparationTime && <PrepTimeChip time={preparationTime} />}
                </View>
                <RatingInfo rating={rating} reviews={reviews} />
            </View>
            <View style={styles.titleRow}>
                <Text style={styles.mainTitle}>{title}</Text>
            </View>
            {description && (
                <Text style={styles.descriptionText}>{description}</Text>
            )}
            <View style={styles.priceContainer}>
                <View style={styles.priceRow}>
                    <Text style={styles.mainPrice}>{`₹${price}`}</Text>
                    <Text style={styles.originalPrice}>{originalPrice? `₹${originalPrice}` : ""}</Text>
                </View>
                {discount?
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{discount ? `${discount}% OFF` : " "}</Text>
                    </View> : <View />
                }
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

/** 5b. NUTRITION FACTS COMPONENT **/
const NutritionInfo = ({ macros }) => {
    if (!macros) return null;
    const rows = [
        { label: 'Calories', value: macros.calories, unit: 'kcal', icon: 'local-fire-department' },
        { label: 'Protein', value: macros.protein, unit: '', icon: 'fitness-center' },
        { label: 'Carbs', value: macros.carbs, unit: '', icon: 'grain' },
        { label: 'Fat', value: macros.fat, unit: '', icon: 'opacity' },
    ];
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <MaterialIcons name="local-dining" size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Nutrition Facts</Text>
            </View>
            <View style={styles.nutritionGrid}>
                {rows.map((row) => (
                    <View key={row.label} style={styles.nutritionCard}>
                        <MaterialIcons name={row.icon} size={18} color={COLORS.primary} />
                        <Text style={styles.nutritionValue}>{row.value}{row.unit}</Text>
                        <Text style={styles.nutritionLabel}>{row.label}</Text>
                    </View>
                ))}
            </View>
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
                <Text style={styles.addressName}>{address?.type || "No address set"}</Text>
                <Text style={styles.addressDetail} numberOfLines={1}>
                    {address?.address || "Add a delivery address to continue"}
                </Text>
            </View>
        </View>
    )
}

/** MAIN COMPONENT **/
export default function ProductDetail({ navigation }) {
    const route = useRoute();

    const productId = route.params?.id || 1;

    const item = getProductById(productId);

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const favourites = useSelector(state => state.favourites.favourites);
    
    const [customIn, setCustomIn] = useState(item?.ingredients);
    const [quantity, setQuantity] = useState(1);
    
    const isFav = favourites.some(el => el.id === productId);
    const isAlreadyInCart = cart.some(el => el.id === productId);


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
            dispatch(updateCart([...cart, { id: productId, quantity }]));
        }
    };

    const selectedAddress = useSelector(state =>
        state.address.addresses.find(a => a.id === state.address.selectedAddressId)
    );

    return (
        <SafeAreaView style={styles.container}>
            <TopHeader 
                title="" 
                goto={() => navigation.goBack()}
                component={<TopSection isFav={isFav} toggleFavourite={toggleFavourite} />} />
            
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <ProductImages image={item?.image} />
                <View style={styles.contentBody}>
                    <ProductInfo 
                        title={item?.name} 
                        price={item?.price} 
                        originalPrice={item?.originalPrice}
                        rating={item?.rating}
                        reviews={item?.reviewCount}
                        fresh={item?.fresh}
                        preparationTime={item?.preparationTime}
                        description={item?.description}
                    />
                    
                    <View style={styles.divider} />

                    <NutritionInfo macros={item?.macros} />

                    <DeliverySelection 
                        address={selectedAddress} 
                        onEdit={() => navigation.navigate('Address')} 
                    />
                    
                    <ServiceInfo />
                    <Customization 
                        customIn={customIn}
                        setCustomIn={setCustomIn}
                        ingredientsList={item?.ingredients} />
                    <AfterServiceInfo />
                </View>
            </ScrollView>

            <View style={[styles.footer, SHADOWS.medium]}>
                {!isAlreadyInCart && (
                    <View style={styles.qtyStepper}>
                        <TouchableOpacity 
                            style={styles.qtyBtn} 
                            onPress={() => setQuantity(q => Math.max(1, q - 1))}
                            hitSlop={8}
                        >
                            <MaterialIcons name="remove" size={20} color={COLORS.black} />
                        </TouchableOpacity>
                        <Text style={styles.qtyValue}>{quantity}</Text>
                        <TouchableOpacity 
                            style={styles.qtyBtn} 
                            onPress={() => setQuantity(q => Math.min(20, q + 1))}
                            hitSlop={8}
                        >
                            <MaterialIcons name="add" size={20} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                )}
                <TouchableOpacity 
                    style={[styles.addToCartBtn, isAlreadyInCart && { backgroundColor: COLORS.secondary }]} 
                    onPress={handleAddToCart}
                    activeOpacity={0.85}
                >
                    <Text style={styles.addToCartText}>
                        {isAlreadyInCart ? "Go to Cart" : `Add to Cart · ₹${((item?.price || 0) * quantity).toFixed(0)}`}
                    </Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: COLORS.softBg,
    },
    imageBoxBlobTop: {
        position: 'absolute',
        top: -60,
        left: -50,
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: COLORS.primary + '08',
    },
    imageBoxBlobBottom: {
        position: 'absolute',
        bottom: -70,
        right: -60,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: COLORS.tertiary + '06',
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePodium: {
        position: 'absolute',
        width: width * 0.58,
        height: width * 0.58,
        borderRadius: (width * 0.58) / 2,
        backgroundColor: COLORS.white,
        ...SHADOWS.small,
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
        paddingBottom: 30,
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
        backgroundColor: COLORS.softBg,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
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
        backgroundColor: COLORS.border,
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
    },

    // Prep time chip
    prepChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: COLORS.softBg,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    prepChipText: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.gray,
    },

    // Description
    descriptionText: {
        fontSize: 14,
        color: COLORS.gray,
        lineHeight: 21,
        fontWeight: '500',
        marginTop: 10,
    },

    // Nutrition Facts
    nutritionGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 15,
    },
    nutritionCard: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.softBg,
        borderRadius: 16,
        paddingVertical: 14,
        gap: 4,
    },
    nutritionValue: {
        fontSize: 13,
        fontWeight: '900',
        color: COLORS.black,
    },
    nutritionLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: COLORS.gray,
    },

    // Footer with quantity stepper
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: COLORS.white,
        paddingHorizontal: 25,
        paddingTop: 15,
        paddingBottom: Platform.OS === 'ios' ? 40 : 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    qtyStepper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        backgroundColor: COLORS.softBg,
        borderRadius: 20,
        paddingHorizontal: 12,
        height: 60,
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.small,
    },
    qtyValue: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.black,
        minWidth: 18,
        textAlign: 'center',
    },
    addToCartBtn: {
        flex: 1,
        height: 60,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartText: {
        fontSize: 15,
        fontWeight: '900',
        color: COLORS.white,
    },
});