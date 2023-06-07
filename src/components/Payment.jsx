import { StyleSheet, Text, View } from "react-native"
import { COLORS, SIZES } from "../constants"
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { useState } from "react";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";



export const Payment = () => {

    const [method, setMethod] = useState("card")

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Payment</Text>
            <View style={styles.detailContainer}>
                <View style={styles.paymentEdit}>
                    <Text style={{fontSize: 15, fontWeight:600}}>Payment Method</Text>
                </View>
                <View style={styles.paymentMethod}>
                    <RadioButtonGroup
                        radioStyle={{ borderColor: COLORS.primary}}
                        selected={method}
                        onSelected={value => setMethod(value)}
                        radioBackground={COLORS.primary}
                    >
                        <RadioButtonItem
                            style={styles.radioButton}
                            value="card"
                            label={<View style={styles.radioItemContainer}>
                                        <FontAwesome5 name="credit-card" size={24} style={styles.radioItemIcon} />
                                        <Text style={styles.radioItem}>Card</Text>
                                    </View>}
                        />
                        <RadioButtonItem
                            style={styles.radioButton}
                            value="upi"
                            label={<View style={styles.radioItemContainer}>
                                        <FontAwesome5 name="paypal" size={24} style={styles.radioItemIcon} />
                                        <Text style={styles.radioItem}>UPI</Text>
                                    </View>}
                        />
                        <RadioButtonItem
                            style={styles.radioButton}
                            value="cod"
                            label={<View style={styles.radioItemContainer}>
                                        <MaterialIcons name="payments" size={24} style={styles.radioItemIcon} />
                                        <Text style={styles.radioItem}>Cash On Delivery</Text>
                                    </View>}
                        />
                    </RadioButtonGroup>
                </View>
            </View>
        {/* 
            <View style={styles.detailContainer}>
                <View style={styles.paymentEdit}>
                    <Text style={{fontSize: 15, fontWeight:600}}>Delivery Method</Text>
                </View>
            </View> */}
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

    paymentEdit: {
        display:'flex',
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 15,
    },

    paymentMethod: {
        height: 200,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 25,
        backgroundColor: COLORS.white,
        elevation: 5
    },
    radioButton: {
        marginVertical: 10
    },
    radioItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
    },
    radioItemIcon: {
        width: 30,
        display: 'flex',
        justifyContent:'center',
    },
    radioItem: {
        fontSize: SIZES.medium,
        lineHeight: 25,
        fontWeight: 400,
        marginVertical: 10,
        paddingHorizontal: 10
    }
})