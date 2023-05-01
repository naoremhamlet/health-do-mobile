import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import CustomButton from '../components/CustomButton';
import { COLORS, image } from '../constants';

export default function Splash({navigation}) {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={image.logo} />
        <Text style={styles.heading}>Health do!</Text>
        <CustomButton title={"Get Started"} goto={()=> navigation.navigate('Login')} />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    heading: {
        fontSize: 65,
        fontWeight: 900,
        color: COLORS.primary,
        lineHeight: 65,
        position: 'absolute',
        top: 280
    },
    image: {
      width: 60,
      height: 65,
      position: 'absolute',
      top: 170
    }
});