import React from 'react'
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { COLORS, SIZES } from '../constants';

export default function CustomButton({title, goto}) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={goto}>
          <Text style={styles.buttonTitle}>{title}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 35,
    width: '100%',
    alignSelf:'center',
    backgroundColor: COLORS.lightWhite
  },
  button: {
    padding: 20,
    paddingHorizontal: 100,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    alignSelf: 'center',
  },
  buttonTitle: {
    fontSize: SIZES.medium,
    lineHeight: 26,
    fontWeight: 900,
    color: COLORS.white
  }
})