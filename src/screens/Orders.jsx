import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import TopHeader from '../components/TopHeader';
import PopupShell from '../components/Popup/PopupShell';
import { COLORS, SIZES, SHADOWS, PADDINGS } from '../constants';
import { getProductById } from '../helper';
import { updateOrders } from '../store/reducer/orders';

const DELIVERY_FEE = 40;

// Resolves each order's lean {id, quantity} items into real product data
const resolveOrderItems = (items) => items.map(({ id, quantity }) => {
  const product = getProductById(id);
  return { ...product, quantity, lineTotal: (product?.price || 0) * quantity };
});

const OrderDetailsPopup = ({ visible, order, onClose }) => {
  const selectedAddress = useSelector(state =>
    state.address.addresses.find(a => a.id === state.address.selectedAddressId)
  );

  if (!order) return null;

  const isDelivered = order.status === 'delivered';
  const isCancelled = order.status === 'cancelled';
  const isFinal = isDelivered || isCancelled;
  const resolvedItems = resolveOrderItems(order.items);
  const subtotal = resolvedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const statusMeta = isCancelled
    ? { label: 'Cancelled', color: COLORS.red, bg: COLORS.red + '15' }
    : isDelivered
    ? { label: 'Delivered', color: COLORS.success, bg: COLORS.success + '15' }
    : { label: 'Preparing', color: COLORS.warning, bg: COLORS.warning + '15' };

  return (
    <PopupShell
      visible={visible}
      onClose={onClose}
      title="Order Summary"
      subtitle={`#ORD-${order.id}026 · ${order.date}`}
      titleAccessory={
        <View style={[styles.statusPill, { backgroundColor: statusMeta.bg }]}>
          <View style={[styles.dot, { backgroundColor: statusMeta.color }]} />
          <Text style={[styles.statusText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
        </View>
      }
      primaryAction={{
        label: isFinal ? "Reorder All" : "Track Driver",
        onPress: () => Alert.alert(
          isFinal ? "Reorder" : "Tracking Driver",
          isFinal ? "Adding all items back to your cart..." : "Locating your delivery partner..."
        ),
        tone: isFinal ? undefined : 'dark',
      }}
    >
      {!isFinal && (
        <View style={styles.trackingSection}>
          <View style={styles.trackingRow}>
              <FontAwesome5 name="utensils" size={16} color={COLORS.primary} />
              <Text style={styles.trackingText}>Restaurant is preparing your food...</Text>
          </View>
        </View>
      )}

      <View style={styles.detailSection}>
        <View style={styles.sectionHeadingRow}>
          <MaterialCommunityIcons name="food-outline" size={15} color={COLORS.gray} />
          <Text style={styles.sectionHeading}>Items Ordered</Text>
        </View>
        {resolvedItems.map((prod, index) => (
          <View key={index} style={styles.detailItemRow}>
            <View style={{flex: 1}}>
              <Text style={styles.detailItemName}>{prod.name}</Text>
              <Text style={styles.detailItemQty}>Quantity: {prod.quantity}</Text>
            </View>
            <Text style={styles.detailItemPrice}>₹{prod.lineTotal}</Text>
          </View>
        ))}
      </View>

      <View style={styles.detailSection}>
        <View style={styles.sectionHeadingRow}>
          <MaterialCommunityIcons name="receipt" size={15} color={COLORS.gray} />
          <Text style={styles.sectionHeading}>Payment Details</Text>
        </View>
        <View style={styles.paymentCard}>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Subtotal</Text>
            <Text style={styles.billValue}>₹{subtotal}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Fee</Text>
            <Text style={styles.billValue}>₹{DELIVERY_FEE}</Text>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.billRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>₹{subtotal + DELIVERY_FEE}</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailSection}>
        <View style={styles.sectionHeadingRow}>
          <Ionicons name="location-outline" size={15} color={COLORS.gray} />
          <Text style={styles.sectionHeading}>Delivery Address</Text>
        </View>
        <Text style={styles.addressText}>
          {selectedAddress ? `${selectedAddress.type} • ${selectedAddress.address}` : 'No address selected'}
        </Text>
      </View>
    </PopupShell>
  );
};

/**
 * COMPONENT: Order Card
 */
const OrderItem = ({ item, onViewDetails, onCancel, navigation }) => {
  const isDelivered = item.status === 'delivered';
  const isCancelled = item.status === 'cancelled';
  const resolvedItems = resolveOrderItems(item.items);
  const itemCount = resolvedItems.length;
  const totalPrice = resolvedItems.reduce((sum, p) => sum + p.lineTotal, 0);
  const itemSummary = itemCount > 1 
    ? `${resolvedItems[0].name} + ${itemCount - 1} others`
    : resolvedItems[0]?.name;

  const statusMeta = isCancelled
    ? { label: 'Cancelled', color: COLORS.red, bg: COLORS.red + '15' }
    : isDelivered
    ? { label: 'Delivered', color: COLORS.success, bg: COLORS.success + '15' }
    : { label: 'Preparing', color: COLORS.warning, bg: COLORS.warning + '15' };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order? This cannot be undone.',
      [
        { text: 'Keep Order', style: 'cancel' },
        { text: 'Cancel Order', style: 'destructive', onPress: () => onCancel(item.id) },
      ]
    );
  };

  return (
    <TouchableOpacity 
        style={[
            styles.orderCard, 
            (isDelivered || isCancelled) ? styles.pastCard : styles.activeCard,
            (isDelivered || isCancelled) ? SHADOWS.small : SHADOWS.medium // Using your SHADOWS
        ]} 
        activeOpacity={0.9} 
        onPress={() => onViewDetails(item)}
    >
      <View style={styles.metaRow}>
        <View style={styles.orderIdRow}>
          <MaterialCommunityIcons name="receipt-text-outline" size={13} color={COLORS.gray} />
          <Text style={styles.orderIdText}>#ORD-{item.id}026 · {item.date}</Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: statusMeta.bg }]}>
          <View style={[styles.dot, { backgroundColor: statusMeta.color }]} />
          <Text style={[styles.statusText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
        </View>
      </View>

      <View style={styles.cardHeader}>
        <Image source={resolvedItems[0]?.image?.[0]} style={styles.productImg} />
        <View style={styles.infoColumn}>
          <Text style={styles.productName} numberOfLines={1}>{itemSummary}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>₹{totalPrice}</Text>
            <View style={styles.itemCountBadge}>
              <Text style={styles.itemCountText}>{itemCount} Item{itemCount > 1 ? 's' : ''}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Pressable onPress={() => onViewDetails(item)} hitSlop={8}>
          <Text style={styles.viewDetailsLink}>View Details</Text>
        </Pressable>
        <View style={styles.actionGroup}>
          {isDelivered || isCancelled ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity 
                style={styles.helpBtn} 
                onPress={() => navigation.navigate('Support')}
                hitSlop={8}
              >
                <Text style={styles.helpBtnTxt}>Help</Text>
              </TouchableOpacity>
              {isDelivered && (
                <TouchableOpacity 
                  style={styles.rateBtn} 
                  onPress={() => Alert.alert('Rate Order', 'Thanks for choosing to rate this order — rating UI coming soon!')}
                >
                  <Text style={styles.rateBtnTxt}>Rate</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel} hitSlop={8}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};


const OrderFilter = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.filterTrack}>
      <TouchableOpacity 
        style={[styles.filterPill, activeTab === 'active' && styles.filterPillActive]}
        onPress={() => setActiveTab('active')}
        activeOpacity={0.8}
      >
        <Text style={[styles.filterText, activeTab === 'active' && styles.filterTextActive]}>
          Active
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.filterPill, activeTab === 'past' && styles.filterPillActive]}
        onPress={() => setActiveTab('past')}
        activeOpacity={0.8}
      >
        <Text style={[styles.filterText, activeTab === 'past' && styles.filterTextActive]}>
          History
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Orders({ navigation }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('active');

  const orderData = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  const handleCancelOrder = (orderId) => {
    dispatch(updateOrders(
      orderData.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o)
    ));
  };

  const filteredOrders = orderData.filter(o => 
    activeTab === 'active' ? o.status !== 'delivered' && o.status !== 'cancelled' : (o.status === 'delivered' || o.status === 'cancelled')
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Orders" goto={() => navigation.goBack()} />

      <OrderFilter activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollList}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderItem 
              key={order.id} 
              item={order} 
              onViewDetails={(o) => { setSelectedOrder(o); setModalVisible(true); }} 
              onCancel={handleCancelOrder}
              navigation={navigation}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBackdrop}>
              <MaterialCommunityIcons name="clipboard-text-outline" size={56} color={COLORS.primary} />
            </View>
            <Text style={styles.emptyText}>No {activeTab} orders found</Text>
          </View>
        )}
      </ScrollView>

      <OrderDetailsPopup visible={modalVisible} order={selectedOrder} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  
  // Filter Styles (segmented control)
  filterTrack: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: PADDINGS.horizonatal,
    marginBottom: 20,
    backgroundColor: COLORS.softBg,
    borderRadius: 16,
    padding: 4,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  filterPillActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700', 
    color: COLORS.inactiveGray 
  },
  filterTextActive: {
    color: COLORS.primary,
    fontWeight: '900',
  },

  // List & Empty State
  scrollList: {
    paddingHorizontal: PADDINGS.horizonatal,
    paddingTop: 10, 
  },
  emptyContainer: { 
    alignItems: 'center', 
    marginTop: 100 
  },
  emptyIconBackdrop: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.softBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: { 
    marginTop: 15, 
    fontSize: SIZES.small, 
    color: COLORS.gray2, 
    fontWeight: '600' 
  },

  // Card Styles
  orderCard: { 
    backgroundColor: COLORS.white, 
    borderRadius: 22, 
    padding: 16, 
    marginBottom: 16 
  },
  activeCard: { 
    borderWidth: 1, 
    borderColor: COLORS.primary + '15' 
  },
  pastCard: { 
    opacity: 0.9 
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.lightWhite, 
    paddingBottom: 15 
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  orderIdText: {
    fontSize: SIZES.xSmall,
    fontWeight: '600',
    color: COLORS.gray,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  productImg: { height: 60, width: 60, borderRadius: 12 },
  infoColumn: { flex: 1, marginLeft: 15 },
  productName: { fontSize: 14, fontWeight: '900', color: COLORS.black },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  productPrice: { fontSize: SIZES.small + 1, fontWeight: '900', color: COLORS.primary },
  itemCountBadge: { marginLeft: 8, backgroundColor: COLORS.lightWhite, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5 },
  itemCountText: { fontSize: SIZES.xSmall - 1, fontWeight: '800', color: COLORS.gray },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  statusText: { fontSize: SIZES.xSmall - 1, fontWeight: '900', textTransform: 'uppercase' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  viewDetailsLink: { fontSize: SIZES.small, fontWeight: '800', color: COLORS.primary, textDecorationLine: 'underline' },
  actionGroup: { flexDirection: 'row' },
  cancelBtn: { paddingHorizontal: 10 },
  cancelBtnText: { color: COLORS.red, fontSize: SIZES.small, fontWeight: '800' },
  rateBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginLeft: 8 },
  rateBtnTxt: { color: COLORS.white, fontSize: SIZES.xSmall + 1, fontWeight: '800' },
  helpBtn: { paddingHorizontal: 8 },
  helpBtnTxt: { color: COLORS.gray, fontSize: SIZES.xSmall + 1, fontWeight: '700' },

  // Modal (Order Details Popup) content styles — chrome now lives in PopupShell
  trackingSection: { backgroundColor: COLORS.primary + '10', padding: 12, borderRadius: 12, marginBottom: 20 },
  trackingRow: { flexDirection: 'row', alignItems: 'center' },
  trackingText: { marginLeft: 10, fontSize: SIZES.small, color: COLORS.primary, fontWeight: '700' },
  detailSection: { marginBottom: 20 },
  sectionHeadingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  sectionHeading: { fontSize: SIZES.small, fontWeight: '800', color: COLORS.gray2, textTransform: 'uppercase' },
  detailItemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  detailItemName: { fontSize: 14, fontWeight: '700', color: COLORS.black },
  detailItemQty: { fontSize: SIZES.small, color: COLORS.gray, marginTop: 2 },
  detailItemPrice: { fontSize: 14, fontWeight: '900' },
  paymentCard: {
    backgroundColor: COLORS.softBg,
    borderRadius: 16,
    padding: 16,
  },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  billLabel: { color: COLORS.gray, fontSize: SIZES.small },
  billValue: { fontSize: SIZES.small, fontWeight: '700' },
  totalDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
  totalLabel: { fontSize: SIZES.medium, fontWeight: '900' },
  totalValue: { fontSize: SIZES.medium, fontWeight: '900', color: COLORS.primary },
  addressText: { fontSize: SIZES.small, color: COLORS.gray, lineHeight: 19 },
});