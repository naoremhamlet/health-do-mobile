import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { COLORS, PADDINGS, SHADOWS, SIZES } from '../constants';
import TopHeader from '../components/TopHeader';
import Footer from '../components/Footer';

const SupportRow = ({ title, subtitle, icon, onPress, comingSoon = false }) => {
  return (
  <TouchableOpacity 
    style={styles.supportRow} 
    onPress={comingSoon ? undefined : onPress} 
    disabled={comingSoon}
    activeOpacity={0.7}
  >
    <View style={[styles.iconBox, { backgroundColor: COLORS.primary + '10' }]}>
      <Ionicons name={icon} size={20} color={COLORS.primary} />
    </View>
    
    <View style={styles.textContainer}>
      <Text style={styles.supportTitle}>{title}</Text>
      {subtitle && <Text style={styles.supportSubtitle}>{subtitle}</Text>}
    </View>
    {comingSoon ? (
      <View style={styles.comingSoonBadge}>
        <Text style={styles.comingSoonText}>SOON</Text>
      </View>
    ) : (
      <Feather name="chevron-right" size={18} color={COLORS.gray} />
    )}
    
  </TouchableOpacity>
)};

export default function Support({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Support" goto={() => navigation.goBack()} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Illustration area */}
        <View style={[styles.headerHero, SHADOWS.small]}>
            <View style={styles.heroTextContainer}>
                <Text style={styles.heroTitle}>How can we help?</Text>
                <Text style={styles.heroSub}>Our team is here to support your healthy lifestyle.</Text>
            </View>
            <MaterialCommunityIcons name="face-agent" size={80} color={COLORS.primary + '30'} />
        </View>

        <View style={[styles.sectionCard, SHADOWS.small]}>
          <View style={styles.divider} />
          <SupportRow
            icon="help-circle-outline" 
            title="FAQ" 
            subtitle="Quick answers to common questions"
            onPress={() => navigation.navigate("Faq")} 
          />
          <View style={styles.divider} />
          <SupportRow 
            icon="shield-checkmark-outline" 
            title="Security" 
            subtitle="Manage your app security"
            comingSoon
          />
          <View style={styles.divider} />
          <SupportRow 
            icon="lock-closed-outline" 
            title="Privacy" 
            subtitle="How we protect your data"
            onPress={() => navigation.navigate("Privacy")}
          />
        </View>

        {/* Contact Options */}
        <Text style={styles.sectionHeading}>Direct Contact</Text>
        <View style={styles.contactRow}>
            <TouchableOpacity style={styles.contactBox} activeOpacity={0.7}>
                <View style={styles.contactIcon}>
                    <Ionicons name="chatbubble-ellipses-outline" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.contactLabel}>Live Chat</Text>
                <View style={styles.contactSoonBadge}>
                  <Text style={styles.comingSoonText}>SOON</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.contactBox} 
              activeOpacity={0.7}
              onPress={() => Linking.openURL('tel:+919876543210')}
            >
                <View style={styles.contactIcon}>
                    <Ionicons name="call-outline" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.contactLabel}>Call Us</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.contactBox} 
              activeOpacity={0.7}
              onPress={() => Linking.openURL('mailto:support@healthdo.app')}
            >
                <View style={styles.contactIcon}>
                    <Ionicons name="mail-outline" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.contactLabel}>Email</Text>
            </TouchableOpacity>
        </View>

        <Footer />

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
  },
  headerHero: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.black,
  },
  heroSub: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
    fontWeight: '500',
    lineHeight: 18,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.black,
  },
  supportSubtitle: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
  comingSoonBadge: {
    backgroundColor: '#FFB30015',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#FFB30040',
  },
  comingSoonText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#B8860B',
    letterSpacing: 0.5,
  },

  sectionHeading: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.black,
    marginTop: 35,
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactBox: {
    backgroundColor: COLORS.white,
    width: '30%',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.divider,
    position: 'relative',
  },
  contactSoonBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFB30015',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#FFB30040',
  },
  contactIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 10,
  },
});