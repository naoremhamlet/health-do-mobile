import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity, TextInput } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';


const BodyItem = ({icon, placeholder, keyboardtype, value, changeValue}) => {
    return (
        <View style={styles.bodyItem}>
            {icon}
            <TextInput 
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={changeValue}
                keyboardType={keyboardtype}
                multiline={placeholder==="Address"||placeholder==="Landmark"}
                numberOfLines={placeholder==="Address"||placeholder==="Landmark"?2:1}
            />

        </View>
    )
}

export const AddressPopup = ({closePopup, type, isEmail}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [landmark, setLandmark] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [pincode, setPincode] = useState("")

    return (
        <Modal animationType='slide'>
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.header}>{type}</Text>
                    <TouchableOpacity onPress={closePopup}>
                        <Entypo name='cross' size={24} />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <BodyItem 
                        icon={<Ionicons name="person" size={20} color={COLORS.primary} />}
                        placeholder="Name"
                        keyboardtype="default"
                        value={name}
                        changeValue={(e) => setName(e.trimStart())}
                    />
                    {isEmail && 
                        <BodyItem 
                            icon={<Entypo name="email" size={20} color={COLORS.primary} />}
                            placeholder="Email"
                            keyboardtype="default"
                            value={email}
                            changeValue={(e) => setEmail(e.trim())}
                        />
                    }
                    <BodyItem 
                        icon={<FontAwesome name="address-book" size={20} color={COLORS.primary} />}
                        placeholder="Address"
                        keyboardtype="default"
                        value={address}
                        changeValue={(e) => setAddress(e.trimStart())}
                    />
                    <BodyItem 
                        icon={<FontAwesome5 name="landmark" size={20} color={COLORS.primary} />}
                        placeholder="Landmark"
                        keyboardtype="default"
                        value={landmark}
                        changeValue={(e) => setLandmark(e.trimStart())}
                    />
                    <BodyItem 
                        icon={<FontAwesome5 name="city" size={20} color={COLORS.primary} />}
                        placeholder="City/Town"
                        keyboardtype="default"
                        value={city}
                        changeValue={(e) => setCity(e.trim())}
                    />
                    <BodyItem 
                        icon={<FontAwesome name="phone" size={20} color={COLORS.primary} />}
                        placeholder="Phone"
                        keyboardtype="numeric"
                        value={phone}
                        changeValue={(e) => setPhone(e.trim())}
                    />
                    <BodyItem 
                        icon={<FontAwesome5 name="map-pin" size={20} color={COLORS.primary} />}
                        placeholder="Pincode"
                        keyboardtype="numeric"
                        value={pincode}
                        changeValue={(e) => setPincode(e.trim())}
                    />
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity>
                        <Text style={styles.button}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: { 
        flex:1, 
        position: 'relative',
        backgroundColor:COLORS.background,
        paddingHorizontal: 35,
        paddingVertical: 50
    },
    heading: {
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    header: {
        fontSize: 15,
        fontWeight: 600
    },
    body: {
        paddingVertical: 20
    },
    bodyItem: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth: 1,
        borderColor: '#0000080',
        paddingVertical: 10,
        marginVertical: 10
    },
    input: {
        fontSize: SIZES.medium,
        width: '85%',
        opacity: 0.8,
    },
    bottom: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        color: COLORS.white,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 35,
        paddingVertical: 15,
        fontSize: 15,
        fontWeight: 600,
        borderRadius: 3
    }
})