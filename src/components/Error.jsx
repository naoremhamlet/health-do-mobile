import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomButton from './CustomButton'
import { SIZES } from '../constants'

export default function Error({ icon, title, desc, isButton, buttonFunc, buttonName }) {
  return (
    <View style={styles.container}>
        <View style={styles.content}>
            {icon}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}>{desc}</Text>

        </View>
        {isButton &&
            <View style={styles.button}>
                <CustomButton goto={buttonFunc} title={buttonName} />
            </View>
        }
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: SIZES.xLarge,
        fontWeight: 900,
        marginTop: 20
    },
    desc: {
        fontSize: SIZES.medium,
        opacity: 0.5,
        width: 230,
        textAlign: 'center',
        marginTop: 5
    },
    content: {
        flex: 5,
        justifyContent: 'center',
        alignItems:"center"
    },
    button: {
        flex: 1
    }
})
