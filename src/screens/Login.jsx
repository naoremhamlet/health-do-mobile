import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { COLORS, SIZES, SHADOWS, image } from '../constants'
import CustomButton from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

function TopSection() {
    return (
        <View style={styles.topContainer}>
            <View style={styles.logoCircle}>
                <Image style={styles.topLogo} source={image.logo} />
            </View>
            <Text style={styles.topTitle}>Welcome</Text>
            <Text style={styles.topSubTitle}>Please Login/Signup to continue</Text>
        </View>
    )
}

function OTPContainer({otp, setOtp, otpInputs}) {
   
    const handleChange = (text, index) => {

        const numericValue = text.replace(/[^0-9]/g, '');

        if (numericValue && index < 3) {
            otpInputs.current[index + 1].focus();
        }

        if (index > 0 && !numericValue && otp[index]) {
            otpInputs.current[index - 1].focus();
        }

        const newOtp = [...otp];
        newOtp[index] = numericValue;
        setOtp(newOtp);
    };

    const handleKeyPress = (e, index) => {
        
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            otpInputs.current[index - 1].focus();
        }
    };

    return (
        <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={(el) => (otpInputs.current[index] = el)}
                    style={[styles.otpInput, otp[index] && styles.otpActive]}
                    keyboardType='numeric'
                    maxLength={1}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    value={digit}
                />
            ))}
        </View>
    );
}

function Form({ mobile, setMobile, mobileInput, otp, setOtp, otpInputs }) {

    const handleChange = (text) => {

        const numericValue = text.replace(/[^0-9]/g, '');

        setMobile(numericValue)
    }


    return (
        <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Mobile Number</Text>
            <View style={styles.mobileInputWrapper}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                    maxLength={10}
                    style={styles.mobileInput}
                    keyboardType='numeric'
                    placeholder="XXXX XXXX XX"
                    placeholderTextColor={COLORS.placehoder}
                    ref={(el) => (mobileInput.current = el)}
                    onChangeText={handleChange}
                    value={mobile}
                />
            </View>

            <View style={styles.otpSectionHeader}>
                <Text style={styles.formLabel}>Verification Code</Text>
                <TouchableOpacity>
                    <Text style={styles.resend}>Resend?</Text>
                </TouchableOpacity>
            </View>
            <OTPContainer otp={otp} setOtp={setOtp} otpInputs={otpInputs} />
        </View>
    )
}

export default function Login({ navigation }) {

    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const mobileInput = useRef(0);
    const otpInputs = useRef([]);

    const login = () => {

        let validate = true;

        if(mobile.length != 10) {
            mobileInput.current?.focus();
            validate = false;
        } else {
            for (let i = 0; i < otp.length; i++) {
                if (otp[i] === '') {
                    otpInputs.current[i]?.focus();
                    validate = false;
                    break;
                }
            }
        }

        if(validate) {
            navigation.navigate("Homepage");
        }    
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                style={{ flex: 1, width: '100%' }}
            >
                <TopSection />
                <Form 
                    mobile={mobile}
                    setMobile={setMobile}
                    mobileInput={mobileInput}
                    otp={otp} 
                    setOtp={setOtp} 
                    otpInputs={otpInputs} />
            </KeyboardAvoidingView>
            <CustomButton 
                title="Login" 
                buttonStyle={styles.loginBtn}
                goto={() => login()} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    topContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.primary + '10',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    topLogo: {
        width: 60,
        height: 65,
    },
    topTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.black,
    },
    topSubTitle: {
        fontSize: 14,
        color: COLORS.gray,
        marginTop: 5,
        fontWeight: '600',
        opacity: 0.7,
    },
    formContainer: {
        paddingHorizontal: 35,
        marginTop: 30,
    },
    formLabel: {
        fontSize: 13,
        fontWeight: '800',
        color: COLORS.gray,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    mobileInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#F0F0F0',
        marginBottom: 40,
        marginTop: 10,
    },
    countryCode: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.primary,
        marginRight: 10,
    },
    mobileInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.black,
        paddingVertical: 10,
    },
    otpSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    otpInput: {
        width: '22%',
        height: 60,
        backgroundColor: '#F8F8F8',
        borderRadius: 20,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.black,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    otpActive: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
        ...SHADOWS.small,
    },
    resend: {
        fontSize: 13,
        fontWeight: '800',
        color: COLORS.primary,
    },
    loginBtn: {
        marginTop: 'auto', // Pushes it toward the bottom if space allows
    }
})