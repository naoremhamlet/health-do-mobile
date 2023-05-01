import { Octicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, Pressable, View, TextInput, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES } from '../constants'
import ProductSmall from '../components/ProductSmall'
import { useRoute } from '@react-navigation/native'


const Top = ({navigation, searchPhrase, setSearchPhrase}) => {
  return (
    <View style={styles.topContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Octicons name='chevron-left' size={24} color="black" />
        </Pressable>
        <TextInput 
          style={styles.input}
          value={searchPhrase}
          onChangeText={(e) => setSearchPhrase(e)} />
    </View>
  )
}

export default function Products({navigation}) {
  const route = useRoute()
  const [searchPhrase, setSearchPhrase] = useState(route.params.keyword)
  return (
    <SafeAreaView style={styles.container}>
        <Top navigation={navigation}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase} />
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Found 6 results</Text>
          <FlatList 
            numColumns={2}
            columnWrapperStyle="row"
            keyExtractor={item => item.id}
            data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}]}
            renderItem={(item) => (
              <ProductSmall 
                item={item.item}
                navigation={navigation} />
            )}
          />
        </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    paddingHorizontal: 35,
  },
  input: {
    width: '95%',
    fontSize: SIZES.medium,
    paddingHorizontal: 30,
    paddingVertical: 5
  },
  bottomContainer: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#F9F9F9",
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: SIZES.xLarge,
    fontWeight: 700,
    paddingVertical: 25
  }
})