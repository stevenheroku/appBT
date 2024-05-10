import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {AuthContext} from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const AlertaMensaje = () => {
  const { signIn, signInBiometrico, errorMessage, removeError } = useContext(AuthContext);

  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState('');
  const [texto, setTexto] = useState('');
  const [color, setColor] = useState('');
  var error:any;

  const mostrarAlerta = (titulo: string, mensaje: string, color: string) => {
    setTitle(titulo);
    setTexto(mensaje);
    setShowAlert(true);
    setColor(color);
  };

  if (errorMessage != null) {
    error = errorMessage;
  }

  const ocultarAlerta = () => {
    removeError();
    setShowAlert(false);
  };

  const AlertaComponente = () => (
    <View>
      <AwesomeAlert
        show={showAlert}
        title={title}
        message={texto}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor={color}
        onConfirmPressed={ocultarAlerta}
        contentContainerStyle={styles.alertContainer}
        titleStyle={styles.alertTitle}
        messageStyle={styles.alertMessage}
        confirmButtonTextStyle={styles.confirmButtonText}
        confirmButtonStyle={{...styles.confirmButtonStyle}} // Añade este estilo
      />
    </View>
  );

  return { mostrarAlerta, ocultarAlerta, AlertaComponente };
};
const styles = StyleSheet.create({
  alertContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    padding: 40,
    width: '100%',
    height: '65%',
    alignItems: 'center', // Alineación horizontal centrada
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 80,
  },
  alertMessage: {
    fontSize: 16,
    textAlign: 'center',
    top: 100,
  },
  confirmButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  confirmButtonStyle: {
    position: 'absolute',
  bottom: -150, // Ajusta este valor según sea necesario para elevar el botón
  width: '100%',
  elevation:5,
  },
  iconoYTituloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
