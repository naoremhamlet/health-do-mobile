import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { COLORS, SHADOWS } from "../constants";
import DefaultHome from '../components/DefaultHome';
import Favourite from '../components/Favourite';
import Account from '../components/Account';
import History from '../components/History';

const Tab = createBottomTabNavigator();

/**
 * The app previously had a side drawer (Home / Orders / Settings / Privacy / Sign out)
 * wrapping this tab navigator. It was removed: Home and Privacy duplicated existing
 * destinations, Orders is already reachable from the Profile tab, and Settings + Sign out
 * (the only two things unique to it) now live inside the Profile tab below, which is
 * their natural home and keeps navigation to a single, predictable bottom bar.
 */
export default function Home() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconName;
        let IconComponent = MaterialCommunityIcons;

        if (route.name === 'HomeTab') {
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
      tabBarInactiveTintColor: COLORS.inactiveGray,
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
      <Tab.Screen name='HomeTab' component={DefaultHome} />
      <Tab.Screen name='Favorite' component={Favourite} />
      <Tab.Screen name='Account' component={Account} />
      <Tab.Screen name='History' component={History} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
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
});
