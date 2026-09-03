import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Switch, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SIZES } from '../constants';
import TopHeader from '../components/TopHeader';
import Footer from '../components/Footer';
import { updateSettings } from '../store/reducer/settings';

const SettingRow = ({ icon, title, value, onValueChange, type = 'switch', onPress, subtitle, comingSoon = false }) => (
  <TouchableOpacity 
    style={styles.settingRow} 
    onPress={comingSoon ? undefined : onPress} 
    disabled={type === 'switch' || comingSoon}
    activeOpacity={0.7}
  >
    <View style={[styles.iconBox, { backgroundColor: COLORS.primary + '10' }]}>
      <Ionicons name={icon} size={20} color={COLORS.primary} />
    </View>
    
    <View style={styles.textContainer}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>

    {comingSoon ? (
      <View style={styles.comingSoonBadge}>
        <Text style={styles.comingSoonText}>SOON</Text>
      </View>
    ) : type === 'switch' ? (
      <Switch 
        value={value} 
        onValueChange={onValueChange}
        trackColor={{ false: "#E0E0E0", true: COLORS.primary + '80' }}
        thumbColor={value ? COLORS.primary : "#f4f3f4"}
        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
      />
    ) : (
      <Feather name="chevron-right" size={18} color={COLORS.gray} />
    )}
  </TouchableOpacity>
);

export default function Settings({ navigation }) {
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Settings" goto={() => navigation.goBack()} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* SECTION 1: NOTIFICATIONS */}
        <Text style={styles.sectionLabel}>Notifications</Text>
        <View style={[styles.sectionCard, SHADOWS.small]}>
          <SettingRow 
            icon="notifications-outline" 
            title="Order Updates" 
            subtitle="Get notified about your meal status"
            value={settings.orderUpdates} 
            onValueChange={(v) => dispatch(updateSettings({ orderUpdates: v }))} 
          />
          <View style={styles.divider} />
          <SettingRow 
            icon="megaphone-outline" 
            title="Promotions" 
            subtitle="Special offers and healthy tips"
            value={settings.promotions} 
            onValueChange={(v) => dispatch(updateSettings({ promotions: v }))} 
          />
        </View>

        {/* SECTION 2: ACCOUNT & PRIVACY */}
        <Text style={styles.sectionLabel}>Account & Privacy</Text>
        <View style={[styles.sectionCard, SHADOWS.small]}>
          <SettingRow 
            icon="location-outline" 
            title="Location Access" 
            value={settings.locationAccess} 
            onValueChange={(v) => dispatch(updateSettings({ locationAccess: v }))} 
          />
          <View style={styles.divider} />
          <SettingRow 
            icon="lock-closed-outline" 
            title="Privacy Policy" 
            type="link" 
            onPress={() => navigation.navigate("Privacy")} 
          />
          <View style={styles.divider} />
          <SettingRow 
            icon="shield-checkmark-outline" 
            title="Security Settings" 
            type="link" 
            comingSoon
          />
        </View>

        {/* SECTION 3: APP ACTIONS */}
        <Text style={styles.sectionLabel}>System</Text>
        <View style={[styles.sectionCard, SHADOWS.small]}>
          <SettingRow icon="language-outline" title="Language" type="link" subtitle="English (US)" comingSoon />
          <View style={styles.divider} />
          <SettingRow 
            icon="trash-outline" 
            title="Clear Cache" 
            type="link" 
            onPress={() => Alert.alert('Cache Cleared', 'Temporary app data has been cleared.')}
          />
        </View>

        {/* DELETE ACCOUNT */}
        <TouchableOpacity 
          style={styles.deleteBtn}
          onPress={() => Alert.alert(
            'Delete Account',
            'This will permanently delete your account and all associated data. This action cannot be undone.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive' },
            ]
          )}
        >
          <MaterialCommunityIcons name="account-remove-outline" size={20} color={COLORS.red} />
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>

        <Footer />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.softBg,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 50,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.gray,
    marginTop: 25,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingLeft: 5,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  settingRow: {
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
  settingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.black,
  },
  settingSubtitle: {
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
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    gap: 8,
    padding: 15,
    borderRadius: 20,
    backgroundColor: COLORS.red + '10',
  },
  deleteText: {
    color: COLORS.red,
    fontSize: 14,
    fontWeight: '800',
  },
});