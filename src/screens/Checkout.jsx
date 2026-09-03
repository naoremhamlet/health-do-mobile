import React, { useState } from 'react';
import { 
    StyleSheet, Text, View, ScrollView, Platform, 
    TouchableOpacity, LayoutAnimation, TextInput, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { COLORS, SIZES, SHADOWS, PADDINGS } from '../constants';
import { getProductById } from '../helper';

import TopHeader from '../components/TopHeader';
import { PaymentPopup } from '../components/Popup/PaymentPopup';
import { DeliveryPopup } from '../components/Popup/DeliveryPopup';

// Mock voucher catalog — in a real app this would come from an offers API/redux slice
const VOUCHERS = [
    { code: 'HEALTHY20', label: '20% off this order', minOrder: 300, type: 'percent', value: 20 },
    { code: 'FREESHIP', label: 'Free delivery on this order', minOrder: 150, type: 'freeship', value: 0 },
];

const DeliveryBody = ({ onEdit }) => {
    const selectedAddress = useSelector(state =>
        state.address.addresses.find(a => a.id === state.address.selectedAddressId)
    );

    return (
        <View style={styles.bodySection}>
            <View style={styles.headerRow}>
                <View style={styles.titleRow}>
                    <Ionicons name="location-outline" size={16} color={COLORS.gray} />
                    <Text style={styles.bodyTitle}>Delivery Address</Text>
                </View>
                <TouchableOpacity onPress={onEdit} activeOpacity={0.7}>
                    <Text style={styles.editLink}>Change</Text>
                </TouchableOpacity>
            </View>
            
            {selectedAddress ? (
                <View style={[styles.compactCard, SHADOWS.small]}>
                    <View style={styles.compactIconCircle}>
                        <Ionicons name="location" size={16} color={COLORS.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={styles.compactTopRow}>
                            <Text style={styles.compactType}>{selectedAddress.type}</Text>
                            <Text style={styles.compactPhone}>{selectedAddress.phone}</Text>
                        </View>
                        <Text style={styles.compactDesc} numberOfLines={1}>{selectedAddress.address}</Text>
                    </View>
                </View>
            ) : (
                <TouchableOpacity style={[styles.compactCard, styles.compactCardEmpty]} onPress={onEdit}>
                    <Ionicons name="add-circle-outline" size={18} color={COLORS.primary} />
                    <Text style={styles.compactEmptyText}>Add a delivery address to continue</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const OfferSection = ({ appliedVoucher, onApply, onRemove }) => {
    const [code, setCode] = useState('');

    const handleApply = (voucherCode) => {
        const match = VOUCHERS.find(v => v.code === voucherCode.trim().toUpperCase());
        if (!match) {
            Alert.alert('Invalid Code', "This voucher code doesn't exist or has expired.");
            return;
        }
        onApply(match);
        setCode('');
    };

    return (
        <View style={styles.bodySection}>
            <View style={styles.titleRow}>
                <MaterialCommunityIcons name="ticket-percent-outline" size={16} color={COLORS.gray} />
                <Text style={styles.bodyTitle}>Offers & Vouchers</Text>
            </View>

            <View style={styles.offerInputRow}>
                <TextInput
                    style={styles.offerInput}
                    placeholder="Enter offer code"
                    placeholderTextColor={COLORS.placehoder}
                    value={code}
                    onChangeText={(t) => setCode(t.toUpperCase())}
                    autoCapitalize="characters"
                />
                <TouchableOpacity style={styles.applyBtn} onPress={() => handleApply(code)} activeOpacity={0.85}>
                    <Text style={styles.applyBtnText}>Apply</Text>
                </TouchableOpacity>
            </View>

            {appliedVoucher && (
                <View style={styles.appliedBanner}>
                    <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                    <Text style={styles.appliedText}>
                        <Text style={{ fontWeight: '900' }}>{appliedVoucher.code}</Text> applied — {appliedVoucher.label}
                    </Text>
                    <TouchableOpacity onPress={onRemove} hitSlop={8}>
                        <Ionicons name="close" size={16} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>
            )}

            <Text style={styles.vouchersLabel}>Available Vouchers</Text>
            {VOUCHERS.map(v => (
                <TouchableOpacity
                    key={v.code}
                    style={[styles.voucherCard, appliedVoucher?.code === v.code && styles.voucherCardActive]}
                    onPress={() => handleApply(v.code)}
                    activeOpacity={0.8}
                    disabled={appliedVoucher?.code === v.code}
                >
                    <View style={styles.voucherIconBox}>
                        <MaterialCommunityIcons name="ticket-confirmation-outline" size={20} color={COLORS.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.voucherCode}>{v.code}</Text>
                        <Text style={styles.voucherDesc}>{v.label} · Min. order ₹{v.minOrder}</Text>
                    </View>
                    <Text style={styles.voucherApplyLink}>
                        {appliedVoucher?.code === v.code ? 'Applied' : 'Apply'}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};


const PaymentBody = ({ method, setMethod }) => {
    const [upiId, setUpiId] = useState("");
    const [cardDetails, setCardDetails] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: ""
    });

    const Option = ({ id, name, icon, type, children, showSave = true }) => {
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
                    <Ionicons name={isActive ? "radio-button-on" : "radio-button-off"} size={22} color={isActive ? COLORS.primary : COLORS.gray2} />
                </TouchableOpacity>

                {isActive && children && (
                    <View style={styles.dropdownContent}>
                      {children}
                      {showSave && <TouchableOpacity style={styles.saveBtn} onPress={() => Alert.alert("Saved", `${name} Details Saved`)}>
                          <Text style={styles.saveBtnText}>Save Details</Text>
                        </TouchableOpacity>}
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.bodySection}>
            <View style={[styles.titleRow, { marginBottom: 15 }]}>
                <MaterialIcons name="payment" size={16} color={COLORS.gray} />
                <Text style={styles.bodyTitle}>Payment Method</Text>
            </View>
            
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

            <Option id="cod" name="Cash On Delivery" icon="payments" type="mat" showSave={false}>
                <Text style={styles.infoNote}>Please keep exact change ready to help our delivery partner.</Text>
            </Option>
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
    const [appliedVoucher, setAppliedVoucher] = useState(null);

    const cart = useSelector((state) => state.cart.cart);
    const baseDeliveryFee = 40;
    const subtotal = (cart || []).reduce((sum, item) => {
        const product = getProductById(item.id);
        return sum + (product?.price || 0) * item.quantity;
    }, 0);

    const voucherEligible = appliedVoucher && subtotal >= appliedVoucher.minOrder;
    const discount = voucherEligible && appliedVoucher.type === 'percent'
        ? Math.round(subtotal * (appliedVoucher.value / 100))
        : 0;
    const deliveryFee = voucherEligible && appliedVoucher.type === 'freeship' ? 0 : baseDeliveryFee;
    const total = subtotal + deliveryFee - discount;

    const handleApplyVoucher = (voucher) => {
        if (subtotal < voucher.minOrder) {
            Alert.alert('Almost there', `Add ₹${(voucher.minOrder - subtotal).toFixed(0)} more to use ${voucher.code}.`);
            return;
        }
        setAppliedVoucher(voucher);
        Alert.alert('Voucher Applied', `${voucher.code} — ${voucher.label}`);
    };

    const toggleBill = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowBill(!showBill);
    };

    const handleConfirm = () => {
        if (active === "Delivery") {
            setActive("Payment");
            return;
        }
        Alert.alert(
            "Order Placed! 🎉",
            "Your healthy meal is being prepared and is on its way.",
            [
                { text: "View Orders", onPress: () => navigation.navigate("Orders") },
                { text: "OK" },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <TopHeader title="Checkout" goto={() => active === "Delivery" ? navigation.goBack() : setActive("Delivery")} />

            <View style={styles.tabBar}>
                <TouchableOpacity 
                    style={[styles.tab, active === "Delivery" && styles.activeTab]} 
                    onPress={() => setActive("Delivery")}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.tabLabel, active === "Delivery" && styles.activeLabel]}>Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, active === "Payment" && styles.activeTab]} 
                    onPress={() => setActive("Payment")}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.tabLabel, active === "Payment" && styles.activeLabel]}>Payment</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollInside}>
                {active === "Delivery" ? (
                    <>
                        <DeliveryBody onEdit={() => setEditAddressPopup(true)} />
                        <OfferSection 
                            appliedVoucher={voucherEligible ? appliedVoucher : null} 
                            onApply={handleApplyVoucher} 
                            onRemove={() => setAppliedVoucher(null)} 
                        />
                    </>
                ) : (
                    <PaymentBody method={method} setMethod={setMethod} />
                )}
            </ScrollView>

            <View style={[styles.footer, showBill && styles.footerExpanded]}>
                {showBill && (
                    <View style={styles.billDetail}>
                        <View style={styles.billRow}><Text style={styles.billLabel}>Subtotal</Text><Text style={styles.billVal}>₹{subtotal.toFixed(2)}</Text></View>
                        <View style={styles.billRow}>
                            <View style={styles.billLabelRow}>
                                <Text style={styles.billLabel}>Delivery Fee</Text>
                                <TouchableOpacity onPress={() => setNotifyPaymentPopup(true)} hitSlop={8}>
                                    <Ionicons name="information-circle-outline" size={15} color={COLORS.gray} />
                                </TouchableOpacity>
                            </View>
                            {voucherEligible && appliedVoucher.type === 'freeship' ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                    <Text style={styles.billValStrike}>₹{baseDeliveryFee.toFixed(2)}</Text>
                                    <Text style={[styles.billVal, { color: COLORS.success }]}>FREE</Text>
                                </View>
                            ) : (
                                <Text style={styles.billVal}>₹{deliveryFee.toFixed(2)}</Text>
                            )}
                        </View>
                        {discount > 0 && (
                            <View style={styles.billRow}>
                                <Text style={[styles.billLabel, { color: COLORS.success }]}>Voucher ({appliedVoucher.code})</Text>
                                <Text style={[styles.billVal, { color: COLORS.success }]}>-₹{discount.toFixed(2)}</Text>
                            </View>
                        )}
                        <View style={styles.billDivider} />
                    </View>
                )}
                <View style={styles.footerActionRow}>
                    <TouchableOpacity style={styles.priceInfo} onPress={toggleBill} activeOpacity={0.7}>
                        <View style={styles.totalLabelRow}>
                            <Text style={styles.totalLabelText}>Total Balance</Text>
                            <MaterialIcons name={showBill ? "keyboard-arrow-down" : "keyboard-arrow-up"} size={18} color={COLORS.gray} />
                        </View>
                        <Text style={styles.totalAmountText}>₹{total.toFixed(2)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.confirmBtn, active === "Payment" && { backgroundColor: COLORS.black }]} 
                        onPress={handleConfirm}
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
    container: { 
        flex: 1, 
    },
    tabBar: { 
        flexDirection: 'row', 
        marginTop: 15, 
        marginHorizontal: PADDINGS.horizonatal + 30,
        backgroundColor: COLORS.softBg,
        borderRadius: 16,
        padding: 4,
    },
    tab: { 
        flex: 1,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center' 
    },
    activeTab: { 
        backgroundColor: COLORS.white,
        ...SHADOWS.small,
    },
    tabLabel: { 
        fontSize: 14,
        fontWeight: '700', 
        color: COLORS.inactiveGray 
    },
    activeLabel: { 
        color: COLORS.primary, 
        fontWeight: '900' 
    },
    scrollInside: { 
        paddingBottom: 160 
    },
    
    // Body & Delivery Card
    bodySection: { 
        marginTop: 25,
        paddingHorizontal: PADDINGS.horizonatal,
    },
    headerRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 15 
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    bodyTitle: { 
        fontSize: SIZES.medium, 
        fontWeight: '900', 
        color: COLORS.black 
    },
    editLink: { 
        color: COLORS.primary, 
        fontWeight: '700' 
    },

    compactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    compactIconCircle: {
        width: 34,
        height: 34,
        borderRadius: 11,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    compactTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    compactType: {
        fontSize: 13,
        fontWeight: '900',
        color: COLORS.black,
    },
    compactPhone: {
        fontSize: 11,
        fontWeight: '600',
        color: COLORS.gray,
    },
    compactDesc: {
        fontSize: 12,
        color: COLORS.gray,
        fontWeight: '500',
        marginTop: 2,
    },
    compactCardEmpty: {
        justifyContent: 'center',
        gap: 8,
        borderStyle: 'dashed',
        borderColor: COLORS.primary + '40',
    },
    compactEmptyText: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.primary,
    },

    // Offers & Vouchers
    offerInputRow: {
        flexDirection: 'row',
        gap: 10,
    },
    offerInput: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 48,
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.black,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    applyBtn: {
        backgroundColor: COLORS.black,
        borderRadius: 16,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyBtnText: {
        color: COLORS.white,
        fontSize: 13,
        fontWeight: '900',
    },
    appliedBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: COLORS.success + '10',
        borderRadius: 14,
        padding: 12,
        marginTop: 12,
    },
    appliedText: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.black,
    },
    vouchersLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: COLORS.gray,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: 18,
        marginBottom: 10,
    },
    voucherCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
    },
    voucherCardActive: {
        borderColor: COLORS.success,
        borderStyle: 'solid',
        backgroundColor: COLORS.success + '08',
    },
    voucherIconBox: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: COLORS.primary + '10',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    voucherCode: {
        fontSize: 13,
        fontWeight: '900',
        color: COLORS.black,
        letterSpacing: 0.3,
    },
    voucherDesc: {
        fontSize: 11,
        color: COLORS.gray,
        fontWeight: '500',
        marginTop: 2,
    },
    voucherApplyLink: {
        fontSize: 12,
        fontWeight: '800',
        color: COLORS.primary,
    },
    billValStrike: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.gray2,
        textDecorationLine: 'line-through',
    },

    // Payment Tiles & Dropdown
    tileWrapper: { backgroundColor: COLORS.white, borderRadius: 20, marginBottom: 12, overflow: 'hidden' },
    tile: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderWidth: 1.5, borderRadius: 20 },
    activeTile: { borderColor: COLORS.primary },
    inactiveTile: { borderColor: 'transparent' },
    tileLeft: { flexDirection: 'row', alignItems: 'center' },
    tileIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    activeIcon: { backgroundColor: COLORS.primary },
    inactiveIcon: { backgroundColor: COLORS.divider },
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
        backgroundColor: COLORS.softBg, 
        borderRadius: 12, 
        padding: 12, 
        fontSize: 14, 
        color: COLORS.black, 
        borderWidth: 1, 
        borderColor: COLORS.border,
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
    billLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    billLabel: { fontSize: 14, color: COLORS.gray, fontWeight: '500' },
    billVal: { fontSize: 14, color: COLORS.black, fontWeight: '700' },
    billDivider: { height: 1, backgroundColor: COLORS.divider, marginVertical: 10 },
    footerActionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    priceInfo: { flex: 1 },
    totalLabelRow: { flexDirection: 'row', alignItems: 'center' },
    totalLabelText: { fontSize: 11, color: COLORS.gray, fontWeight: '700', textTransform: 'uppercase', marginRight: 4 },
    totalAmountText: { fontSize: 22, fontWeight: '900', color: COLORS.black },
    confirmBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 30, paddingVertical: 14, borderRadius: 16 },
    confirmBtnText: { color: COLORS.white, fontWeight: '900', fontSize: 15 }
});