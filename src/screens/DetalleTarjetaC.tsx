import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {MenuUp} from '../components/Menu/MenuUp';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {OpcionesCuentas} from '../components/CuentasCliente/OpcionesCuentas';
import {MenuComponent} from '../components/Menu/MenuComponent';
import {ModalEditarAlias} from './ModalOpcionesCuenta/ModalEditarAlias';
import {ModalConfirmLogout} from '../components/CerrarSesion/ModalConfirmLogout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ModalCarga} from '../components/ModalCarga/ModalCarga';
import CardTarjetaC from '../components/CuentasCliente/CardTarjeta/CardTarjetaC';
import CardSaldosTC from '../components/CuentasCliente/CardSaldosTC/CardSaldosTC';
import CardMovimientosTC from '../components/CuentasCliente/CardMovimientosTC/CardMovimientosTC';
import {methods} from '../api/api';
import CardMovimientosTC2 from '../components/CuentasCliente/CardMovimientosTC/CardMovimientosTC';
import * as Animatable from 'react-native-animatable';


export const DetalleTarjetaC = ({route, navigation}: any) => {
  const {cuenta,filtro = 0} = route.params;
  const [modalEditarAliasVisible, setModalEditarAliasVisible] = useState(false);
  const [saldoDisponible, setsaldoDisponible] = useState('Q. 0.00');
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [user, setUser] = useState('');
  const [transactionTC, settransactionTC] = useState();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    obtenerUsuarioName();
    obtenerTransacciones();

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      const { height } = event.endCoordinates;
      setKeyboardHeight(height);
      setKeyboardShown(true);


    });
  
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      setKeyboardShown(false);

    });
  
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const obtenerUsuarioName = async () => {
    try {
      const idCliente = await AsyncStorage.getItem('clienteId');
      const usuario = await AsyncStorage.getItem('usuario');

      if (usuario !== null) {
        setUser(usuario);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerTransacciones = async () => {
    try {
      const idCliente = await AsyncStorage.getItem('clienteId');
      // Llamar a la función para obtener las cuentas cuando el componente se monta
      const cuentaSaldo = await methods.getSaldosCuentas(
        idCliente!,
        cuenta.numeroCuenta,
        cuenta.tipo,
      );

      // Aquí se ha completado la respuesta
      settransactionTC(cuentaSaldo);
      console.dir(cuentaSaldo, {depth: null});
      //Alert.alert('SALDO:',saldoDisponible)
    } catch (error) {
      console.log('Error saldos tarjeta créditos:> ' + error);
      //Alert.alert('Error saldos tarjeta créditos'+ error)
    }
  };

  const handlePress2 = () => {
    // Abre el modal correspondiente
    setModalEditarAliasVisible(true);
  };

  const closeModalEditarAlias = () => {
    // Cierra el modal
    setModalEditarAliasVisible(false);
  };

  const handlePress = () => {
    // Navegar a la vista deseada con parámetros si es necesario
    navigation.openDrawer();
  };
  return (
    <KeyboardAvoidingView
    style={{flex: 1}} // Ajusta el estilo para ocupar toda la pantalla
    keyboardVerticalOffset={32} // Ajusta el desplazamiento
    ><SafeAreaView style={{ flex: 1, backgroundColor: '#383838' }}>


      <View style={styles.opciones}>
        <View style={styles.container}>
          <View style={styles.menu}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={30} color="#51AAA2" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{cuenta.type}</Text>
              <Text style={styles.subtitle}>{cuenta.numeroCuenta}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={handlePress2}>
              <Icon name="brush-outline" size={30} color="#51AAA2" />
            </TouchableOpacity>
          </View>

          <OpcionesCuentas navigation={navigation} route={cuenta}/>

          <View style={{...styles.formContainer,height: keyboardShown ? '45%' : '65%'}}>
            <ScrollView
              style={styles.container}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              {/** CARD DE TARJETA DE CREDITO */}
              <CardTarjetaC
                tipo="Visa"
                nombreCliente={user}
                numeroCuenta={cuenta.numeroCuenta}
              />
              <View style={styles.separator}></View>
              {/** SALDOS DE TARJETA DE CREDITO */}
              <View>
                <CardSaldosTC
                  tipo={cuenta.tipo}
                  numeroCuenta={cuenta.numeroCuenta}
                  navigation={navigation}
                  item={cuenta}
                />
              </View>
              <View style={styles.separator}></View>
              {/** MOVIMIENTOS DE TARJETA DE CREDITO */}
              <View>
               
                  <CardMovimientosTC2
                    navigation={navigation}
                    route={cuenta}
                    filtro={filtro}

                  />
              </View>
              <View style={styles.separator}></View>
            </ScrollView>
          </View>
          <Animatable.View animation={!keyboardShown ? 'fadeIn' : 'fadeOut'} duration={500}> 
          <MenuComponent navigation={navigation} />
        </Animatable.View> 
          {/* {!keyboardShown && <MenuComponent navigation={navigation} />} */}

          <ModalEditarAlias
            visible={modalEditarAliasVisible}
            onClose={closeModalEditarAlias}
            navigation={navigation}
          />
          {/* <ModalCarga visible={modalVisible} /> */}
        </View>
      </View>
      </SafeAreaView>

    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#262626',
    padding: 45,
    paddingLeft: 25,
    paddingRight: 25,
    width: '100%',
    marginTop: 'auto',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    elevation: 5,
  },
  container: {
    flex: 1,
  },
  opciones: {
    flex: 1,
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
    fontSize: 15,
    fontWeight: 'bold',
    top: -3,
  },
  subtitle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 12,
    top: -3,
  },
  Money: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  Money2: {
    color: '#B0B0B0',
  },
  texto: {
    color: '#0EBEAA',
    fontWeight: 'bold',
  },
  linea: {
    borderBottomWidth: 1, // Puedes ajustar el grosor de la línea
    borderBottomColor: '#666262', // Puedes ajustar el color de la línea
    marginVertical: 20, // Puedes ajustar el espacio vertical
    width: '100%',
    bottom: -10,
  },
  saldos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#272727',
    height: 70,
    alignItems: 'center',
  },
  lineaVertical: {
    height: '100%', // Ajusta la altura de la línea según tus necesidades
    borderRightWidth: 1, // Grosor de la línea
    borderColor: '#666262', // Color de la línea
    justifyContent: 'center', // Centra verticalmente la línea
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
  separator: {
    borderBottomColor: 'grey',
    marginBottom: 50,
  },
});
