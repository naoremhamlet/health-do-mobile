import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import PopupShell from './PopupShell';

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
                placeholderTextColor={COLORS.placehoder}
                value={value}
                onChangeText={changeValue}
                keyboardType={keyboardtype}
                multiline={isMultiline}
                numberOfLines={isMultiline ? 3 : 1}
            />
        </View>
    );
};

export const AddressPopup = ({ closePopup, type, isEmail, initialValues, onSave }) => {
    const detail = useSelector(state => state.account.detail);
    const seed = initialValues || {};

    const [name, setName] = useState(seed.name ?? detail.name);
    const [email, setEmail] = useState(seed.email ?? detail.email);
    const [address, setAddress] = useState(seed.address ?? detail.address);
    const [landmark, setLandmark] = useState(seed.landmark ?? "");
    const [city, setCity] = useState(seed.city ?? "");
    const [phone, setPhone] = useState(seed.phone ?? "");
    const [pincode, setPincode] = useState(seed.pincode ?? "");

    const handleSave = () => {
        if (!name.trim() || !address.trim()) {
            Alert.alert("Required Fields", "Name and Address are mandatory.");
            return;
        }
        const result = { name, email, address, landmark, city, phone, pincode };
        if (onSave) {
            onSave(result);
        } else {
            Alert.alert("Success", "Address Saved");
        }
        closePopup();
    };

    return (
        <PopupShell
            title={type}
            onClose={closePopup}
            primaryAction={{ label: 'Save Address', onPress: handleSave }}
        >
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
        </PopupShell>
    );
};

const styles = StyleSheet.create({
    bodyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: COLORS.divider,
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
});
