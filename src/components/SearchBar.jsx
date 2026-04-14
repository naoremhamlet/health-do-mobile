import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, SHADOWS } from "../constants";

export default function SearchBar ({ navigation }) {
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={[styles.wrapper, SHADOWS.small]}
      onPress={() => navigation.navigate("Products")}
    >
      <View style={styles.leftContent}>
        <Feather
          name="search"
          size={20}
          color={COLORS.primary}
        />
        <Text style={styles.placeholder}>Search for healthy meals...</Text>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeholder: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontWeight: "500",
    marginLeft: 12,
  },
  filterIconBg: {
    backgroundColor: COLORS.primary,
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

// import React from "react";
// import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
// import { Feather, Entypo } from "@expo/vector-icons";
// import { SIZES } from "../constants";

// const SearchBar = ({searchPhrase, setSearchPhrase, navigation}) => {

//   const Search = () => {
//     if(!searchPhrase.trim().length)
//       return
//     navigation.navigate("Products", { keyword: searchPhrase.trim()})
//   }

//   return (
//     <View style={styles.container}>
//         <Feather
//           name="search"
//           size={24}
//           color="black"
//           style={{ marginLeft: 3 }}
//           onPress={Search}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Search"
//           value={searchPhrase}
//           onChangeText={(e) => setSearchPhrase(e.trimStart())}
//           onEndEditing={Search}
//           placeholderTextColor={COLORS.placeholder}
//         />
//         {searchPhrase && searchPhrase.length && (
//           <Entypo name="cross" size={24} color="black" style={{ padding: 1 }} 
//             onPress={() => setSearchPhrase("")}/>
//         )}
//     </View>
//   );
// };
// export default SearchBar;

// // styles
// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "flex-start",
//     alignItems: "center",
//     flexDirection: "row",
//     marginTop: 10,
//     padding: 10,
//     flexDirection: "row",
//     backgroundColor: "#d9dbda",
//     borderRadius: 25,
//     alignItems: "center"
//   },
//   input: {
//     fontSize: SIZES.medium,
//     marginLeft: 10,
//     width: '80%'
//   },
// });