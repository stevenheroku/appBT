import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import {MenuComponent} from '../../../components/Menu/MenuComponent';
import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {SharePagoExitosoTC} from './SharePagoExitosoTC';
import {captureAndShareView} from '../../../components/shareImage/captureAndShareView';
import { ModalCarga } from '../../../components/ModalCarga/ModalCarga';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const PagoExitosoTC = ({navigation,route}: any) => {
  let viewRef = useRef(null);
  const [setMonto, setsetMonto] = useState('');
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [tarjetaCredito, settarjetaCredito] = useState('');
  const [fechaOperacion, setfechaOperacion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);


  function currencyFormatter({value}: {value: number}): string {
    const formatter = new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ', // Código de moneda para Quetzales
      minimumFractionDigits: 2,
    });

    return formatter.format(value);
  }
  const captureView = async () => {
    await captureAndShareView(viewRef);
  };
  useEffect(() => {
   

    if (route.params && route.params.cuenta) {
      const {cuenta} = route.params;
      const pagoM = currencyFormatter({
        value: cuenta.monto,
      });
      setsetMonto(pagoM);
      setCuentaOrigen(cuenta.cuentaOrigen);
      settarjetaCredito(cuenta.numeroTC);
      setfechaOperacion(cuenta.operacionFecha)
      console.log(cuenta.operacionFecha)
    }
  },[route]);
  const homeScreen =()=>{
    setModalVisible(true);
    navigation.navigate('HomeDrawer');
    setModalVisible(false);
  }
  return (
    <View style={{flex: 1}}>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#262626' }}>

      <View style={{flex: 1}} ref={viewRef}>
        <View style={[styles.section1]}>
          <View style={styles.iconContainer}>
            <Icon name="checkmark-circle" size={100} color="#51AAA2" />
          </View>
          <View style={styles.confirmationText}>
            <Text style={styles.textTitle}>Pago exitoso</Text>
          </View>
          <View style={styles.confirmationText}>
            <Text style={styles.monto}>{setMonto}</Text>
            <Text style={styles.textDescription}>Monto</Text>
          </View>
        </View>

        <ScrollView style={[styles.section2]}>
          <View style={styles.detalleOperacion}>
            <Text style={styles.textDetalles}>Detalles de la operación</Text>
            <Text style={styles.textHora}>{fechaOperacion}</Text>
          </View>
          <View style={styles.descriptionOrigen}>
            <Text style={styles.textTitle}>Cuenta origen</Text>
            <Text style={styles.textDescription}>
              {cuentaOrigen}
            </Text>
            <View style={styles.separator}></View>
            <View>
              <Text style={styles.textTitle}>Número de tarjeta de crédito</Text>
              <Text style={styles.textDescription}>{tarjetaCredito}</Text>
            </View>
          <View style={styles.detalleOperacion}>
              <Text style={styles.textCentral}>BANTRABⓇ</Text>
            </View>
          </View>
        </ScrollView>
       
      </View>

      <View style={{...styles.formContainer,justifyContent: 'flex-end'}}>
        <TouchableOpacity
          style={{...styles.botonFinalizar, bottom: 50}}
          activeOpacity={0.8}
          onPress={homeScreen}>
          <Text style={styles.textButton}>Finalizar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.botonCompartir, bottom: 100}}
          activeOpacity={0.8}
          onPress={captureView}>
          <Text style={styles.textButton}>Compartir</Text>
        </TouchableOpacity>
      </View>
      <MenuComponent navigation={navigation} />
      <ModalCarga visible={modalVisible} />
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
    height: '45%',
  },
  section2: {
    backgroundColor: '#1A1A1A',
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#1A1A1A',
    paddingLeft: 30,
    paddingRight: 30,
    height: '18%',
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
    paddingHorizontal: 30,
  },
  detalleOperacion: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  textTitle: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  textDetalles:{
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  textDescription: {
    textAlign: 'left',
    fontSize: 15,
    color: 'white',
  },
  textHora: {
    textAlign: 'left',
    fontSize: 11,
    color: '#51AAA2',
  },
  monto: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#51AAA2',
    marginBottom: 5,
  },
  botonCompartir: {
    position: 'absolute',
    bottom: 50, // Puedes ajustar este valor según sea necesario
    width: '90%', // Ancho del botón
    height: 40,
    backgroundColor: '#51AAA2',
    borderRadius: 10,
    alignSelf: 'center', // Centra el botón horizontalmente
    alignItems: 'center',
    justifyContent: 'center',

  },
  botonFinalizar: {
    position: 'absolute',
    bottom: 50, // Puedes ajustar este valor según sea necesario
    width: '90%', // Ancho del botón
    height: 40,
    backgroundColor: '#262626',
    borderRadius: 10,
    alignSelf: 'center', // Centra el botón horizontalmente
    alignItems: 'center',
    borderColor: '#51AAA2',
    borderWidth: 2,
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
  textCentral:{
    textAlign:'center',
    fontSize:20,
    color:'#B5B5B5'
  }
});
