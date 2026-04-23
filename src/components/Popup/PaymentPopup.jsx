import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, Platform } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS, SIZES, SHADOWS } from '../../constants'

/** 1. BEAUTIFIED INFO ITEM **/
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

/** 2. REFINED POPUP BUTTON **/
const PopupButton = ({title, func, style, color, isConfirm}) => {
    return(
        <TouchableOpacity 
            style={[style, isConfirm && SHADOWS.small]} 
            onPress={func}
            activeOpacity={0.8}
        >
            <Text style={{ color: color, ...styles.buttonText}}>{title}</Text>
        </TouchableOpacity>
    )
}

export const PaymentPopup = ({closePopup}) => {
    return (
        <Modal
          transparent={true}
          animationType='fade'
          statusBarTranslucent={true} // Smoother look on Android
        >
            <View style={styles.wrapper}>
                <View style={[styles.container, SHADOWS.medium]}>
                    
                    {/* Header Section */}
                    <View style={styles.heading}>
                        <View style={styles.alertCircle}>
                            <MaterialCommunityIcons name="information-variant" size={24} color={COLORS.primary} />
                        </View>
                        <Text style={styles.header}>Delivery Charges</Text>
                    </View>

                    {/* Body Section */}
                    <View style={styles.body}>
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
                    </View>

                    {/* Bottom Action Section */}
                    <View style={styles.bottom}>
                        <PopupButton
                            title="Cancel"
                            style={styles.cancelButton}
                            color={COLORS.gray}
                            func={closePopup}
                        />
                        <PopupButton
                            title="I Understand"
                            style={styles.confirmButton}
                            color={COLORS.white}
                            func={closePopup}
                            isConfirm={true}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent:'center',
        backgroundColor: 'rgba(0,0,0,0.6)', // Darker overlay for elite focus
    },
    container: {
        backgroundColor: COLORS.white, 
        marginHorizontal: 30, 
        borderRadius: 35,
        overflow: 'hidden',
        position: 'relative',
        paddingBottom: 100, // Space for the fixed bottom row
    },
    heading: {
        paddingTop: 30,
        paddingBottom: 20,
        alignItems: 'center',
    },
    alertCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    header: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.black
    },
    body: {
        paddingHorizontal: 25,
        marginTop: 10,
    },
    bodyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
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
        fontSize: 11,
        color: COLORS.gray,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 25,
        paddingVertical: 20,
        flexDirection: "row", 
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5'
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 18
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '900'
    }
})