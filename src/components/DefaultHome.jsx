import React, { useState } from 'react'
import { 
    View, Text, StyleSheet, FlatList, 
    TouchableOpacity, ScrollView, Platform 
} from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS, FONT, PADDINGS } from '../constants';

// Components
import SearchBar from './SearchBar';
import Product from './Product';

const data = [ {id: 1}, {id: 2}, {id: 3} ]

/** 1. PRODUCT LIST WITH SEE-MORE CARD **/
const Products = ({ navigation }) => {
  // Append a special item for the "See More" card
  const displayData = [...data, { id: 'see-more', type: 'link' }];

  return (
    <FlatList
      horizontal
      data={displayData}
      contentContainerStyle={styles.productListContent}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        if (item.type === 'link') {
          return (
            <TouchableOpacity 
              style={styles.seeMoreCard}
              onPress={() => navigation.navigate("Products")} // Or your full list route
              activeOpacity={0.7}
            >
              <View style={styles.chevronCircle}>
                <MaterialIcons name="chevron-right" size={45} color={COLORS.primary} />
              </View>
              <Text style={styles.seeMoreText}>See More</Text>
            </TouchableOpacity>
          );
        }
        return <Product item={item} navigation={navigation} />;
      }}
      keyExtractor={item => item.id.toString()}
    />
  )
}

const ProductSection = ({ active, setActive, navigation }) => {
  const categories = ["Salads", "Drinks", "Fruits", "Snacks"];
  
  return (
    <View style={styles.productSectionContainer}>
      <View style={styles.categoryContainer}>
        <FlatList
          style={{ marginLeft: 25, alignSelf: 'flex-end' }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setActive(item)} style={[styles.categoryTab, active === item && styles.activeCategoryTab]}>
              <Text style={[ styles.categoryText, active === item && styles.activeCategoryText ]}>
                  {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Popular Near You</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("Products")}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
    </View>

      <View style={{ marginTop: 25 }}>
        <Products navigation={navigation} />
      </View>
    </View>
  )
}

/** MAIN HOME COMPONENT **/
export default function DefaultHome({ navigation }) {
  const [active, setActive] = useState("Salads");
  const [searchPhrase, setSearchPhrase] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Elite Header Icons */}
        <View style={styles.headerIconRow}>
          <TouchableOpacity 
            style={[styles.headerIconCircle, SHADOWS.small]} 
            onPress={() => navigation.openDrawer()}
          >
            <MaterialIcons name="menu" size={24} color={COLORS.black} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.headerIconCircle, SHADOWS.small]} 
            onPress={() => navigation.navigate("Cart")}
          >
            <Ionicons name="cart-outline" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        {/* Dynamic Heading */}
        <View style={styles.headingBox}>
          <Text style={styles.headingMain}>Healthy</Text>
          <Text style={styles.headingMain}>Food for you...</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <SearchBar
            navigation={navigation}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductSection 
            setActive={setActive} 
            active={active} 
            navigation={navigation} 
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  headerContainer: {  
    paddingHorizontal: PADDINGS.horizonatal,
    paddingTop: PADDINGS.top,
    paddingBottom: 20,
  },
  headerIconRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  headerIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingBox: { marginTop: 30 },
  headingMain: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.black,
    lineHeight: 40
  },
  searchBox: { marginTop: 25 },
  
  // Category Styles
  productSectionContainer: { 
    flex: 1, 
    marginTop: 10,
  },
  categoryContainer: { 
    marginBottom: 5,
    paddingHorizontal: PADDINGS.horizonatal
  },
  categoryTab: { 
    marginHorizontal: 2,
    width: 70, 
    alignItems: 'center',
    borderBottomWidth: 1,
    fontWeight: '500',
    opacity: 0.7, 
    borderBottomColor: COLORS.background,
  },
  activeCategoryTab: {
    borderBottomColor: COLORS.primary,
    opacity: 1
  },
  categoryText: { 
    fontSize: 14, 
    paddingVertical: 5,
    fontWeight: '600',
  },
  activeCategoryText: { 
    fontWeight: '900',
    color: COLORS.primary,
  },
  activeDot: { 
    width: 6, 
    height: 6, 
    borderRadius: 3, 
    backgroundColor: COLORS.primary, 
    marginTop: 2 
  },

  // Section Header
  sectionHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', // Changed from flex-end for better alignment
    paddingHorizontal: PADDINGS.horizonatal + 10, 
    marginTop: 40, // More space above the section
    marginBottom: 5 // Space before the cards start
  },
  sectionTitle: { 
    fontSize: SIZES.medium, // Slightly larger
    fontWeight: '900', 
    color: COLORS.black,
    letterSpacing: -0.5 // Tighter spacing looks more premium
  },
  seeAllText: { 
    fontSize: 14, 
    fontWeight: '800', 
    color: COLORS.primary,
    opacity: 0.9,
    paddingBottom: 2 // Tiny lift
  },


  // Product List & See More Card
  productListContent: { 
    marginTop: 10
  },
  seeMoreCard: {
    width: 140,
    height: 200,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    ...SHADOWS.small,
  },
  chevronCircle: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeMoreText: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.black,
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});