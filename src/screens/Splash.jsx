import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import CustomButton from '../components/CustomButton';
import { COLORS, image } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Splash({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={image.logo} />
        </View>
        <Text style={styles.heading}>Health</Text>
        <Text style={styles.heading}>do!</Text>
        <Text style={styles.tagline}>Take healthy choices!!! everytime</Text>
      </View>
        <CustomButton 
          title={"Get Started"} 
          additionalStyle={{backgroundColor: COLORS.white}}
          goto={()=> navigation.navigate('Login')} />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
      alignItems: 'center',
      padding: 10,
      marginTop: -150
    },
    imgContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: COLORS.primary + '10',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    image: {
      width: 60,
      height: 65,
    },
    heading: {
      fontSize: 60,
      fontWeight: '900',
      color: COLORS.primary,
      lineHeight: 60,
      letterSpacing: -2,
    },
    tagline: {
      fontSize: 16,
      color: COLORS.gray,
      fontWeight: '600',
      marginTop: 15,
      opacity: 0.7,
  },
});