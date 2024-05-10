import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  FlatList,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {MenuComponent} from '../../components/Menu/MenuComponent';
import {ModalCarga} from '../../components/ModalCarga/ModalCarga';
import { RadioButton } from 'react-native-paper';

export const ModalMovimientosT = ({ visible, onClose, navigation, route }: any) => {
  const [showLoading, setShowLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [meses] = useState([
    { id: 1, nombre: 'Enero', selected: false },
    { id: 2, nombre: 'Febrero', selected: false },
    { id: 3, nombre: 'Marzo', selected: false },
    { id: 4, nombre: 'Abril', selected: false },
    { id: 5, nombre: 'Mayo', selected: false },
    { id: 6, nombre: 'Junio', selected: false },
  ]);

  const toggleMonth = (item: number) => {
    try {
      setSelectedMonth(selectedMonth === item ? null : item);
      setShowLoading(true); // Mostrar modal de carga
      console.log(item)
      // Simular una carga con un tiempo de espera
      setTimeout(() => {
        setShowLoading(false); // Ocultar modal de carga
        console.log(route.type)
        if(route.type === 'Cuenta monetaria' || route.type === 'Cuenta ahorro')
        {
          //navigation.navigate('DetalleCuenta', { cuenta: item });
          console.log('si entro')
          navigation.navigate('DetalleCuenta', { cuenta: route, filtro: item }); 
        }
        else if(route.type === 'Tarjeta de Crédito'){
          navigation.navigate('DetalleTarjetaC', { cuenta: route, filtro: item }); 
        }
        
        onClose();
      }, 2000); // Ejemplo: tiempo de espera de 2 segundos
    } catch (error) {
      console.log('error Navigation: ', error);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.item} onPress={() => toggleMonth(item.id)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton
          value={item.id.toString()}
          status={selectedMonth === item.id ? 'checked' : 'unchecked'}
          onPress={() => toggleMonth(item.id)}
          color="#4dbfd6"
        />
        <Text style={styles.optionText}>{item.nombre}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => onClose()}>
      <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={() => {}} />
      <View style={styles.overlayContainer}>
        {/* Contenedor de color para el borderRadius */}
        <View style={styles.formContainer}>
          {/* ENCABEZADO */}
          <View style={{ top: -80, flexDirection: 'row' }}>
            <Text style={styles.titlePrincipal}>Filtrar Movimientos</Text>
            <TouchableOpacity onPress={() => onClose()} style={styles.iconClose}>
              <Icon name="close-circle-outline" size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          {/* CUERPO */}
          <View style={styles.formContainer}>
            <Text style={styles.tituloText}>Selecciona el mes a mostrar</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={meses}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <ModalCarga visible={showLoading} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  borderRadiusFiller: {
    backgroundColor: 'rgba(38, 38, 38, 1)', // Ajusta el color de fondo a tu preferencia
  },
  formContainer: {
    backgroundColor: 'rgba(38, 38, 38, 1)', // Ajusta el color de fondo a tu preferencia
    padding: 45,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    zIndex: 1,
  },
  containerFlat: {
    backgroundColor: 'rgba(38, 38, 38, 1)', // Ajusta el color de fondo a tu preferencia
    height: '100%',
    zIndex: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    paddingRight: 20,
  },
  titlePrincipal: {
    color: 'white',
    fontWeight: 'bold',
    left: 25,
    fontSize: 20,
  },
  iconClose: {
    marginLeft: 'auto', // Alinea el icono a la derecha
    alignItems: 'flex-end',
    right: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    height: 90,
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: 'white', // Línea divisoria blanca
  },
  tituloText: {
    color: 'white',
    fontSize: 15,
    top: -70,
    textAlign: 'center',
  },
});
