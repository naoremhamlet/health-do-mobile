import React, { useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES, SHADOWS } from "../constants";

export default function SearchBar ({ navigation }) {
  const anim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 160,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("Products");
      // Reset once the screen has had a moment to transition away
      setTimeout(() => anim.setValue(0), 300);
    });
  };

  const animatedStyle = {
    transform: [
      { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] }) },
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }) },
    ],
    opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.85] }),
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        style={[styles.wrapper, SHADOWS.small]}
        onPress={handlePress}
      >
        <View style={styles.leftContent}>
          <Feather
            name="search"
            size={20}
            color={COLORS.primary}
          />
          <Text style={styles.placeholder} numberOfLines={1}>Search for healthy meals...</Text>
        </View>
        <View style={styles.filterIconBg}>
          <Feather name="sliders" size={16} color={COLORS.white} />
        </View>
      </TouchableOpacity>
    </Animated.View>
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
    borderColor: COLORS.border,
  },
  leftContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  placeholder: {
    flexShrink: 1,
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