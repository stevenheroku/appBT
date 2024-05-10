import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuOptions = ({navigation, name}: any) => {
    return (
      <View style={styles.menu}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={30} color="#51AAA2" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
    );
  };
  
  export default MenuOptions;
  
  const styles = StyleSheet.create({
    menu: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      backgroundColor: '#262626',
      height: 70,
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center', 
    },
    title: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 15,
      fontWeight: 'bold',
    },
  });