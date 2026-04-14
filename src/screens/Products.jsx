import { Octicons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal, Pressable, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SHADOWS } from '../constants'
import ProductSmall from '../components/ProductSmall'
import { useRoute } from '@react-navigation/native'
import TopHeader from '../components/TopHeader'

export default function Products({ navigation }) {
  const route = useRoute();
  
  // --- States ---
  const [searchPhrase, setSearchPhrase] = useState(route.params?.keyword || "");
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Popular");
  const [activeFilters, setActiveFilters] = useState([]);

  // --- Mock Data & Options ---
  const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
  const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Newest"];
  const lifestyleFilters = ["Veg Only", "Vegan", "High Protein", "Low Carb", "Gluten-Free"];
  const priceFilters = ["Under ₹199", "₹200 - ₹500", "Above ₹500"];

  // --- Handlers ---
  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. TOP SECTION (Header + Search) */}
      <View style={styles.headerArea}>
        <View style={styles.topNavRow}>
            <TopHeader goto={() => navigation.goBack()} />
            <View style={[styles.searchBar, SHADOWS.small]}>
                <TextInput 
                    style={styles.input}
                    value={searchPhrase}
                    placeholder="Search healthy food..."
                    placeholderTextColor="#999"
                    autoFocus={true}
                    onChangeText={(text) => setSearchPhrase(text)} 
                />
                {searchPhrase.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchPhrase("")}>
                        <Ionicons name="close-circle" size={18} color={COLORS.gray} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
      </View>

      {/* 2. MAIN CONTENT (Results & List) */}
      <View style={styles.bottomContainer}>
        
        {/* UTILITY BAR (Results count + Action Icons) */}
        <View style={styles.utilityBar}>
          <View style={styles.countContainer}>
            <Text style={styles.resultCountText}>{data.length}</Text>
            <Text style={styles.resultLabel}>Items Found</Text>
          </View>

          <View style={styles.actionIcons}>
            <TouchableOpacity style={styles.iconCircle} onPress={() => setShowSort(true)}>
              <MaterialCommunityIcons name="sort-variant" size={22} color={COLORS.black} />
            </TouchableOpacity>
            
            <View style={styles.verticalDivider} />
            
            <TouchableOpacity style={styles.iconCircle} onPress={() => setShowFilter(true)}>
              <Octicons name="sliders" size={18} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        {/* PRODUCT GRID */}
        <FlatList 
          numColumns={2}
          data={data}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
                <ProductSmall item={item} navigation={navigation} />
            </View>
          )}
        />
      </View>

      {/* --- SORT MODAL --- */}
      <Modal visible={showSort} transparent animationType="fade" onRequestClose={() => setShowSort(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowSort(false)}>
          <View style={[styles.sheet, SHADOWS.medium]}>
            <View style={styles.modalKnob} />
            <Text style={styles.modalTitle}>Sort By</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity 
                key={option} 
                style={styles.menuItem} 
                onPress={() => { setSelectedSort(option); setShowSort(false); }}
              >
                <Text style={[styles.menuItemText, selectedSort === option && styles.activeMenuText]}>{option}</Text>
                {selectedSort === option && <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* --- FILTER MODAL --- */}
      <Modal visible={showFilter} transparent animationType="slide" onRequestClose={() => setShowFilter(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowFilter(false)}>
          <View style={[styles.sheet, { minHeight: '50%' }]}>
            <View style={styles.modalKnob} />
            <View style={styles.modalHeaderRow}>
                <Text style={styles.modalTitle}>Filters</Text>
                <TouchableOpacity onPress={() => setActiveFilters([])}>
                    <Text style={styles.resetLink}>Reset All</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionLabel}>Dietary Preference</Text>
            <View style={styles.chipGrid}>
                {lifestyleFilters.map(item => (
                    <TouchableOpacity 
                        key={item} 
                        onPress={() => toggleFilter(item)}
                        style={[styles.chip, activeFilters.includes(item) && styles.activeChip]}
                    >
                        <Text style={[styles.chipText, activeFilters.includes(item) && styles.activeChipText]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionLabel}>Price</Text>
            <View style={styles.chipGrid}>
                {priceFilters.map(item => (
                    <TouchableOpacity 
                        key={item} 
                        onPress={() => toggleFilter(item)}
                        style={[styles.chip, activeFilters.includes(item) && styles.activeChip]}
                    >
                        <Text style={[styles.chipText, activeFilters.includes(item) && styles.activeChipText]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilter(false)}>
                <Text style={styles.applyBtnText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerArea: {
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 15,
  },
  topNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 52,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
  utilityBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingTop: 30,
    paddingBottom: 20,
  },
  countContainer: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  resultCountText: { fontSize: 28, fontWeight: '900', color: COLORS.black },
  resultLabel: { fontSize: 13, fontWeight: '700', color: COLORS.gray, textTransform: 'uppercase', letterSpacing: 0.5 },
  
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    ...SHADOWS.small,
  },
  iconCircle: { width: 46, height: 46, justifyContent: 'center', alignItems: 'center' },
  verticalDivider: { width: 1, height: 20, backgroundColor: '#EEE' },

  // --- Modal & Bottom Sheet Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingBottom: Platform.OS === 'ios' ? 45 : 30,
  },
  modalKnob: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20
  },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: '900', color: COLORS.black },
  resetLink: { color: COLORS.primary, fontWeight: '800' },
  sectionLabel: { fontSize: 16, fontWeight: '800', color: COLORS.black, marginTop: 15, marginBottom: 12 },
  
  // Chip Grid
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 10 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: '#F2F2F2', borderWidth: 1, borderColor: '#EEE' },
  activeChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 13, fontWeight: '700', color: COLORS.gray },
  activeChipText: { color: COLORS.white },

  menuItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F8F8F8' },
  menuItemText: { fontSize: 16, fontWeight: '600', color: COLORS.gray },
  activeMenuText: { color: COLORS.primary, fontWeight: '800' },
  
  applyBtn: { backgroundColor: COLORS.black, padding: 18, borderRadius: 20, marginTop: 30, alignItems: 'center' },
  applyBtnText: { color: COLORS.white, fontWeight: '900', fontSize: 16 },

  // --- Grid Layout ---
  listContent: { paddingHorizontal: 25, paddingBottom: 40 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 20 },
  cardWrapper: { width: '47%' }
})
// import { Octicons } from '@expo/vector-icons'
// import React, { useState } from 'react'
// import { StyleSheet, Text, Pressable, View, TextInput, FlatList, TouchableOpacity } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { SIZES } from '../constants'
// import ProductSmall from '../components/ProductSmall'
// import { useRoute } from '@react-navigation/native'


// const Top = ({navigation, searchPhrase, setSearchPhrase}) => {
//   return (
//     <View style={styles.topContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Octicons name='chevron-left' size={24} color="black" />
//         </TouchableOpacity>
//         <TextInput 
//           style={styles.input}
//           value={searchPhrase}
//           onChangeText={(e) => setSearchPhrase(e)} />
//     </View>
//   )
// }

// export default function Products({navigation}) {
//   const route = useRoute()
//   const [searchPhrase, setSearchPhrase] = useState("")
//   return (
//     <SafeAreaView style={styles.container}>
//         <Top navigation={navigation}
//           searchPhrase={searchPhrase}
//           setSearchPhrase={setSearchPhrase} />
//         <View style={styles.bottomContainer}>
//           <Text style={styles.bottomText}>Found 6 results</Text>
//           <FlatList 
//             numColumns={2}
//             // columnWrapperStyle="row"
//             keyExtractor={item => item.id}
//             data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}]}
//             renderItem={(item) => (
//               <ProductSmall 
//                 item={item.item}
//                 navigation={navigation} />
//             )}
//           />
//         </View>
//     </SafeAreaView>
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//   },
//   topContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems:'center',
//     paddingHorizontal: 35,
//   },
//   input: {
//     width: '95%',
//     fontSize: SIZES.medium,
//     paddingHorizontal: 30,
//     paddingVertical: 5
//   },
//   bottomContainer: {
//     marginTop: 30,
//     flex: 1,
//     backgroundColor: "#F9F9F9",
//     borderRadius: 30,
//     display: 'flex',
//     alignItems: 'center',
//   },
//   bottomText: {
//     fontSize: SIZES.xLarge,
//     fontWeight: 700,
//     paddingVertical: 25
//   }
// })