import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ title = '', showBrand = false, brand = 'SchoolApp' }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.container}>
      {canGoBack ? (
        <View style={styles.left}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.pageName}>{title || route.name}</Text>
        </View>
      ) : (
        <View style={styles.centerOnly}>
          <Text style={styles.brand}>{brand}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerOnly: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageName: {
    fontSize: 16,
    marginLeft: 5,
    color: '#000',
    fontWeight: '500',
  },
  brand: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
  },
});

export default CustomHeader;
