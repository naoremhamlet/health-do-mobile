import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../constants";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export const Payment = () => {
    const [method, setMethod] = useState("card");

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Payment Method</Text>

            <View style={styles.detailContainer}>
                {/* Elite Selection Card */}
                <View style={[styles.paymentCard, SHADOWS.small]}>
                    <RadioButtonGroup
                        radioStyle={{ borderColor: COLORS.primary }}
                        selected={method}
                        onSelected={(value) => setMethod(value)}
                        radioBackground={COLORS.primary}
                    >
                        {/* CARD OPTION */}
                        <RadioButtonItem
                            style={styles.radioButton}
                            value="card"
                            label={
                                <View style={styles.radioItemContainer}>
                                    <View style={[styles.iconBox, { backgroundColor: '#F0F4FF' }]}>
                                        <FontAwesome5 name="credit-card" size={18} color="#2F80ED" />
                                    </View>
                                    <Text style={styles.radioItemText}>Credit / Debit Card</Text>
                                </View>
                            }
                        />

                        <View style={styles.divider} />

                        {/* UPI OPTION */}
                        <RadioButtonItem
                            style={styles.radioButton}
                            value="upi"
                            label={
                                <View style={styles.radioItemContainer}>
                                    <View style={[styles.iconBox, { backgroundColor: '#F0FFF4' }]}>
                                        <FontAwesome5 name="wallet" size={18} color="#27AE60" />
                                    </View>
                                    <Text style={styles.radioItemText}>UPI / Google Pay</Text>
                                </View>
                            }
                        />

                        <View style={styles.divider} />

                        {/* COD OPTION */}
                        <RadioButtonItem
                            style={styles.radioButton}
                            value="cod"
                            label={
                                <View style={styles.radioItemContainer}>
                                    <View style={[styles.iconBox, { backgroundColor: '#FFF9F0' }]}>
                                        <MaterialIcons name="payments" size={20} color="#F2994A" />
                                    </View>
                                    <Text style={styles.radioItemText}>Cash On Delivery</Text>
                                </View>
                            }
                        />
                    </RadioButtonGroup>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 35,
        paddingTop: 50
    },
    heading: {
        fontSize: SIZES.xLarge,
        fontWeight: '900',
        color: COLORS.black,
        marginBottom: 15
    },
    detailContainer: {
        marginBottom: 10
    },
    paymentCard: {
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: COLORS.white,
    },
    radioButton: {
        marginVertical: 15,
    },
    radioItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioItemText: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.black,
        marginLeft: 15
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.lightWhite,
        marginLeft: 55, // Aligning divider with the text
    }
});


// import { StyleSheet, Text, View } from "react-native"
// import { COLORS, SIZES } from "../constants"
// import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
// import { useState } from "react";
// import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";



// export const Payment = () => {

//     const [method, setMethod] = useState("card")

//     return (
//         <View style={styles.container}>
//             <Text style={styles.heading}>Payment</Text>
//             <View style={styles.detailContainer}>
//                 <View style={styles.paymentEdit}>
//                     <Text style={{fontSize: 15, fontWeight:600}}>Payment Method</Text>
//                 </View>
//                 <View style={styles.paymentMethod}>
//                     <RadioButtonGroup
//                         radioStyle={{ borderColor: COLORS.primary}}
//                         selected={method}
//                         onSelected={value => setMethod(value)}
//                         radioBackground={COLORS.primary}
//                     >
//                         <RadioButtonItem
//                             style={styles.radioButton}
//                             value="card"
//                             label={<View style={styles.radioItemContainer}>
//                                         <FontAwesome5 name="credit-card" size={24} style={styles.radioItemIcon} />
//                                         <Text style={styles.radioItem}>Card</Text>
//                                     </View>}
//                         />
//                         <RadioButtonItem
//                             style={styles.radioButton}
//                             value="upi"
//                             label={<View style={styles.radioItemContainer}>
//                                         <FontAwesome5 name="paypal" size={24} style={styles.radioItemIcon} />
//                                         <Text style={styles.radioItem}>UPI</Text>
//                                     </View>}
//                         />
//                         <RadioButtonItem
//                             style={styles.radioButton}
//                             value="cod"
//                             label={<View style={styles.radioItemContainer}>
//                                         <MaterialIcons name="payments" size={24} style={styles.radioItemIcon} />
//                                         <Text style={styles.radioItem}>Cash On Delivery</Text>
//                                     </View>}
//                         />
//                     </RadioButtonGroup>
//                 </View>
//             </View>
//         {/* 
//             <View style={styles.detailContainer}>
//                 <View style={styles.paymentEdit}>
//                     <Text style={{fontSize: 15, fontWeight:600}}>Delivery Method</Text>
//                 </View>
//             </View> */}
//         </View>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//         marginVertical: 40
//     },
//     heading: {
//         fontSize: SIZES.xxLarge,
//         fontWeight: 900
//     },
//     detailContainer: {
//         marginVertical: 15
//     },

//     paymentEdit: {
//         display:'flex',
//         flexDirection:"row",
//         justifyContent:'space-between',
//         alignItems:'center',
//         paddingHorizontal: 10,
//         paddingVertical: 5,
//         marginTop: 15,
//     },

//     paymentMethod: {
//         height: 200,
//         borderRadius: 20,
//         paddingHorizontal: 30,
//         paddingVertical: 25,
//         backgroundColor: COLORS.white,
//         elevation: 5
//     },
//     radioButton: {
//         marginVertical: 10
//     },
//     radioItemContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems:'center',
//     },
//     radioItemIcon: {
//         width: 30,
//         display: 'flex',
//         justifyContent:'center',
//     },
//     radioItem: {
//         fontSize: SIZES.medium,
//         lineHeight: 25,
//         fontWeight: 400,
//         marginVertical: 10,
//         paddingHorizontal: 10
//     }
// })