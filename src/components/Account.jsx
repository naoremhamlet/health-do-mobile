import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import TopHeader from '../components/TopHeader';
import { COLORS, SIZES, SHADOWS, image, PADDINGS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../store/reducer/account';
import EditAccount from './EditAccount';
import Footer from './Footer';

const ProfileCard = ({ detail }) => {
  return (
    <View style={[styles.profileCard, SHADOWS.small]}>
      <View style={styles.imageWrapper}>
        <Image source={detail.profileImage || image.avatar} style={styles.avatar} />
        <View style={styles.statusDot} />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.profileName} numberOfLines={1}>{detail.name}</Text>
        <View style={styles.contactRow}>
            <Ionicons name="call-outline" size={14} color={COLORS.gray} />
            <Text style={styles.contactText}>{detail.phone}</Text>
        </View>
        <View style={styles.contactRow}>
            <Ionicons name="mail-outline" size={14} color={COLORS.gray} />
            <Text style={styles.contactText}>{detail.email}</Text>
        </View>
      </View>
    </View>
  )
}

const MenuRow = ({ title, subtitle, icon, type = "Ionicons", onPress, notavailable = false }) => {
  const IconComp = type === "Ionicons" ? Ionicons : MaterialCommunityIcons;
  return (
  <TouchableOpacity 
    style={styles.menuRow} 
    onPress={onPress} 
    disabled={type === 'switch'}
    activeOpacity={0.7}
  >
    <View style={[styles.iconBox, { backgroundColor: COLORS.primary + '10' }]}>
      <IconComp name={icon} size={20} color={COLORS.primary} />
    </View>
    
    <View style={styles.textContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>

      {notavailable &&
        <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>COMING SOON</Text>
        </View>
      }
      {notavailable ? <Ionicons name="lock-closed-outline" size={16} color={COLORS.gray} /> : <Feather name="chevron-right" size={18} color={COLORS.gray} /> }
    
  </TouchableOpacity>
)};

export default function Account({ navigation }) {
  const [active, setActive] = useState()
  const detail = useSelector(state => state.account.detail)
  const dispatch = useDispatch()

  useEffect(() => {
    const accountDetail = {
      name: "Naorem Hemlet Singh",
      phone: "+91 9366309563",
      email: "naoremhamlet@gmail.com",
      address: "Nambol Naorem, Near Community Hall"
    }
    dispatch(updateAccount({ id: 1, detail: accountDetail }))
  }, [])

  if (active === "EditAccount") return <EditAccount goBack={() => setActive()} />

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Profile" goto={() => navigation.goBack()} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Personal Details</Text>
            <TouchableOpacity onPress={() => setActive("EditAccount")} style={styles.editBtn}>
                <FontAwesome5 name="edit" size={14} color={COLORS.primary} />
                <Text style={styles.editBtnText}>Update</Text>
            </TouchableOpacity>
        </View>
        
        <ProfileCard detail={detail} />

        {/* ACTIVITY SECTION */}
        <Text style={styles.sectionLabel}>Activity</Text>
        <View style={[styles.sectionCard, SHADOWS.small]}>
          <View style={styles.divider} />
          <MenuRow
            icon="shopping-outline" 
            type='MaterialCommunityIcons'
            title="Orders" 
            onPress={() => navigation.navigate("Orders")} 
          />
          <View style={styles.divider} />
          <MenuRow 
            icon="location-outline" 
            title="Address" 
            onPress={() => navigation.navigate("Address")} 
          />
        </View>

        <Text style={styles.sectionLabel}>Membership</Text>
        <View style={[styles.sectionCard, SHADOWS.small]}>
          <View style={styles.divider} />
          <MenuRow
            icon="diamond-outline" 
            title="Healthy+" 
            notavailable
          />
        </View>

        <Text style={styles.sectionLabel}>Help Center</Text>
        <View style={[styles.sectionCard, SHADOWS.small]}>
          <View style={styles.divider} />
          <MenuRow
            icon="help-circle-outline" 
            title="FAQ" 
            onPress={() => navigation.navigate("Faq")} 
          />
          <View style={styles.divider} />
          <MenuRow 
            icon="chatbubble-ellipses-outline" 
            title="Support" 
            onPress={() => navigation.navigate("Support")} 
          />
        </View>

        <Footer />

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: PADDINGS.horizonatal,
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
    borderColor: '#F0F0F0',
  },
  menuRow: {
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
  menuTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.black,
  },
  menuSubtitle: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F7F7F7',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  editBtnText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 12
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: COLORS.white
  },
  infoWrapper: {
    marginLeft: 18,
    flex: 1
  },
  profileName: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.black,
    marginBottom: 4
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2
  },
  contactText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500'
  },
  comingSoonBadge: {
    backgroundColor: '#FFB30015', // Subtle gold tint
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#FFB30040',
  },
  comingSoonText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#B8860B', // Darker gold for readability
    letterSpacing: 0.5
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    opacity: 0.4
  },
  versionText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.black
  },
  footerSubText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4
  }
})