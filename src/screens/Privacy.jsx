import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, PADDINGS, SHADOWS } from '../constants';
import TopHeader from '../components/TopHeader';

export default function PrivacyPolicy({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <TopHeader title="Privacy Policy" goto={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* The "Trust" Banner */}
                <View style={styles.trustBanner}>
                    <MaterialCommunityIcons name="shield-check" size={40} color={COLORS.primary} />
                    <Text style={styles.trustTitle}>Your Privacy Matters</Text>
                    <Text style={styles.trustSub}>We only collect data necessary to provide you with the best healthy meal experience.</Text>
                </View>

                <View style={styles.contentBox}>
                    <Text style={styles.policyHeading}>1. Data We Collect</Text>
                    <Text style={styles.policyText}>
                        We collect information like your name, delivery address, and phone number to process your orders. We also track browsing history within the app to suggest personalized bowls.
                    </Text>

                    <Text style={styles.policyHeading}>2. How We Use Data</Text>
                    <Text style={styles.policyText}>
                        Your data is used solely for order fulfillment, improving app performance, and sending occasional promotional offers if opted-in.
                    </Text>

                    <Text style={styles.policyHeading}>3. Security</Text>
                    <Text style={styles.policyText}>
                        We use industry-standard encryption to protect your sensitive data. Your payment information is handled by secure third-party gateways (Razorpay/Stripe).
                    </Text>

                    <View style={styles.updateBadge}>
                        <Text style={styles.updateText}>Last Updated: April 19, 2026</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: { 
        paddingHorizontal: PADDINGS.horizonatal, 
        paddingBottom: 40 
    },

    // Settings Styles
    sectionLabel: { 
        fontSize: 14, 
        fontWeight: '800', 
        color: COLORS.gray, 
        marginTop: 25, 
        marginBottom: 10, 
        textTransform: 'uppercase' 
    },
    sectionCard: { 
        backgroundColor: COLORS.white, 
        borderRadius: 20, 
        paddingHorizontal: 15 
    },
    settingRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 18 
    },
    iconBox: { 
        width: 38, 
        height: 38, 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 15 
    },
    settingTitle: { 
        flex: 1, 
        fontSize: 15, 
        fontWeight: '700', 
        color: COLORS.black 
    },
    divider: { 
        height: 1, 
        backgroundColor: '#F0F0F0' 
    },

    // Privacy Styles
    trustBanner: { 
        alignItems: 'center', 
        backgroundColor: COLORS.white, 
        padding: 30, 
        borderRadius: 30, 
        marginTop: 20, 
        ...SHADOWS.small 
    },
    trustTitle: { 
        fontSize: 20, 
        fontWeight: '900', 
        color: COLORS.black, 
        marginTop: 10 
    },
    trustSub: { 
        fontSize: 13, 
        color: COLORS.gray, 
        textAlign: 'center', 
        marginTop: 8, 
        lineHeight: 18 
    },
    contentBox: { 
        marginTop: 30 
    },
    policyHeading: { 
        fontSize: 17, 
        fontWeight: '900', 
        color: COLORS.black, 
        marginBottom: 10, 
        marginTop: 20 
    },
    policyText: { 
        fontSize: 14, 
        color: COLORS.gray, 
        lineHeight: 22, 
        fontWeight: '500' 
    },
    updateBadge: { 
        alignSelf: 'center', 
        marginTop: 40, 
        backgroundColor: '#EEE', 
        paddingHorizontal: 15, 
        paddingVertical: 6, 
        borderRadius: 10 
    },
    updateText: { 
        fontSize: 11, 
        fontWeight: '700', 
        color: COLORS.gray 
    }
});