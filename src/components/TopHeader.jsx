import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { MaterialIcons, Octicons } from '@expo/vector-icons'
import { SIZES } from '../constants'


export default function TopHeader({title, navigation}) {
  return (
    <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <Octicons name='chevron-left' size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },

    title: {
        fontSize: SIZES.medium,
        fontWeight: 900,
        alignSelf: 'center',
        paddingLeft: 110
    }
})
