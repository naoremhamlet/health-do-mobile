import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { COLORS, SIZES, SHADOWS } from "../constants";
import DefaultHome from '../components/DefaultHome';
import Favourite from '../components/Favourite';
import Account from '../components/Account';
import History from '../components/History';

const Tab = createBottomTabNavigator();

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
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabBarIconStyle: {
        height: '100%',
      }
    })}
    >
      <Tab.Screen name='Homepage' component={DefaultHome} />
      <Tab.Screen name='Favorite' component={Favourite} />
      <Tab.Screen name='Account' component={Account} />
      <Tab.Screen name='History' component={History} />
    </Tab.Navigator>
  );
}

/** 2. UPDATED CLEAN DRAWER CONTENT **/
function CustomDrawerContent(props) {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity activeOpacity={0.7} style={styles.drawerHeader} onPress={() => props.navigation.navigate('Home', { screen: 'Account' })}>
         <View style={styles.drawerProfileCircle}>
            <MaterialIcons name="person" size={40} color={COLORS.primary} />
         </View>
         <Text style={styles.drawerName}>Naorem Hemlet</Text>
      </TouchableOpacity>

      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 10 }}>
        {/* RE-ROUTING DRAWER ITEMS */}
        <TouchableOpacity 
          style={[styles.drawerItem, styles.activeDrawerItem]} 
          onPress={() => props.navigation.navigate('Home')}
        >
          <MaterialIcons name='home' size={22} color={COLORS.white} />
          <Text style={styles.drawerLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.drawerItem} 
          onPress={() => props.navigation.navigate('Orders')}
        >
          <MaterialCommunityIcons name='shopping-outline' size={22} color={COLORS.white} />
          <Text style={styles.drawerLabel}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.drawerItem} 
          onPress={() => props.navigation.navigate('Setting')}
        >
          <Ionicons name='settings-outline' size={22} color={COLORS.white} />
          <Text style={styles.drawerLabel}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.drawerItem} 
          onPress={() => props.navigation.navigate('Privacy')}
        >
          <Ionicons name='lock-closed-outline' size={22} color={COLORS.white} />
          <Text style={styles.drawerLabel}>Privacy</Text>
        </TouchableOpacity>

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
        overlayColor: 'transparent',
        drawerStyle: styles.drawerContainerStyle,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={BottomTab} />
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
    borderRadius: 32,
    height: 65,
    ...SHADOWS.medium, 
    marginHorizontal: 10,
    borderTopWidth: 0,
  },
  tabIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActiveBg: {
    backgroundColor: COLORS.primary + '10',
  },

  // Drawer Styling
  drawerContainerStyle: {
    backgroundColor: COLORS.primary,
    width: '70%',
    paddingTop: 20,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
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
    fontSize: 17,
    fontWeight: '900'
  },
  drawerLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
    marginLeft: 10,
    
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 4,
    paddingHorizontal: 25,
    paddingVertical: 15,
    opacity: 0.7,
  },

  activeDrawerItem: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    opacity: 1,
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