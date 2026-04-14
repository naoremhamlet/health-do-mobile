import React, { useState } from 'react';
import { 
    Text, View, StyleSheet, Image, ScrollView, 
    TouchableOpacity, Dimensions, Animated 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, SIZES, SHADOWS, image } from '../constants';
import CustomButton from '../components/CustomButton';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { updateFavourites } from '../store/reducer/favourites';
import { updateCart } from '../store/reducer/cart';
import TopHeader from '../components/TopHeader';

const { width } = Dimensions.get('window');

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

const renderPagination = (index, total) => {
    console.log(index, total);
    return (
        <View style={styles.paginationWrapper}>
            {[...Array(total)].map((_, i) => (
                <View 
                    key={i} 
                    style={[
                        styles.dotBase, 
                        index === i ? styles.dotActive : styles.dotInactive
                    ]} 
                />
            ))}
        </View>
    );
};

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
                style={styles.wrapper}
                paginationStyle={renderPagination}
                removeClippedSubviews={false} // Crucial for Android dot updates
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

const ProductInfo = () => {
    return (
        <View style={styles.titleRow}>
            <Text style={styles.mainTitle}>Avocado Mix Green</Text>
            <Text style={styles.mainPrice}>₹160</Text>
        </View>
    )
}

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

export default function ProductDetail({ navigation }) {
    const route = useRoute();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const favourites = useSelector(state => state.favourites.favourites);
    
    const ingredientsList = ["Avocado", "Tortilla Chips", "Blackened Chicken", "Tomato", "Raw Carrot", "Hot Sauce", "Baby Spinach"];
    const [customIn, setCustomIn] = useState(ingredientsList);

    const productId = route.params.id;
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
            const newItem = {
                id: productId,
                name: "Avocado Mix Green",
                price: 160,
                quantity: 1,
                ingredients: customIn,
                image: image.item1
            };
            dispatch(updateCart([...cart, newItem]));
            navigation.navigate("Cart");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TopHeader title="" goto={() => navigation.goBack()} />
            <TopSection isFav={isFav}  toggleFavourite={toggleFavourite} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <ProductImages />
                <View style={styles.contentBody}>
                    <ProductInfo />
                    <View style={styles.divider} />
                    <ServiceInfo />
                    <Customization 
                        customIn={customIn}
                        setCustomIn={setCustomIn}
                        ingredientsList={ingredientsList} />
                    <AfterServiceInfo />
                </View>
            </ScrollView>
            <CustomButton 
                title={isAlreadyInCart ? "Cart" : "Add to Cart"} 
                goto={handleAddToCart}
                buttonStyle={isAlreadyInCart && { backgroundColor: COLORS.secondary }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 35,
        backgroundColor: COLORS.white

    },
    iconCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 35
    },
    scrollContent: {
        paddingBottom: 50,
    },
    imageBox: {
        overflow: 'hidden',
        paddingTop: 60,
        paddingBottom: 20,
    },
    wrapper: {
        // Necessary for Swiper to track swipes
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImage: {
        width: width * 0.7,
        height: width * 0.7,
    },
    paginationWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginTop: 25,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 15,
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: COLORS.black,
        flex: 1,
    },
    mainPrice: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.primary,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.lightWhite,
        marginVertical: 10,
    },
    section: {
        marginTop: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
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
        width: '50%', // Perfect two-column grid
    }
});


// import { MaterialIcons, Octicons } from '@expo/vector-icons'
// import { useRoute } from '@react-navigation/native'
// import React, { useState } from 'react'
// import { Text, View, Pressable, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { COLORS, SIZES, image } from '../constants'
// import Swiper from 'react-native-swiper/src'
// import CustomButton from '../components/CustomButton'
// import Checkbox from 'expo-checkbox';
// import { useDispatch, useSelector } from 'react-redux'
// import { updateFavourites } from '../store/reducer/favourites'
// import { updateCart } from '../store/reducer/cart'
// import { CustomCheckbox } from '../components/CustomCheckbox'


// const images = [{id:1}, {id: 2}, {id: 3}]

// const Top = ({navigation, id}) => {
//     const favourites = useSelector(state => state.favourites.favourites)
//     const dispatch = useDispatch()

//     const toggleFavourite = () => {
//         if(favourites.filter(el => el.id==id).length) {
//             const newFavs = favourites.filter(el => el.id != id)
//             dispatch(updateFavourites(newFavs))
//         } else {
//             const newFavs = [...favourites, {id:id}]
//             dispatch(updateFavourites(newFavs))
//         }
//     }
    
//     const containInFav = favourites.filter(el => el.id==id).length

//     return (
//         <View style={styles.topContainer}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Octicons name='chevron-left' size={24} color="black" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={toggleFavourite}>
//                 <MaterialIcons name={containInFav? 'favorite' : 'favorite-outline'} size={24} color={COLORS.primary} />
//             </TouchableOpacity>
//         </View>
//     )
// }

// const Images = () => {
//     return (
//         <View style={{ height: 300}}>
//             <Swiper>
//                 <View style={styles.imageContainer}>
//                     <Image source={image.item1} style={styles.image} />
//                 </View>
//                 <View style={styles.imageContainer}>
//                     <Image source={image.item1} style={styles.image} />
//                 </View>
//                 <View style={styles.imageContainer}>
//                     <Image source={image.item1} style={styles.image} />
//                 </View>
//             </Swiper>
//         </View>
//     )
// }

// const Info = ({title, desc}) => {
//     return (
//         <View style={styles.infoContainer}>
//             <Text style={styles.infoTitle}>{title}</Text>
//             <Text style={styles.infoDesc}>{desc}</Text>
//         </View>
//     )
// }

// const Customization = ({customIn, setCustomIn, ingredients}) => {

//     return (
//         <View style={{ marginVertical: 35 }}>
//            <Text style={styles.infoTitle}>Ingredients</Text>
//             <View style={{alignItems:'center', display:'flex', flexDirection:'row', flexWrap:"wrap"}}>
//                 {ingredients.map((item, id) => (
//                     <CustomCheckbox
//                         key={id}
//                         label={item}
//                         status={customIn.includes(item)}
//                         onPress={() => {
//                             if(customIn.includes(item)) {
//                                 setCustomIn(customIn.filter(d => d != item))
//                             } else {
//                                 setCustomIn([...customIn, item])
//                             }
//                         }}
//                         />
//                 ))}
//             </View>

//         </View>
//     )
// }


// export default function ProductDetail({navigation}) {
//     const route = useRoute()
//     const ingredients = ["Avocado", "Tortilla Chips", "Blackened Chicken", "Tomato", "Raw Carrot", "Hot Sauce", "Baby Spinach"]
//     const cart = useSelector(state => state.cart.cart)
//     const dispatch = useDispatch()

//     const containInCart = cart.filter(el => el.id == route.params.id).length

//     const [customIn, setCustomIn] = useState(ingredients)
    
//     return (
//         <SafeAreaView style={styles.container}>
//             <Top navigation={navigation} id={route.params.id} />
//             <ScrollView showsVerticalScrollIndicator={false}>

//                 <Images />
//                 <View style={styles.titleContainer}>
//                     <Text style={styles.title}>Avocado Mix Green</Text>
//                     <Text style={styles.price}>Rs 160</Text>
//                 </View>

//                 <Info 
//                     title="Delivery info"
//                     desc="Delivered between Monday to Thursday from 10am to 5pm"
//                 />
//                 <Info
//                     title="Return policy"
//                     desc="All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately."
//                 />
//                 <Customization
//                     customIn={customIn}
//                     setCustomIn={setCustomIn}
//                     ingredients={ingredients}
//                  />
//             </ScrollView>
//             <CustomButton 
//                 additionalStyle={{ opacity: containInCart? 0.5 : 1}}
//                 title="Add to Cart" 
//                 goto={() => { 
//                     if(!containInCart) {
//                         const newCart = [...cart, { id: route.params.id, quantity: 1}]
//                         dispatch(updateCart(newCart))
//                     } 
//                 }}
//             />
//         </SafeAreaView>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 50,
//         paddingHorizontal: 35
//     },
//     topContainer: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between'
//     },
//     imageContainer: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     image: {
//         height: 240,
//         width: 240,
//     },
//     titleContainer: {
//         display: 'flex',
//         justifyContent:'center',
//         alignItems:'center'
//     },
//     title: {
//         fontSize: SIZES.xLarge,
//         fontWeight: 900
//     },
//     price: {
//         fontSize: SIZES.large,
//         fontWeight: 700,
//         color: COLORS.primary
//     },
//     infoContainer: {
//         marginTop: 40
//     },
//     infoTitle: {
//         fontSize: SIZES.medium,
//         fontWeight: 900,
//         lineHeight: 25,
//         paddingBottom: 2
//     },
//     infoDesc: {
//         fontSize: 15,
//         fontWeight: 400,
//         opacity: 0.6,
//         lineHeight: 20,
//     }
// })
