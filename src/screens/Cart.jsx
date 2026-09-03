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
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch, useSelector } from 'react-redux';

import TopHeader from '../components/TopHeader';
import Error from '../components/Error';

import { updateCart } from '../store/reducer/cart';
import { updateFavourites } from '../store/reducer/favourites';
import { COLORS, SIZES, SHADOWS, image, PADDINGS } from '../constants';
import { getProductById } from '../helper';


const CartItemCard = ({ item, onIncrease, onDecrease }) => {
  const [expanded, setExpanded] = useState(false);
  
  const data = getProductById(item?.id);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.card, SHADOWS.small]}>
      <View style={styles.mainRow}>
        {/* Product Image */}
        <Image source={data?.image?.[0]} style={styles.productImg} />

        {/* Content Container */}
        <View style={styles.contentContainer}>
          <TouchableOpacity 
            style={styles.infoSide} 
            onPress={toggleExpand}
            activeOpacity={0.7}
          >
            <Text style={styles.productName} numberOfLines={1}>{data?.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>₹{data?.price}</Text>
              {data?.ingredients && (
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
      {expanded && data?.ingredients && (
        <View style={styles.expandedSection}>
          <View style={styles.divider} />
          <Text style={styles.ingredientsHeading}>Customized Ingredients:</Text>
          <View style={styles.ingredientsList}>
            {data?.ingredients.map((ing, idx) => (
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
      contentContainerStyle={{ paddingBottom: 190 }}
    />
  );
}

const FREE_DELIVERY_THRESHOLD = 500;

const DeliveryProgressBar = ({ subtotal }) => {
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
  const progress = Math.min(subtotal / FREE_DELIVERY_THRESHOLD, 1);
  const isUnlocked = remaining <= 0;

  return (
    <View style={[styles.deliveryBanner, SHADOWS.small]}>
      <View style={styles.deliveryBannerRow}>
        <MaterialCommunityIcons
          name={isUnlocked ? "truck-check" : "truck-fast-outline"}
          size={17}
          color={COLORS.primary}
        />
        <Text style={styles.deliveryBannerText} numberOfLines={1}>
          {isUnlocked
            ? "You've unlocked free delivery! 🎉"
            : `Add ₹${remaining.toFixed(0)} more for free delivery`}
        </Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

export default function Cart({ navigation }) {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const subtotal = (cart || []).reduce((sum, item) => {
    const product = getProductById(item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const totalItems = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Remove all items from your cart? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear Cart', style: 'destructive', onPress: () => dispatch(updateCart([])) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader 
        title={totalItems > 0 ? `My Cart (${totalItems})` : "My Cart"} 
        goto={() => navigation.goBack()} 
        component={cart && cart.length > 0 ? (
          <TouchableOpacity style={[styles.clearBtn, SHADOWS.small]} onPress={handleClearCart} hitSlop={8}>
            <MaterialCommunityIcons name="trash-can-outline" size={18} color={COLORS.red} />
          </TouchableOpacity>
        ) : null}
      />

      {cart && cart.length === 0 ? (
        <Error
          icon={<MaterialCommunityIcons name="cart-off" size={64} color={COLORS.primary} />}
          title="Your cart is empty"
          desc="Add some delicious food to your cart!"
          isButton={true}
          buttonFunc={() => navigation.navigate("Homepage")}
          buttonName="Browse Menu"
        />
      ) : (
        <View style={{ flex: 1, paddingHorizontal: PADDINGS.horizonatal }}>
          <DeliveryProgressBar subtotal={subtotal} />

          <View style={styles.swipeHintRow}>
            <Ionicons name="hand-left-outline" size={13} color={COLORS.gray2} />
            <Text style={styles.swipeHintText}>Swipe an item left for options</Text>
          </View>

          <View style={styles.listWrapper}>
            <SwipeProduct navigation={navigation} />
          </View>
          <View style={[styles.footer, SHADOWS.medium]}>
            <View style={styles.footerActionRow}>
              <View style={styles.priceInfo}>
                <Text style={styles.totalLabelText}>Subtotal</Text>
                <Text style={styles.totalAmountText}>₹{subtotal.toFixed(2)}</Text>
              </View>
              <TouchableOpacity 
                style={styles.confirmBtn} 
                activeOpacity={0.85}
                onPress={() => navigation.navigate("Checkout")}
              >
                <Text style={styles.confirmBtnText}>Checkout</Text>
                <MaterialIcons name="arrow-forward" size={16} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.softBg,
  },
  clearBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryBanner: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginTop: 15,
  },
  deliveryBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  deliveryBannerText: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.black,
    flexShrink: 1,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.divider,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  swipeHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  swipeHintText: {
    fontSize: SIZES.xSmall,
    color: COLORS.gray2,
    fontWeight: '600',
  },
  listWrapper: { 
    flex: 1, 
    marginTop: 8,
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
  footer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    left: 20,
    right: 20,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: 20,
    ...SHADOWS.medium,
  },
  footerActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceInfo: {
    flex: 1,
  },
  totalLabelText: {
    fontSize: 11,
    color: COLORS.gray,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  totalAmountText: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.black,
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
  },
  confirmBtnText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 15,
  },
});