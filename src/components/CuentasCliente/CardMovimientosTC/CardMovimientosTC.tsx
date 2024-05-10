import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from '@rneui/base';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, Switch, Keyboard, Alert, TouchableOpacity, TextInput} from 'react-native';
import { ModalCarga } from '../../ModalCarga/ModalCarga';
import CardMovimientosTC from './CardMovimientosTC';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalMovimientosT } from '../../../screens/ModalOpcionesCuenta/ModalMovimientosT';
import { methods } from './apiMovimientosTC/api';
const configUrl = require('../../../datosURL.json');

const Item = ({transactions}: any) => {
  return (
    <View style={styles.transactionListContainer}>
      {transactions.map((transaction: any, index: any) => (
        <View key={index} style={styles.transactionItem}>
          <View style={styles.leftColumn}>
            <Text style={{...styles.texto, fontWeight: 'bold'}}>
              {transaction.date}
            </Text>
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
              {transaction.name}
            </Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={{color: '#C5035B', fontWeight: 'bold'}}>
              {transaction.gasto}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const CardMovimientosTC2 = ({
  navigation,route,filtro
}: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalFiltroMovimientos, setmodalFiltroMovimientos] = useState(false);
  const [transactionTC, settransactionTC] = useState<any>([]);
  const [transactionTCOriginal, settransactionTCOrginal] = useState<any>([]);

  const [expanded, setExpanded] = useState(false); // Estado para controlar si el componente se expande o contrae
  const [busqueda, setBusqueda] = useState('');
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState('');
  
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };


  useEffect(() => {
    //obtenerSaldoCuentasC();
    obtenerSaldoCuentas();
    console.log('SEARCH',busqueda)
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShown(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShown(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    filtrarMes();
  }, [filtro]);
  const obtenerSaldoCuentas = async () => {
    try {
      const idCliente = await AsyncStorage.getItem('clienteId');
      // Llamar a la función para obtener las cuentas cuando el componente se monta

      setModalVisible(true); // Mostrar el modal de carga
      const cuentaSaldo = await methods.getTransactionTC(idCliente!,route.numeroCuenta,route.tipo);
    // Aquí se ha completado la respuesta
      setModalVisible(false);

      settransactionTC(cuentaSaldo.data[0].transactions[0]);
      settransactionTCOrginal(cuentaSaldo.data[0].transactions[0]);
      //Alert.alert('SALDO:',saldoDisponible)
      console.log("MOVIMIENTOS2",route)
    } catch (error) {
      console.log('Error Movimientos2 TC'+ error)
      //Alert.alert('Error saldos tarjeta créditos'+ error)
    }
  };

  const handleSearch = (text:string) => {
    setBusqueda(text);

    // Filtrar los elementos basados en el término de búsqueda
    const filteredData = transactionTCOriginal.filter((item:any) =>
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.date.includes(text) ||
      item.gasto.includes(text)
    );
    console.log('--',filteredData)

    settransactionTC(filteredData);
  };

  
  const filtrarMes = () => {

    if(filtro>0){
      console.log('filter mes')
      // Filtrar los elementos basados en el término de búsqueda
      const filteredData = transactionTCOriginal.filter((item: any) => {
        const dateParts = item.date.split('/');
        const month = parseInt(dateParts[1], 10); // Extraer el mes de la fecha
        return month === filtro; // Comparar con el filtro proporcionado
      });
      console.log('--2',filteredData)

  
      settransactionTC(filteredData);
    }
  };
  const toggleExpand = () => {
    setExpanded(!expanded); // Cambia el estado entre true y false
  };

  const closeModalFiltroMes = () => {
    // Cierra el modal
    setmodalFiltroMovimientos(false);
  };

  const AbrirModalFiltroMes = () => {
    // Abre el modal correspondiente
    setmodalFiltroMovimientos(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <View style={styles.switchContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textoVer}>Ver movimientos</Text>
              </View>
              <TouchableOpacity onPress={toggleExpand}>
                <View style={styles.iconContainer}>
                  <Icon
                    name={
                      expanded ? 'remove-circle-outline' : 'add-circle-outline'
                    }
                    size={30}
                    color={'#0b0b0b'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {expanded && (
          // Componente que se expande cuando el estado es verdadero
          <View>
            <View style={styles.separator}></View>

            <View style={styles.searchContainer}>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="search"
                  size={24}
                  color="#aaa"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  value={busqueda}
                  onChangeText={handleSearch}
                />
              </View>
              <TouchableOpacity style={styles.listButton} activeOpacity={0.5} onPress={AbrirModalFiltroMes}>
                <Ionicons name="list" size={24} color="#25B1AA" />
              </TouchableOpacity>
            </View>
            <Item transactions={transactionTC} />
          </View>
        )}
        <ModalMovimientosT
            visible={modalFiltroMovimientos}
            onClose={closeModalFiltroMes}
            navigation={navigation}
            route={route}
          />
      {/* <ModalCarga visible={modalVisible} /> */}

      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
  cardContainer: {
    borderRadius: 10,
    width: '90%',
  },
  header: {
    backgroundColor: 'lightgrey',
    borderRadius: 20, // Radio de la esquina superior izquierda
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoVer: {
    marginLeft: -100, // Espacio entre el switch y el texto
    color:'#504d4d'
  },
  separator: {
    borderBottomColor: 'grey',
    marginBottom: 50, // Espacio entre el separador y el monto en quetzales
  },
  transactionListContainer: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  saldosContainer: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 2,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    overflow: 'hidden',
  },
  input: {
    color:'white',
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: '80%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listButton: {
    marginLeft: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
  leftColumn: {
    flex: 1,
    marginRight: 50,
  },
  rightColumn: {
    marginLeft: 5,
  },
  menuStyle: {
    position: 'relative',
  },
  texto: {
    color: '#0EBEAA',
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1, // Para que ocupe todo el espacio disponible
    marginLeft: 100, // Espacio entre el ícono y el texto
  },
  iconContainer: {
    marginLeft: 'auto', // Mueve el ícono a la derecha
  },
});
export default CardMovimientosTC2;
