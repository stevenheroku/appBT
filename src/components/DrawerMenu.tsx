import React from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

const DrawerMenu = ({props}:any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        {/* Personaliza el contenido del drawer aquí */}
        <Text style={styles.drawerTitle}>Mi Menú</Text>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#21B0AF', // Color de fondo personalizado
    padding: 20,
  },
  drawerTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
});

export default DrawerMenu;