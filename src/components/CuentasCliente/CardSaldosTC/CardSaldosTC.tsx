import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from '@rneui/base';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, Switch, Keyboard, Alert} from 'react-native';
import { ModalCarga } from '../../ModalCarga/ModalCarga';
import { methods } from './apiSaldosTC/api';
import CardMovimientosTC from '../CardMovimientosTC/CardMovimientosTC';
const configUrl = require('../../../datosURL.json');


const data2 =[
  {
      "id": 1,
      "date": "01/01/2024",
      "name": "Compra 1",
      "gasto": "-Q 500.00"
  },
  {
      "id": 2,
      "date": "01/01/2024",
      "name": "Compra 2",
      "gasto": "-Q 28.00"
  },
  {
      "id": 3,
      "date": "01/01/2024",
      "name": "Compra 3",
      "gasto": "-Q 471.40"
  }
]
const CardSaldosTC = ({
  tipo,
  numeroCuenta,
  navigation,item
}: any) => {

  const [isEnabled, setIsEnabled] = useState(false);
  const [modalEditarAliasVisible, setModalEditarAliasVisible] = useState(false);
  const [saldoDisponibleQ, setsaldoDisponibleQ] = useState('Q.0.00');
  const [saldoDisponibleD, setsetsaldoDisponibleD] = useState('Q.$.00')
  const [pagoContadoQ, setpagoContadoQ] = useState('Q.0.00')
  const [pagoContadoD, setpagoContadoD] = useState('$.0.00')
  const [pagoMinimoQ, setpagoMinimoQ] = useState('Q.0.00')
  const [pagoMinimoD, setpagoMinimoD] = useState('$.0.00')
  const [transactionTC, settransactionTC] = useState();
  const [fechaPago, setfechaPago] = useState('')

  const [saldoTotal, setsaldoTotal] = useState('Q. 0.00');
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState('');
  
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };


  useEffect(() => {
    //obtenerSaldoCuentasC();
    obtenerSaldoCuentas();
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

  
  const obtenerSaldoCuentas = async () => {
    try {
      const idCliente = await AsyncStorage.getItem('clienteId');
      // Llamar a la función para obtener las cuentas cuando el componente se monta

      setModalVisible(true); // Mostrar el modal de carga
      const cuentaSaldo = await methods.getSaldosCuentas(idCliente!,numeroCuenta,tipo);
    // Aquí se ha completado la respuesta
      setModalVisible(false);
      var saldoDisponible = cuentaSaldo.data[0].saldos[0].saldoDisponible;
      var saldoTotal = cuentaSaldo.data[0].saldos[0].saldoPagar;

      setsaldoDisponibleQ(cuentaSaldo.data[0].saldos[0].saldoDisponibleQ);
      setsetsaldoDisponibleD(cuentaSaldo.data[0].saldos[0].saldoDisponibleD);
      setpagoContadoQ(cuentaSaldo.data[0].saldos[0].pagoContadoQ);
      setpagoContadoD(cuentaSaldo.data[0].saldos[0].pagoContadoD);
      setpagoMinimoQ(cuentaSaldo.data[0].saldos[0].pagoMinimoQ);
      setpagoMinimoD(cuentaSaldo.data[0].saldos[0].pagoMinimoD);
      settransactionTC(cuentaSaldo);
      fechaPgo();
      //Alert.alert('SALDO:',saldoDisponible)
      console.log(transactionTC)
    } catch (error) {
      console.log('Error saldos tarjeta créditos'+ error)
      //Alert.alert('Error saldos tarjeta créditos'+ error)
    }
  };


  const fechaPgo = () => {
    // Obtener la fecha de hoy
    const hoy = new Date();
  
    // Sumarle 10 días
    const fechaPago = new Date(hoy.getTime() + 10 * 24 * 60 * 60 * 1000);
  
    // Obtener día, mes y año de la fecha de pago
    const dia = fechaPago.getDate();
    const mes = fechaPago.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
    const anio = fechaPago.getFullYear();
  
    // Formatear la fecha como día/mes/año
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    setfechaPago(fechaFormateada)
  
    console.log('FECHA PAGO:', fechaFormateada);
  };

  return (
    <View>
      <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <View style={styles.switchContainer}>
            <View style={styles.innerContainer}>
            <Switch
                trackColor={{ false: "#767577", true: "#4dbfd6" }}
                thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={styles.switchText}>Apagar tarjeta</Text>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsRow}>
              <Text style={styles.textSaldos}>Disponible</Text>
              <View style={styles.saldosRow}>
                <Text style={styles.separator}>{saldoDisponibleQ} |</Text>
                <Text style={styles.saldosTC}>{saldoDisponibleD}</Text>
              </View>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.textSaldos}>Pago de contado</Text>
              <View style={styles.saldosRow}>
                <Text style={styles.separator}>{pagoContadoQ} |</Text>
                <Text style={styles.saldosTC}>{pagoContadoD}</Text>
              </View>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.textSaldos}>Pago mínimo</Text>
              <View style={styles.saldosRow}>
                {/* <Text style={styles.saldosLabel}>Q.</Text> */}
                <Text style={styles.separator}>{pagoMinimoQ} |</Text>
                <Text style={styles.saldosTC}>{pagoMinimoD}</Text>
              </View>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.textSaldos}>Fecha de pago</Text>
              <Text style={styles.saldosTC}>{fechaPago}</Text>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.detailsText}>Ver más detalles</Text>
          </View>

        </View>
      </View>
      <ModalCarga visible={modalVisible} />
    </View>
    {/** MOVIMIENTOS DE TARJETA DE CREDITO */}
    {/* <View>
                {transactionTC && (
                  <CardMovimientosTC
                    navigation={navigation}
                    item={item}
                    dataTransac={transactionTC}
                  />
                )}
              </View> */}
    </View>
    
  );
};

const styles = StyleSheet.create({
  saldosSeparator: {
    marginHorizontal: 5, // Espacio entre los saldos y el separador
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red'
  },
  cardContainer: {
    borderRadius: 10,
    width: '90%',
    borderColor: 'lightgrey', // Color del borde
    borderWidth: 1,
  },
  header: {
    backgroundColor: 'lightgrey',
    borderTopLeftRadius: 10, // Radio de la esquina superior izquierda
    borderTopRightRadius: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginBottom: 10,
  },
  detailsText: {
    color: '#1CB4A9',
    textAlign: 'center',
    textDecorationLine: 'underline'
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
  switchText: {
    marginLeft: 10, // Espacio entre el switch y el texto
  },
  textSaldos: {
    color: 'white',
    fontWeight: 'bold',
  },
  saldosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'

  },
  saldosTC: {
    fontSize:11,
    color: 'white',
    width:90,
    marginRight:-10,
    textAlign:'right',
    paddingRight:5
  },
  separator: {
    fontSize:11,
    color: 'white',
    marginRight: 10, // Espacio entre el separador y el monto en dólares
  },
  separatorItem:{
    borderBottomColor: 'grey',
    marginBottom: 50,
  }
});
export default CardSaldosTC;
