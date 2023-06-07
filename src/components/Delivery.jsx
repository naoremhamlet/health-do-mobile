import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { COLORS, SIZES } from "../constants"
import { FontAwesome5} from "@expo/vector-icons"
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { useState } from "react";


export const Delivery = ({ editAddress }) => {

    const [method, setMethod] = useState("doordelivery")

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Delivery</Text>
            <View style={styles.detailContainer}>

                <View style={styles.addressEdit} >
                    <Text style={{fontSize: 15, fontWeight:600}}>Address Details</Text>
                    <TouchableOpacity onPress={editAddress}>
                        <FontAwesome5 name="edit" size={20} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.addressDetail}>
                    <Text style={styles.addressName}>Naorem Hemlet</Text>
                    <Text style={styles.addressText}>Nambol Naorem Makha Leikai, Near Community Hall</Text>
                    <Text style={styles.addressText}>+91 9366309563</Text>
                </View>
            </View>

            <View style={styles.detailContainer}>
                <View style={styles.addressEdit}>
                    <Text style={{fontSize: 15, fontWeight:600}}>Delivery Method</Text>
                </View>
                <View style={styles.deliveryMethod}>
                    <RadioButtonGroup
                        radioStyle={{ borderColor: COLORS.primary}}
                        selected={method}
                        onSelected={value => setMethod(value)}
                        radioBackground={COLORS.primary}
                    >
                        <RadioButtonItem
                            key={1}
                            style={styles.radioButton}
                            value="doordelivery"
                            label={<Text style={styles.radioItem}>Door Delivery</Text>}
                        />
                        <RadioButtonItem
                            key={2}
                            style={styles.radioButton}
                            value="pickup"
                            label={<Text style={styles.radioItem}>Pick Up</Text>}
                        />
                    </RadioButtonGroup>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 40
    },
    heading: {
        fontSize: SIZES.xxLarge,
        fontWeight: 900
    },
    detailContainer: {
        marginVertical: 15
    },
    addressDetail: {
        height: 160,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 25,
        backgroundColor: COLORS.white,
        elevation: 3
    },
    addressName: {
        fontSize: SIZES.medium,
        fontWeight: 500,
        lineHeight: 25,
        borderBottomWidth: 0.3
    },
    addressText: {
        fontSize: 15,
        fontWeight: 400,
        lineHeight: 21,
        borderBottomWidth: 0.5,
        opacity: 0.8
    },

    addressEdit: {
        display:'flex',
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 15,
    },

    deliveryMethod: {
        height: 160,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 25,
        backgroundColor: COLORS.white,
        elevation: 5
    },
    radioButton: {
        marginVertical: 10
    },
    radioItem: {
        fontSize: SIZES.medium,
        lineHeight: 25,
        fontWeight: 400,
        marginVertical: 10,
        paddingHorizontal: 10
    }
})