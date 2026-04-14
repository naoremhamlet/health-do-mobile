import * as React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { COLORS, SIZES, SHADOWS } from "../constants";
import DefaultHome from '../components/DefaultHome';
import Favourite from '../components/Favourite';
import Account from '../components/Account';
import History from '../components/History';
import Orders from './Orders';

const Tab = createBottomTabNavigator();

/** 1. BEAUTIFIED BOTTOM TAB **/
function BottomTab() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconName;
        let IconComponent = MaterialCommunityIcons;

        if (route.name === 'Homepage') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Favorite') {
          iconName = focused ? 'heart' : 'heart-outline';
          IconComponent = Ionicons;
        } else if (route.name === 'Account') {
          iconName = focused ? 'person' : 'person-outline';
          IconComponent = Ionicons;
        } else if (route.name === 'History') {
          iconName = 'history';
          IconComponent = MaterialIcons;
        }

        return (
          <View style={[styles.tabIconWrapper, focused && styles.tabActiveBg]}>
            <IconComponent name={iconName} size={22} color={color} />
          </View>
        );
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: '#A0A0A0',
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.floatingTabStyle,
      tabBarItemStyle: {
        alignSelf: 'center'
      },
    })}>
      <Tab.Screen name='Homepage' component={DefaultHome} />
      <Tab.Screen name='Favorite' component={Favourite} />
      <Tab.Screen name='Account' component={Account} />
      <Tab.Screen name='History' component={History} />
    </Tab.Navigator>
  );
}

/** 2. CLEAN DRAWER CONTENT **/
function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.drawerHeader}>
         <View style={styles.drawerProfileCircle}>
            <MaterialIcons name="person" size={40} color={COLORS.primary} />
         </View>
         <Text style={styles.drawerName}>Naorem Hemlet</Text>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity 
        style={styles.signOutBtn} 
        onPress={() => props.navigation.reset({ index: 0, routes: [{ name: "Login" }] })}
      >
        <Text style={styles.signOutText}>Sign out</Text>
        <MaterialIcons name='logout' size={20} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/** 3. MAIN DRAWER NAVIGATOR **/
const Drawer = createDrawerNavigator();

export default function Home() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'transparent', // Modern slide look
        drawerStyle: styles.drawerContainerStyle,
        drawerActiveBackgroundColor: 'rgba(255,255,255,0.15)',
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: 'rgba(255,255,255,0.7)',
        drawerLabelStyle: styles.drawerLabel,
        drawerItemStyle: styles.drawerItem
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={BottomTab} options={{
        drawerIcon: ({ color }) => <MaterialIcons name='home' size={22} color={color} />
      }} />
      <Drawer.Screen name="Orders" component={Orders} options={{
        drawerIcon: ({ color }) => <MaterialCommunityIcons name='shopping-outline' size={22} color={color} />
      }} />
      <Drawer.Screen name="Settings" component={BottomTab} options={{
        drawerIcon: ({ color }) => <Ionicons name='settings-outline' size={22} color={color} />
      }} />
      <Drawer.Screen name="Security" component={BottomTab} options={{
        drawerIcon: ({ color }) => <Ionicons name='shield-checkmark-outline' size={22} color={color} />
      }} />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  // Tab Styling
  floatingTabStyle: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    height: 65,
    borderTopWidth: 0,
    ...SHADOWS.medium,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0, 
  },
  tabIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActiveBg: {
    backgroundColor: COLORS.primary + '10', // Soft primary tint
  },

  // Drawer Styling
  drawerContainerStyle: {
    backgroundColor: COLORS.primary,
    width: '70%',
    paddingTop: 40,
  },
  drawerHeader: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 10
  },
  drawerProfileCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  drawerName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900'
  },
  drawerLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: -10
  },
  drawerItem: {
    borderRadius: 15,
    marginVertical: 4,
    paddingHorizontal: 10
  },

  // Sign Out
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
    gap: 10
  },
  signOutText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 16,
    opacity: 0.9
  }
});

// import * as React from 'react';
// import { View, Text, Image, Pressable, StyleSheet, SafeAreaView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
//   useDrawerProgress,
// } from '@react-navigation/drawer';
// import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
// import { COLORS, SIZES } from "../constants"
// import DefaultHome from '../components/DefaultHome';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
// import Favourite from '../components/Favourite';
// import Account from '../components/Account';
// import History from '../components/History';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Orders from './Orders';



// const Tab = createBottomTabNavigator();

// function BottomTab({ navigation }) {
//   return (
//     <Tab.Navigator screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused, color, size }) => {
//         switch (route.name) {

//           case 'Homepage':
//             return (
//               <TouchableOpacity>
//                 <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
//               </TouchableOpacity>
//             )
//           case 'Favorite':
//             return (
//               <TouchableOpacity>
//                 <MaterialIcons name={focused ? 'favorite' : 'favorite-outline'} size={size - 2} color={color} />
//               </TouchableOpacity>
//             )
//           case 'Account':
//             return (
//               <TouchableOpacity>
//                 <Ionicons name={focused ? 'person' : 'person-outline'} size={size - 3} color={color} />
//               </TouchableOpacity>
//             )
//           case 'History':
//             return (
//               <TouchableOpacity>
//                 <MaterialIcons name="history" size={size} color={color} />
//               </TouchableOpacity>
//             )
//         }
//       },
//       tabBarActiveTintColor: COLORS.primary,
//       tabBarInactiveTintColor: 'gray',
//       headerShown: false,
//       tabBarShowLabel: false,
//       tabBarStyle: {
//         backgroundColor: COLORS.lightWhite,
//         borderTopWidth: 0,
//         elevation: 0,
//         marginBottom: 20
//       }
//     })}>
//       <Tab.Screen name='Homepage' component={DefaultHome} />
//       <Tab.Screen name='Favorite' component={Favourite} />
//       <Tab.Screen name='Account' component={Account} />
//       <Tab.Screen name='History' component={History} />
//     </Tab.Navigator>
//   )
// }


// function SignOut({ signOut }) {
//   return (
//     <TouchableOpacity style={styles.signoutcontainer} onPress={signOut}>
//       <Text style={styles.signouttext}>Sign-out</Text>
//       <MaterialIcons name='arrow-right-alt' size={24} color={COLORS.white} />
//     </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   signoutcontainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignSelf: 'flex-end',
//     paddingRight: 50
//   },
//   signouttext: {
//     color: COLORS.white,
//     fontWeight: 600,
//     fontSize: SIZES.medium
//   }
// })


// function CustomDrawerContent(props) {

//   const progress = useDrawerProgress();

//   // const translateX = interpolate(progress.value, [0, 1], [0, 1]);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateX: interpolate(progress.value, [0, 1], [0, 1]),
//       },
//     ],
//   }));

//   return (
//     <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always", horizontal: "never" }}>
//       <DrawerContentScrollView {...props}>
//         <Animated.View style={animatedStyle}>
//           <DrawerItemList {...props} />
//         </Animated.View>
//       </DrawerContentScrollView>

//       <SignOut signOut={() => 
//       props.navigation.reset({
//         index: 0,
//         routes: [{ name: "Login" }],
//       })} />
//     </SafeAreaView>
//   );
// }

// const Drawer = createDrawerNavigator();


// export default function Home() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerLabelStyle: {
//           fontSize: SIZES.medium,
//           fontWeight: 600
//         },
//         drawerItemStyle: {
//           borderRadius: 0,
//           padding: 0,
//           margin: 0
//         },
//         drawerStyle: {
//           backgroundColor: COLORS.primary,
//           paddingLeft: 20,
//           paddingVertical: 50
//         },
//         drawerActiveTintColor: 'white',
//         drawerInactiveTintColor: 'white',
//       }}
//       useLegacyImplementation
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen name="Home" component={BottomTab} options={{
//         drawerIcon: ({ focused, size, color }) => (
//           <MaterialIcons name='home' size={size} color={color} />
//         )
//       }} />
//       <Drawer.Screen name="Account" component={Account} options={{
//         drawerIcon: ({ focused, size, color }) => (
//           <MaterialCommunityIcons name='account-circle-outline' size={size} color={color} />
//         )
//       }} />
//       <Drawer.Screen name="Order" component={Orders} options={{
//         drawerIcon: ({ focused, size, color }) => (
//           <MaterialCommunityIcons name='cart-check' size={size} color={color} />
//         )
//       }} />
//       <Drawer.Screen name="Privacy" component={BottomTab} options={{
//         drawerIcon: ({ focused, size, color }) => (
//           <MaterialCommunityIcons name='clipboard-outline' size={size} color={color} />
//         )
//       }} />
//       <Drawer.Screen name="Security" component={BottomTab} options={{
//         drawerIcon: ({ focused, size, color }) => (
//           <MaterialCommunityIcons name='security' size={size} color={color} />
//         )
//       }} />
//     </Drawer.Navigator>
//   );
// }