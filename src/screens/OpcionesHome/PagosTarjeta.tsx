import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {MenuComponent} from '../../components/Menu/MenuComponent';
import MenuOptions from '../../components/MenuOpciones/MenuOptions';
import Icon from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import {ModalTarjetasPagar} from '../ModalOpcionesCuenta/ModalesPagosTCPropias/ModalTarjetasPagar';
import {ModalDebitarPagoTC} from '../ModalOpcionesCuenta/ModalesPagosTCPropias/ModalDebitarPagoTC';
import {ModalMonedaPagoTC} from '../ModalOpcionesCuenta/ModalMoneda/ModalMonedaPagoTC';
import {ModalInfoProgramarPago} from '../ModalOpcionesCuenta/ModalInfoProgramarPago/ModalInfoProgramarPago';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {methods} from '../../api/api';
import moment from 'moment-timezone';

const {height: screenHeight} = Dimensions.get('window');
export const PagosTarjeta = ({route, navigation}: any) => {
  const [meses] = useState([
    {id: 1, nombre: 'Pago mínimo', selected: false},
    {id: 2, nombre: 'Pago de contado', selected: false},
    {id: 3, nombre: 'Abono', selected: false},
    {id: 4, nombre: 'Pago total', selected: false},
  ]);
  // Mostrar o no la alerta
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectOpcionPago, setselectOpcionPago] = useState<number | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalTarjetaPagar, setmodalTarjetaPagar] = useState(false);
  const [modalCuentaDebitarTC, setmodalCuentaDebitarTC] = useState(false);
  const [modalMonedaPagoTC, setmodalMonedaPagoTC] = useState(false);
  const [modalInfoProgramarPago, setmodalInfoProgramarPago] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(false); // Estado para la opción seleccionada

  const [visibleTextTarjeta, setvisibleTextTarjeta] = useState(0);
  const [visibleTextCuenta, setvisibleTextCuenta] = useState(0);
  const [visibleTextMoneda, setvisibleTextMoneda] = useState('');
  const [visibleTextCambioMoneda, setvisibleTextCambioMoneda] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const [numeroTarjeta, setnumeroTarjeta] = useState('');
  const [numeroCuenta, setnumeroCuenta] = useState();
  const [saldoCuenta, setsaldoCuenta] = useState('');
  const [textCuentaDebitar, settextCuentaDebitar] = useState();
  const [typeCuentaDebitar, settypeCuentaDebitar] = useState();

  const [accionContinuar, setaccionContinuar] = useState(false);
  const [botonHabilitado, setbotonHabilitado] = useState(true);

  //tipos pagos tarjeta crédito
  const [pagoMinimo, setpagoMinimo] = useState('');
  const [pagoContado, setpagoContado] = useState('');
  const [abono, setabono] = useState('');
  const [pagoTotal, setpagoTotal] = useState('');

  const [pagoMinimoNum, setpagoMinimoum] = useState(0);
  const [pagoContadoum, setpagoContadoum] = useState(0);
  const [abonoum, setAbonoNum] = useState('');
  const [pagoTotalum, setpagoTotalum] = useState(0);
  const saldoCuentaNum = parseFloat(saldoCuenta.replace(',', ''));

  const [pagoRealizarSaldo, setpagoRealizarSaldo] = useState(0);

  const obtenerFechaActualGuatemala = (): string => {
    return moment().tz('America/Guatemala').format('DD/MM/YYYY - hh:mm:ss A');
  };
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        const {height} = event.endCoordinates;
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
  function currencyFormatter({value}: {value: number}): string {
    const formatter = new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ', // Código de moneda para Quetzales
      minimumFractionDigits: 2,
    });

    return formatter.format(value);
  }
  useEffect(() => {
    setaccionContinuar(false);
    console.log("GET_TC: ",route.params);
    if (numeroTarjeta !== '') {
      obtenerSaldoCuentas();
    }
    if (route.params && route.params.cuenta) {
      const {cuenta} = route.params;
      console.log('entro')
      if (cuenta.tipo === '2') {
        setvisibleTextTarjeta(cuenta.tipo);
        setnumeroTarjeta(cuenta.numeroCuenta);
      } else if (cuenta.tipo === '1') {
        setvisibleTextCuenta(cuenta.tipo);
        setnumeroCuenta(cuenta.numeroCuenta);
        setsaldoCuenta(cuenta.saldo);
        settextCuentaDebitar(cuenta.title);
        settypeCuentaDebitar(cuenta.type);
      }
    }

    if (route.params && route.params.moneda) {
      const {moneda} = route.params;

      if (moneda === 'Q') {
        setvisibleTextMoneda(moneda);
      } else if (moneda === 'USD') {
        setvisibleTextMoneda(moneda);
        setvisibleTextCambioMoneda(moneda);
      }
    }
  }, [route, numeroTarjeta]);

  useEffect(() => {
    if (numeroTarjeta !== '' && textCuentaDebitar !== ''&& visibleTextMoneda !== '' && (selectOpcionPago! >0)) {
      setOpcionSeleccionada(true);
    }
  }, [numeroTarjeta,textCuentaDebitar,visibleTextMoneda,selectOpcionPago]);

  const obtenerSaldoCuentas = async () => {
    try {
      const idCliente = await AsyncStorage.getItem('clienteId');
      // Llamar a la función para obtener las cuentas cuando el componente se monta
      setModalVisible(true); // Mostrar el modal de carga
      const cuentaSaldo = await methods.getTiposPagosTC(
        idCliente!,
        numeroTarjeta!,
      );
      // Aquí se ha completado la respuesta
      setModalVisible(false);
      const pagoM = currencyFormatter({
        value: cuentaSaldo.data[0].pagosDisponibles[0].pagoMinimo,
      });
      const pagoC = currencyFormatter({
        value: cuentaSaldo.data[0].pagosDisponibles[0].pagoContado,
      });
      const pagoT = currencyFormatter({
        value: cuentaSaldo.data[0].pagosDisponibles[0].pagoTotal,
      });

      setpagoMinimo(pagoM);
      setpagoContado(pagoC);
      setpagoTotal(pagoT);
      setpagoContadoum(cuentaSaldo.data[0].pagosDisponibles[0].pagoContado);
      setpagoMinimoum(cuentaSaldo.data[0].pagosDisponibles[0].pagoMinimo);
      setpagoTotalum(cuentaSaldo.data[0].pagosDisponibles[0].pagoTotal);
      //var saldoDisponible = cuentaSaldo.pagosDisponibles[0].pagoMinimo;
    } catch (error) {
      console.log('Error Comunicacion: ', error);
    }
  };

  // Ejemplo de uso

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const toggleMonth = (item: number) => {
    try {
      // Actualizar el estado de selectOpcionPago solo si el RadioButton seleccionado es diferente al actual
      if (selectOpcionPago !== item) {
        switch (item) {
          case 1:
            setpagoRealizarSaldo(pagoMinimoNum); // Establecer el saldo del pago a realizar para el mes 1
            break;
          case 2:
            setpagoRealizarSaldo(pagoContadoum); // Establecer el saldo del pago a realizar para el mes 2
            break;
          case 3:
            console.log('ABONO',Number(abonoum))
            setpagoRealizarSaldo(Number(abonoum)); // Establecer el saldo del pago a realizar para el mes 3
            break;
          case 4:
            setpagoRealizarSaldo(pagoTotalum); // Establecer el saldo del pago a realizar para el mes 4
            break;
        }

        console.log(item);
        setselectOpcionPago(item);
      }

      // Simular una carga con un tiempo de espera
      setTimeout(() => {
        if (
          route.type === 'Cuenta monetaria' ||
          route.type === 'Cuenta ahorro'
        ) {
        } else if (route.type === 'Tarjeta de Crédito') {
        }
      }, 2000); // Ejemplo: tiempo de espera de 2 segundos
    } catch (error) {
      console.log('error Navigation: ', error);
    }
  };

  const getBono = (text: string) => {
    const num = /^\d*\.?\d*$/.test(text) ? parseFloat(text) : '';
    // Actualizar el estado solo si el texto es un número o está vacío
    setAbonoNum(num.toString());
  };
  const closeModalTarjetaPagar = () => {
    // Cierra el modal
    setmodalTarjetaPagar(false);
  };

  const AbrirModalTarjetaPagar = () => {
    // Abre el modal correspondiente
    setmodalTarjetaPagar(true);
  };
  const closeModalCuentaDeBitar = () => {
    // Cierra el modal
    setmodalCuentaDebitarTC(false);
  };

  const AbrirModalCuentaDeBitar = () => {
    // Abre el modal correspondiente
    setmodalCuentaDebitarTC(true);
  };

  const closemodalMonedaPagoTC = () => {
    // Cierra el modal
    setmodalMonedaPagoTC(false);
  };

  const AbrirmodalMonedaPagoTC = () => {
    // Abre el modal correspondiente
    setmodalMonedaPagoTC(true);
  };

  const closemodalInfoProgramarP = () => {
    // Cierra el modal
    setmodalInfoProgramarPago(false);
  };

  const AbrirmodalInfoProgramarP = () => {
    // Abre el modal correspondiente
    setmodalInfoProgramarPago(true);
  };

  useEffect(() => {
    setpagoRealizarSaldo(Number(abonoum));

  }, [abonoum])
  
  const verAlertaSaldoInsuficiente = () => {
    setaccionContinuar(true);
    //navigation.navigate('PagosTarjeta', {cuenta: item});
    
    if (saldoCuentaNum > pagoRealizarSaldo) {
      const fechaActual = obtenerFechaActualGuatemala();
      let nuevoPagoRealizarSaldo = pagoRealizarSaldo;
    
      const item = {
        monto: pagoRealizarSaldo,
        cuentaOrigen: textCuentaDebitar,
        numeroTC: numeroTarjeta,
        operacionFecha: fechaActual
      };
      navigation.navigate('ConfirPagosTC', {cuenta: item});
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#262626' }}>
      <MenuOptions navigation={navigation} name="Pagar tarjeta de crédito" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/*SECION DE SELECCIONAR CUENTA Y TARJETA */}

        <View style={[styles.yellowSection, styles.section]}>
          <View style={{padding: 30, top: 20}}>
            <Text style={styles.texto}>Tarjeta a pagar</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.selectOptions}
              onPress={AbrirModalTarjetaPagar}>
              <View
                style={
                  visibleTextTarjeta === 0
                    ? styles.productoOrigenBorde
                    : styles.productoOrigen
                }>
                {visibleTextTarjeta == 0 && (
                  <Icon
                    name="card"
                    size={20}
                    color="white"
                    style={{marginRight: 10}}
                  />
                )}
                {visibleTextTarjeta == 2 && (
                  <Animated.Image
                    source={require('../../assets/images/tarjetaC.png')}
                    style={{marginRight: 20, height: 40, width: 40}}
                  />
                )}

                <View
                  style={{
                    flexDirection: 'column',
                    marginRight: visibleTextTarjeta === 0 ? 150 : 200,
                  }}>
                  {visibleTextTarjeta == 0 && (
                    <View>
                      <Text style={{color: 'white'}}>
                        Selecciona una tarjeta
                      </Text>
                    </View>
                  )}

                  {visibleTextTarjeta == 2 && (
                    <View>
                      <Text style={styles.numeroTarjeta}>
                        Tarjeta de crédito
                      </Text>
                      <Text style={styles.numeroTarjeta}>
                        No. {numeroTarjeta}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{position: 'absolute', right: 0}}>
                  <Icon
                    name="arrow-down"
                    size={20}
                    color="white"
                    style={{marginRight: 10}}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.linea}></View>
            <Text style={styles.texto}>Cuenta a debitar</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.item}
              onPress={AbrirModalCuentaDeBitar}>
              <View
                style={
                  visibleTextCuenta === 0
                    ? styles.cuentaDestinoBorde
                    : styles.cuentaDestino
                }>
                {visibleTextCuenta == 0 && (
                  <Icon
                    name="card"
                    size={20}
                    color="white"
                    style={{marginRight: 10}}
                  />
                )}
                {typeCuentaDebitar === 'Cuenta monetaria' && (
                  <Animated.Image
                    source={require('../../assets/images/cuentasMonetarias.png')}
                    style={{marginRight: 10}}
                  />
                )}
                {typeCuentaDebitar === 'Cuenta ahorro' && (
                  <Animated.Image
                    source={require('../../assets/images/cuentasAhorro.png')}
                    style={{marginRight: 10}}
                  />
                )}
                <View
                  style={{
                    flexDirection: 'column',
                    marginRight: visibleTextCuenta === 0 ? 150 : 100,
                  }}>
                  {visibleTextCuenta == 0 && (
                    <View>
                      <Text style={{color: 'white'}}>
                        Selecciona una cuenta
                      </Text>
                    </View>
                  )}

                  {visibleTextCuenta == 1 && (
                    <View>
                      <Text style={styles.numeroTarjeta}>
                        {textCuentaDebitar}
                      </Text>
                      <Text style={styles.numeroTarjeta}>Q. {saldoCuenta}</Text>
                    </View>
                  )}
                </View>
                <View style={{position: 'absolute', right: 0}}>
                  <Icon
                    name="arrow-down"
                    size={20}
                    color="white"
                    style={{marginRight: 10}}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View style={{marginVertical: 20}}></View>
            {/*ALERTA DE NO TIENE SUFICIENTE FONDOS */}
            {saldoCuentaNum < pagoRealizarSaldo &&
              accionContinuar &&
              selectOpcionPago! > 0 && (
                <View style={styles.alertaFondoInsuficiente}>
                  <Icon
                    name="information-circle-outline"
                    size={40}
                    color="#fdc305"
                    style={{marginRight: 10}}
                  />

                  <View
                    style={{
                      flexDirection: 'column',
                      marginRight: 100,
                    }}>
                    <View>
                      <Text style={{color: '#333232'}}>
                        La cuenta seleccionada no tiene suficientes fondos
                      </Text>
                    </View>
                  </View>
                </View>
              )}
          </View>
        </View>

        {/*SECCION DE PAGO */}

        <View style={[styles.section, styles.greenSection]}>
          {/*SELECCIONAR MONEDA */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.item}
            onPress={AbrirmodalMonedaPagoTC}>
            <View style={styles.selectMoneda}>
              {visibleTextMoneda === '' && (
                <Text style={{color: 'white', marginRight: 100}}>
                  Selecciona la moneda
                </Text>
              )}

              {visibleTextMoneda != '' && (
                <Text style={{color: 'white', marginRight: 100}}>
                  {visibleTextMoneda}
                </Text>
              )}
              <View style={{flexDirection: 'row-reverse', flex: 1}}>
                <Icon
                  name="arrow-down"
                  size={20}
                  color="white"
                  style={{marginRight: 10}}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.separatorCambioMoneda}></View>
          {visibleTextMoneda == 'USD' && visibleTextCuenta !== 0 && (
            <View style={styles.selectCambioMoneda}>
              <View>
                <Text style={{color: 'white', marginRight: 100}}>
                  <Text style={{fontWeight: 'bold'}}>Tipo de cambio:</Text> 7.89
                </Text>
              </View>
            </View>
          )}
          <View style={styles.separator}></View>

          {/*SELECCIONAR PAGO */}
          <View>
            <View style={styles.selectPago}>
              <Text style={{color: 'white', marginRight: 100}}>
                Selecciona cómo pagar:
              </Text>
            </View>
            <View style={styles.optionContainer}>
  <ScrollView showsVerticalScrollIndicator={false}>
    {meses.map(item => (
      <View key={item.id}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.itemPago}
          onPress={() => toggleMonth(item.id)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value={item.id.toString()}
              status={selectOpcionPago === item.id ? 'checked' : 'unchecked'}
              onPress={() => toggleMonth(item.id)}
              color={selectOpcionPago === item.id ? "#4dbfd6" : "#ffffff"}  // Celeste cuando seleccionado, blanco cuando no
            />
            <Text style={styles.optionText}>{item.nombre}</Text>
          </View>
        </TouchableOpacity>
      </View>
    ))}
  </ScrollView>
</View>

            <View style={styles.separatorCambioMoneda}></View>

            {/*PAGO MINIMO */}

            {selectOpcionPago! === 1 &&  saldoCuentaNum >0 && numeroTarjeta!=='' && visibleTextMoneda!==''&& (
              <View style={styles.selectCambioMoneda}>
                <Icon
                  name="arrow-down"
                  size={20}
                  color="white"
                  style={{marginRight: 10}}
                />
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Valor a pagar:
                  </Text>
                  <Text style={{color: 'white'}}> {pagoMinimo}</Text>
                </View>
              </View>
            )}
            {/*PAGO DE CONTADO */}
            {selectOpcionPago! === 2 &&  saldoCuentaNum >0 && numeroTarjeta!=='' && visibleTextMoneda!==''&& (
              <View style={styles.selectCambioMoneda}>
                <Icon
                  name="arrow-down"
                  size={20}
                  color="white"
                  style={{marginRight: 10}}
                />
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Valor a pagar:
                  </Text>
                  <Text style={{color: 'white'}}> {pagoContado}</Text>
                </View>
              </View>
            )}

            {/*ABONO */}
            {selectOpcionPago === 3 && saldoCuentaNum >0 && numeroTarjeta!=='' && visibleTextMoneda!==''&&(
              <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={abonoum}
                    onChangeText={getBono}
                    placeholder="Ingrese el monto"
                    placeholderTextColor={'#c5bcbc'}
                  />
                </View>
              </View>
            )}

            {/*PAGO TOTAL */}
            {selectOpcionPago! === 4 && saldoCuentaNum >0 && numeroTarjeta!=='' && visibleTextMoneda!==''&&(
              <View style={styles.selectCambioMoneda}>
                <Icon
                  name="arrow-down"
                  size={20}
                  color="white"
                  style={{marginRight: 10}}
                />
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Valor a pagar:
                  </Text>
                  <Text style={{color: 'white'}}> {pagoTotal}</Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.separator}></View>

          {/*SELECCIONAR PROGRAMARPAGO */}

          <View style={styles.sectionProgramarP}>
            <Text style={{color: 'white', marginRight: 100}}>
              Programar pago
            </Text>
            <View style={{flexDirection: 'row-reverse', flex: 1}}>
              <Switch
                trackColor={{false: '#bcbbbb', true: '#50AAA2'}}
                thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={AbrirmodalInfoProgramarP}>
                <Icon
                  name="information-circle-outline"
                  size={30}
                  color="#248381"
                  style={{marginRight: 20}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botón de continuar */}
      {!keyboardShown && opcionSeleccionada&& (
        <View style={styles.formContainer}>
          <TouchableOpacity
            style={{
              ...styles.botonContinuar,
              opacity: 1,
            }}
            activeOpacity={0.8} // Mantén una opacidad de 0.8 independientemente del estado de opcionSeleccionada
            onPress={verAlertaSaldoInsuficiente}
            disabled={!opcionSeleccionada}>
            <Text style={styles.textButton}>Continuar</Text>
          </TouchableOpacity>
        </View>
      )}
      {/*BOTON DESABILITADO */}
      {!keyboardShown && !opcionSeleccionada&&(
        <View style={styles.formContainer}>
          <TouchableOpacity
            style={{
              ...styles.botonContinuar,
              opacity: 0.5 ,
            }}
            activeOpacity={0.8} // Mantén una opacidad de 0.8 independientemente del estado de opcionSeleccionada
            disabled={!opcionSeleccionada}>
            <Text style={styles.textButton}>Continuar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Componente de menú animado */}
      <Animatable.View
        animation={!keyboardShown ? 'fadeIn' : 'fadeOut'}
        duration={100}>
        <MenuComponent navigation={navigation} />
      </Animatable.View>

      <ModalTarjetasPagar
        visible={modalTarjetaPagar}
        onClose={closeModalTarjetaPagar}
        navigation={navigation}
      />
      <ModalDebitarPagoTC
        visible={modalCuentaDebitarTC}
        onClose={closeModalCuentaDeBitar}
        navigation={navigation}
      />
      <ModalMonedaPagoTC
        visible={modalMonedaPagoTC}
        onClose={closemodalMonedaPagoTC}
        navigation={navigation}
      />
      <ModalInfoProgramarPago
        visible={modalInfoProgramarPago}
        onClose={closemodalInfoProgramarP}
        navigation={navigation}
      />
    </SafeAreaView></View>
  );
};

const styles = StyleSheet.create({
  section: {
    minHeight: screenHeight / 2, // Establece la altura de cada sección a la mitad de la altura de la pantalla
  },
  yellowSection: {
    backgroundColor: '#1A1A1A',
    height: 'auto',
  },
  greenSection: {
    backgroundColor: '#262626',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: '#262626',
    paddingLeft: 30,
    paddingRight: 30,
    height: '12%',
  },
  botonContinuar: {
    width: '100%',
    height: 40,
    backgroundColor: '#51AAA2',
    borderRadius: 10,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 40,
  },
  texto: {
    color: '#ffffff',
    fontWeight: 'bold',
    top: -10,
  },
  linea: {
    borderBottomWidth: 5,
    borderBottomColor: 'transparent',
    marginVertical: 40,
    width: '100%',
  },
  productoOrigen: {
    backgroundColor: '#313131',
    width: '100%',
    height: 80,
    paddingLeft: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productoOrigenBorde: {
    backgroundColor: '#313131',
    width: '100%',
    height: 80,
    paddingLeft: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  cuentaDestino: {
    backgroundColor: '#313131',
    width: '100%',
    height: 80,
    paddingLeft: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cuentaDestinoBorde: {
    backgroundColor: '#313131',
    width: '100%',
    height: 80,
    paddingLeft: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  alertaFondoInsuficiente: {
    backgroundColor: '#E2EEEE',
    width: '80%',
    height: 75,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    paddingBottom: 20, // Padding inferior para evitar que el último elemento quede pegado al borde
  },
  selectMoneda: {
    backgroundColor: '#262626',
    width: '100%',
    height: 60,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#555555',
    borderWidth: 1,
  },
  selectCambioMoneda: {
    backgroundColor: '#2E2E2E',
    height: 30,
    padding: 2,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectPago: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  separatorCambioMoneda: {
    height: 30, // Ajusta el tamaño del separador según tus necesidades
  },
  separator: {
    height: 50, // Ajusta el tamaño del separador según tus necesidades
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
  optionText: {
    color: 'white',
    textAlign: 'center',
  },
  selectOptions: {
    height: 50,
    alignItems: 'center',
    top: 15,
  },
  item: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    top: 15,
  },
  itemPago: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginTop: 5,
  },
  sectionProgramarP: {
    backgroundColor: '#383838',
    width: '100%',
    height: 60,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#383838',
    borderWidth: 1,
  },
  numeroTarjeta: {
    color: 'white',
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
    color: 'white',
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: '80%',
  },
});
