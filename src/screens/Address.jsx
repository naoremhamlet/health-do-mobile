import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, PADDINGS, SHADOWS } from '../constants';
import TopHeader from '../components/TopHeader';
import CustomButton from '../components/CustomButton';
import Error from '../components/Error';
import { updateAddresses, setSelectedAddress } from '../store/reducer/address';

import { AddressPopup } from '../components/Popup/AddressPopup'; 

const AddressCard = ({ item, isSelected, onSelect, onEdit, onDelete }) => {
  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'home': return 'home-outline';
      case 'work': return 'briefcase-outline';
      default: return 'location-outline';
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.card, SHADOWS.small, isSelected && styles.selectedCard]} 
      onPress={() => onSelect(item.id)}
      activeOpacity={0.85}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          <View style={[styles.iconBox, { backgroundColor: COLORS.primary + '15' }]}>
            <Ionicons name={getIcon(item.type)} size={20} color={COLORS.primary} />
          </View>
          <Text style={styles.addressType}>{item.type}</Text>
        </View>
        {isSelected && (
          <View style={styles.selectedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={COLORS.white} />
            <Text style={styles.selectedBadgeText}>In Use</Text>
          </View>
        )}
      </View>

      <View style={styles.addressBody}>
        <Text style={styles.addressText} numberOfLines={2}>{item.address}</Text>
        <Text style={styles.phoneText}>{item.phone}</Text>
      </View>
      
      <View style={styles.cardFooter}>
         {/* TRIGGER EDIT POPUP */}
         <TouchableOpacity style={styles.actionLink} onPress={() => onEdit(item)}>
            <Text style={styles.actionLinkText}>Edit Address</Text>
         </TouchableOpacity>
         <View style={styles.dotSeparator} />
         <TouchableOpacity style={styles.actionLink} onPress={() => onDelete(item)}>
            <Text style={[styles.actionLinkText, { color: COLORS.red }]}>Delete</Text>
         </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default function Address({ navigation }) {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedAddress, setSelectedAddressForEdit] = useState(null);

  const addresses = useSelector(state => state.address.addresses);
  const selectedAddressId = useSelector(state => state.address.selectedAddressId);
  const dispatch = useDispatch();

  const handleEditPress = (address) => {
    setSelectedAddressForEdit(address); // Pass the current address data to the popup
    setIsPopupVisible(true);
  };

  const handleDelete = (address) => {
    Alert.alert(
      'Delete Address',
      `Remove your ${address.type} address? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const remaining = addresses.filter(a => a.id !== address.id);
            dispatch(updateAddresses(remaining));
            if (selectedAddressId === address.id) {
              dispatch(setSelectedAddress(remaining[0]?.id || null));
            }
          },
        },
      ]
    );
  };

  const handleSaveAddress = (formData) => {
    if (selectedAddress) {
      dispatch(updateAddresses(addresses.map(a =>
        a.id === selectedAddress.id
          ? { ...a, address: formData.address, phone: formData.phone || a.phone }
          : a
      )));
    } else {
      const newAddress = {
        id: Date.now().toString(),
        type: 'Other',
        address: formData.address,
        phone: formData.phone || '—',
      };
      dispatch(updateAddresses([...addresses, newAddress]));
      // First address ever added becomes the selected one automatically
      if (addresses.length === 0) dispatch(setSelectedAddress(newAddress.id));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Saved Addresses" goto={() => navigation.goBack()} />

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, addresses.length === 0 && styles.emptyListContent]}
        ListHeaderComponent={
          addresses.length > 0 ? (
            <Text style={styles.hintText}>Tap an address to use it for delivery</Text>
          ) : null
        }
        renderItem={({ item }) => (
            <AddressCard 
              item={item} 
              isSelected={item.id === selectedAddressId}
              onSelect={(id) => dispatch(setSelectedAddress(id))}
              onEdit={handleEditPress} 
              onDelete={handleDelete} 
            />
        )}
        ListEmptyComponent={
          <Error
            icon={<MaterialCommunityIcons name="map-marker-off-outline" size={64} color={COLORS.primary} />}
            title="No saved addresses"
            desc="Add a delivery address to get started."
          />
        }
      />

      { isPopupVisible && 
      <AddressPopup 
        closePopup={() => setIsPopupVisible(false)} 
        type={selectedAddress ? "Edit Address" : "Add New Address"}
        initialValues={selectedAddress}
        onSave={handleSaveAddress}
      />}


      <View style={styles.footer}>
        <CustomButton 
          title="New Address" 
          goto={() => {
            setSelectedAddressForEdit(null);
            setIsPopupVisible(true);
          }} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
   },
  listContent: { 
    paddingHorizontal: PADDINGS.horizonatal, 
    paddingTop: 20, 
    paddingBottom: 120 
  },
  emptyListContent: {
    flex: 1,
    paddingBottom: 0,
  },
  hintText: {
    fontSize: 12,
    color: COLORS.gray2,
    fontWeight: '600',
    marginBottom: 15,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  selectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  selectedBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.white,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  addressType: { fontSize: 16, fontWeight: '900', color: COLORS.black },
  addressBody: { marginBottom: 15 },
  addressText: { fontSize: 14, color: COLORS.gray, lineHeight: 20, fontWeight: '500' },
  phoneText: { fontSize: 13, color: COLORS.black, fontWeight: '700', marginTop: 8 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.divider, paddingTop: 15, gap: 15 },
  actionLink: { paddingVertical: 4 },
  actionLinkText: { fontSize: 13, fontWeight: '800', color: COLORS.primary },
  dotSeparator: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#DDD' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
    paddingBottom: Platform.OS === 'ios' ? 40 : 25,
    paddingTop: 15,
    backgroundColor: COLORS.softBg,
  },
});