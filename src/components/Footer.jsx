import React from 'react'
import { Text, View, StyleSheet, } from 'react-native'
import { COLORS } from '../constants'


export default function Footer() {

    return (
        <View style={styles.footer}>
            <Text style={styles.versionText}>Health do! v1.0.4</Text>
            <Text style={styles.footerSubText}>Made with ❤️ for healthy living</Text>
        </View>
    )
}


const styles = StyleSheet.create({
  footer: {
    marginTop: 40,
    alignItems: 'center',
    opacity: 0.4,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.black
  },
  footerSubText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4
  }
})