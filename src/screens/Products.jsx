import { Octicons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS, PADDINGS, SHADOWS } from '../constants'
import ProductSmall from '../components/ProductSmall'
import { useRoute } from '@react-navigation/native'
import TopHeader from '../components/TopHeader'
import PopupShell from '../components/Popup/PopupShell'
import { filterProductList, getProducts, sortProductList } from '../helper'
import { setSortBy, setActiveFilters } from '../store/reducer/products'


const SearchInput = ({ searchPhrase, setSearchPhrase }) => {
  // Entrance animation: search bar "arrives" from slightly above with a fade,
  // pairing with the lift-off animation on Home's search bar for a connected feel.
  const arriveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(arriveAnim, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    flex: 1,
    opacity: arriveAnim,
    transform: [
      { translateY: arriveAnim.interpolate({ inputRange: [0, 1], outputRange: [-14, 0] }) },
    ],
  };

  return (
    <Animated.View style={animatedStyle}>
      <View style={[styles.searchBar, SHADOWS.small]}>
        <TextInput 
            style={styles.input}
            value={searchPhrase}
            placeholder="Search healthy food..."
            placeholderTextColor={COLORS.placehoder}
            autoFocus={true}
            onChangeText={(text) => setSearchPhrase(text)} 
        />
        {searchPhrase.length > 0 && (
            <TouchableOpacity onPress={() => setSearchPhrase("")}>
                <Ionicons name="close-circle" size={18} color={COLORS.gray} />
            </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  )
}

export default function Products({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  
  // --- States ---
  const [searchPhrase, setSearchPhrase] = useState(route.params?.keyword || "");
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const selectedSort = useSelector(state => state.products.sortBy);
  const activeFilters = useSelector(state => state.products.activeFilters);

  // Pure derived list — filter, then sort, then search. Recomputed on every
  // render from the raw catalog, so there's no shared mutable state to leak
  // stale results between screens (Home's category browsing is unaffected by
  // whatever filters/sort were last applied here).
  const displayData = sortProductList(
    filterProductList(getProducts(), activeFilters),
    selectedSort
  ).filter(p => {
    if (!searchPhrase.trim()) return true;
    const q = searchPhrase.trim().toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.tags?.some(tag => tag.toLowerCase().includes(q))
    );
  });

  // --- Mock Data & Options ---
  
  const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Newest"];
  const lifestyleFilters = ["Veg Only", "Vegan", "High Protein", "Low Carb", "Gluten-Free"];
  const priceFilters = ["Under ₹199", "₹200 - ₹500", "Above ₹500"];

  // --- Handlers ---
  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      dispatch(setActiveFilters(activeFilters.filter(f => f !== filter)));
    } else {
      dispatch(setActiveFilters([...activeFilters, filter]));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader 
            goto={() => navigation.goBack()} 
            component={<SearchInput searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} /> } 
            showTitle={false} />

      {/* 2. MAIN CONTENT (Results & List) */}
      <View style={styles.bottomContainer}>
        
        {/* UTILITY BAR (Results count + Action Icons) */}
        <View style={styles.utilityBar}>
          <View style={styles.countContainer}>
            <Text style={styles.resultCountText}>{displayData?.length}</Text>
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
          data={displayData}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
                <ProductSmall item={item} navigation={navigation} />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyResults}>
              <MaterialCommunityIcons name="file-search-outline" size={40} color={COLORS.gray2} />
              <Text style={styles.emptyResultsText}>
                {searchPhrase.trim() ? `No items match "${searchPhrase.trim()}"` : "No items match your filters"}
              </Text>
            </View>
          }
        />
      </View>

      {/* --- SORT MODAL --- */}
      <PopupShell
        visible={showSort}
        onClose={() => setShowSort(false)}
        title="Sort By"
      >
        {sortOptions.map((option) => (
          <TouchableOpacity 
            key={option} 
            style={styles.menuItem} 
            onPress={() => { 
              dispatch(setSortBy(option));
              setShowSort(false);
            }
          }
          >
            <Text style={[styles.menuItemText, selectedSort === option && styles.activeMenuText]}>{option}</Text>
            {selectedSort === option && <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />}
          </TouchableOpacity>
        ))}
      </PopupShell>

      {/* --- FILTER MODAL --- */}
      <PopupShell
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        title="Filters"
        minHeight="55%"
        titleAccessory={
          <TouchableOpacity onPress={() => dispatch(setActiveFilters([]))}>
            <Text style={styles.resetLink}>Reset All</Text>
          </TouchableOpacity>
        }
        primaryAction={{
          label: 'Apply Filters',
          tone: 'dark',
          onPress: () => setShowFilter(false),
        }}
      >
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
      </PopupShell>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.softBg,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginLeft: 10,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '600',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    marginTop: 10,
  },
  utilityBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDINGS.horizonatal + 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  countContainer: { 
    flexDirection: 'row', 
    alignItems: 'baseline', 
    gap: 6 
  },
  resultCountText: { 
    fontSize: 17, 
    fontWeight: '900', 
    color: COLORS.black 
  },
  resultLabel: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: COLORS.gray, 
    textTransform: 'uppercase', 
    letterSpacing: 0.5 
  },
  
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    ...SHADOWS.small,
  },
  iconCircle: { 
    width: 42, 
    height: 42, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  verticalDivider: { 
    width: 1, 
    height: 20, 
    backgroundColor: COLORS.border 
  },

  // --- Modal & Bottom Sheet Styles ---
  // --- Modal Body Content (chrome now lives in PopupShell) ---
  resetLink: { color: COLORS.primary, fontWeight: '800' },
  sectionLabel: { fontSize: 16, fontWeight: '800', color: COLORS.black, marginTop: 15, marginBottom: 12 },
  
  // Chip Grid
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 10 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: COLORS.lightWhite, borderWidth: 1, borderColor: COLORS.border },
  activeChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 13, fontWeight: '700', color: COLORS.gray },
  activeChipText: { color: COLORS.white },

  menuItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: COLORS.softBg },
  menuItemText: { fontSize: 16, fontWeight: '600', color: COLORS.gray },
  activeMenuText: { color: COLORS.primary, fontWeight: '800' },

  // --- Grid Layout ---
  listContent: { 
    paddingHorizontal: 25, 
    paddingBottom: 40 
  },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 20 },
  cardWrapper: { width: '47%' },
  emptyResults: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyResultsText: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray2,
    textAlign: 'center',
  },
})