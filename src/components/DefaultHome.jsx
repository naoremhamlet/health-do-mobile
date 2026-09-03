import React, { useState } from 'react'
import { 
    View, Text, StyleSheet, FlatList, 
    TouchableOpacity 
} from 'react-native'
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { COLORS, SIZES, SHADOWS, FONT, PADDINGS } from '../constants';

// Components
import SearchBar from './SearchBar';
import Product from './Product';
import { getProductsByCategory } from '../helper';

const CATEGORY_META = {
  Salads: { icon: 'bowl-mix-outline', color: '#4CAF50' },
  Drinks: { icon: 'cup-outline', color: '#42A5F5' },
  Fruits: { icon: 'food-apple-outline', color: '#FF7043' },
  Snacks: { icon: 'cookie-outline', color: '#AB47BC' },
};

const HEALTHY_TIPS = [
  "Add a handful of nuts to your salad for healthy fats and extra crunch.",
  "Drinking water 30 minutes before a meal can help with portion control.",
  "Swap refined sugar for dates or honey in your snacks for a nutrient boost.",
  "Eating slowly helps your body recognize when it's actually full.",
  "Leafy greens are packed with iron — pair with citrus for better absorption.",
];

/** 1. PRODUCT LIST WITH SEE-MORE CARD **/
const Products = ({ navigation, category }) => {
  // Filter by the active category tab, and append a "See More" card at the end
  const data = getProductsByCategory(category);
  const displayData = [...data, { id: 'see-more', type: 'link' }];

  if (data.length === 0) {
    return (
      <View style={styles.emptyCategory}>
        <MaterialCommunityIcons name="silverware-clean" size={32} color={COLORS.gray2} />
        <Text style={styles.emptyCategoryText}>No {category?.toLowerCase()} items yet — check back soon!</Text>
      </View>
    );
  }

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

/** 1b. HEALTHY TIP CARD (adds variety instead of a second product row) **/
const HealthyTipCard = () => {
  const tip = HEALTHY_TIPS[new Date().getDate() % HEALTHY_TIPS.length];
  return (
    <View style={styles.tipCard}>
      <View style={styles.tipIconCircle}>
        <MaterialCommunityIcons name="leaf" size={16} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.tipLabel}>Healthy Tip of the Day</Text>
        <Text style={styles.tipText} numberOfLines={2}>{tip}</Text>
      </View>
    </View>
  );
};

const ProductSection = ({ active, setActive, navigation }) => {
  const categories = ["Salads", "Drinks", "Fruits", "Snacks"];
  
  return (
    <View style={styles.productSectionContainer}>
      <View style={styles.categoryContainer}>
        {categories.map(item => {
          const isActive = active === item;
          const meta = CATEGORY_META[item];
          return (
            <TouchableOpacity 
              key={item} 
              onPress={() => setActive(item)} 
              style={styles.categoryTab}
              activeOpacity={0.8}
            >
              <View style={[
                styles.categoryIconCircle,
                { backgroundColor: isActive ? meta.color : meta.color + '15' }
              ]}>
                <MaterialCommunityIcons 
                  name={meta.icon} 
                  size={20} 
                  color={isActive ? COLORS.white : meta.color} 
                />
              </View>
              <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
                  {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <HealthyTipCard />
      
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Popular {active}</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("Products")}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
    </View>

      <View style={styles.productRowWrapper}>
        <Products navigation={navigation} category={active} />
      </View>
    </View>
  )
}

/** MAIN HOME COMPONENT **/
export default function DefaultHome({ navigation }) {
  const [active, setActive] = useState("Salads");
  const [searchPhrase, setSearchPhrase] = useState("");
  const cart = useSelector(state => state.cart.cart);
  const cartCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.decorBlob} />

      <View style={styles.headerContainer}>
        {/* Dynamic Heading */}
        <View style={styles.headingBox}>
          <View style={styles.headingTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greetingLabel}>{getGreeting()} 👋</Text>
              <Text style={styles.headingMain}>Healthy life starts here!</Text>
            </View>
            <TouchableOpacity 
              style={[styles.headerIconCircle, SHADOWS.small]} 
              onPress={() => navigation.navigate("Cart")}
            >
              <Ionicons name="cart-outline" size={24} color={COLORS.black} />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <SearchBar
            navigation={navigation}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
          />
        </View>

        {/* Promo Banner — compact single-line strip */}
        <View style={styles.promoBanner}>
          <MaterialIcons name="local-shipping" size={14} color={COLORS.primary} />
          <Text style={styles.promoText}>Free delivery on orders above ₹500 today!</Text>
        </View>
      </View>

      <ProductSection 
          setActive={setActive} 
          active={active} 
          navigation={navigation} 
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    overflow: 'hidden',
  },
  decorBlob: {
    position: 'absolute',
    top: -60,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primary + '08',
  },
  headerContainer: {  
    paddingHorizontal: PADDINGS.horizonatal,
    paddingTop: PADDINGS.top,
    paddingBottom: 10,
  },
  headingTopRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start' 
  },
  headerIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  cartBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.white,
  },
  headingBox: { marginTop: 2 },
  greetingLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  headingMain: {
    fontSize: 21,
    fontWeight: '900',
    color: COLORS.black,
    lineHeight: 26
  },
  searchBox: { marginTop: 14 },

  // Promo Banner — compact single-line strip
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary + '0C',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.primary + '15',
  },
  promoText: {
    flex: 1,
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.black,
  },
  
  // Category Styles
  productSectionContainer: { 
    flex: 1,
    marginTop: 4,
  },
  categoryContainer: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PADDINGS.horizonatal + 5,
    marginBottom: 6,
  },
  categoryTab: { 
    alignItems: 'center',
    width: 68,
  },
  categoryIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryText: { 
    fontSize: 11.5, 
    fontWeight: '600',
    color: COLORS.gray,
  },
  activeCategoryText: { 
    fontWeight: '900',
    color: COLORS.black,
  },

  // Healthy Tip Card
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.softBg,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: PADDINGS.horizonatal,
    marginTop: 8,
  },
  tipIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  tipLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  tipText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.black,
    lineHeight: 14,
  },

  // Section Header
  sectionHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: PADDINGS.horizonatal + 10, 
    marginTop: 14,
    marginBottom: 2
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
  emptyCategory: {
    width: 300,
    alignItems: 'center',
    paddingVertical: 30,
    marginLeft: 25,
  },
  emptyCategoryText: {
    marginTop: 10,
    fontSize: SIZES.small,
    color: COLORS.gray2,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Product row area — fills remaining space, with bottom clearance so the
  // cards end above the floating tab bar (height 65 + bottom offset 25) instead
  // of behind it.
  productRowWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
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
    borderColor: COLORS.border,
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