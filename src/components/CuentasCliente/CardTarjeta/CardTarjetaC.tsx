import {Card} from '@rneui/base';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const CardTarjetaC = ({
  tipo,
  nombreCliente,
  numeroCuenta,
  fechaVencimiento,
}: any) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.contentRight}>
        <Text style={styles.numeroCuenta}>{numeroCuenta}</Text>
      </View>
      <View style={styles.contentRight}>
      <Image
        style={styles.chip}
        resizeMode="contain"
        source={require('../../../assets/images/logoVisa.png')} 
      />
      </View>
      <Image
        style={styles.chip2}
        resizeMode="contain"
        source={require('../../../assets/images/chip.png')} 
      />
      <View style={styles.contentRight}>
        <Text style={styles.nombreUsuario}>{nombreCliente}</Text>
        <Text style={styles.tarjetaPrincipal}>Tarjeta Principal</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFCA30',
    borderColor:'#FFCA30',
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 3.84, // Radio de la sombra
    elevation: 5, // Elevación de la sombra en Android
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  content: {
    flexDirection: 'row', // Alinear elementos en fila
    alignItems: 'center', // Alinear elementos verticalmente al centro
    justifyContent: 'space-between', // Espacio uniforme entre elementos
    paddingHorizontal: 20,
  },
  content2: {
    alignItems: 'center', // Alinear elementos verticalmente al centro
    justifyContent: 'space-between', // Espacio uniforme entre elementos
    paddingHorizontal: 20,
  },
  image: {
    width: '70%',
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chip: {
    width: 50,
    height: 40,
    marginLeft:2,
    marginVertical:2
  },
  chip2: {
    width: 50,
    height: 40,
    marginLeft:2,
  },
  contentLeft: {
    flexDirection: 'row', // Alinear elementos en fila
    alignItems: 'center', // Alinear elementos verticalmente al centro
    justifyContent: 'space-between', // Espacio uniforme entre elementos
    paddingHorizontal: 20, // Espacio horizontal dentro del contenedor
  },
  contentRight: {
    flexDirection: 'column', // Alinear elementos en columna
    alignItems: 'flex-end', // Alinear elementos verticalmente a la derecha
    justifyContent: 'center', // Alinear elementos horizontalmente al centro
    paddingHorizontal: 5, // Espacio horizontal dentro del contenedor
  },
  numeroCuenta: {
    color:'white',
    fontWeight:'bold'
  },
  visaIcon: {
    width: 50, // Ancho del icono de VISA
    height: 30, // Alto del icono de VISA
  },
  nombreUsuario: {
    color:'white',
    fontSize:15,
    fontWeight:'bold'
  },
  tarjetaPrincipal: {
    color:'white',
    fontWeight:'bold'
  },

});

export default CardTarjetaC;
