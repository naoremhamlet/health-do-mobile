import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS, SHADOWS } from '../../constants'
import PopupShell from './PopupShell';

/** BEAUTIFIED INFO ITEM **/
const BodyItem = ({ title, content, icon }) => {
    return (
        <View style={styles.bodyItem}>
            <View style={styles.itemIconContainer}>
                <MaterialCommunityIcons name={icon} size={22} color={COLORS.primary} />
            </View>
            <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemContent}>{content}</Text>
            </View>
        </View>
    )
}

export const PaymentPopup = ({ closePopup }) => {
    return (
        <PopupShell
            title="Delivery Charges"
            onClose={closePopup}
            secondaryAction={{ label: 'Cancel', onPress: closePopup }}
            primaryAction={{ label: 'I Understand', onPress: closePopup }}
        >
            <View style={styles.alertCircle}>
                <MaterialCommunityIcons name="information-variant" size={24} color={COLORS.primary} />
            </View>

            <BodyItem
                icon="city-variant-outline"
                title="Inside Imphal"
                content="₹50 - ₹100"
            />
            <View style={styles.spacer} />
            <BodyItem
                icon="map-marker-distance"
                title="Outside Imphal"
                content="₹100 - ₹150"
            />

            <Text style={styles.noteFooter}>
                *Charges vary based on exact distance and time.
            </Text>
        </PopupShell>
    )
}

const styles = StyleSheet.create({
    alertCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 15,
    },
    bodyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.softBg,
        padding: 15,
        borderRadius: 20,
    },
    itemIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.small
    },
    itemTextContainer: {
        marginLeft: 15,
    },
    itemTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.gray,
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    itemContent: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.black,
        marginTop: 2
    },
    spacer: {
        height: 12
    },
    noteFooter: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 11,
        color: COLORS.gray,
        textAlign: 'center',
        fontStyle: 'italic'
    },
})
