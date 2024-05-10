import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';

//uso de huella digital
import RNBiometrics from 'react-native-simple-biometrics';
import Biometrics, {BiometryTypes} from 'react-native-biometrics';

import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';

//allertas
import AwesomeAlert from 'react-native-awesome-alerts';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { sha256 } from 'react-native-sha256';
import { ModalCarga } from '../components/ModalCarga/ModalCarga';
import { AlertaMensaje } from '../components/Alertas/AlertaMensaje';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props extends StackScreenProps<any, any> {}

const LoginScreen = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [bottomPadding, setBottomPadding] = useState(0);
  const {status,isLoading} = useContext(AuthContext);

  const {signIn,signInBiometrico,errorMessage,errorTitle,removeError} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  // Cuando quieras mostrar el modal (por ejemplo, en algún lugar de la función handleLogin)

  //mostrar o no la alerta
  const { mostrarAlerta, AlertaComponente } = AlertaMensaje();

  useEffect(() => {
    if (errorMessage?.length === 0){
      return;
    }
    else{
      mostrarAlerta(errorTitle!, errorMessage?.toString()!, '#26AEB2');
      removeError(); // Llamamos a removeError aquí
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
      // Alert.alert(
      //   'Login Incorrecto',
      //   errorMessage?.toString(),
      //   [
      //     {
      //       text: 'OK',
      //       onPress: removeError,
      //     },
      //   ]
      // );
    }
   
  }, [errorMessage]);


  const onLogin = () => {
    console.log({username,password})
    Keyboard.dismiss();

    if (!username && !password) {
      //Alert.alert('Error', 'Por favor, completa todos los campos.');
      mostrarAlerta('Error - Campos Requeridos', 'Por favor, completa todos los campos de inicio de sesión.','#DD6B55');
    }else if (!username ) {
      //Alert.alert('Error', 'Por favor, completa todos los campos.');
      mostrarAlerta('Error - Campos Requeridos', 'Complete el Usuario ','#DD6B55');
    }else if (!password ) {
      //Alert.alert('Error', 'Por favor, completa todos los campos.');
      mostrarAlerta('Error - Campos Requeridos', 'Complete la contraseña ','#DD6B55');
    }
    else{
      setModalVisible(true);
      signIn({correo: username, password: password});
      
    }
    
    
  };

 
  const loginBiometric = () => {
    signInBiometrico();
  };

 
  
 
  return (
    <LinearGradient
      colors={['#FECB0E', '#F18A43', '#EF5150']}
      start={{x: 0.5, y: 0}}
      end={{x: 1, y: 0.5}}
      style={styles.container}>
     <KeyboardAwareScrollView
        contentContainerStyle={styles.background}
        style={styles.background}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Iniciar Sesión</Text>
          <View style={styles.formContainer}>
            <View style={styles.iconContainer}>
              <Icon name="person" size={40} color="black" style={styles.icon} />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Nombre de Usuario"
              placeholderTextColor="#808080"
              value={username}
              onChangeText={text => setUsername(text)}
              onSubmitEditing={onLogin}

            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#808080"
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
              onSubmitEditing={onLogin}

            />
            <View style={styles.separator}></View>
            <View >
              <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={onLogin}>
                <Text style={styles.textButton}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}></View>
            {/* Texto de términos y condiciones */}
          <TouchableOpacity 
          
          activeOpacity={0.5} 
          onPress={() => Linking.openURL('https://www.bantrab.com.gt/terminos-y-condiciones-billetera/')}>
            <Text style={styles.termsLink}>Términos y Condiciones</Text>
          </TouchableOpacity>
            {/*<View style={styles.buttonHuella}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={loginBiometric}>
                <Icon
                  name="finger-print-outline"
                  size={40}
                  color="#a39f9f"
                  style={styles.huella}
                />
              </TouchableOpacity>
            </View>*/}
            {/* <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleBiometricLogin}></TouchableOpacity> */}
               <ModalCarga visible={modalVisible} />
          </View>
         
        </ScrollView>
        <KeyboardSpacer
          onToggle={visible => {
            setKeyboardHeight(visible ? keyboardHeight : 0);
          }}
          style={[styles.keyboardSpacer, {height: keyboardHeight}]}
        />
        {/* Agrega el ModalCarga aquí */}
     
      </KeyboardAwareScrollView>
      <AlertaComponente />
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 2,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 45,
    width: '100%',
    height: '60%', // Ajusta según el porcentaje deseado
    marginTop: 'auto',
    borderTopLeftRadius: 50,
    elevation: 5,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    top: '30%', //ajusta el porcetnaje arriba el formcontainer
  },
  input: {
    width: '100%',
    color: 'black',
    height: 40,
    borderBottomColor: '#5F9AA0', // Color del borde inferior
    borderBottomWidth: 1, // Ancho del borde inferior
    marginBottom: 16,
    padding: 8,
    top: 45,
  },
  image: {
    width: 50, // Ajusta el tamaño según tus necesidades
    height: 50, // Ajusta el tamaño según tus necesidades
    marginTop: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00DFDE',
    width: '100%',
    height: 40,
    borderRadius: 50,
  },
  buttonHuella: {
    top: 80,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    borderRadius: 50,
  },

  textButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  keyboardSpacer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  huella: {},
  alertContainer: {
    
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    padding: 40,
    width: '100%',
    height: '65%', 
    elevation: 5,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    top:80
  },
  alertMessage: {
    fontSize: 16,
    textAlign: 'center',
    top:'80%'
  },
  confirmButtonText: {
    fontSize: 18,
  },
  termsLink: {
    textAlign: 'center',
    color: '#4d4c4c',
    textDecorationLine: 'underline',
  },separator: {
    height: 50, // Ajusta el tamaño del separador según tus necesidades
  }
});

export default LoginScreen;
