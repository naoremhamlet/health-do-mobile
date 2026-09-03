import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, PADDINGS, SHADOWS } from '../constants';
import TopHeader from '../components/TopHeader';

export default function PrivacyPolicy({ navigation }) {
    const { lastUpdated, sections } = useSelector(state => state.content.privacy);

    return (
        <SafeAreaView style={styles.container}>
            <TopHeader title="Privacy Policy" goto={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* The "Trust" Banner */}
                <View style={styles.trustBanner}>
                    <View style={styles.trustIconCircle}>
                        <MaterialCommunityIcons name="shield-check" size={36} color={COLORS.primary} />
                    </View>
                    <Text style={styles.trustTitle}>Your Privacy Matters</Text>
                    <Text style={styles.trustSub}>We only collect data necessary to provide you with the best healthy meal experience.</Text>
                </View>

                <View style={styles.contentBox}>
                    {sections.map((section, idx) => (
                        <View key={idx}>
                            <Text style={styles.policyHeading}>{section.heading}</Text>
                            <Text style={styles.policyText}>{section.body}</Text>
                        </View>
                    ))}

                    <View style={styles.updateBadge}>
                        <Text style={styles.updateText}>Last Updated: {lastUpdated}</Text>
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

    trustBanner: { 
        alignItems: 'center', 
        backgroundColor: COLORS.white, 
        padding: 30, 
        borderRadius: 30, 
        marginTop: 20, 
        ...SHADOWS.small 
    },
    trustIconCircle: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: COLORS.primary + '10',
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: COLORS.border, 
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