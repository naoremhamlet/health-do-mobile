import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { COLORS, PADDINGS, SHADOWS, SIZES } from '../constants';
import TopHeader from '../components/TopHeader';
import Footer from '../components/Footer';

const SupportRow = ({ title, subtitle, icon, onPress }) => {
  return (
  <TouchableOpacity 
    style={styles.supportRow} 
    onPress={onPress} 
    activeOpacity={0.7}
  >
    <View style={[styles.iconBox, { backgroundColor: COLORS.primary + '10' }]}>
      <Ionicons name={icon} size={20} color={COLORS.primary} />
    </View>
    
    <View style={styles.textContainer}>
      <Text style={styles.supportTitle}>{title}</Text>
      {subtitle && <Text style={styles.supportSubtitle}>{subtitle}</Text>}
    </View>
    <Feather name="chevron-right" size={18} color={COLORS.gray} />
    
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
            <TouchableOpacity style={styles.contactBox}>
                <View style={styles.contactIcon}>
                    <Ionicons name="chatbubble-ellipses-outline" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.contactLabel}>Live Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactBox}>
                <View style={styles.contactIcon}>
                    <Ionicons name="call-outline" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.contactLabel}>Call Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactBox}>
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
    borderColor: '#F0F0F0',
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
  section: {
    gap: 15,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
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
    backgroundColor: '#F7F7F7',
  },
  card: {
    backgroundColor: COLORS.white,
    height: 65,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: PADDINGS.top
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
    borderColor: '#F5F5F5',
  },
  contactIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 10,
  },
  footer: {
    marginTop: 50,
    alignItems: 'center',
  },
});