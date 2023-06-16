import React, { useRef } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { COLORS, SIZES, image } from '../constants'
import { Card } from 'react-native-shadow-cards';
import CustomButton from '../components/CustomButton';


function TopSection() {
    return (
        <Card style={styles.topContainer}>
            <Image style={styles.topLogo} source={image.logo} />
            <Text style={styles.topTitle}>Login/Register</Text>
        </Card>
    )
}

function OTPContainer() {

    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()


    return (
        <View style={styles.otpContainer}>
            <TextInput 
                ref={ref1}
                onChangeText={() => {
                    ref2.current.focus()
                }}
                style={styles.otpInput} 
                keyboardType='numeric' 
                maxLength={1} />
            <TextInput 
                ref={ref2}
                onChangeText={() => {
                    ref3.current.focus()
                }}
                style={styles.otpInput} 
                keyboardType='numeric' 
                maxLength={1} />
            <TextInput 
                ref={ref3}
                onChangeText={() => {
                    ref4.current.focus()
                }}
                style={styles.otpInput} 
                keyboardType='numeric' 
                maxLength={1} />
            <TextInput 
                ref={ref4}
                style={styles.otpInput} 
                keyboardType='numeric' 
                maxLength={1} />
        </View>
    )
}

function Form() {
    return (
        <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Mobile Number</Text>
            <View style={styles.mobileContainer}>
                <Text style={styles.mobilePlaceholder}>+91</Text>
                <TextInput
                    onSubmitEditing={() => {
                        alert("OTP Sent")
                    }}
                    maxLength={10}
                    style={styles.mobileInput}
                    keyboardType='numeric' />
            </View>
            <Text style={styles.formLabel}>OTP</Text>
            {/* <OTPTextInput 
                containerStyle={styles.otpContainer}
                textInputStyle={styles.otpInput} /> */}
            <OTPContainer />
            <TouchableOpacity>
                <Text style={styles.resend} onPress={() => alert("OTP Resend")}>Resend OTP?</Text>
            </TouchableOpacity>
        </View>
    )
}

export default function Login({navigation}) {
    return (
        <View style={styles.container} >
            <TopSection />
            <Form />
            <CustomButton  title={"Login"} goto={()=>navigation.navigate('Homepage')} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
    },

    topContainer: {
        height: 380,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 30,
        elevation: 10,
    },
    topLogo: {
        width: 130,
        height: 145,
        marginBottom: 40
    },
    topTitle: {
        fontWeight: 900,
        paddingHorizontal: 30,
        paddingVertical: 10,
        fontSize: SIZES.medium,
        borderBottomWidth: 2,
        borderColor: COLORS.primary
    },

    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 50,
        width: '100%',
    },

    formLabel: {
        fontSize: 15,
        fontWeight: 900,
        opacity: 0.4,
    },
    mobileContainer: {
        position: 'relative'
    },
    mobilePlaceholder: {
        position: 'absolute',
        left: 0,
        top: 8,
        fontSize: SIZES.medium,
        alignSelf:'center'
    },
    mobileInput: {
        borderBottomWidth: 1,
        borderColor: "#00000050",
        marginBottom: 50,
        paddingVertical: 5,
        fontSize: SIZES.medium,
        paddingLeft: 35
    },
    otpContainer: {
        padding: 0,
        display: 'flex',
        flexDirection: 'row'
    },

    otpInput: {
        width: 40,
        height: 45,
        marginVertical: 10,
        marginHorizontal: 0,
        marginRight: 10,
        fontSize: SIZES.medium,
        padding: 0,
        textAlign: 'center',
        backgroundColor: "#D9D9D9"
    },

    resend: {
        fontSize: SIZES.medium,
        fontWeight: 900,
        color: COLORS.primary,
        marginTop: 20
    }
})
