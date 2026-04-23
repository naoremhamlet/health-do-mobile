import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import TopHeader from '../components/TopHeader';
import CustomButton from '../components/CustomButton';
import { COLORS, SIZES, SHADOWS, image, PADDINGS } from '../constants'; // Using your constants


const OrderDetailsPopup = ({ visible, order, onClose }) => {
  if (!order) return null;

  const isDelivered = order.status === 'delivered';
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 40;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Order Summary</Text>
              <Text style={styles.modalOrderId}>ID: #ORD-{order.id}026</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {!isDelivered && (
              <View style={styles.trackingSection}>
                <View style={styles.trackingRow}>
                    <FontAwesome5 name="utensils" size={16} color={COLORS.primary} />
                    <Text style={styles.trackingText}>Restaurant is preparing your food...</Text>
                </View>
              </View>
            )}

            <View style={styles.detailSection}>
              <Text style={styles.sectionHeading}>Items Ordered</Text>
              {order.items.map((prod, index) => (
                <View key={index} style={styles.detailItemRow}>
                  <View style={{flex: 1}}>
                    <Text style={styles.detailItemName}>{prod.name}</Text>
                    <Text style={styles.detailItemQty}>Quantity: {prod.quantity}</Text>
                  </View>
                  <Text style={styles.detailItemPrice}>₹{prod.price * prod.quantity}</Text>
                </View>
              ))}
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.sectionHeading}>Payment Details</Text>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Subtotal</Text>
                <Text style={styles.billValue}>₹{subtotal}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={styles.billValue}>₹{deliveryFee}</Text>
              </View>
              <View style={styles.totalDivider} />
              <View style={styles.billRow}>
                <Text style={styles.totalLabel}>Total Paid</Text>
                <Text style={styles.totalValue}>₹{subtotal + deliveryFee}</Text>
              </View>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.sectionHeading}>Delivery Address</Text>
              <Text style={styles.addressText}>Home • Nambol Naorem, Near Community Hall, Manipur</Text>
            </View>
          </ScrollView>

          <CustomButton 
            title={isDelivered ? "Reorder All" : "Track Driver"} 
            goto={() => alert("Tracking Driver...")} 
            additionalStyle={{ flex: 0, marginTop: 15 }} 
          />
        </View>
      </View>
    </Modal>
  );
};

/**
 * COMPONENT: Order Card
 */
const OrderItem = ({ item, onViewDetails }) => {
  const isDelivered = item.status === 'delivered';
  const itemCount = item.items.length;
  const itemSummary = itemCount > 1 
    ? `${item.items[0].name} + ${itemCount - 1} others`
    : item.items[0].name;

  return (
    <TouchableOpacity 
        style={[
            styles.orderCard, 
            isDelivered ? styles.pastCard : styles.activeCard,
            isDelivered ? SHADOWS.small : SHADOWS.medium // Using your SHADOWS
        ]} 
        activeOpacity={0.9} 
    >
      <View style={styles.cardHeader}>
        <Image source={item.items[0].image} style={styles.productImg} />
        <View style={styles.infoColumn}>
          <Text style={styles.productName} numberOfLines={1}>{itemSummary}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>₹{item.totalPrice}</Text>
            <View style={styles.itemCountBadge}>
              <Text style={styles.itemCountText}>{itemCount} Item{itemCount > 1 ? 's' : ''}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.statusBadge}>
          <View style={[styles.dot, { backgroundColor: isDelivered ? '#4CAF50' : '#FF9500' }]} />
          <Text style={[styles.statusText, { color: isDelivered ? '#4CAF50' : '#FF9500' }]}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Pressable onPress={() => onViewDetails(item)}>
          <Text style={styles.viewDetailsLink}>Details</Text>
        </Pressable>
        <View style={styles.actionGroup}>
          {isDelivered ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={styles.helpBtn}><Text style={styles.helpBtnTxt}>Help</Text></TouchableOpacity>
              <TouchableOpacity style={styles.rateBtn}><Text style={styles.rateBtnTxt}>Rate</Text></TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.cancelBtn}><Text style={styles.cancelBtnText}>Cancel</Text></TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};


const OrderFilter = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity 
        style={[styles.filterBtn, activeTab === 'active' && styles.filterBtnActive]}
        onPress={() => setActiveTab('active')}
      >
        <Text style={[styles.filterText, activeTab === 'active' && styles.filterTextActive]}>
          Active
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.filterBtn, activeTab === 'past' && styles.filterBtnActive]}
        onPress={() => setActiveTab('past')}
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

  const orderData = [
    { 
      id: 1, 
      status: 'preparing',
      totalPrice: 420,
      items: [
        { name: 'Vegetable Mix Omlete', price: 160, quantity: 2, image: image.item1 },
        { name: 'Hot Coffee', price: 50, quantity: 2, image: image.item1 }
      ]
    },
    { 
      id: 2, 
      status: 'delivered',
      totalPrice: 450,
      items: [{ name: 'Cheese Burst Pizza', price: 450, quantity: 1, image: image.item1 }]
    }
  ];

  const filteredOrders = orderData.filter(o => 
    activeTab === 'active' ? o.status !== 'delivered' : o.status === 'delivered'
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Orders" goto={() => navigation.goBack()} />

      <OrderFilter activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollList}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderItem key={order.id} item={order} onViewDetails={(o) => { setSelectedOrder(o); setModalVisible(true); }} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={80} color={COLORS.gray2} />
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
  
  // Filter Styles
 filterContainer: {
    flexDirection: 'row', 
    marginTop: 15, 
    justifyContent: 'space-evenly',
    paddingHorizontal: PADDINGS.horizonatal + 30,
    marginBottom: 20,
  },
  filterBtn: {
    paddingBottom: 8, 
    borderBottomWidth: 1, 
    borderBottomColor: 'transparent', 
    width: '50%', 
    alignItems: 'center' 
  },
  filterBtnActive: {
    borderBottomColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600', 
    color: '#A0A0A0' 
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
  productImg: { height: 60, width: 60, borderRadius: 12 },
  infoColumn: { flex: 1, marginLeft: 15 },
  productName: { fontSize: 14, fontWeight: '900', color: COLORS.black },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  productPrice: { fontSize: SIZES.small + 1, fontWeight: '900', color: COLORS.primary },
  itemCountBadge: { marginLeft: 8, backgroundColor: COLORS.lightWhite, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5 },
  itemCountText: { fontSize: SIZES.xSmall - 1, fontWeight: '800', color: COLORS.gray },
  statusBadge: { position: 'absolute', top: -2, right: 0, flexDirection: 'row', alignItems: 'center' },
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

  // Modal Styles
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    backgroundColor: COLORS.white, 
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35, 
    padding: 25, 
    paddingBottom: 100,
    maxHeight: '80%' 
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: SIZES.medium, fontWeight: '900' },
  modalOrderId: { fontSize: SIZES.xSmall, color: COLORS.gray2 },
  closeBtn: { backgroundColor: COLORS.lightWhite, padding: 6, borderRadius: 20 },
  trackingSection: { backgroundColor: COLORS.primary + '10', padding: 12, borderRadius: 12, marginBottom: 20 },
  trackingRow: { flexDirection: 'row', alignItems: 'center' },
  trackingText: { marginLeft: 10, fontSize: SIZES.small, color: COLORS.primary, fontWeight: '700' },
  detailSection: { marginBottom: 20 },
  sectionHeading: { fontSize: SIZES.small, fontWeight: '800', color: COLORS.gray2, marginBottom: 12, textTransform: 'uppercase' },
  detailItemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  detailItemName: { fontSize: 14, fontWeight: '700', color: COLORS.black },
  detailItemQty: { fontSize: SIZES.small, color: COLORS.gray, marginTop: 2 },
  detailItemPrice: { fontSize: 14, fontWeight: '900' },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  billLabel: { color: COLORS.gray, fontSize: SIZES.small },
  billValue: { fontSize: SIZES.small, fontWeight: '700' },
  totalDivider: { height: 1, backgroundColor: COLORS.lightWhite, marginVertical: 10 },
  totalLabel: { fontSize: SIZES.medium, fontWeight: '900' },
  totalValue: { fontSize: SIZES.medium, fontWeight: '900', color: COLORS.primary },
  addressText: { fontSize: SIZES.small, color: COLORS.gray, lineHeight: 19 },
});