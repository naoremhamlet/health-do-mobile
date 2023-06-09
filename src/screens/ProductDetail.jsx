import { MaterialIcons, Octicons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, View, Pressable, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, image } from '../constants'
import Swiper from 'react-native-swiper/src'
import CustomButton from '../components/CustomButton'
import Checkbox from 'expo-checkbox';
import { useDispatch, useSelector } from 'react-redux'
import { updateFavourites } from '../store/reducer/favourites'
import { updateCart } from '../store/reducer/cart'


const images = [{id:1}, {id: 2}, {id: 3}]

const Top = ({navigation, id}) => {
    const favourites = useSelector(state => state.favourites.favourites)
    const dispatch = useDispatch()

    const toggleFavourite = () => {
        if(favourites.filter(el => el.id==id).length) {
            const newFavs = favourites.filter(el => el.id != id)
            dispatch(updateFavourites(newFavs))
        } else {
            const newFavs = [...favourites, {id:id}]
            dispatch(updateFavourites(newFavs))
        }
    }
    
    const containInFav = favourites.filter(el => el.id==id).length

    return (
        <View style={styles.topContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Octicons name='chevron-left' size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFavourite}>
                <MaterialIcons name={containInFav? 'favorite' : 'favorite-outline'} size={24} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
    )
}

const Images = () => {
    return (
        <View style={{ height: 300}}>
            <Swiper>
                <View style={styles.imageContainer}>
                    <Image source={image.item1} style={styles.image} />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={image.item1} style={styles.image} />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={image.item1} style={styles.image} />
                </View>
            </Swiper>
        </View>
    )
}

const Info = ({title, desc}) => {
    return (
        <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>{title}</Text>
            <Text style={styles.infoDesc}>{desc}</Text>
        </View>
    )
}

const Customization = ({customIn, setCustomIn, ingredients, inLength, setInLength}) => {

    return (
        <View style={{ marginVertical: 35 }}>
           <Text style={styles.infoTitle}>Ingredients</Text>

            <View style={{alignItems:'center', display:'flex', flexDirection:'row',flexWrap:"wrap"}}>
                {ingredients.map((el,id) => (
                    <View 
                        key={id}
                        style={{display:'flex', flexDirection:'row', paddingRight: 20, paddingVertical: 5}}>
                        <Checkbox
                            color={COLORS.primary}
                            value={customIn.includes(el)}
                            onValueChange={(v) => {
                                if(v){
                                    customIn.push(el)
                                    setCustomIn(customIn)
                                }
                                else
                                    setCustomIn(customIn.filter(d => d!=el))

                                setInLength(customIn.length+1)
                            }}
                         />
                        <Text style={{paddingHorizontal: 5}}>{el}</Text>
                    </View>
                ))}
            </View>

        </View>
    )
}


export default function ProductDetail({navigation}) {
    const route = useRoute()
    const ingredients = ["Avocado", "Tortilla Chips", "Blackened Chicken", "Tomato", "Raw Carrot", "Hot Sauce", "Baby Spinach"]
    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()

    const containInCart = cart.filter(el => el.id == route.params.id).length

    const [customIn, setCustomIn] = useState(ingredients)
    const [inLength, setInLength] = useState(ingredients.length)
    
    return (
        <SafeAreaView style={styles.container}>
            <Top navigation={navigation} id={route.params.id} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <Images />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Avocado Mix Green</Text>
                    <Text style={styles.price}>Rs 160</Text>
                </View>

                <Info 
                    title="Delivery info"
                    desc="Delivered between Monday to Thursday from 10am to 5pm"
                />
                <Info
                    title="Return policy"
                    desc="All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately."
                />
                <Customization
                    customIn={customIn}
                    setCustomIn={setCustomIn}
                    ingredients={ingredients}
                    inLength={inLength}
                    setInLength={setInLength}
                 />
            </ScrollView>
            <CustomButton 
                additionalStyle={{ opacity: containInCart? 0.5 : 1}}
                title="Add to Cart" 
                goto={() => { 
                    if(!containInCart) {
                        const newCart = [...cart, { id: route.params.id, quantity: 1}]
                        dispatch(updateCart(newCart))
                    } 
                }}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 35
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 240,
        width: 240,
    },
    titleContainer: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        fontSize: SIZES.xLarge,
        fontWeight: 900
    },
    price: {
        fontSize: SIZES.large,
        fontWeight: 700,
        color: COLORS.primary
    },
    infoContainer: {
        marginTop: 40
    },
    infoTitle: {
        fontSize: SIZES.medium,
        fontWeight: 900,
        lineHeight: 25,
        paddingBottom: 2
    },
    infoDesc: {
        fontSize: 15,
        fontWeight: 400,
        opacity: 0.6,
        lineHeight: 20,
    }
})
