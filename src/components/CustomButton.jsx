import React from 'react'
import { Pressable, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants';

export default function CustomButton({title, goto, additionalStyle}) {
  return (
    <View style={{...styles.container, ...additionalStyle}}>
      <TouchableOpacity style={styles.button} onPress={goto}>
          <Text style={styles.buttonTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-end',
    marginBottom: 35,
    width: '100%',
    alignSelf:'center',
    minHeight: 70,
  },
  button: {
    padding: 20,
    width: 280,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    alignSelf: 'center',
  },
  buttonTitle: {
    fontSize: SIZES.medium,
    lineHeight: 26,
    fontWeight: 900,
    color: COLORS.white,
    textAlign: 'center'
  }
})