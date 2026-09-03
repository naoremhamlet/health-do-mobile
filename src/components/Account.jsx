import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import TopHeader from '../components/TopHeader';
import { COLORS, SIZES, SHADOWS, PADDINGS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../store/reducer/account';
import { getProductById } from '../helper';
import EditAccount from './EditAccount';
import Footer from './Footer';

const ProfileHero = ({ detail, favouritesCount, cartCount, cartValue, onEdit, onNavigate }) => {
  return (
    <View style={[styles.heroCard, SHADOWS.small]}>
      <View style={styles.heroBlob} />

      <View style={styles.avatarWrapper}>
        {detail.profileImage ?
          <Image source={detail.profileImage} style={styles.avatar} />
          : <View style={styles.avatar}>
            <MaterialIcons name="person" size={54} color={COLORS.primary} />
          </View>
        }
        <View style={styles.statusDot} />
      </View>

      <Text style={styles.heroName} numberOfLines={1}>{detail.name}</Text>
      <Text style={styles.heroSubtitle} numberOfLines={1}>{detail.email}</Text>

      <TouchableOpacity style={styles.editProfileBtn} onPress={onEdit} activeOpacity={0.8}>
        <FontAwesome5 name="edit" size={12} color={COLORS.primary} />
        <Text style={styles.editProfileBtnText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.statsRow}>
        <TouchableOpacity style={styles.statItem} onPress={() => onNavigate('Favorite')} activeOpacity={0.7}>
          <Text style={styles.statValue}>{favouritesCount}</Text>
          <Text style={styles.statLabel}>Favourites</Text>
        </TouchableOpacity>
        <View style={styles.statDivider} />
        <TouchableOpacity style={styles.statItem} onPress={() => onNavigate('Cart')} activeOpacity={0.7}>
          <Text style={styles.statValue}>{cartCount}</Text>
          <Text style={styles.statLabel}>In Cart</Text>
        </TouchableOpacity>
        <View style={styles.statDivider} />
        <TouchableOpacity style={styles.statItem} onPress={() => onNavigate('Cart')} activeOpacity={0.7}>
          <Text style={styles.statValue}>₹{cartValue.toFixed(0)}</Text>
          <Text style={styles.statLabel}>Cart Value</Text>
        </TouchableOpacity>
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
      {notavailable ? <Ionicons name="lock-closed-outline" size={16} color={COLORS.gray} /> : <Feather name="chevron-right" size={18} color={COLORS.gray} />}

    </TouchableOpacity>
  )
};

export default function Account({ navigation }) {
  const [active, setActive] = useState()
  const detail = useSelector(state => state.account.detail)
  const cart = useSelector(state => state.cart.cart)
  const favourites = useSelector(state => state.favourites.favourites)
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

  const cartCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);
  const cartValue = (cart || []).reduce((sum, item) => {
    const product = getProductById(item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Profile" goto={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <ProfileHero
          detail={detail}
          favouritesCount={(favourites || []).length}
          cartCount={cartCount}
          cartValue={cartValue}
          onEdit={() => setActive("EditAccount")}
          onNavigate={(route) => navigation.navigate(route)}
        />

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
          <View style={styles.divider} />
          <MenuRow
            icon="settings-outline"
            title="Settings"
            onPress={() => navigation.navigate("Setting")}
          />
        </View>

        <Text style={styles.sectionLabel}>Membership</Text>
        <View style={[styles.membershipCard, SHADOWS.small]}>
          <View style={styles.membershipIconCircle}>
            <MaterialCommunityIcons name="diamond-stone" size={22} color="#B8860B" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.membershipTitle}>Healthy+ Membership</Text>
            <Text style={styles.membershipSubtitle}>Free delivery, exclusive discounts & more</Text>
          </View>
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>SOON</Text>
          </View>
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

        <TouchableOpacity 
          style={styles.signOutBtn} 
          activeOpacity={0.8}
          onPress={() => Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Sign Out', style: 'destructive', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }) },
            ]
          )}
        >
          <Ionicons name="log-out-outline" size={18} color={COLORS.red} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

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
    paddingTop: 10,
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
    borderColor: COLORS.border,
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
    backgroundColor: COLORS.divider,
  },
  heroCard: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroBlob: {
    position: 'absolute',
    top: -50,
    right: -40,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.primary + '08',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white
  },
  heroName: {
    fontSize: 19,
    fontWeight: '900',
    color: COLORS.black,
    marginTop: 14,
  },
  heroSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
    marginTop: 3,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    marginTop: 14,
  },
  editProfileBtnText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 12.5,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 22,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.divider,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.black,
  },
  statLabel: {
    fontSize: 10.5,
    color: COLORS.gray,
    fontWeight: '700',
    marginTop: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  membershipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBF0',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFB30030',
  },
  membershipIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFB30015',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  membershipTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: COLORS.black,
  },
  membershipSubtitle: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
    fontWeight: '500',
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
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    gap: 8,
    padding: 15,
    borderRadius: 20,
    backgroundColor: COLORS.red + '10',
  },
  signOutText: {
    color: COLORS.red,
    fontSize: 14,
    fontWeight: '800',
  },
})