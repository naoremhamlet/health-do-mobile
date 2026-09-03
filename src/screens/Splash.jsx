import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import CustomButton from '../components/CustomButton';
import { COLORS, image } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Splash({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Decorative background layers — kept behind content, low-opacity brand green */}
      <View style={styles.decorRingTop} />
      <View style={styles.decorBlobTop} />
      <View style={styles.decorBlobBottom} />

      <View style={styles.content}>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={image.logo} resizeMode="contain" />
        </View>
        <Text style={styles.heading}>Health</Text>
        <Text style={styles.heading}>do!</Text>
        <Text style={styles.tagline}>Make healthy choices, every time.</Text>
      </View>

      <CustomButton
        title="Get Started"
        additionalStyle={{ backgroundColor: 'transparent' }}
        goto={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // Soft off-brand shapes anchored to the edges so they read as background
  // texture rather than competing with the logo and heading.
  decorBlobTop: {
    position: 'absolute',
    top: -90,
    right: -70,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: COLORS.primary + '0C',
  },
  decorRingTop: {
    position: 'absolute',
    top: '12%',
    left: -60,
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 26,
    borderColor: COLORS.primary + '08',
  },
  decorBlobBottom: {
    position: 'absolute',
    bottom: -110,
    left: -90,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: COLORS.tertiary + '08',
  },

  content: {
    alignItems: 'center',
    padding: 10,
    marginTop: -150,
  },
  imgContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.primary + '15',
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
