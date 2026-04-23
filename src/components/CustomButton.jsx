import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants';

export default function CustomButton({title, goto, additionalStyle, buttonStyle}) {
  return (
    <View style={[styles.container, additionalStyle]}>
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={goto}>
          <Text style={styles.buttonTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Locks it to the screen
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 35,
    paddingBottom: 30,
    backgroundColor: 'transparent',
  },
  button: {
    height: 70,
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 35, // Modern smooth corner
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    ...SHADOWS.medium,
    elevation: 5,
  },
  buttonTitle: {
    fontSize: SIZES.medium,
    lineHeight: 26,
    fontWeight: 900,
    color: COLORS.white,
    textAlign: 'center'
  }
})