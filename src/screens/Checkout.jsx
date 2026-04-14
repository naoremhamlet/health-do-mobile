import React, { useState } from 'react';
import { 
    StyleSheet, Text, View, ScrollView, Platform, 
    TouchableOpacity, LayoutAnimation, UIManager, TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants';

import TopHeader from '../components/TopHeader';
import { PaymentPopup } from '../components/Popup/PaymentPopup';
import { DeliveryPopup } from '../components/Popup/DeliveryPopup';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DeliveryBody = ({ onEdit }) => (
    <View style={styles.bodySection}>
        <View style={styles.headerRow}>
            <Text style={styles.bodyTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={onEdit} activeOpacity={0.7}>
                <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
        </View>
        
        <View style={[styles.card, SHADOWS.small]}>
            {/* Top Row with Icon and Refined Tag */}
            <View style={styles.cardTop}>
                <View style={styles.iconCircle}>
                    <Ionicons name="location" size={18} color={COLORS.primary} />
                </View>
                {/* Modern Pill Tag */}
                <View style={styles.modernTag}>
                    <Text style={styles.modernTagText}>HOME</Text>
                </View>
            </View>

            <View style={styles.addressInfo}>
                <Text style={styles.cardName}>Naorem's Residence</Text>
                <Text style={styles.cardDesc}>
                    Nambol Naorem, Near Community Hall,{"\n"}Bishnupur, Manipur - 795134
                </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
                <View style={styles.phoneIconCircle}>
                    <MaterialCommunityIcons name="phone" size={14} color={COLORS.gray} />
                </View>
                <Text style={styles.infoText}>+91 98765 43210</Text>
            </View>
        </View>
    </View>
);


const PaymentBody = ({ method, setMethod }) => {
    const [upiId, setUpiId] = useState("");
    const [cardDetails, setCardDetails] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: ""
    });

    const Option = ({ id, name, icon, type, children }) => {
        const isActive = method === id;
        return (
            <View style={[styles.tileWrapper, isActive && SHADOWS.small]}>
                <TouchableOpacity 
                    style={[styles.tile, isActive ? styles.activeTile : styles.inactiveTile]}
                    onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setMethod(id);
                    }}
                    activeOpacity={0.8}
                >
                    <View style={styles.tileLeft}>
                        <View style={[styles.tileIcon, isActive ? styles.activeIcon : styles.inactiveIcon]}>
                            {type === "fa" ? 
                                <FontAwesome5 name={icon} size={18} color={isActive ? COLORS.white : COLORS.gray} /> :
                                <MaterialIcons name={icon} size={20} color={isActive ? COLORS.white : COLORS.gray} />
                            }
                        </View>
                        <Text style={[styles.tileText, isActive && { color: COLORS.black }]}>{name}</Text>
                    </View>
                    <Ionicons name={isActive ? "radio-button-on" : "radio-button-off"} size={22} color={isActive ? COLORS.primary : '#D0D0D0'} />
                </TouchableOpacity>

                {isActive && children && (
                    <View style={styles.dropdownContent}>
                      {children}
                      {children && <TouchableOpacity style={styles.saveBtn} onPress={() => alert(`${name} Details Saved`)}>
                          <Text style={styles.saveBtnText}>Save Details</Text>
                        </TouchableOpacity>}
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.bodySection}>
            <Text style={styles.bodyTitle}>Payment Method</Text>
            
            <Option id="card" name="Credit / Debit Card" icon="credit-card" type="fa">
                <View style={styles.inputGroup}>
                    {/* Card Number */}
                    <Text style={styles.inputLabel}>Card Number</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholderTextColor={COLORS.placehoder}
                        placeholder="0000 0000 0000 0000"
                        keyboardType="numeric"
                        maxLength={16}
                        onChangeText={(txt) => setCardDetails({...cardDetails, number: txt})}
                    />
                    
                    {/* Name on Card */}
                    <Text style={[styles.inputLabel, { marginTop: 12 }]}>Name on Card</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholderTextColor={COLORS.placehoder}
                        placeholder="John Doe"
                        autoCorrect={false}
                        onChangeText={(txt) => setCardDetails({...cardDetails, name: txt})}
                    />

                    {/* SIDE-BY-SIDE SECTION */}
                    <View style={styles.inputRow}>
                        <View style={styles.flexHalf}>
                            <Text style={[styles.inputLabel, { marginTop: 12 }]}>Valid Upto</Text>
                            <TextInput 
                                style={styles.textInput} 
                                placeholderTextColor={COLORS.placehoder}
                                placeholder="MM/YY"
                                keyboardType="numeric"
                                maxLength={5}
                                onChangeText={(txt) => setCardDetails({...cardDetails, expiry: txt})}
                            />
                        </View>
                        <View style={styles.flexHalf}>
                            <Text style={[styles.inputLabel, { marginTop: 12 }]}>CVV</Text>
                            <TextInput 
                                style={styles.textInput} 
                                placeholderTextColor={COLORS.placehoder}
                                placeholder="***"
                                keyboardType="numeric"
                                secureTextEntry={true}
                                maxLength={3}
                                onChangeText={(txt) => setCardDetails({...cardDetails, cvv: txt})}
                            />
                        </View>
                    </View>
                </View>
            </Option>

            <Option id="upi" name="UPI / Google Pay" icon="wallet" type="fa">
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>UPI ID</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholderTextColor={COLORS.placehoder}
                        placeholder="username@bank"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setUpiId}
                    />
                </View>
            </Option>

            <Option id="cod" name="Cash On Delivery" icon="payments" type="mat" />
                {/* <Text style={styles.infoNote}>Please keep exact change ready to help our delivery partner.</Text> */}
            {/* </Option> */}
        </View>
    );
};

/** 3. MAIN CHECKOUT PAGE **/
export default function Checkout({ navigation }) {
    const [active, setActive] = useState("Delivery");
    const [method, setMethod] = useState("cod");
    const [showBill, setShowBill] = useState(false);
    const [notifyPaymentPopup, setNotifyPaymentPopup] = useState(false);
    const [editAddressPopup, setEditAddressPopup] = useState(false);

    const toggleBill = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowBill(!showBill);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TopHeader title="Checkout" goto={() => active === "Delivery" ? navigation.goBack() : setActive("Delivery")} />

            <View style={styles.tabBar}>
                <View style={[styles.tab, active === "Delivery" && styles.activeTab]} >
                    <Text style={[styles.tabLabel, active === "Delivery" && styles.activeLabel]}>Delivery</Text>
                </View>
                <View style={[styles.tab, active === "Payment" && styles.activeTab]} >
                    <Text style={[styles.tabLabel, active === "Payment" && styles.activeLabel]}>Payment</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollInside}>
                {active === "Delivery" ? <DeliveryBody onEdit={() => setEditAddressPopup(true)} /> : <PaymentBody method={method} setMethod={setMethod} />}
            </ScrollView>

            <View style={[styles.footer, showBill && styles.footerExpanded]}>
                {showBill && (
                    <View style={styles.billDetail}>
                        <View style={styles.billRow}><Text style={styles.billLabel}>Subtotal</Text><Text style={styles.billVal}>₹1,520.00</Text></View>
                        <View style={styles.billRow}><Text style={styles.billLabel}>Delivery Fee</Text><Text style={styles.billVal}>₹40.00</Text></View>
                        <View style={styles.billDivider} />
                    </View>
                )}
                <View style={styles.footerActionRow}>
                    <TouchableOpacity style={styles.priceInfo} onPress={toggleBill} activeOpacity={0.7}>
                        <View style={styles.totalLabelRow}>
                            <Text style={styles.totalLabelText}>Total Balance</Text>
                            <MaterialIcons name={showBill ? "keyboard-arrow-down" : "keyboard-arrow-up"} size={18} color={COLORS.gray} />
                        </View>
                        <Text style={styles.totalAmountText}>₹1,560.00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.confirmBtn, active === "Payment" && { backgroundColor: COLORS.black }]} 
                        onPress={() => active === "Delivery" ? setActive("Payment") : setNotifyPaymentPopup(true)}
                    >
                        <Text style={styles.confirmBtnText}>{active === "Delivery" ? "Next" : "Confirm"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {notifyPaymentPopup && <PaymentPopup closePopup={() => setNotifyPaymentPopup(false)} />}
            {editAddressPopup && <DeliveryPopup closePopup={() => setEditAddressPopup(false)} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 35, paddingTop: 50, backgroundColor: '#FBFBFB' },
    tabBar: { flexDirection: 'row', marginTop: 15, justifyContent: 'space-evenly' },
    tab: { paddingBottom: 8, borderBottomWidth: 2, borderBottomColor: 'transparent', width: '50%', alignItems: 'center' },
    activeTab: { borderBottomColor: COLORS.primary },
    tabLabel: { fontSize: 16, fontWeight: '600', color: '#A0A0A0' },
    activeLabel: { color: COLORS.black, fontWeight: '900' },
    scrollInside: { paddingBottom: 160 },
    
    // Body & Delivery Card
    bodySection: { marginTop: 25 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    bodyTitle: { fontSize: 18, fontWeight: '900', color: COLORS.black },
    editLink: { color: COLORS.primary, fontWeight: '700' },

    card: { 
        backgroundColor: COLORS.white, 
        borderRadius: 28, // Increased for a softer feel
        padding: 24, 
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    cardTop: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 16 
    },
    iconCircle: { 
        width: 36, 
        height: 36, 
        borderRadius: 12, 
        backgroundColor: COLORS.primary + '15', // 15% Opacity Primary
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    // NEW MODERN PILL TAG
    modernTag: { 
        backgroundColor: COLORS.primary + '15', 
        paddingHorizontal: 12, 
        paddingVertical: 6, 
        borderRadius: 20, // Full rounded pill
        borderWidth: 1,
        borderColor: COLORS.primary + '30',
    },
    modernTagText: { 
        color: COLORS.primary, 
        fontSize: 10, 
        fontWeight: '900',
        letterSpacing: 0.5
    },
    addressInfo: {
        marginBottom: 12
    },
    cardName: { 
        fontSize: 18, 
        fontWeight: '900', 
        color: COLORS.black, 
        marginBottom: 6 
    },
    cardDesc: { 
        fontSize: 13, 
        color: COLORS.gray, 
        lineHeight: 20,
        fontWeight: '500'
    },
    divider: { 
        height: 1, 
        backgroundColor: '#F5F5F5', 
        marginVertical: 16 
    },
    infoRow: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    phoneIconCircle: {
        width: 24,
        height: 24,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    infoText: { 
        fontSize: 14, 
        color: COLORS.gray, 
        fontWeight: '700' 
    },

    // Payment Tiles & Dropdown
    tileWrapper: { backgroundColor: COLORS.white, borderRadius: 20, marginBottom: 12, overflow: 'hidden' },
    tile: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderWidth: 1.5, borderRadius: 20 },
    activeTile: { borderColor: COLORS.primary },
    inactiveTile: { borderColor: 'transparent' },
    tileLeft: { flexDirection: 'row', alignItems: 'center' },
    tileIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    activeIcon: { backgroundColor: COLORS.primary },
    inactiveIcon: { backgroundColor: '#F5F5F5' },
    tileText: { marginLeft: 15, fontSize: 15, fontWeight: '700', color: COLORS.gray },
    dropdownContent: { paddingHorizontal: 16, paddingBottom: 16, marginTop: -5 },
    inputGroup: { marginTop: 10 },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    flexHalf: {
        width: '48%', // Leaves a small gap in the middle
    },
    textInput: { 
        backgroundColor: '#F9F9F9', 
        borderRadius: 12, 
        padding: 12, 
        fontSize: 14, 
        color: COLORS.black, 
        borderWidth: 1, 
        borderColor: '#EEE',
        marginTop: 4,
    },
    inputLabel: { 
        fontSize: 11, 
        fontWeight: '800', 
        color: COLORS.gray, 
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    saveBtn: { backgroundColor: COLORS.primary + '15', padding: 10, borderRadius: 10, alignItems: 'center', marginTop: 15 },
    saveBtnText: { color: COLORS.primary, fontWeight: '800', fontSize: 13 },
    infoNote: { fontSize: 13, color: COLORS.gray, fontStyle: 'italic', marginTop: 5 },

    // Footer
    footer: { position: 'absolute', bottom: Platform.OS === 'ios' ? 40 : 20, left: 20, right: 20, backgroundColor: COLORS.white, borderRadius: 25, padding: 20, ...SHADOWS.medium },
    billDetail: { paddingBottom: 15 },
    billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    billLabel: { fontSize: 14, color: COLORS.gray, fontWeight: '500' },
    billVal: { fontSize: 14, color: COLORS.black, fontWeight: '700' },
    billDivider: { height: 1, backgroundColor: '#F5F5F5', marginVertical: 10 },
    footerActionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    priceInfo: { flex: 1 },
    totalLabelRow: { flexDirection: 'row', alignItems: 'center' },
    totalLabelText: { fontSize: 11, color: COLORS.gray, fontWeight: '700', textTransform: 'uppercase', marginRight: 4 },
    totalAmountText: { fontSize: 22, fontWeight: '900', color: COLORS.black },
    confirmBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 30, paddingVertical: 14, borderRadius: 16 },
    confirmBtnText: { color: COLORS.white, fontWeight: '900', fontSize: 15 }
});

// import React, { useState } from 'react'
// import { StyleSheet, Text, View, Modal } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import TopHeader from '../components/TopHeader'
// import CustomButton from '../components/CustomButton'
// import { SIZES } from '../constants'
// import { Delivery } from '../components/Delivery'
// import { Payment } from '../components/Payment'
// import { PaymentPopup } from '../components/Popup/PaymentPopup'
// import { DeliveryPopup } from '../components/Popup/DeliveryPopup'



// export default function Checkout({ navigation }) {
//   const [active, setActive] = useState("Delivery")
//   const [notifyPaymentPopup, setNotifyPaymentPopup] = useState(false)
//   const [editAddressPopup, setEditAddressPopup] = useState(false)

//   return (
//     <SafeAreaView style={styles.container}>
//         <TopHeader title="Checkout" 
//           goto={() => {
//             if(active === "Delivery")
//               return navigation.goBack()
//             else
//               return setActive("Delivery")
//           }} />

//         {active ==="Delivery" && <Delivery editAddress={()=> setEditAddressPopup(true)} />}
//         {active ==="Payment" && <Payment />}
//         {notifyPaymentPopup && <PaymentPopup closePopup={() => setNotifyPaymentPopup(false)} />}
//         {editAddressPopup && <DeliveryPopup closePopup={() => setEditAddressPopup(false)} />}
        
//         <View style={styles.total}>
//             <Text style={{ fontSize: SIZES.medium, fontWeight: 400}}>Total</Text>
//             <Text style={{ fontSize: SIZES.large, fontWeight: 900}}>Rs 1560</Text>
//         </View>

//         <CustomButton 
//           title={active==="Delivery"? "Payment" : "Proceed to Payment"} 
//           goto={() => {
//             if(active === "Delivery")
//               return setActive("Payment")
//             else
//               setNotifyPaymentPopup(true)
//           }} />
//     </SafeAreaView>
//   )
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 50,
//         paddingHorizontal: 35,
//     },
//     total: {
//       display: 'flex',
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems:'center'
//     }
// })