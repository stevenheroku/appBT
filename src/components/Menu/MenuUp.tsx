import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {ModalConfirmLogout} from '../CerrarSesion/ModalConfirmLogout';

interface MenuUpProps {
  onOpenDrawer: () => void;
}

export const MenuUp = ({navigation, transparente = false}: any) => {
  const [modalEditarAliasVisible, setModalEditarAliasVisible] = useState(false);
  const [miItem, setMiItem] = useState(null);
  const [ultimaHora, setultimaHora] = useState(null);

  const user = AsyncStorage.getItem('user');
  const handlePress2 = () => {
    // Abre el modal correspondiente
    setModalEditarAliasVisible(true);
  };
  var value: any;
  var valueultimaIngreso: any;

  const closeModalEditarAlias = () => {
    // Cierra el modal
    setModalEditarAliasVisible(false);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
    } catch (error) {
      console.error('Error al eliminar las credenciales:', error);
    }
    console.log('Cerrar sesión');
    navigation.navigate('LoginScreen');
  };
  const getItemFromLocalStorage = async () => {
    try {
      value = await AsyncStorage.getItem('user');
      valueultimaIngreso = await AsyncStorage.getItem('ultimoIngreso');
      setultimaHora(valueultimaIngreso);
      setMiItem(value);
      console.log('USER',value)
    } catch (error) {
      console.error(
        'Error al obtener el item del almacenamiento local:',
        error,
      );
    }
  };
  useEffect(() => {
    // Llama a la función para obtener el item del almacenamiento local cuando el componente se monta
    getItemFromLocalStorage();
  }, []);

  const obtenerFechaYHora = (): string => {
    const fechaHoraActual = new Date();
    
    const dia = String(fechaHoraActual.getDate());
    const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, '0');
    const año = fechaHoraActual.getFullYear();
    
    const horas = String(fechaHoraActual.getHours());
    const minutos = String(fechaHoraActual.getMinutes());
    const segundos = String(fechaHoraActual.getSeconds());
    
    return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
  };
  
  // Ejemplo de uso
  const fechaHora = obtenerFechaYHora();
  console.log(fechaHora);
  let date: Date = new Date();
  console.log("Date = " + date);
  return (
    <SafeAreaView>
      <View
        style={[
          styles.container,
          {backgroundColor: `rgba(38, 38, 38, ${transparente ? '0' : '1'})`},
        ]}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{'Hola ' + miItem}</Text>
          <Text style={styles.hora}>
            {'Último ingreso: '+ultimaHora}
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={openDrawer}>
            <Icon name="menu-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="notifications-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePress2}>
            <Icon name="log-out-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <ModalConfirmLogout
          visible={modalEditarAliasVisible}
          onClose={closeModalEditarAlias}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  userInfo: {
    flexDirection: 'column', // Cambiado a columna
    alignItems: 'flex-start',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hora: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});
