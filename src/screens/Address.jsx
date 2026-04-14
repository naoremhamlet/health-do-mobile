import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants';
import TopHeader from '../components/TopHeader';
import CustomButton from '../components/CustomButton';

import { AddressPopup } from '../components/Popup/AddressPopup'; 

const AddressCard = ({ item, onEdit }) => {
  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'home': return 'home-outline';
      case 'work': return 'briefcase-outline';
      default: return 'location-outline';
    }
  };

  return (
    <View style={[styles.card, SHADOWS.small]}>
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          <View style={[styles.iconBox, { backgroundColor: COLORS.primary + '15' }]}>
            <Ionicons name={getIcon(item.type)} size={20} color={COLORS.primary} />
          </View>
          <Text style={styles.addressType}>{item.type}</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-vertical" size={20} color={COLORS.gray} />
        </TouchableOpacity>
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
         <TouchableOpacity style={styles.actionLink}>
            <Text style={[styles.actionLinkText, { color: '#FF5252' }]}>Delete</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Address({ navigation }) {
  // --- STATE FOR POPUP ---
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [addresses, setAddresses] = useState([
    { id: '1', type: 'Home', address: 'Nambol Naorem, Near Community Hall, Bishnupur, Manipur - 795134', phone: '+91 9366309563' },
    { id: '2', type: 'Work', address: 'IIIT Campus, Electronic City Phase 1, Bangalore, Karnataka - 560100', phone: '+91 9366309563' },
  ]);

  const handleEditPress = (address) => {
    setSelectedAddress(address); // Pass the current address data to the popup
    setIsPopupVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Saved Addresses" goto={() => navigation.goBack()} />

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
            <AddressCard item={item} onEdit={handleEditPress} />
        )}
      />

      {/* 2. THE EDIT ADDRESS POPUP
      <AddressPopup
        closePopup={() => navigation.goBack()} 
        type={"Edit Address"}
      /> */}

      { isPopupVisible && 
      <AddressPopup 
        closePopup={() => setIsPopupVisible(false)} 
        type={selectedAddress ? "Edit Address" : "Add New Address"}
      />}


      <View style={styles.footer}>
        <CustomButton 
          title="Add New Address" 
          goto={() => {
            setSelectedAddress(null);
            setIsPopupVisible(true);
          }} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  listContent: { paddingHorizontal: 25, paddingTop: 20, paddingBottom: 120 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  addressType: { fontSize: 16, fontWeight: '900', color: COLORS.black },
  addressBody: { marginBottom: 15 },
  addressText: { fontSize: 14, color: COLORS.gray, lineHeight: 20, fontWeight: '500' },
  phoneText: { fontSize: 13, color: COLORS.black, fontWeight: '700', marginTop: 8 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingTop: 15, gap: 15 },
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
    backgroundColor: '#F9F9F9',
  },
});