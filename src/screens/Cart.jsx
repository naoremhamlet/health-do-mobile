import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch, useSelector } from 'react-redux';

import TopHeader from '../components/TopHeader';
import CustomButton from '../components/CustomButton';
import Error from '../components/Error';

import { updateCart } from '../store/reducer/cart';
import { updateFavourites } from '../store/reducer/favourites';
import { COLORS, SIZES, SHADOWS, image } from '../constants';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * COMPONENT: CartItemCard
 * Featuring an expandable "Ingredients" section
 */
const CartItemCard = ({ item, onIncrease, onDecrease }) => {
  const [expanded, setExpanded] = useState(false);

  const dummyItem = {
    name: "Vegetable Mix Omlete",
    price: "160",
    ingredients: ["Carrrot", "Cabbage", "Roasted Chicken", "Tortillas"]
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.card, SHADOWS.small]}>
      <View style={styles.mainRow}>
        {/* Product Image */}
        <Image source={item.image || image.item1} style={styles.productImg} />

        {/* Content Container */}
        <View style={styles.contentContainer}>
          <TouchableOpacity 
            style={styles.infoSide} 
            onPress={toggleExpand}
            activeOpacity={0.7}
          >
            <Text style={styles.productName} numberOfLines={1}>{dummyItem.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>₹{dummyItem.price}</Text>
              {dummyItem.ingredients && (
                <View style={styles.detailTrigger}>
                  <Text style={styles.detailTriggerText}>Details</Text>
                  <Ionicons 
                    name={expanded ? "chevron-up" : "chevron-down"} 
                    size={12} 
                    color={COLORS.primary} 
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Quantity Control Pill */}
          <View style={styles.quantityPill}>
            <TouchableOpacity onPress={onDecrease} style={[styles.qtyBtn, SHADOWS.small]}>
              <Feather name="minus" size={14} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.qtyNumber}>{item.quantity}</Text>
            <TouchableOpacity onPress={onIncrease} style={[styles.qtyBtn, SHADOWS.small]}>
              <Feather name="plus" size={14} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* EXPANDABLE DETAILS SECTION */}
      {expanded && dummyItem.ingredients && (
        <View style={styles.expandedSection}>
          <View style={styles.divider} />
          <Text style={styles.ingredientsHeading}>Customized Ingredients:</Text>
          <View style={styles.ingredientsList}>
            {dummyItem.ingredients.map((ing, idx) => (
              <View key={idx} style={styles.ingredientBadge}>
                <Text style={styles.ingredientText}>{ing}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

function SwipeProduct({ navigation }) {
  const cart = useSelector((state) => state.cart.cart);
  const favourites = useSelector((state) => state.favourites.favourites);
  const dispatch = useDispatch();

  const updateQty = (id, delta) => {
    const newCart = cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    dispatch(updateCart(newCart));
  };

  const toggleFavourite = (id) => {
    const isFav = favourites.some(el => el.id === id);
    dispatch(updateFavourites(isFav ? favourites.filter(el => el.id !== id) : [...favourites, { id }]));
  };

  const deleteItem = (rowMap, id) => {
    if (rowMap[id]) rowMap[id].closeRow();
    dispatch(updateCart(cart.filter(el => el.id !== id)));
  };

  const renderHiddenItem = (data, rowMap) => {
    const isFav = favourites.some(el => el.id === data.item.id);
    return (
      <View style={styles.rowBack}>
        <View style={styles.backRightBtn}>
          <Pressable onPress={() => toggleFavourite(data.item.id)} style={[styles.actionBtn, {backgroundColor: COLORS.primary}, SHADOWS.small]}>
            <MaterialIcons name={isFav ? "favorite" : "favorite-outline"} size={22} color="white" />
          </Pressable>
          <Pressable onPress={() => deleteItem(rowMap, data.item.id)} style={[styles.actionBtn, {backgroundColor: COLORS.red}, SHADOWS.small]}>
            <MaterialCommunityIcons name='delete-outline' size={22} color="white" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SwipeListView
      disableRightSwipe
      data={cart}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <CartItemCard 
            item={item} 
            onIncrease={() => updateQty(item.id, 1)}
            onDecrease={() => updateQty(item.id, -1)}
          />
        </View>
      )}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-140}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 150 }}
    />
  );
}

export default function Cart({ navigation }) {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="My Cart" goto={() => navigation.goBack()} />

      {cart && cart.length === 0 ? (
        <Error
          icon={<MaterialCommunityIcons name="cart-off" size={100} color={COLORS.gray2} />}
          title="Your cart is empty"
          desc="Add some delicious food to your cart!"
          isButton={true}
          buttonFunc={() => navigation.navigate("Homepage")}
          buttonName="Browse Menu"
        />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.listWrapper}>
            <SwipeProduct navigation={navigation} />
          </View>
          <CustomButton 
            title="Proceed to Checkout" 
            goto={() => navigation.navigate("Checkout")} 
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 35,
    paddingTop: 50 
  },
  listWrapper: { 
    flex: 1, 
    marginTop: 20 
  },
  cardWrapper: { 
    paddingVertical: 10, 
  },
  
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: 12,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.lightWhite,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoSide: { flex: 1, paddingRight: 10 },
  productName: { 
    fontSize: SIZES.small, 
    fontWeight: '900', 
    color: COLORS.black 
  },
  priceContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 2 
  },
  productPrice: { 
    fontSize: SIZES.small, 
    fontWeight: '900', 
    color: COLORS.primary 
  },
  
  detailTrigger: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 10,
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5
  },
  detailTriggerText: { 
    fontSize: SIZES.xSmall, 
    fontWeight: '700', color: 
    COLORS.primary, marginRight: 2 
  },

  quantityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightWhite,
    borderRadius: 20,
    padding: 4,
    minWidth: 90,
    justifyContent: 'space-between',
  },
  qtyBtn: { 
    width: 26, 
    height: 26, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: COLORS.white, 
    borderRadius: 13 
  },
  qtyNumber: { 
    fontSize: 14, 
    fontWeight: '900', 
    color: COLORS.black 
  },

  // --- EXPANDED SECTION STYLES ---
  expandedSection: {
    marginTop: 5,
    paddingHorizontal: 5,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightWhite,
    marginVertical: 10,
  },
  ingredientsHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.gray,
    marginBottom: 8,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: COLORS.gray2 + '30',
  },
  ingredientText: {
    fontSize: 10,
    color: COLORS.black,
    fontWeight: '500',
  },

  // Swipe & Actions
  rowBack: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    paddingRight: 25
  },
  backRightBtn: { 
    flexDirection: 'row' 
  },
  actionBtn: { 
    width: 45, 
    height: 45, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 12 
  },
  checkoutBtn: { 
    flex: 0, 
    position: 'absolute', 
    bottom: 30, 
    width: '100%', 
    alignSelf: 'center' 
  }
});