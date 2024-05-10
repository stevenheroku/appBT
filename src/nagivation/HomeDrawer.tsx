import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {HomeScreen} from '../screens/HomeScreen';
import {AboutScreen} from '../screens/AboutScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DetalleCuenta} from '../screens/DetalleCuenta';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {MenuButtonItem} from '../components/ItemMenu/MenuButtonItem';
const Drawer = createDrawerNavigator();

export type DrawerNavigatorParams = {
  DetalleCuenta: undefined;
  // Agrega otras pantallas aquí si es necesario
};

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export const HomeDrawer = ({navigation}: any) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Drawer.Navigator
      drawerContent={props => <MenuItems {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        drawerStyle: {
          backgroundColor: '#272727', 
          padding: 10,
          width: '95%',
        },
        drawerLabelStyle: {
          marginLeft: 10,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
        drawerPosition: 'right',
      }}>
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Acerca De" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export const MenuItems = ({navigation}: any) => {
  const closeDrawer = () => {
    navigation.closeDrawer();
  };

  return (
    <ScrollView style={styles.container}
    alwaysBounceVertical={false}
    alwaysBounceHorizontal={false}
    overScrollMode="never"
    bounces={false}
    showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#262626' }}>
      <View style={styles.menuContainer}>
      

        <Text style={styles.title}>Menú Principal</Text>
        <TouchableOpacity onPress={closeDrawer}>
          <Icon
            name="close-circle"
            size={30}
            color={'white'}
            style={styles.icono}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.TipoCambio}>
        <Text style={styles.cambioVenta}>
          Tipo de Cambio: Compra: Q7.74 Venta: Q7.89
        </Text>
      </View>

      <View style={styles.flatListContainer}>
        <MenuButtonItem navigation={navigation} />
        
      </View>
      </SafeAreaView>
      </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex:1
  },
  flatListContainer: {
    marginTop: 70, // Puedes ajustar este valor según sea necesario

  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinea los elementos al principio y al final del contenedor
    alignItems: 'center', // Alinea los elementos verticalmente
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  icono: {
    justifyContent: 'flex-end',
  },
  formContainer: {
    backgroundColor: '#262626',
    padding: 40,
    width: '100%',
    height: '65%',
    marginTop: 'auto',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 5,
  },
  tituloText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: 'white', // Línea divisoria blanca
  },
  icon: {
    marginRight: 10,
  },
  TipoCambio: {
    backgroundColor: 'white',
    padding:4,
    alignItems:'center',
    marginLeft:15,
    borderRadius:20,
    top:50,
    width:'95%',
  },
  cambioVenta: {
    color: '#080808',
  },
});
