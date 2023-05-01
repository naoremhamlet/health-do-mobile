import * as React from 'react';
import { View, Text, Image, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {COLORS, SIZES} from "../constants"
import DefaultHome from '../components/DefaultHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import Favourite from '../components/Favourite';
import Account from '../components/Account';
import History from '../components/History';



const Tab = createBottomTabNavigator();

function BottomTab({navigation}) {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Homepage') {
          return <MaterialCommunityIcons name={focused?'home':'home-outline'} size={size} color={color} />
        } else if (route.name === 'Favorite') {
          return <MaterialIcons name={focused?'favorite':'favorite-outline'} size={size-2} color={color} />;
        } else if (route.name === 'Account') {
          return <Ionicons name={focused?'person':'person-outline'} size={size-3} color={color} />
        } else if (route.name === 'History') {
          return <MaterialIcons name="history" size={size} color={color} />
        }
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: COLORS.lightWhite,
        borderTopWidth: 0,
        elevation: 0,
        marginBottom: 20
      }
    })}>
        <Tab.Screen name='Homepage' component={DefaultHome} />
        <Tab.Screen name='Favorite' component={Favourite} />
        <Tab.Screen name='Account' component={Account} />
        <Tab.Screen name='History' component={History} />
    </Tab.Navigator>
  )
}


function SignOut({ signOut }) {
  return (
    <Pressable style={styles.signoutcontainer} onPress={signOut}>
      <Text style={styles.signouttext}>Sign-out</Text>
      <MaterialIcons name='arrow-right-alt' size={24} color={COLORS.white} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  signoutcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingRight: 50
  },
  signouttext: {
    color: COLORS.white,
    fontWeight: 600,
    fontSize: SIZES.medium
  }
})


function CustomDrawerContent(props) {
  const progress = useDrawerProgress();

  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <SafeAreaView style={{flex: 1}} forceInset={{top: "always", horizontal: "never"}}>
      <DrawerContentScrollView {...props}>  
        <Animated.View style={{ transform: [{ translateX }] }}>
          <DrawerItemList {...props} />
        </Animated.View>
      </DrawerContentScrollView>

        <SignOut signOut={() => props.navigation.navigate("Login")} />
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();


export default function Home() {
  return (
      <Drawer.Navigator
        screenOptions={{ 
          headerShown: false,
          drawerLabelStyle: {
            fontSize: SIZES.medium,
            fontWeight: 600
          },
          drawerItemStyle: {
            borderRadius: 0,
            padding: 0,
            margin: 0
          },
          drawerStyle: {
            backgroundColor: COLORS.primary,
            paddingLeft: 20,
            paddingVertical: 50
          },
          drawerActiveTintColor: 'white',
          drawerInactiveTintColor: 'white',
         }}
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      > 
        <Drawer.Screen name="Home" component={BottomTab} options={{
          drawerIcon: ({focused, size, color}) => (
            <MaterialIcons name='home' size={size} color={color} />
          ) 
        }} />
        <Drawer.Screen name="Account" component={Account} options={{
          drawerIcon: ({focused, size, color}) => (
            <MaterialCommunityIcons name='account-circle-outline' size={size} color={color} />
          ) 
        }} />
        <Drawer.Screen name="Order" component={BottomTab} options={{
          drawerIcon: ({focused, size, color}) => (
            <MaterialCommunityIcons name='cart-check' size={size} color={color} />
          ) 
        }} />
        <Drawer.Screen name="Privacy" component={BottomTab} options={{
          drawerIcon: ({focused, size, color}) => (
            <MaterialCommunityIcons name='clipboard-outline' size={size} color={color} />
          ) 
        }} />
        <Drawer.Screen name="Security" component={BottomTab} options={{
          drawerIcon: ({focused, size, color}) => (
            <MaterialCommunityIcons name='security' size={size} color={color} />
          ) 
        }} />
      </Drawer.Navigator>
  );
}