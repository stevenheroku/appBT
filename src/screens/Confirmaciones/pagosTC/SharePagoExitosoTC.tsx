import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import {MenuComponent} from '../../../components/Menu/MenuComponent';
import * as Animatable from 'react-native-animatable';

const {height: screenHeight} = Dimensions.get('window');

export const SharePagoExitosoTC = ({navigation,ref}: any) => {
  return (
      <View ref={ref} style={{ flex: 1 }}>      
      <View style={[styles.section1]}>
        <View style={styles.iconContainer}>
          <Icon name="checkmark-circle" size={100} color="#51AAA2" />
        </View>
        <View style={styles.confirmationText}>
          <Text style={styles.textTitle}>Pago realizado con éxito</Text>
        </View>
        <View style={styles.confirmationText}>
          <Text style={styles.monto}>Q.2,000.00</Text>
          <Text style={styles.textDescription}>Monto</Text>
        </View>
      </View>
      <View style={[styles.section2]}>
        <View style={styles.detalleOperacion}>
          <Text style={styles.textTitle}>Detalles de la operación</Text>
          <Text style={styles.textDescription}>19/03/2024 - 09:35:45 AM</Text>
        </View>
        <View style={styles.descriptionOrigen}>
          <Text style={styles.textTitle}>Cuenta origen</Text>
          <Text style={styles.textDescription}>
            Cuenta de ahorros 2551515855
          </Text>
          <View style={styles.separator}></View>
          <View>
            <Text style={styles.textTitle}>Número de tarjeta de crédito</Text>
            <Text style={styles.textDescription}>Visa Gold 515151515</Text>
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Text style={styles.textTitle}>BANTRAB</Text>
        </View>
      </View>

      <MenuComponent navigation={navigation} />
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
    paddingHorizontal: 30,
  },
  detalleOperacion: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  textTitle: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  textDescription: {
    textAlign: 'left',
    fontSize: 15,
    color: 'white',
    marginBottom: 10,
  },
  monto: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#51AAA2',
    marginBottom: 5,
  },
  botonContinuar: {
    position: 'absolute',
    bottom: 50, // Puedes ajustar este valor según sea necesario
    width: '90%', // Ancho del botón
    height: 40,
    backgroundColor: '#51AAA2',
    borderRadius: 10,
    alignSelf: 'center', // Centra el botón horizontalmente
    alignItems: 'center',
  },
  botonCancelar: {
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
  },
  textButton: {
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 40,
    fontWeight: 'bold',
  },
  texto: {
    color: '#ffffff',
    fontWeight: 'bold',
    top: -10,
  },
});
