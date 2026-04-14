import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants'; // Use your COLORS.primary for the green

export const CustomCheckbox = ({ label, status, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.checkboxContainer} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <View style={[
        styles.box, 
        status && { backgroundColor: COLORS.primary, borderColor: COLORS.primary }
      ]}>
        {status && <MaterialCommunityIcons name="check" size={16} color="white" />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginRight: 20, // For the grid layout
    minWidth: '40%', 
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6, // This gives that smooth rounded-square look
    borderWidth: 2,
    borderColor: '#CCC', // Gray border when unchecked
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});