import React, { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES, SHADOWS, image } from '../constants' 
import { Ionicons, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../store/reducer/account';
import TopHeader from './TopHeader';


const ActionButtons = ({ onTick }) => {
  return (
    <TouchableOpacity 
        onPress={onTick} 
        activeOpacity={0.85}
        style={[styles.saveBtn, SHADOWS.medium]}
    >
        <Feather name="check" size={18} color={COLORS.white} />
        <Text style={styles.saveBtnText}>Save Changes</Text>
    </TouchableOpacity>
  );
};

const BodyItem = ({ icon, label, placeholder, keyboardtype, value, changeValue, error, helper }) => (
    <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={[styles.bodyItem, error && styles.bodyItemError]}>
            <View style={styles.iconBox}>{icon}</View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={changeValue}
                keyboardType={keyboardtype}
                placeholderTextColor={COLORS.placehoder}
                selectionColor={COLORS.primary}
            />
        </View>
        {error ? (
            <Text style={styles.errorText}>{error}</Text>
        ) : helper ? (
            <Text style={styles.helperText}>{helper}</Text>
        ) : null}
    </View>
);

export default function EditAccount({ goBack }) {
    const dispatch = useDispatch();
    const detail = useSelector(state => state.account.detail);

    const [name, setName] = useState(detail.name)
    const [email, setEmail] = useState(detail.email)
    const [phone, setPhone] = useState(detail.phone)
    const [profileImage, setProfileImage] = useState(detail.profileImage)
    const [errors, setErrors] = useState({});

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera roll access is needed to update your photo.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setProfileImage({ uri: result.assets[0].uri });
        }
    };

    const validate = () => {
        const next = {};
        if (!name.trim()) next.name = "Name can't be empty.";
        if (!email.trim()) {
            next.email = "Email can't be empty.";
        } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
            next.email = "That doesn't look like a valid email.";
        }
        if (phone && phone.replace(/\D/g, '').length < 10) {
            next.phone = "Phone number looks too short.";
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;
        const updatedDetail = { 
            ...detail, 
            name, 
            email, 
            phone, 
            profileImage: profileImage?.uri || profileImage 
        };
        dispatch(updateAccount({ id: 1, detail: updatedDetail }));
        Alert.alert("Success", "Your profile has been updated.");
        goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.decorBlob} />
            <TopHeader title="Edit Profile" goto={goBack} />

            <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
                
                {/* 1. Profile Image Section */}
                <View style={styles.imageSection}>
                    <View style={styles.imgContainer}>
                        {(profileImage || profileImage?.uri) ?
                            <Image source={profileImage?.uri ? { uri: profileImage.uri } : profileImage} style={styles.detailImg} />
                            :   <View style={styles.detailImg}>
                                    <MaterialIcons name='person' size={56} color={COLORS.primary} />
                                </View>
                        }
                        
                        <TouchableOpacity style={[styles.cameraBtn, SHADOWS.small]} onPress={pickImage} activeOpacity={0.9}>
                            <Ionicons name="camera" size={16} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={pickImage} activeOpacity={0.7}>
                        <Text style={styles.changeText}>Update Photo</Text>
                    </TouchableOpacity>
                </View>

                {/* 2. Form Fields */}
                <View style={[styles.formCard, SHADOWS.small]}>
                    <BodyItem
                        label="Full Name"
                        icon={<Ionicons name="person-outline" size={17} color={COLORS.primary} />}
                        placeholder="Enter your name"
                        value={name}
                        changeValue={(t) => { setName(t); if (errors.name) setErrors(e => ({ ...e, name: null })); }}
                        error={errors.name}
                    />
                    <BodyItem
                        label="Email Address"
                        icon={<MaterialCommunityIcons name="email-outline" size={17} color={COLORS.primary} />}
                        placeholder="example@mail.com"
                        keyboardtype="email-address"
                        value={email}
                        changeValue={(t) => { setEmail(t); if (errors.email) setErrors(e => ({ ...e, email: null })); }}
                        error={errors.email}
                        helper={!errors.email ? "Order updates and receipts go here." : null}
                    />
                    <View style={{ marginBottom: 0 }}>
                        <BodyItem
                            label="Phone Number"
                            icon={<Ionicons name="call-outline" size={17} color={COLORS.primary} />}
                            placeholder="+91 00000 00000"
                            keyboardtype="numeric"
                            value={phone}
                            changeValue={(t) => { setPhone(t); if (errors.phone) setErrors(e => ({ ...e, phone: null })); }}
                            error={errors.phone}
                        />
                    </View>
                </View>

                <View style={{ height: 30 }} /> 

                <ActionButtons onTick={handleSave}/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.softBg,
        overflow: 'hidden',
    },
    decorBlob: {
        position: 'absolute',
        top: -70,
        right: -60,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: COLORS.primary + '08',
    },
    scrollBody: {
        paddingHorizontal: 25,
        paddingTop: 10,
        paddingBottom: 40,
    },
    imageSection: {
        alignItems: 'center',
        marginVertical: 30
    },
    imgContainer: {
        position: 'relative',
        padding: 4,
        borderRadius: 62,
        borderWidth: 2,
        borderColor: COLORS.primary + '30',
    },
    detailImg: {
        width: 104,
        height: 104,
        borderRadius: 52,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary + '10',
    },
    cameraBtn: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        backgroundColor: COLORS.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.white
    },
    changeText: {
        marginTop: 12,
        fontSize: 13,
        fontWeight: '800',
        color: COLORS.primary,
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    formCard: {
        backgroundColor: COLORS.white,
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    inputWrapper: {
        marginBottom: 20
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: COLORS.gray,
        marginBottom: 8,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    bodyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.softBg,
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 54,
        borderWidth: 1.5,
        borderColor: COLORS.border,
    },
    bodyItemError: {
        borderColor: COLORS.red,
        backgroundColor: COLORS.red + '08',
    },
    iconBox: {
        marginRight: 10,
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: COLORS.black,
        fontWeight: '600',
        height: '100%',
    },
    errorText: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.red,
        marginTop: 6,
        marginLeft: 4,
    },
    helperText: {
        fontSize: 11,
        fontWeight: '500',
        color: COLORS.gray,
        marginTop: 6,
        marginLeft: 4,
    },

    saveBtn: {
        flexDirection: 'row',
        gap: 10,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    saveBtnText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '900',
    },
})
