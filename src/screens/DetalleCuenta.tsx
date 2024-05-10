import React, {useEffect, useState} from 'react';
import {
  Alert,
  Animated,
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
import { ModalCarga } from '../components/ModalCarga/ModalCarga';
import {methods} from '../api/api'
import { ModalMovimientosT } from './ModalOpcionesCuenta/ModalMovimientosT';
import * as Animatable from 'react-native-animatable';
import { AlertaMensaje } from '../components/Alertas/AlertaMensaje';

const Item = ({transactions}: any) => {
  return (
    
    <View style={styles.transactionListContainer}>
      {transactions.map((transaction: any, index: any) => (
        <View key={index} style={styles.transactionItem}>
          <View style={styles.leftColumn}>
            <Text style={{...styles.texto, fontWeight: 'bold'}}>
              {transaction.date}
            </Text>
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
              {transaction.name}
            </Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={{color: '#C5035B', fontWeight: 'bold'}}>
              {transaction.gasto}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export const DetalleCuenta = ({route, navigation}: any) => {
  
  //mostrar o no la alerta
  
  const {cuenta,filtro = 0} = route.params;
  const [modalEditarAliasVisible, setModalEditarAliasVisible] = useState(false);
  const [saldoDisponible, setsaldoDisponible] = useState('Q. 0.00');
  const [saldoReserva, setsaldoReserva] = useState('Q. 0.00');
  const [saldoTotal, setsaldoTotal] = useState('Q. 0.00');
  const [busqueda, setBusqueda] = useState('');
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [transaction, setTransactions] = useState([]);
  const [transactionOriginal, setTransactionsOriginal] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFiltroMovimientos, setmodalFiltroMovimientos] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    filtrarMes();
  }, [filtro]);

  const handlePress2 = () => {
    // Abre el modal correspondiente
    setModalEditarAliasVisible(true);
  };

  const closeModalEditarAlias = () => {
    // Cierra el modal
    setModalEditarAliasVisible(false);
  };

  const { mostrarAlerta, AlertaComponente } = AlertaMensaje();

  const obtenerSaldoCuentas = async () => {
    try {
      const idCliente = await AsyncStorage.getItem('clienteId');
      // Llamar a la función para obtener las cuentas cuando el componente se monta
      setModalVisible(true); // Mostrar el modal de carga
      const cuentaSaldo = await methods.getSaldosCuentas(idCliente!, cuenta.numeroCuenta,cuenta.tipo);
    // Aquí se ha completado la respuesta
      setModalVisible(false);
      var saldoDisponible = cuentaSaldo.data[0].saldos[0].saldoDisponible;
      var saldoReserva = cuentaSaldo.data[0].saldos[0].saldoReserva;
      var saldoTotal = cuentaSaldo.data[0].saldos[0].saldoTotal;

      var transac = cuentaSaldo.data[0].transactions[0];
      setTransactions(transac);
      setTransactionsOriginal(transac);
      setsaldoDisponible(saldoDisponible);
      setsaldoReserva(saldoReserva);
      setsaldoTotal(saldoTotal);
    } catch (error) {
      mostrarAlerta('Error de Comunicación', 'Comunicación no disponible. La operación no se pudo realizar. Por favor verifique la configuración de su celular e intente nuevamente. Si persiste la situación, contáctese con nuestros centros de atención. (ua233)','#26AEB2');
      setTimeout(() => {
        navigation.navigate('HomeDrawer');
      }, 1000); 
      console.log('Error Comunicacion: ', error);
    }
  };

  
  const filtrarMes = () => {

    if(filtro>0){
      console.log('filter mes')
      // Filtrar los elementos basados en el término de búsqueda
      const filteredData = transactionOriginal.filter((item: any) => {
        const dateParts = item.date.split('/');
        const month = parseInt(dateParts[1], 10); // Extraer el mes de la fecha
        return month === filtro; // Comparar con el filtro proporcionado
      });
      console.log('--2',filteredData)
      console.log('CUENTA',cuenta)

  
      setTransactions(filteredData);
    }
  };
  const handleSearch = (text:string) => {
    setBusqueda(text);

    // Filtrar los elementos basados en el término de búsqueda
    const filteredData = transactionOriginal.filter((item:any) =>
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.date.includes(text) ||
      item.gasto.includes(text)
    );
    console.log('CUENTA',cuenta)

    setTransactions(filteredData);
  };

  const closeModalFiltroMes = () => {
    // Cierra el modal
    setmodalFiltroMovimientos(false);
  };

  const AbrirModalFiltroMes = () => {
    // Abre el modal correspondiente
    setmodalFiltroMovimientos(true);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#383838' }}>

    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={32} // Ajusta el desplazamiento
    >

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
          <OpcionesCuentas navigation={navigation} route={route.params } />

          <View style={{...styles.formContainer,height: keyboardShown ? '45%' : '65%'}}>
            <View style={{alignItems: 'center', top: -20}}>
              <Text style={styles.Money}>{saldoDisponible}</Text>
              <Text style={styles.texto}>Saldo disponible</Text>
            </View>
            <View style={styles.linea}></View>

            <ScrollView
              style={styles.container}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View style={styles.saldos}>
                <View style={styles.titleContainer}>
                  <Text style={styles.Money2}>{saldoReserva}</Text>
                  <Text style={styles.texto}>Saldo en Reserva</Text>
                </View>
                <View style={styles.lineaVertical}></View>
                <View style={styles.titleContainer}>
                  <Text style={styles.Money2}>{saldoTotal}</Text>
                  <Text style={styles.texto}>Saldo total</Text>
                </View>
              </View>
              <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="search"
                    size={24}
                    color="#aaa"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    value={busqueda}
                    onChangeText={handleSearch}
                  />
                </View>
                <TouchableOpacity style={styles.listButton} activeOpacity={0.5} onPress={AbrirModalFiltroMes}>
                <Ionicons name="list" size={24} color="#25B1AA" />
              </TouchableOpacity>
              </View>
              <Item transactions={transaction} />
            </ScrollView>
          </View>
          {/* {!keyboardShown && <MenuComponent navigation={navigation} />} */}
         <Animatable.View animation={!keyboardShown ? 'fadeIn' : 'fadeOut'} duration={500}> 
          <MenuComponent navigation={navigation} />
        </Animatable.View> 
        
          <ModalEditarAlias
            visible={modalEditarAliasVisible}
            onClose={closeModalEditarAlias}
            navigation={navigation}
          />
          <ModalMovimientosT
            visible={modalFiltroMovimientos}
            onClose={closeModalFiltroMes}
            navigation={navigation}
            route={cuenta}
          />
           <ModalCarga visible={modalVisible} />
        </View>
      </View>
     <AlertaComponente />

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
    marginTop: 'auto',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    elevation: 5,
  },
  container: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
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
    color:'white',
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
});

