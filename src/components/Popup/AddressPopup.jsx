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
import { Entypo, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

/**
 * COMPONENT: BodyItem
 */
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
                        </ScrollView>

                        {/* Bottom Action Section */}
                        <View style={styles.bottom}>
                            <TouchableOpacity 
                                style={[styles.submitBtn, SHADOWS.small]} 
                                activeOpacity={0.8}
                                onPress={() => alert("Address Submitted")}
                            >
                                <Text style={styles.buttonText}>Save Address</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background
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
    submitBtn: {
        backgroundColor: COLORS.primary,
        width: '100%',
        paddingVertical: 15,
        borderRadius: 15, 
        alignItems: 'center'
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontWeight: '800'
    }
});


// import React, { useState } from 'react'
// import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity, TextInput } from 'react-native'
// import { COLORS, SIZES } from '../../constants'
// import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
// import { Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useSelector } from 'react-redux';


// const BodyItem = ({icon, placeholder, keyboardtype, value, changeValue}) => {
//     return (
//         <View style={styles.bodyItem}>
//             {icon}
//             <TextInput 
//                 style={styles.input}
//                 placeholder={placeholder}
//                 value={value}
//                 onChangeText={changeValue}
//                 keyboardType={keyboardtype}
//                 multiline={placeholder==="Address"||placeholder==="Landmark"}
//                 numberOfLines={placeholder==="Address"||placeholder==="Landmark"?2:1}
//             />

//         </View>
//     )
// }

// export const AddressPopup = ({closePopup, type, isEmail}) => {

//     const detail = useSelector(state => state.account.detail);

//     const [name, setName] = useState(detail.name)
//     const [email, setEmail] = useState(detail.email)
//     const [address, setAddress] = useState(detail.address)
//     const [landmark, setLandmark] = useState()
//     const [city, setCity] = useState("")
//     const [phone, setPhone] = useState("")
//     const [pincode, setPincode] = useState("")

//     return (
//         <Modal animationType='slide'>
//             <View style={styles.container}>
//                 <View style={styles.heading}>
//                     <Text style={styles.header}>{type}</Text>
//                     <TouchableOpacity onPress={closePopup}>
//                         <Entypo name='cross' size={24} />
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.body}>
//                     <BodyItem 
//                         icon={<Ionicons name="person" size={20} color={COLORS.primary} />}
//                         placeholder="Name"
//                         keyboardtype="default"
//                         value={name}
//                         changeValue={(e) => setName(e.trimStart())}
//                     />
//                     {isEmail && 
//                         <BodyItem 
//                             icon={<Entypo name="email" size={20} color={COLORS.primary} />}
//                             placeholder="Email"
//                             keyboardtype="default"
//                             value={email}
//                             changeValue={(e) => setEmail(e.trim())}
//                         />
//                     }
//                     <BodyItem 
//                         icon={<FontAwesome name="address-book" size={20} color={COLORS.primary} />}
//                         placeholder="Address"
//                         keyboardtype="default"
//                         value={address}
//                         changeValue={(e) => setAddress(e.trimStart())}
//                     />
//                     <BodyItem 
//                         icon={<FontAwesome5 name="landmark" size={20} color={COLORS.primary} />}
//                         placeholder="Landmark"
//                         keyboardtype="default"
//                         value={landmark}
//                         changeValue={(e) => setLandmark(e.trimStart())}
//                     />
//                     <BodyItem 
//                         icon={<FontAwesome5 name="city" size={20} color={COLORS.primary} />}
//                         placeholder="City/Town"
//                         keyboardtype="default"
//                         value={city}
//                         changeValue={(e) => setCity(e.trim())}
//                     />
//                     <BodyItem 
//                         icon={<FontAwesome name="phone" size={20} color={COLORS.primary} />}
//                         placeholder="Phone"
//                         keyboardtype="numeric"
//                         value={phone}
//                         changeValue={(e) => setPhone(e.trim())}
//                     />
//                     <BodyItem 
//                         icon={<FontAwesome5 name="map-pin" size={20} color={COLORS.primary} />}
//                         placeholder="Pincode"
//                         keyboardtype="numeric"
//                         value={pincode}
//                         changeValue={(e) => setPincode(e.trim())}
//                     />
//                 </View>
//                 <View style={styles.bottom}>
//                     <TouchableOpacity>
//                         <Text style={styles.button}>Submit</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal>
//     )
// }


// const styles = StyleSheet.create({
//     container: { 
//         flex:1, 
//         position: 'relative',
//         backgroundColor:COLORS.background,
//         paddingHorizontal: 35,
//         paddingVertical: 50
//     },
//     heading: {
//         display:'flex',
//         flexDirection:'row',
//         justifyContent: 'space-between',
//         alignItems:'center'
//     },
//     header: {
//         fontSize: 15,
//         fontWeight: 600
//     },
//     body: {
//         paddingVertical: 20
//     },
//     bodyItem: {
//         display:'flex',
//         flexDirection:'row',
//         justifyContent:'space-between',
//         alignItems:'center',
//         borderBottomWidth: 1,
//         borderColor: '#0000080',
//         paddingVertical: 10,
//         marginVertical: 10
//     },
//     input: {
//         fontSize: SIZES.medium,
//         width: '85%',
//         opacity: 0.8,
//     },
//     bottom: {
//         display:'flex',
//         justifyContent:'center',
//         alignItems:'center'
//     },
//     button: {
//         color: COLORS.white,
//         backgroundColor: COLORS.primary,
//         paddingHorizontal: 35,
//         paddingVertical: 15,
//         fontSize: 15,
//         fontWeight: 600,
//         borderRadius: 3
//     }
// })