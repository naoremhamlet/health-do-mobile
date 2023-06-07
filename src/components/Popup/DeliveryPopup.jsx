import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { AddressPopup } from './AddressPopup';


const BodyItem = ({ title, content }) => {
    return (
        <View style={styles.bodyItem}>
            <Text 
                numberOfLines={1}
                lineBreakMode='tail'
                ellipsizeMode='tail'
                style={styles.itemTitle}
            >
                Naorem Hemlet Singh
            </Text>
            <Text 
                style={styles.itemContent}
                numberOfLines={1}
                lineBreakMode='tail'
                ellipsizeMode='tail'
            >
                9366309563, Nambol Naorem Makha Leikai, Near Community Hall
            </Text>
        </View>
    )
}


const PopupButton = ({title, func, style, color}) => {
    return(
        <TouchableOpacity style={style} onPress={func}>
            <Text style={{ color: color, ...styles.buttonText}}>{title}</Text>
        </TouchableOpacity>
    )
}

const address = [{id:1}, {id:2}]

export const DeliveryPopup = ({closePopup}) => {
    const [addEditAddress, setAddEditAddress] = useState(false)
    const [addressId, setAddressId] = useState(1)
    if(addEditAddress)
        return <AddressPopup closePopup={()=> setAddEditAddress(false)} type="Add Address" />
    else
        return (
            <Modal
            transparent={true}
            animationType='fade'>
                <View style={styles.wrapper}>
                    <View style={styles.container}>
                        <View style={styles.heading}>
                            <Text style={styles.header}>Select Address</Text>
                        </View>
                        <ScrollView style={styles.body}>

                            {address && address.length ? 
                                <RadioButtonGroup
                                    radioStyle={{ borderColor: COLORS.primary }}
                                    selected={addressId}
                                    onSelected={value => setAddressId(value)}
                                    radioBackground={COLORS.primary}
                                >
                                    {address.map(a => 
                                        <RadioButtonItem
                                            key={a.id}
                                            style={styles.radioButton}
                                            value={a.id}
                                            label={<BodyItem />}
                                        />
                                    )}
                                </RadioButtonGroup> : null}

                            <View style={styles.addButton}>
                                <TouchableOpacity onPress={() => setAddEditAddress(true)}>
                                    <Ionicons name='add-circle-outline' size={30} color={COLORS.primary}/>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                        <View style={styles.bottom}>
                            <PopupButton
                                title="Cancel"
                                style={styles.cancelButton}
                                color={COLORS.tertiary}
                                func={closePopup}
                            />
                            <PopupButton
                                title="Confirm"
                                style={styles.confirmButton}
                                color={COLORS.white}
                                func={closePopup}
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
        backgroundColor: COLORS.wrapper,
    },
    container: { 
        minHeight: 340,
        maxHeight: 440,
        backgroundColor: COLORS.white, 
        marginHorizontal: 35, 
        borderRadius: 30,
        elevation: 5,
        position: 'relative'
    },
    heading: {
        backgroundColor:COLORS.background,
        paddingVertical: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    header: {
        paddingHorizontal: 35,
        fontSize: 15,
        fontWeight: 600
    },
    body: {
        marginHorizontal: 35,
        marginBottom: 90,
    },
    bodyItem: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        opacity: 0.5,
    },
    itemTitle: {
        fontSize: 14
    },

    addButton: {
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
        paddingTop: 10,
    },
    bottom: {
        paddingHorizontal: 35,
        paddingVertical: 25,
        display: 'flex', 
        flexDirection:"row", 
        justifyContent:'space-between',
        position:'absolute',
        bottom: 0,
        width: '100%'
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 20,
        paddingHorizontal: 45,
        borderRadius: 30
    },
    cancelButton: {
        paddingVertical: 20,
    },
    buttonText: {
        fontSize: SIZES.medium,
        fontWeight: 600
    }
})