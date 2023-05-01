import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { SIZES } from "../constants";

const SearchBar = ({searchPhrase, setSearchPhrase, navigation}) => {

  const Search = () => {
    if(!searchPhrase.trim().length)
      return
    navigation.navigate("Products", { keyword: searchPhrase.trim()})
  }

  return (
    <View style={styles.container}>
        <Feather
          name="search"
          size={24}
          color="black"
          style={{ marginLeft: 3 }}
          onPress={Search}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={(e) => setSearchPhrase(e.trimStart())}
          onEndEditing={Search}
        />
        {searchPhrase && searchPhrase.length && (
          <Entypo name="cross" size={24} color="black" style={{ padding: 1 }} 
            onPress={() => setSearchPhrase("")}/>
        )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 25,
    alignItems: "center"
  },
  input: {
    fontSize: SIZES.medium,
    marginLeft: 10,
    width: '80%'
  },
});