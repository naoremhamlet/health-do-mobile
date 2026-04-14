import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native'
import { COLORS, SIZES, SHADOWS } from '../../constants'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Ionicons } from '@expo/vector-icons';
import { AddressPopup } from './AddressPopup';

/** 1. BEAUTIFIED BODY ITEM (Address Card inside Modal) **/
const BodyItem = ({ isSelected }) => {
    return (
        <View style={[styles.bodyItem, isSelected && styles.selectedBodyItem]}>
            <Text style={[styles.itemTitle, isSelected && { color: COLORS.black }]}>
                Naorem Hemlet Singh
            </Text>
            <Text 
                style={styles.itemContent}
                numberOfLines={2}
            >
                9366309563, Nambol Naorem Makha Leikai, Near Community Hall, Bishnupur
            </Text>
        </View>
    )
}

/** 2. REFINED POPUP BUTTON **/
const PopupButton = ({ title, func, style, color, isConfirm }) => {
    return (
        <TouchableOpacity 
            style={[style, isConfirm && SHADOWS.small]} 
            onPress={func}
            activeOpacity={0.8}
        >
            <Text style={{ color: color, ...styles.buttonText }}>{title}</Text>
        </TouchableOpacity>
    )
}

// const addressData = [{ id: 1 }, { id: 2 }, { id: 3 }, {id: 4}, {id: 5}, { id: 6 }, { id: 7 }, { id: 8 }, {id: 9}, {id: 10}]
const addressData = [{ id: 1 }, { id: 2 }, { id: 3 }]


export const DeliveryPopup = ({ closePopup }) => {
    const [addEditAddress, setAddEditAddress] = useState(false)
    const [addressId, setAddressId] = useState(1)

    if (addEditAddress)
        return <AddressPopup closePopup={() => setAddEditAddress(false)} type="Add Address" />

    return (
        <Modal transparent={true} animationType='fade'>
            <View style={styles.wrapper}>
                <View style={[styles.container, SHADOWS.medium]}>
                    <View style={styles.heading}>
                        <Text style={styles.header}>Select Delivery Address</Text>
                    </View>

                    <ScrollView 
                        style={styles.body} 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    >
                        {addressData && addressData.length ? (
                            <RadioButtonGroup
                                radioStyle={{ borderColor: COLORS.primary, width: 20, height: 20 }}
                                selected={addressId}
                                onSelected={value => setAddressId(value)}
                                radioBackground={COLORS.primary}
                            >
                                {addressData.map(a => (
                                    <RadioButtonItem
                                        key={a.id}
                                        style={styles.radioWrapper}
                                        value={a.id}
                                        label={<BodyItem isSelected={addressId === a.id} />}
                                    />
                                ))}
                            </RadioButtonGroup>
                        ) : null}

                        <TouchableOpacity 
                            style={styles.addAddressRow} 
                            onPress={() => setAddEditAddress(true)}
                        >
                            <Ionicons name='add-circle' size={24} color={COLORS.primary} />
                            <Text style={styles.addText}>Add New Address</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <View style={styles.bottom}>
                        <PopupButton
                            title="Cancel"
                            style={styles.cancelButton}
                            color={COLORS.gray}
                            func={closePopup}
                        />
                        <PopupButton
                            title="Confirm"
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
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Darker overlay for focus
    },
    container: {
        maxHeight: '70%',
        backgroundColor: COLORS.white,
        marginHorizontal: 30,
        borderRadius: 35,
        overflow: 'hidden'
    },
    heading: {
        paddingVertical: 25,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    header: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.black
    },
    body: {
        paddingHorizontal: 25,
        marginTop: 15,
        marginBottom: 100, // Space for fixed bottom buttons
    },
    radioWrapper: {
        marginBottom: 15,
        alignItems: 'center'
    },
    bodyItem: {
        flex: 1,
        marginLeft: 15,
        padding: 12,
        borderRadius: 18,
        backgroundColor: '#F9F9F9',
        borderWidth: 1,
        borderColor: 'transparent'
    },
    selectedBodyItem: {
        backgroundColor: COLORS.primary + '08',
        borderColor: COLORS.primary + '20',
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.gray,
        marginBottom: 4
    },
    itemContent: {
        fontSize: 12,
        color: COLORS.gray,
        lineHeight: 18,
        opacity: 0.8
    },
    addAddressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingVertical: 10
    },
    addText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.primary
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingBottom: 25,
        paddingTop: 15,
        backgroundColor: COLORS.white,
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        paddingHorizontal: 35,
        borderRadius: 20
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '900'
    }
})