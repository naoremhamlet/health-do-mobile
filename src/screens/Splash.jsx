import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import CustomButton from '../components/CustomButton';
import { COLORS, image } from '../constants';

export default function Splash({navigation}) {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={image.logo} />
        <Text style={styles.heading}>Health do!</Text>
        <CustomButton 
          title={"Get Started"} 
          additionalStyle={{backgroundColor: COLORS.white}}
          goto={()=> navigation.navigate('Login')} />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        position: 'relative'
    },
    image: {
      width: 60,
      height: 65,
      marginTop: 170
    },
    heading: {
        fontSize: 65,
        fontWeight: 900,
        color: COLORS.primary,
        lineHeight: 65,
        marginTop: 20
    }
});