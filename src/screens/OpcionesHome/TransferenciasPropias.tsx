import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {OpcionesCuentas} from '../../components/CuentasCliente/OpcionesCuentas';
import { TextInput } from 'react-native-gesture-handler';
import MenuOptions from '../../components/MenuOpciones/MenuOptions';

export const TransferenciasPropias = ({navigation}: any) => {
  const handlePress = () => {
    // Navegar a la vista deseada con parámetros si es necesario
    navigation.openDrawer();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#383838' }}>

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.opciones}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
        <MenuOptions navigation={navigation} name="Transferencias a cuentas propias" />

          <View style={{ padding: 30 }}>
            <Text style={styles.texto}>Producto Origen</Text>
            <View style={styles.productoOrigen}>
              <Text style={{ color: 'white' }}>Cuenta Monetaria</Text>
            </View>
            <View style={styles.linea}></View>
            <Text style={styles.texto}>Cuenta Destino</Text>
            <View style={styles.cuentaDestino}>
              <Text style={{ color: 'white' }}>Producto Destino</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Monto"
              placeholderTextColor="#ffffff"
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              placeholderTextColor="#ffffff"
            />
            <TouchableOpacity style={styles.boton} activeOpacity={0.8}>
              <Text style={{ ...styles.textButton }}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#262626',
    padding: 45,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    height: '50%', // Ajusta según el porcentaje deseado
    marginTop: 'auto',
    elevation: 5,
  },
  container: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
  },
  opciones: {
    flexGrow: 1,
    backgroundColor: '#1A1A1A',
  },
  titleContainer: {
    alignItems: 'center',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#262626',
    height: 70,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    alignItems:'center',
    fontSize: 15,
    fontWeight: 'bold',
    top: -3,
  },
  subtitle: {
    color: '#8C8C8C',
    fontSize: 12,
  },
  Money: {
    fontWeight: 'bold',
    color: '#000000',
  },
  texto: {
    color: '#ffffff',
    fontWeight: 'bold',
    top:-10
  },
  linea: {
    borderBottomWidth: 5, // Adjust the thickness of the line as needed
    borderBottomColor: 'transparent', // Set a transparent white color
    marginVertical: 10, // Adjust the vertical spacing as needed
    width: '100%',
  },
  saldos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    height: 70,
    alignItems: 'center',
  },
  lineaVertical: {
    height: '100%', // Ajusta la altura de la línea según tus necesidades
    borderRightWidth: 1, // Grosor de la línea
    borderColor: '#666262', // Color de la línea
    justifyContent: 'center', // Centra verticalmente la línea
  },
  productoOrigen: {
    backgroundColor: '#313131',
    width: '100%',
    height: 80,
    padding: 15,
    borderRadius:15
  },
  cuentaDestino: {
    backgroundColor: '#313131',
    width: '100%',
    height: 80,
    padding: 15,
    borderRadius:15

  },
  input:{
    width: '100%',
    color: '#ffffff',
    height: 40,
    borderColor: '#444444',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 16,
    padding: 8,
    top: 45,
  },
  boton:{
    width: '100%',
    height: 40,
    backgroundColor: '#51AAA2',
    top: 90,
    borderRadius: 10,
  },
  textButton:{
    color: 'white',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    top: 10,
  }
});
