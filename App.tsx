import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, KeyboardAvoidingView } from 'react-native';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './src/screens/Cart';
import Products from './src/screens/Products';
import ProductDetail from './src/screens/ProductDetail';
import Checkout from './src/screens/Checkout';
import Orders from './src/screens/Orders';


import store from './src/store/store';
import { Provider } from 'react-redux';

const Stack = createStackNavigator()
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Homepage" component={Home} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Orders" component={Orders} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
