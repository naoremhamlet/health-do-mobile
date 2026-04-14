import React from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { MaterialIcons, Octicons } from '@expo/vector-icons'
import { SIZES, COLORS, SHADOWS } from '../constants'


export default function TopHeader({title, goto}) {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.icon, SHADOWS.small]} onPress={goto} activeOpacity={0.7}>
          <Octicons name='chevron-left' size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },

    icon: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: COLORS.white,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 5
    },

    title: {
        fontSize: SIZES.medium,
        fontWeight: 900,
        flex:20,
        paddingRight: 15,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        textAlign: 'center'
    }
});