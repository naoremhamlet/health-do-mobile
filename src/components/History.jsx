import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SIZES, image } from '../constants';
import TopHeader from './TopHeader';

const HistoryItem = ({ item, onDelete }) => {
  return (
    <View style={styles.historyRow}>
      {/* Left: Product/Search Icon */}
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
    <View style={styles.container}>
      <TopHeader title={"History"} goto={() => navigation.goBack()} />
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Recently Viewed</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={clearHistory}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
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
    borderRadius: 20,
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



// import React from 'react';
// import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
// import { COLORS, SHADOWS, SIZES, image } from '../constants';
// import TopHeader from './TopHeader';

// const HistoryCard = ({ item, navigation }) => {
//   // Logic for status color-coding
//   const getStatusStyle = (status) => {
//     switch (status.toLowerCase()) {
//       case 'delivered': return { color: '#4CAF50', bg: '#4CAF5015' };
//       case 'cancelled': return { color: '#FF5252', bg: '#FF525215' };
//       default: return { color: COLORS.gray, bg: '#F5F5F5' };
//     }
//   };

//   const statusStyle = getStatusStyle(item.status);

//   return (
//     <View style={[styles.card, SHADOWS.small]}>
//       {/* Top Row: Date & Status */}
//       <View style={styles.cardHeader}>
//         <View style={styles.dateRow}>
//           <MaterialCommunityIcons name="calendar-clock" size={16} color={COLORS.gray} />
//           <Text style={styles.dateText}>{item.date}</Text>
//         </View>
//         <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
//           <Text style={[styles.statusText, { color: statusStyle.color }]}>
//             {item.status.toUpperCase()}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.divider} />

//       {/* Main Content: Image & Info */}
//       <View style={styles.mainContent}>
//         <Image source={item.image || image.item1} style={styles.productImg} />
//         <View style={styles.infoCol}>
//           <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
//           <Text style={styles.itemCount}>{item.itemsCount} Items • ₹{item.total}</Text>
//         </View>
//         <TouchableOpacity 
//             style={styles.arrowBtn}
//             onPress={() => navigation.navigate("OrderDetails", { orderId: item.id })}
//         >
//           <Feather name="chevron-right" size={20} color={COLORS.black} />
//         </TouchableOpacity>
//       </View>

//       {/* Bottom Actions: Reorder & Help */}
//       <View style={styles.footerActions}>
//         <TouchableOpacity style={[styles.reorderBtn, SHADOWS.small]}>
//           <Ionicons name="refresh-outline" size={16} color={COLORS.white} />
//           <Text style={styles.reorderText}>Reorder</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.helpBtn}>
//           <Text style={styles.helpText}>Need Help?</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default function OrderHistory({ navigation }) {
//   const historyData = [
//     { id: '101', name: 'Zesty Paneer Bowl', date: '12 Apr, 2026', total: '320', status: 'Delivered', itemsCount: 2 },
//     { id: '102', name: 'Mediterranean Quinoa', date: '08 Apr, 2026', total: '450', status: 'Cancelled', itemsCount: 1 },
//     { id: '103', name: 'Avocado Toast Box', date: '01 Apr, 2026', total: '210', status: 'Delivered', itemsCount: 1 },
//   ];

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={historyData}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listPadding}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) => <HistoryCard item={item} navigation={navigation} />}
//         ListEmptyComponent={
//             <View style={styles.emptyContainer}>
//                 <MaterialCommunityIcons name="history" size={80} color="#E0E0E0" />
//                 <Text style={styles.emptyTitle}>No Past Orders</Text>
//                 <Text style={styles.emptyDesc}>Looks like you haven't ordered any healthy bowls yet.</Text>
//             </View>
//         }
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9F9F9',
//   },
//   listPadding: {
//     paddingHorizontal: 25,
//     paddingTop: 10,
//     paddingBottom: 40,
//   },
//   card: {
//     backgroundColor: COLORS.white,
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#F0F0F0',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   dateRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   dateText: {
//     fontSize: 13,
//     color: COLORS.gray,
//     fontWeight: '600',
//   },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   statusText: {
//     fontSize: 10,
//     fontWeight: '900',
//     letterSpacing: 0.5,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#F5F5F5',
//     marginBottom: 15,
//   },
//   mainContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   productImg: {
//     width: 55,
//     height: 55,
//     borderRadius: 15,
//     backgroundColor: '#F3F3F3',
//   },
//   infoCol: {
//     flex: 1,
//     marginLeft: 15,
//   },
//   productName: {
//     fontSize: 15,
//     fontWeight: '800',
//     color: COLORS.black,
//   },
//   itemCount: {
//     fontSize: 13,
//     color: COLORS.gray,
//     marginTop: 2,
//     fontWeight: '500',
//   },
//   arrowBtn: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#F8F8F8',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   footerActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   reorderBtn: {
//     backgroundColor: COLORS.primary,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 14,
//     gap: 8,
//   },
//   reorderText: {
//     color: COLORS.white,
//     fontSize: 13,
//     fontWeight: '800',
//   },
//   helpBtn: {
//     paddingVertical: 8,
//     paddingHorizontal: 5,
//   },
//   helpText: {
//     fontSize: 13,
//     color: COLORS.gray,
//     fontWeight: '700',
//     textDecorationLine: 'underline',
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     marginTop: 100,
//   },
//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: '900',
//     color: COLORS.black,
//     marginTop: 15,
//   },
//   emptyDesc: {
//     fontSize: 14,
//     color: COLORS.gray,
//     textAlign: 'center',
//     marginTop: 8,
//     paddingHorizontal: 40,
//     lineHeight: 20,
//   },
// });


// import React, { useEffect, useState } from 'react'
// import { FlatList, StyleSheet, Text, View } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import TopHeader from './TopHeader'
// import ProductSmall from './ProductSmall'
// import { useSelector } from 'react-redux'
// import Error from './Error'
// import { MaterialCommunityIcons } from '@expo/vector-icons'


// export default function History({navigation}) {

//   const history = useSelector(state => state.history.history)

//   return (
//     <SafeAreaView style={styles.container}>
//       <TopHeader title="History" goto={() => navigation.goBack()} />
//       {history && history.length <= 0 && 
//         <Error
//           icon={<MaterialCommunityIcons name="basket-off" size={120} color="#00000025" />}
//           title="No History yet"
//           desc="Product you search or check will appear here."
//         />
//       }
//       {history && history.length > 0 &&
//         <FlatList
//           style={{marginTop: 30}}
//           data={history}
//           numColumns={2}
//           // columnWrapperStyle="row"
//           renderItem={(item) => <ProductSmall item={item.item} navigation={navigation} />}
//           keyExtractor={item => item.id}
//         />
//       }
//     </SafeAreaView>
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingVertical: 50,
//     paddingHorizontal: 35,
//   }
// })
