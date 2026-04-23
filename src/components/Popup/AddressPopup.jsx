import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Modal, 
    TouchableOpacity, 
    TextInput, 
    ScrollView, 
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants';
import { Entypo, FontAwesome, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const ActionButtons = ({ onTick }) => {
  return (
    <View style={styles.btncontainer}>
        <TouchableOpacity 
            onPress={onTick} 
            activeOpacity={0.7}
            style={[styles.button, styles.saveBtn, SHADOWS.small]}
        >
            <Feather name="check" size={24} color={COLORS.white} />
        </TouchableOpacity>

    </View>
  );
};

const BodyItem = ({ icon, placeholder, keyboardtype, value, changeValue }) => {
    const isMultiline = placeholder === "Address" || placeholder === "Landmark";
    
    return (
        <View style={styles.bodyItem}>
            <View style={styles.iconBox}>
                {icon}
            </View>
            <TextInput 
                style={[styles.input, isMultiline && { textAlignVertical: 'top' }]}
                placeholder={placeholder}
                placeholderTextColor={COLORS.gray2}
                value={value}
                onChangeText={changeValue}
                keyboardType={keyboardtype}
                multiline={isMultiline}
                numberOfLines={isMultiline ? 3 : 1}
            />
        </View>
    );
};

export const AddressPopup = ({ closePopup, type, isEmail }) => {
    const detail = useSelector(state => state.account.detail);

    const [name, setName] = useState(detail.name);
    const [email, setEmail] = useState(detail.email);
    const [address, setAddress] = useState(detail.address);
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [pincode, setPincode] = useState("");

    return (
        <Modal animationType='slide' transparent={false} onRequestClose={closePopup}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <View style={styles.container}>
                        {/* Header Section */}
                        <View style={styles.heading}>
                            <Text style={styles.header}>{type}</Text>
                            <TouchableOpacity onPress={closePopup} style={styles.closeBtn}>
                                <Entypo name='cross' size={24} color={COLORS.black} />
                            </TouchableOpacity>
                        </View>

                        {/* Form Section */}
                        <ScrollView 
                            showsVerticalScrollIndicator={false} 
                            contentContainerStyle={styles.scrollBody}
                        >
                            <View style={styles.body}>
                                <BodyItem 
                                    icon={<Ionicons name="person" size={20} color={COLORS.primary} />}
                                    placeholder="Name"
                                    value={name}
                                    changeValue={(text) => setName(text.trimStart())}
                                />
                                {isEmail && 
                                    <BodyItem 
                                        icon={<Ionicons name="mail" size={20} color={COLORS.primary} />}
                                        placeholder="Email"
                                        value={email}
                                        changeValue={(text) => setEmail(text.trim())}
                                    />
                                }
                                <BodyItem 
                                    icon={<FontAwesome name="address-book" size={20} color={COLORS.primary} />}
                                    placeholder="Address"
                                    value={address}
                                    changeValue={(text) => setAddress(text.trimStart())}
                                />
                                <BodyItem 
                                    icon={<FontAwesome5 name="landmark" size={20} color={COLORS.primary} />}
                                    placeholder="Landmark"
                                    value={landmark}
                                    changeValue={(text) => setLandmark(text.trimStart())}
                                />
                                <View style={styles.row}>
                                    <View style={{ flex: 1, marginRight: 10 }}>
                                        <BodyItem 
                                            icon={<FontAwesome5 name="city" size={18} color={COLORS.primary} />}
                                            placeholder="City"
                                            value={city}
                                            changeValue={setCity}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <BodyItem 
                                            icon={<FontAwesome5 name="map-pin" size={18} color={COLORS.primary} />}
                                            placeholder="Pincode"
                                            keyboardtype="numeric"
                                            value={pincode}
                                            changeValue={setPincode}
                                        />
                                    </View>
                                </View>
                                <BodyItem 
                                    icon={<FontAwesome name="phone" size={20} color={COLORS.primary} />}
                                    placeholder="Phone"
                                    keyboardtype="numeric"
                                    value={phone}
                                    changeValue={setPhone}
                                />
                            </View>
                            <ActionButtons onTick={() => alert("Address Saved")} />
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: { 
        flex: 1, 
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    header: {
        fontSize: SIZES.medium,
        fontWeight: '900',
        color: COLORS.black
    },
    closeBtn: {
        backgroundColor: COLORS.lightWhite,
        padding: 5,
        borderRadius: 20
    },
    scrollBody: {
        paddingBottom: 20
    },
    body: {
        paddingVertical: 10
    },
    bodyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: COLORS.gray2 + '50', // Half-transparent gray for a clean line
        paddingVertical: 12,
        marginVertical: 8
    },
    iconBox: {
        width: 35,
        alignItems: 'flex-start'
    },
    input: {
        flex: 1,
        fontSize: SIZES.small + 2,
        color: COLORS.black,
        fontWeight: '500'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottom: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btncontainer: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveBtn: {
        backgroundColor: '#4CAF50', // Solid "Success" Green
    },
});