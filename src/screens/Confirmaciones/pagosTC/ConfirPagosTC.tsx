import React, { useEffect, useState } from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import {MenuComponent} from '../../../components/Menu/MenuComponent';
import * as Animatable from 'react-native-animatable';

const {height: screenHeight} = Dimensions.get('window');

export const ConfirPagosTC = ({navigation,route}: any) => {

  const [setMonto, setsetMonto] = useState('');
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [tarjetaCredito, settarjetaCredito] = useState('');

  function currencyFormatter({value}: {value: number}): string {
    const formatter = new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ', // Código de moneda para Quetzales
      minimumFractionDigits: 2,
    });

    return formatter.format(value);
  }

  useEffect(() => {
   

    if (route.params && route.params.cuenta) {
      const {cuenta} = route.params;
      const pagoM = currencyFormatter({
        value: cuenta.monto,
      });
      setsetMonto(pagoM);
      setCuentaOrigen(cuenta.cuentaOrigen);
      settarjetaCredito(cuenta.numeroTC);
    }
  });

  const pagoExitoso=()=>{
    //navigation.navigate('PagosTarjeta', {cuenta: item});
    const item = {
      monto: route.params.cuenta.monto,
      cuentaOrigen: route.params.cuenta.cuentaOrigen,
      numeroTC: route.params.cuenta.numeroTC,
      operacionFecha: route.params.cuenta.operacionFecha
    };
    navigation.navigate('PagoExitosoTC', {cuenta: item});
  }

  
  return (

    <View style={{flex: 1}}>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#262626' }}>

      <View style={styles.menu}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#51AAA2" />
        </TouchableOpacity>
      </View>
      <View style={[styles.section1]}>
      <View animation="fadeOut" iterationCount="infinite" style={styles.iconContainer}>
          <Icon name="help-circle-outline" size={80} color="#e9bc0b" />
        </View>
        <View style={styles.confirmationText}>
          <Text style={styles.textTitle}>Confirmación de pago</Text>
          <Text style={styles.textDescription}>Pago de tarjeta de crédito</Text>
        </View>
        <View style={styles.confirmationText}>
          <Text style={styles.monto}>{setMonto}</Text>
          <Text style={styles.textDescription}> Monto</Text>
        </View>
      </View>
      <View style={[styles.section2]}>
        <View style={styles.descriptionOrigen}>
          <Text style={styles.textTitle}>Cuenta origen</Text>
          <Text style={styles.textDescription}>
            {cuentaOrigen}
          </Text>
          <View style={styles.separator}></View>
          <View>
          <Text style={styles.textTitle}>Número de tarjeta de crédito</Text>
          <Text style={styles.textDescription}>
            {tarjetaCredito}
          </Text>
          </View>
         
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={{...styles.botonCancelar, bottom: 50}} 
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <Text style={styles.textButton}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.botonContinuar, bottom: 100}} 
            activeOpacity={0.8}
            onPress={pagoExitoso}>
            <Text style={styles.textButton}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MenuComponent navigation={navigation} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#262626',
    height: 70,
    alignItems: 'center',
  },
  section: {
    minHeight: screenHeight / 2, // Establece la altura de cada sección a la mitad de la altura de la pantalla
  },
  section1: {
    backgroundColor: '#262626',
    height: '35%',
  },
  section2: {
    backgroundColor: '#1A1A1A',
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#262626',
    paddingLeft: 30,
    paddingRight: 30,
    height: '12%',
  },
  separator: {
    height: 20, // Ajusta el tamaño del separador según tus necesidades
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    bottom: 20,
  },
  optionButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: '#51AAA2',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  descriptionOrigen: {
    paddingVertical:50,
    paddingHorizontal:30
  },
  textTitle: {
    textAlign:'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  textDescription: {
    textAlign:'left',
    fontSize: 15,
    color: 'white',
  },
  monto: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#51AAA2',
  },
  botonContinuar: {
    position: 'absolute',
    bottom: 50, // Puedes ajustar este valor según sea necesario
    width: '90%', // Ancho del botón
    height: 40,
    backgroundColor: '#51AAA2',
    borderRadius: 10,
    alignSelf: 'center', // Centra el botón horizontalmente
    justifyContent: 'center',

  },
  botonCancelar:{
    position: 'absolute',
    bottom: 50, // Puedes ajustar este valor según sea necesario
    width: '90%', // Ancho del botón
    height: 40,
    backgroundColor: '#262626',
    borderRadius: 10,
    alignSelf: 'center', // Centra el botón horizontalmente
    alignItems: 'center',
    borderColor:'#51AAA2',
    borderWidth:2,
    justifyContent: 'center',

  },
  textButton: {
    color: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight:'bold'
  },
  texto: {
    color: '#ffffff',
    fontWeight: 'bold',
    top: -10,
  },
});
