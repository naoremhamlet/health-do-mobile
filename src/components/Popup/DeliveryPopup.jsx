import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../../constants'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Ionicons } from '@expo/vector-icons';
import PopupShell from './PopupShell';
import { AddressPopup } from './AddressPopup';
import { setSelectedAddress } from '../../store/reducer/address';

/** BEAUTIFIED BODY ITEM (Address Card inside Modal) **/
const BodyItem = ({ address, isSelected }) => {
    return (
        <View style={[styles.bodyItem, isSelected && styles.selectedBodyItem]}>
            <Text style={[styles.itemTitle, isSelected && { color: COLORS.black }]}>
                {address.type}
            </Text>
            <Text
                style={styles.itemContent}
                numberOfLines={2}
            >
                {address.phone}, {address.address}
            </Text>
        </View>
    )
}

export const DeliveryPopup = ({ closePopup }) => {
    const [addEditAddress, setAddEditAddress] = useState(false)

    const addresses = useSelector(state => state.address.addresses)
    const selectedAddressId = useSelector(state => state.address.selectedAddressId)
    const dispatch = useDispatch()

    // Local draft selection — only committed to redux when "Confirm" is pressed,
    // so backing out with "Cancel" doesn't change the real selection.
    const [draftId, setDraftId] = useState(selectedAddressId)

    if (addEditAddress)
        return <AddressPopup closePopup={() => setAddEditAddress(false)} type="Add Address" />

    return (
        <PopupShell
            title="Select Delivery Address"
            onClose={closePopup}
            secondaryAction={{ label: 'Cancel', onPress: closePopup }}
            primaryAction={{
                label: 'Confirm',
                onPress: () => {
                    dispatch(setSelectedAddress(draftId));
                    closePopup();
                },
            }}
        >
            {addresses && addresses.length ? (
                <RadioButtonGroup
                    radioStyle={{ borderColor: COLORS.primary, width: 20, height: 20 }}
                    selected={draftId}
                    onSelected={value => setDraftId(value)}
                    radioBackground={COLORS.primary}
                >
                    {addresses.map(a => (
                        <RadioButtonItem
                            key={a.id}
                            style={styles.radioWrapper}
                            value={a.id}
                            label={<BodyItem address={a} isSelected={draftId === a.id} />}
                        />
                    ))}
                </RadioButtonGroup>
            ) : (
                <Text style={styles.emptyText}>No saved addresses yet — add one below.</Text>
            )}

            <TouchableOpacity
                style={styles.addAddressRow}
                onPress={() => setAddEditAddress(true)}
            >
                <Ionicons name='add-circle' size={24} color={COLORS.primary} />
                <Text style={styles.addText}>Add New Address</Text>
            </TouchableOpacity>
        </PopupShell>
    )
}

const styles = StyleSheet.create({
    radioWrapper: {
        marginBottom: 15,
        alignItems: 'center'
    },
    bodyItem: {
        flex: 1,
        marginLeft: 15,
        padding: 12,
        borderRadius: 18,
        backgroundColor: COLORS.softBg,
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
    emptyText: {
        fontSize: 13,
        color: COLORS.gray,
        textAlign: 'center',
        paddingVertical: 20,
    },
    addAddressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 10
    },
    addText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.primary
    },
})
