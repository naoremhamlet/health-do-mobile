import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, PADDINGS, SHADOWS, SIZES, image } from '../constants';
import TopHeader from './TopHeader';
import { updateHistory } from '../store/reducer/history';
import { getProductById } from '../helper';

// Turns a stored timestamp into a friendly relative label ("2 hours ago")
const timeAgo = (timestamp) => {
  const diffMs = Date.now() - timestamp;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
};

const HistoryItem = ({ item, onDelete, navigation }) => {
  const product = getProductById(item.productId);

  const handlePress = () => {
    if (item.type === 'view') {
      navigation.navigate('ProductDetail', { id: item.productId });
    } else {
      navigation.navigate('Products', { keyword: product?.name });
    }
  };

  return (
    <View style={styles.historyRow}>
      <View style={styles.imageWrapper}>
        <Image source={product?.image?.[0] || image.salad1} style={styles.productThumb} />
        {item.type === 'search' && (
           <View style={styles.searchBadge}>
              <Ionicons name="search" size={10} color={COLORS.white} />
           </View>
        )}
      </View>

      {/* Center: Info */}
      <TouchableOpacity style={styles.infoArea} activeOpacity={0.7} onPress={handlePress}>
        <Text style={styles.itemName} numberOfLines={1}>{product?.name || 'Item no longer available'}</Text>
        <Text style={styles.timeAgo}>{timeAgo(item.timestamp)}</Text>
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
  const history = useSelector(state => state.history.history);
  const dispatch = useDispatch();

  const clearHistory = () => {
    dispatch(updateHistory([]));
  };

  const deleteItem = (id) => {
    dispatch(updateHistory(history.filter(item => item.id !== id)));
  };

  // Most recent first
  const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);

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
            data={sortedHistory}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <HistoryItem item={item} onDelete={deleteItem} navigation={navigation} />
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <View style={styles.emptyIconBackdrop}>
                  <MaterialCommunityIcons name="history" size={48} color={COLORS.primary} />
                </View>
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
    borderColor: COLORS.border,
    ...SHADOWS.small
  },
  imageWrapper: {
    position: 'relative'
  },
  productThumb: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: COLORS.lightWhite
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
  },
  emptyIconBackdrop: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.softBg,
    justifyContent: 'center',
    alignItems: 'center',
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
