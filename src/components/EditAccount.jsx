import React, { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, TextInput, Platform, Animated, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES, SHADOWS, image } from '../constants' 
import { Ionicons, MaterialCommunityIcons, FontAwesome, Entypo, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../store/reducer/account';
import TopHeader from './TopHeader';


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

const BodyItem = ({ icon, label, placeholder, keyboardtype, value, changeValue }) => (
    <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={styles.bodyItem}>
            <View style={styles.iconBox}>{icon}</View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={changeValue}
                keyboardType={keyboardtype}
                placeholderTextColor="#A0A0A0"
                selectionColor={COLORS.primary} // High-end cursor color
            />
        </View>
    </View>
);

export default function EditAccount({ goBack }) {
    const dispatch = useDispatch();
    const detail = useSelector(state => state.account.detail);

    const [name, setName] = useState(detail.name)
    const [email, setEmail] = useState(detail.email)
    const [phone, setPhone] = useState(detail.phone)
    const [profileImage, setProfileImage] = useState(detail.profileImage || image.avatar)

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

    const handleSave = () => {
        if (!name.trim() || !email.trim()) {
            Alert.alert("Required Fields", "Name and Email are mandatory.");
            return;
        }
        const updatedDetail = { 
            ...detail, 
            name, 
            email, 
            phone, 
            profileImage: profileImage.uri || profileImage 
        };
        dispatch(updateAccount({ id: 1, detail: updatedDetail }));
        Alert.alert("Success", "Your profile has been updated.");
        goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopHeader title="Edit Profile" goto={goBack} />

            <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
                
                {/* 1. Profile Image Section */}
                <View style={styles.imageSection}>
                    <View style={styles.imgContainer}>
                        <Image source={profileImage?.uri ? { uri: profileImage.uri } : profileImage} style={styles.detailImg} />
                        <TouchableOpacity style={[styles.cameraBtn, SHADOWS.small]} onPress={pickImage} activeOpacity={0.9}>
                            <Ionicons name="camera" size={18} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.changeText}>Update Photo</Text>
                </View>

                {/* 2. Form Fields */}
                <View style={styles.formSection}>
                    <BodyItem
                        label="Full Name"
                        icon={<Ionicons name="person-outline" size={18} color={COLORS.primary} />}
                        placeholder="Enter your name"
                        value={name}
                        changeValue={setName}
                    />
                    <BodyItem
                        label="Email Address"
                        icon={<MaterialCommunityIcons name="email-outline" size={18} color={COLORS.primary} />}
                        placeholder="example@mail.com"
                        keyboardtype="email-address"
                        value={email}
                        changeValue={setEmail}
                    />
                    <BodyItem
                        label="Phone Number"
                        icon={<Ionicons name="call-outline" size={18} color={COLORS.primary} />}
                        placeholder="+91 00000 00000"
                        keyboardtype="numeric"
                        value={phone}
                        changeValue={setPhone}
                    />
                </View>

                <View style={{ height: 40 }} /> 

                <ActionButtons onTick={handleSave}/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white, // Grounds the off-white inputs
    },
    scrollBody: {
        paddingHorizontal: 30,
        paddingTop: 10
    },
    imageSection: {
        alignItems: 'center',
        marginVertical: 35
    },
    imgContainer: {
        position: 'relative'
    },
    detailImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#F0F0F0',
        backgroundColor: '#F9F9F9',
    },
    cameraBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.black,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.white
    },
    changeText: {
        marginTop: 10,
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.primary,
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    formSection: {
        marginTop: 5
    },
    inputWrapper: {
        marginBottom: 22
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
        backgroundColor: '#F8F8F8', // Signals "input area"
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 58,
        borderWidth: 1.5,
        borderColor: '#E8E8E8', // Defined boundary
    },
    iconBox: {
        marginRight: 12,
        width: 25,
        alignItems: 'center'
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: COLORS.black,
        fontWeight: '600',
        height: '100%',
    },

    btncontainer: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelBtn: {
        backgroundColor: '#FF525215', // Subtle light red background
        borderWidth: 1,
        borderColor: '#FF525230',
    },
    saveBtn: {
        backgroundColor: '#4CAF50', // Solid "Success" Green
    },
})

// import React, { useState } from 'react'
// import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, TextInput } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import * as ImagePicker from 'expo-image-picker'; // 1. Import library
// import { COLORS, SIZES, image } from '../constants' // Import local fallback 'image'
// import { Ionicons, MaterialCommunityIcons, FontAwesome, Entypo } from '@expo/vector-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateAccount } from '../store/reducer/account';
// import TopHeader from './TopHeader';
// import CustomButton from './CustomButton';

// // Reusable Input Component (keeps state management internal)
// const BodyItem = ({ icon, placeholder, keyboardtype, value, changeValue }) => (
//     <View style={styles.bodyItem}>
//         <View style={styles.iconBox}>{icon}</View>
//         <TextInput
//             style={styles.input}
//             placeholder={placeholder}
//             value={value}
//             onChangeText={changeValue} // Receives plain text, not event object
//             keyboardType={keyboardtype}
//             placeholderTextColor="#00000050"
//         />
//     </View>
// );

// export default function EditAccount({ goBack }) {
//     const dispatch = useDispatch();
//     const detail = useSelector(state => state.account.detail);

//     // Profile State
//     const [name, setName] = useState(detail.name)
//     const [email, setEmail] = useState(detail.email)
//     const [phone, setPhone] = useState(detail.phone)

//     // 2. Image State (Initializes with Redux URI or local fallback)
//     const [profileImage, setProfileImage] = useState(detail.profileImage || image.avatar)

//     // 3. Image Picker Function
//     const pickImage = async () => {
//         // Request Permissions (Mandatory for iOS, good practice for Android)
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//         if (status !== 'granted') {
//             Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to change your avatar.');
//             return;
//         }

//         // Launch the picker
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true, // Crucial for profile pictures
//             aspect: [1, 1], // Force square crop
//             quality: 0.7, // Reduce quality for faster network uploads later
//         });

//         // 4. Update local state with the selected image URI
//         if (!result.canceled) {
//             setProfileImage({ uri: result.assets[0].uri });
//         }
//     };

//     const handleSave = () => {
//         // Basic Validation
//         if (!name.trim() || !email.trim()) {
//             Alert.alert("Required Fields", "Name and Email cannot be empty.");
//             return;
//         }

//         // Prepare updated object (preserving address and updating image URI)
//         const updatedDetail = {
//             ...detail,
//             name,
//             email,
//             phone,
//             profileImage: profileImage.uri // Store the URI string in Redux
//         };

//         dispatch(updateAccount({ id: 1, detail: updatedDetail }));

//         Alert.alert("Success", "Profile updated successfully!");
//         goBack();
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             <TopHeader title="Edit Account" goto={goBack} />

//             <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>

//                 {/* 5. Image Section */}
//                 <View style={styles.imageSection}>
//                     <View style={styles.imgContainer}>
//                         {/* Display current image */}
//                         <Image source={profileImage} style={styles.detailImg} />

//                         {/* The small floating camera icon */}
//                         <TouchableOpacity style={styles.cameraBtn} onPress={pickImage} activeOpacity={0.8}>
//                             <Entypo name="camera" size={18} color={COLORS.white} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {/* Form Fields */}
//                 <View style={styles.formSection}>
//                     <BodyItem
//                         icon={<Ionicons name="person" size={20} color={COLORS.primary} />}
//                         placeholder="Full Name"
//                         value={name}
//                         changeValue={setName} // Text arrives here, direct state update
//                     />
//                     <BodyItem
//                         icon={<MaterialCommunityIcons name="email" size={20} color={COLORS.primary} />}
//                         placeholder="Email Address"
//                         keyboardtype="email-address"
//                         value={email}
//                         changeValue={setEmail}
//                     />
//                     <BodyItem
//                         icon={<FontAwesome name="phone" size={20} color={COLORS.primary} />}
//                         placeholder="Phone Number"
//                         keyboardtype="numeric"
//                         value={phone}
//                         changeValue={setPhone}
//                     />
//                 </View>
//             </ScrollView>

//             <CustomButton
//                 title="Save Changes"
//                 goto={handleSave}
//                 additionalStyle={styles.customBtnAdjustment}
//             />
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1, 
//         paddingHorizontal: 35, 
//         paddingVertical: 50 
//     },
//     scrollBody: { 
//         paddingTop: 20 
//     },

//     // Image Styles
//     imageSection: {
//         alignItems: 'center',
//         marginVertical: 30
//     },
//     imgContainer: {
//         position: 'relative' // Needed for cameraBtn position absolute
//     },
//     detailImg: {
//         width: 120,
//         height: 120,
//         borderRadius: 60, // Perfect circle
//         borderWidth: 3,
//         borderColor: COLORS.white,
//         backgroundColor: '#e1e1e1' // Gray while loading
//     },
//     cameraBtn: {
//         position: 'absolute',
//         bottom: 0,
//         right: 0,
//         backgroundColor: COLORS.primary,
//         width: 38,
//         height: 38,
//         borderRadius: 19, // Circular button
//         justifyContent: 'center',
//         alignItems: 'center',
//         elevation: 5, // Android shadow
//         shadowColor: 'black', // iOS shadow
//         shadowOpacity: 0.2,
//         shadowRadius: 5,
//         shadowOffset: { width: 0, height: 2 },
//     },

//     formSection: {
//         marginTop: 10
//     },
//     bodyItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderColor: '#00000015',
//         paddingVertical: 15,
//         marginVertical: 5
//     },
//     iconBox: { 
//         width: 40 
//     },
//     input: { 
//         flex: 1, 
//         fontSize: SIZES.medium, 
//         color: 'black', 
//         fontWeight: '500' 
//     },

//     customBtnAdjustment: {
//         // flex: 1,
//         // marginTop: 20,
//         // minHeight: 60,
//     }
// })