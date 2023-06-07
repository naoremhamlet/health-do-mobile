import React, { useState } from 'react'
import { View, Pressable, Text, TextInput, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT, SIZES } from '../constants';
import SearchBar from './SearchBar';
import Product from './Product';

const data = [ {id: 1}, {id: 2}, {id: 3}]


const Products = ({ navigation }) => {
  return (
    <FlatList
      horizontal={true}
      data={data}
      showsHorizontalScrollIndicator={false}
      renderItem={(item) => <Product item={item.item} navigation={navigation} />}
      keyExtractor={item => item.id}
     />
  )
}


const ProductSection = ({ active="Salads", setActive, navigation }) => {
  return (
    <View>
      <View style={styles.itemContainer}>
        <FlatList
          style={{ marginLeft: 25, alignSelf: 'flex-end' }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={["Salads", "Drinks", "Fruits"]}
          renderItem={(item) => 
            <TouchableOpacity onPress={() => setActive(item.item)}>
              <Text 
                style={{...styles.itemList, 
                borderBottomWidth: active===item.item? 2:0,
                borderColor: COLORS.primary,
                
              }} >
                  {item.item}
              </Text>
            </TouchableOpacity>}
        />
      </View>
      <View style={{ marginTop: 50}}>
        <Products navigation={navigation} />
      </View>
    </View>
  )
}

const HeaderIcon = ({navigation}) => {
  return (
    <View style={styles.headerIconContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <Ionicons name="cart-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const Heading = () => {
  return (
    <View style={styles.headerHeadingContainer}>
      <Text style={styles.headerHeading}>Healthy</Text>
      <Text style={styles.headerHeading}>Food for you</Text>
    </View>
  )
}

export default function DefaultHome({ navigation }) {
  const [active, setActive] = useState();
  const [searchPhrase, setSearchPhrase] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderIcon navigation={navigation} />
        <Heading />
        <SearchBar
          navigation={navigation}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
           />
      </View>
      <ProductSection 
        setActive={setActive} 
        active={active} 
        navigation={navigation} />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {

  },
  headerContainer: {
    display: 'flex',
    paddingVertical: 50,
    paddingHorizontal: 50
  },
  headerIconContainer: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  headerHeadingContainer: {
    marginTop:40
  },
  headerHeading: {
    fontSize: SIZES.xxxLarge,
    fontWeight: 700
  },
  products: {
    height: 250,
    display: 'flex',
    width: '100%',
    flexDirection: 'row'
  },
  productSectionContainer: {

  },
  itemContainer: {
    paddingHorizontal: 20,
  },
  itemList: {
    fontSize: SIZES.medium,
    fontWeight: 400,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
})