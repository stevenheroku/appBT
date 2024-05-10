import {useNavigation} from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {Animated, FlatList, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CuentasContext } from '../../context/cuentasContext';
import { AuthContext } from '../../context/AuthContext';
import { methods } from '../../api/api';
import { ModalCarga } from '../ModalCarga/ModalCarga';

const Item = ({title, type, navigation,item,toggleModal }: any) => {
  const handlePress = () => {
    // Navegar a la vista deseada con parámetros si es necesario
    //toggleModal();
    if(type === 'Cuenta monetaria' || type === 'Cuenta ahorro')
    {
      navigation.navigate('DetalleCuenta', { cuenta: item });

    }
    else if(type === 'Tarjeta de Crédito'){
      navigation.navigate('DetalleTarjetaC', { cuenta: item });

    }
    
  };
 
  const renderIcon = () => {
    if (type === 'Cuenta monetaria') {
      return (
        <Animated.Image source={require('../../assets/images/cuentasMonetarias.png')} style={[styles.icon]} /> 

      );
    } else if (type === 'Cuenta ahorro') {
      return (
        <Animated.Image source={require('../../assets/images/cuentasAhorro.png')} style={[styles.icon]} /> 
      );
    }else if (type === 'Tarjeta de Crédito') {
      return (
        <Icon name="card-outline" size={24} color="#26AEB2" style={styles.icon} />
      );
    }
    return null;
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.5}>
      <View style={styles.item}>
       
        {renderIcon()}
        <Text style={styles.title}>{title}</Text>
        <Icon
          name="chevron-forward-outline"
          size={20}
          color="white"
        />
      </View>
    </TouchableOpacity>
  );
};

export const Productos = ({navigation}: any) => {
  const [isLoading, setisLoading] = useState(true);
  const [cuentasItem, setcuentasItem] = useState<{ id: string; type: string; title: string; numeroCuenta: any; }[]>([]);
  const [TarjetasC, setTarjetasC] = useState<{ id: string; type: string; title: string; numeroCuenta: any; }[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    obtenerCuentas();
  },[]);

  const obtenerCuentas = async () => {
    try {
      // Llamar a la función para obtener las cuentas cuando el componente se monta
      const cuentas = await methods.getCuentas2();
      const arrayCuentas = [cuentas];
      // Obtener las listas de cuentas de ahorro y monetarias
      const cuentasAhorro = arrayCuentas[0]?.payload.find((item: { name: string }) => item.name === "listUserProdAhorro")?.data.values || [];
      const cuentasMonetarias = arrayCuentas[0]?.payload.find((item: { name: string }) => item.name === "listUserProdMonetaria")?.data.values || [];
      const cuentasTarjetasC = arrayCuentas[0]?.payload.find((item: { name: string }) => item.name === "listUserProdTarjetasC")?.data.values || [];

      // Combinar ambas listas
      const cuentasAhorroMonetaria = [...cuentasAhorro, ...(cuentasMonetarias.length > 2 ? [cuentasMonetarias] : cuentasMonetarias)];
      const tarjetasC = [...cuentasTarjetasC]
      // Filtrar las cuentas de ahorro y monetarias
      const cuentasFiltradas = cuentasAhorroMonetaria.filter(cuenta => cuenta[11] === "Cuenta de ahorros" || cuenta[11] === "Cuenta monetaria");

      // Mapear las cuentas filtradas al formato deseado
      const DATA = cuentasFiltradas.map((cuenta, index) => ({
        id: `${index + 1}`,
        type: cuenta[11] === "Cuenta de ahorros" ? "Cuenta ahorro" : "Cuenta monetaria",
        title: `${cuenta[11]} ${cuenta[1]}`,
        numeroCuenta: cuenta[1],
        tipo:"1"
      }));

      const DATA2 = tarjetasC.map((cuenta, index) => ({
        id: `${index + 1}`,
        type: 'Tarjeta de Crédito' ,
        title: 'Tarjeta de crédito ' +`${cuenta[1]}`,
        numeroCuenta: cuenta[1],
        tipo:"2"
      }));

      // Actualizar el estado con las cuentas obtenidas
      setcuentasItem(DATA);
      setTarjetasC(DATA2);

      // Marcar la carga como completa
      setisLoading(false);
    } catch (error) {
      console.error('Error al obtener las cuentas:', error);

      // Marcar la carga como completa con error
      setisLoading(false);
    }
  };

  

  const toggleModal = () => {
    setModalVisible(true);
  };

  if (isLoading) {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.tituloText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.formContainer}>
    <Text style={styles.tituloText}>Productos</Text>
    <View style={styles.separator}></View>
    <SectionList
    showsVerticalScrollIndicator={false}
      sections={[
        { title: 'Mis Cuentas', data: cuentasItem },
        { title: 'Mis Tarjetas', data: TarjetasC },
        // { title: 'Mis Prestámos', data: cuentasItem },

      ]}
      renderItem={({ item }) => (
        <Item title={item.title} type={item.type} navigation={navigation} item={item} />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={{...styles.tituloSubText,marginBottom: 10 }}>{title}</Text>
      )}
      renderSectionFooter={() => {
          return <View style={{ height: 30, backgroundColor: 'transparent' }} />;
      }}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
  },
  formContainer: {
    backgroundColor: '#262626',
    padding: 35,
    paddingRight:25,
    paddingLeft:25,
    width: '100%',
    height: '65%', // Ajusta según el porcentaje deseado
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
  tituloSubText:{
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
    fontWeight:'bold'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: 'white', // Línea divisoria blanca
  },
  title: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    width:40,
    height:40
  },
  iconFlecha: {
  },
  separator: {
    marginBottom: 30,
  },
});
