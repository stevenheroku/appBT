import React, {createContext, useEffect, useReducer} from 'react';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/Usuario';
import {authReducer, AuthState} from './authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from '../api/apiYoloKids';
import RNBiometrics from 'react-native-simple-biometrics';
import { Alert } from 'react-native';
import { ResLogin } from '../interfaces/Login';
import  {jwtDecode}  from "jwt-decode";


// import urlApi from '../configUrl.json'
const configUrl = require('../datosURL.json');
type AuthContextProps = {
  isLoading:boolean;
  errorMessage: string | null;
  errorTitle: string | null;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'no-authenticated';
  signUp: (registerData:RegisterData) => void;
  signIn: (loginData: LoginData) => void;
  signInBiometrico: () => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
  errorTitle:'',
  isLoading:false
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken();
    const configUrl = require('../datosURL.json');
    console.log(configUrl.loginDummy)
  }, []);

  const checkToken = async () => {
    try {
      const token2 = await AsyncStorage.getItem('token');

      // No hay token, no autenticado
      if (!token2) {
        return dispatch({type: 'notAuthenticated'});
      }

      // Verificar si existe un token válido
      const resp = await cafeApi.get('/auth/login');

      // Verificar si la respuesta es exitosa (código 200)
      if (resp.status === 200) {
        dispatch({
          type: 'signUp',
          payload: {token: resp.data.token, user: resp.data.usuario},
        });
      } else {
        // La respuesta no fue exitosa, manejar el error
        console.log('Error al verificar el token:', resp.data);
        dispatch({type: 'notAuthenticated'});
      }
    } catch (error) {
      // Error al realizar la verificación, manejar la excepción
      console.log('Error al verificar el token2:', error);
      dispatch({type: 'notAuthenticated'});
    }
  };

  const signIn = async ({correo, password}: LoginData) => {
    const fecha = new Date();
    const data = {correo:correo,password:password}
    try {
      var resp:any;
      console.log('jj:'+correo)
      //este if quitarlo luego, ya que el mismo api va responder 200 o 400 si es correcto o incorrecto
        console.log('si entro')
        resp= await cafeApi.post<ResLogin>(configUrl.loginDummy,data);

        if (resp.data.data && resp.data.data.length > 0) {
          const token = resp.data.data[0].token;
          const usuario = resp.data.data[0].usuario.name;
          const nombre = usuario.split(" ")[0];
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('user', nombre.toUpperCase());
          await AsyncStorage.setItem('usuario', usuario.toUpperCase());
          await AsyncStorage.setItem('ultimoIngreso', resp.data.data[0].usuario.ulitmoIngreso ||fecha);
          await AsyncStorage.setItem('clienteId', resp.data.data[0].usuario.userId.toString());

          console.log('NOMBRE',nombre.toUpperCase());
          console.log(token);
          dispatch({
            type: 'signUp',
            payload: {token: token, user:token},
          });
         

        } else {
          console.error('Error: La propiedad "data" no tiene elementos o está indefinida.');
        }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // El código de estado es 400 (Bad Request)
        console.log(error.response.data.msg);
        dispatch({
          type: 'addError',
          payload: {errorMessage:'Inicio de sesión incorrecto. Por favor, verifica tus credenciales e inténtalo de nuevo.',errorTitle:'Login Incorrecto'},
        });
        // Puedes manejar el error de alguna manera específica para el código de estado 400 aquí
      } else {
        dispatch({
          type: 'addError',
          payload: {errorMessage:'Comunicación no disponible. La operación no se pudo realizar. Por favor verifique la configuración de su celular e intente nuevamente. Si persiste la situación, contáctese con nuestros centros de atención. (ua233)',errorTitle:'Error de Comunicación'},
        });

        // Otro tipo de error
        console.log('Error1:', error.message);
        //Alert.alert('Error2:', error.message);
      }
    }
  };

  const signInBiometrico = async () => {

     // Comprobar si la autenticación biométrica está disponible
     const canAuthenticate = await RNBiometrics.canAuthenticate();
     var biometricData:any;
     if (canAuthenticate) {
       try {
         // Obtener el template o representación de la huella digital
          biometricData = await RNBiometrics.requestBioAuth(
           'BANTRAB Biometric',
           'Escanee su huella digital.',
         );
         console.log('Biometric Data:', biometricData);
         dispatch({
          type: 'signUpBiometric',
          payload: {huella:''},
        });

         console.log('Huella almacenada con éxito');
         mostrarAlerta('Inicio de Sesión', 'Éxitoso!', '#0ebb08');
         //Alert.alert('Huella almacenada con éxito');
       } catch (error) {
         console.log('Error al procesar la autenticación biométrica:', error);
       }
     }
  };

  
  const signUp =async ({nombre,correo,password}:RegisterData) => {
    try {
      const resp = await cafeApi.post<LoginResponse>('/usuarios', {
        nombre,
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {token: resp.data.token, user: resp.data.usuario},
      });
      await AsyncStorage.setItem('token', resp.data.token);
      console.log(resp.data.token);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // El código de estado es 400 (Bad Request)
        console.log(error.response.data);
        dispatch({
          type: 'addError',
          payload: error.response.data.errors[0].msg || 'Informacion Incorrecta',
        });
        // Puedes manejar el error de alguna manera específica para el código de estado 400 aquí
      } else {
        // Otro tipo de error
        console.log('Error:', error.response.data);
      }
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token', );
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('usuario');
    await AsyncStorage.removeItem('ultimoIngreso');
    dispatch({type: 'logout'});
  };
  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signInBiometrico,
        signUp,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
function mostrarAlerta(arg0: string, arg1: string, arg2: string) {
  throw new Error('Function not implemented.');
}

