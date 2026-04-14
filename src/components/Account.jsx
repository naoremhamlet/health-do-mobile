import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import TopHeader from '../components/TopHeader';
import { COLORS, SIZES, SHADOWS, image } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../store/reducer/account';
import EditAccount from './EditAccount';

const ProfileCard = ({ detail }) => {
  return (
    <View style={[styles.profileCard, SHADOWS.medium]}>
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

const MenuOption = ({ name, icon, type = "Ionicons", press, color = COLORS.black, notavailable = false }) => {
  const IconComp = type === "Ionicons" ? Ionicons : MaterialCommunityIcons;
  
  return (
    <TouchableOpacity style={[styles.menuItem, SHADOWS.small]} onPress={press} activeOpacity={0.7}>
      <View style={styles.menuLeft}>
        <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
            <IconComp name={icon} size={22} color={color} />
        </View>
        <Text style={styles.menuText}>{name}</Text>
        {notavailable &&
          <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>COMING SOON</Text>
          </View>
        }
      </View>
      {notavailable ? <Ionicons name="lock-closed-outline" size={16} color={COLORS.gray} /> : <Octicons name='chevron-right' size={18} color={COLORS.gray} /> }
    </TouchableOpacity>
  )
}

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
        
        {/* EDIT HEADER */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <TouchableOpacity onPress={() => setActive("EditAccount")} style={styles.editBtn}>
                <FontAwesome5 name="edit" size={14} color={COLORS.primary} />
                <Text style={styles.editBtnText}>Update</Text>
            </TouchableOpacity>
        </View>
        
        <ProfileCard detail={detail} />

        {/* ACTIVITY SECTION */}
        <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Activity</Text>
            <MenuOption 
                name="Orders" 
                icon="shopping-outline" 
                type='MaterialCommunityIcons'
                color="#FF7043"
                press={() => navigation.navigate("Orders")} 
            />
            <MenuOption 
                name="Saved Address" 
                icon="location-outline" 
                color="#42A5F5"
                press={() => navigation.navigate("Address")} 
            />

          <Text style={styles.sectionTitle}>Membership</Text>
          <MenuOption 
              name="Healthy+" 
              icon="diamond-outline" 
              color="#FFB300"
              notavailable={true}
          />
            
            <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Support</Text>
            <MenuOption 
                name="FAQ" 
                icon="help-circle-outline" 
                color="#66BB6A"
            />
            <MenuOption 
                name="Help Center" 
                icon="chatbubble-ellipses-outline" 
                color="#AB47BC"
            />
        </View>

        {/* FOOTER INFO */}
        <View style={styles.footer}>
            <Text style={styles.versionText}>Health Do v1.0.4</Text>
            <Text style={styles.footerSubText}>Made with ❤️ for healthy living</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: 50
  },
  scrollContent: {
    paddingBottom: 150,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.black,
    letterSpacing: -0.5
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
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  imageWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 2,
    borderColor: '#F5F5F5',
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
  menuItem: {
    backgroundColor: COLORS.white,
    height: 68,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 12
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: 5
  },
  omingSoonBadge: {
    backgroundColor: '#FFB30015', // Subtle gold tint
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    borderColor: '#FFB30040'
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

// import React, { useEffect, useState } from 'react'
// import { Text, View, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { FontAwesome5, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
// import TopHeader from './TopHeader';
// import { COLORS, SIZES, image } from '../constants';
// import { AddressPopup } from './Popup/AddressPopup';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateAccount } from '../store/reducer/account';
// import EditAccount from './EditAccount';
// // import { MyAddresssPopup } from './Popup/MyAddressPopup';

// const Detail = ({ detail }) => {
//   return (
//     <View style={styles.detailContainer}>
//       <View style={styles.imgContainer}>
//         <Image source={detail.profileImage || image.avatar} style={styles.detailImg} />
//       </View>
//       <View style={styles.detailDetails}>
//         <Text style={styles.detailName}>{detail.name}</Text>
//         <Text style={styles.detailText}>{detail.phone}</Text>
//         <Text style={styles.detailText}>{detail.email}</Text>
//         <Text style={styles.detailText}>{detail.address}</Text>
//       </View>
//     </View>
//   )
// }

// const RectangleItem = ({ name, press }) => {
//   return (
//     <TouchableOpacity style={styles.rectangleContainer} onPress={press}>
//       <Text style={styles.rectangleText}>{name}</Text>
//       <Octicons name='chevron-right' size={24} color="black" />
//     </TouchableOpacity>
//   )
// }

// export default function Account({ navigation }) {

//   const [active, setActive] = useState()

//   const detail = useSelector(state => state.account.detail)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const accountDetail = {
//       name: "Naorem Hemlet Singh",
//       phone: "+91 9366309563",
//       email: "naoremhamlet@gmail.com",
//       address: "Nambol Naorem, Near Community Hall"
//     }

//     dispatch(updateAccount({ id: 1, detail: accountDetail }))
//   }, [])

//   if (active === "EditAccount")
//     return <EditAccount goBack={() => setActive()} />

//   return (
//     <SafeAreaView style={styles.container}>
//       <TopHeader title="Account" goto={() => navigation.goBack()} />
//       <View style={styles.editContainer}>
//         <Text style={{ fontSize: 13, fontWeight: 600 }}>Personal Details</Text>
//         <TouchableOpacity onPress={() => setActive("EditAccount")}>
//           <FontAwesome5 name="edit" size={20} color="black" />
//         </TouchableOpacity>
//       </View>
//       <Detail detail={detail} />
//       <RectangleItem name={"Orders"} press={() => navigation.navigate("Orders")} />
//       <RectangleItem name={"Saved Address"} />
//       <RectangleItem name={"FAQ"} />
//       <RectangleItem name={"Help"} />
//     </SafeAreaView>
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingVertical: 50,
//     paddingHorizontal: 35
//   },
//   detailContainer: {
//     height: 200,
//     borderRadius: 20,
//     backgroundColor: COLORS.white,
//     display: 'flex',
//     justifyContent: 'center',
//     padding: 17,
//     flexDirection: 'row'
//   },
//   imgContainer: {
//     position: 'relative',
//     borderRadius: 20,
//     width: 90,
//   },
//   detailImg: {
//     width: 90,
//     height: 90,
//     borderRadius: 60, // Perfect circle
//     borderWidth: 3,
//     borderColor: COLORS.white,
//     backgroundColor: '#e1e1e1' // Gray while loading
//   },
//   upload: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0
//   },
//   detailDetails: {
//     padding: 10,
//     width: '70%',
//   },
//   detailName: {
//     fontSize: SIZES.medium,
//     fontWeight: 900
//   },
//   detailText: {
//     fontSize: 13,
//     borderBottomWidth: 0.5,
//     paddingVertical: 2,
//     opacity: 0.5
//   },

//   rectangleContainer: {
//     height: 60,
//     backgroundColor: COLORS.white,
//     borderRadius: 20,
//     marginTop: 30,
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 25
//   },
//   rectangleText: {
//     fontSize: SIZES.medium,
//     fontWeight: 900
//   },
//   editContainer: {
//     display: 'flex',
//     flexDirection: "row",
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//     marginTop: 30
//   }
// })