import React from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { MaterialIcons, Octicons } from '@expo/vector-icons'
import { SIZES } from '../constants'


export default function TopHeader({title, goto}) {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.icon} onPress={goto}>
          <Octicons name='chevron-left' size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },

    icon: {
      flex:1,
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
})
