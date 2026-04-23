import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, PADDINGS, SHADOWS, SIZES, image } from '../constants';
import TopHeader from './TopHeader';

const HistoryItem = ({ item, onDelete }) => {
  return (
    <View style={styles.historyRow}>
      <View style={styles.imageWrapper}>
        <Image source={item.image || image.item1} style={styles.productThumb} />
        {item.type === 'search' && (
           <View style={styles.searchBadge}>
              <Ionicons name="search" size={10} color={COLORS.white} />
           </View>
        )}
      </View>

      {/* Center: Info */}
      <TouchableOpacity style={styles.infoArea} activeOpacity={0.7}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.timeAgo}>{item.time}</Text>
      </TouchableOpacity>

      {/* Right: Remove from History */}
      <TouchableOpacity 
        style={styles.removeBtn} 
        onPress={() => onDelete(item.id)}
      >
        <Feather name="x" size={16} color={COLORS.gray} />
      </TouchableOpacity>
    </View>
  );
};

export default function History({ navigation }) {
  const [history, setHistory] = React.useState([
    { id: '1', name: 'Keto Avocado Bowl', time: '2 hours ago', type: 'view', image: image.item1 },
    { id: '2', name: 'High Protein Salad', time: 'Yesterday', type: 'search', image: image.item2 },
    { id: '3', name: 'Quinoa & Tofu Mix', time: '3 days ago', type: 'view', image: image.item3 },
  ]);

  const clearHistory = () => {
    setHistory([]);
  };

  const deleteItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title={"History"} goto={() => navigation.goBack()} />
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Recently Viewed</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={clearHistory}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

        <View style={{paddingHorizontal: PADDINGS.horizonatal}}>
          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <HistoryItem item={item} onDelete={deleteItem} />
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <MaterialCommunityIcons name="history" size={60} color="#E0E0E0" />
                <Text style={styles.emptyTitle}>Your history is clean</Text>
                <Text style={styles.emptyDesc}>Items you browse will show up here.</Text>
              </View>
            }
          />
        </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: PADDINGS.horizonatal + 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.black,
    letterSpacing: -0.5
  },
  clearText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    marginHorizontal: 1,
    borderRadius: 32,
    height: 65,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    ...SHADOWS.small
  },
  imageWrapper: {
    position: 'relative'
  },
  productThumb: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#F3F3F3'
  },
  searchBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white
  },
  infoArea: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.black,
  },
  timeAgo: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
    fontWeight: '500'
  },
  removeBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 80,
    opacity: 0.6
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
    marginTop: 15
  },
  emptyDesc: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
    textAlign: 'center'
  }
});
