import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Animated,
  SectionList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {methods} from '../../../api/api';

const Item = ({title,numeroC, type, navigation, item, onClose}: any) => {
  const [showLoading, setShowLoading] = useState(false);

  const handlePress = () => {
    // Navegar a la vista deseada con parámetros si es necesario
    //toggleModal();
    if (type === 'Cuenta monetaria' || type === 'Cuenta ahorro') {
      navigation.navigate('PagosTarjeta', {cuenta: item});
    } else if (type === 'Tarjeta de Crédito') {
      console.log('jajaj',item)

      navigation.navigate('PagosTarjeta', {cuenta: item});
    }
    onClose();
  };

  const renderIcon = () => {
    if (type === 'Cuenta monetaria') {
      return (
        <Animated.Image
          source={require('../../../assets/images/cuentasMonetarias.png')}
          style={[styles.icon]}
        />
      );
    } else if (type === 'Cuenta ahorro') {
      return (
        <Animated.Image
          source={require('../../../assets/images/cuentasAhorro.png')}
          style={[styles.icon]}
        />
      );
    } else if (type === 'Tarjeta de Crédito') {
      return (
        <Icon
          name="card-outline"
          size={24}
          color="#26AEB2"
          style={styles.icon}
        />
      );
    }
    return null;
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.5}>
      <View style={styles.item}>
        {renderIcon()}
        <View>
          <Text style={styles.title}>Tarjeta de crédito</Text>
          <Text style={styles.additionalText}>No. {numeroC}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Modal de transferir
export const ModalTarjetasPagar = ({visible, onClose, navigation}: any) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [isLoading, setisLoading] = useState(true);
  const [cuentasItem, setcuentasItem] = useState<
    {id: string; type: string; title: string; numeroCuenta: any}[]
  >([]);
  const [TarjetasC, setTarjetasC] = useState<
    {id: string; type: string; title: string; numeroCuenta: any}[]
  >([]);

  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    obtenerCuentas();
  }, []);

  const obtenerCuentas = async () => {
    try {
      // Llamar a la función para obtener las cuentas cuando el componente se monta
      const cuentas = await methods.getCuentas2();
      const arrayCuentas = [cuentas];
      // Obtener las listas de cuentas de ahorro y monetarias

      const cuentasTarjetasC =
        arrayCuentas[0]?.payload.find(
          (item: {name: string}) => item.name === 'listUserProdTarjetasC',
        )?.data.values || [];

      // Combinar ambas listas

      const tarjetasC = [...cuentasTarjetasC];
      // Filtrar las cuentas de ahorro y monetaria

      const DATA2 = tarjetasC.map((cuenta, index) => ({
        id: `${index + 1}`,
        type: 'Tarjeta de Crédito',
        title: 'Tarjeta de crédito ' + `${cuenta[1]}`,
        numeroCuenta: cuenta[1],
        tipo: '2',
      }));

      // Actualizar el estado con las cuentas obtenidas
      setTarjetasC(DATA2);

      // Marcar la carga como completa
      setisLoading(false);
    } catch (error) {
      console.error('Error al obtener las cuentas:', error);

      // Marcar la carga como completa con error
      setisLoading(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}>
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={() => {}}></TouchableOpacity>
      <View style={styles.overlayContainer}>
        {/* Contenedor de color para el borderRadius */}
        <View style={styles.formContainer}>
          {/* ENCABEZADO */}
          <View style={{top: -80, flexDirection: 'row'}}>
            <Text style={styles.titlePrincipal}>Selecciona tarjeta a pagar</Text>
            <TouchableOpacity
              onPress={() => onClose()}
              style={styles.iconClose}>
              <Icon name="close-circle-outline" size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          {/* CUERPO */}
          <View style={styles.formContainer}>
            {/* <View style={styles.separator}></View> */}
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={TarjetasC}
              renderItem={({item}) => (
                <Item
                  title={item.title}
                  numeroC={item.numeroCuenta}
                  type={item.type}
                  navigation={navigation}
                  item={item}
                  onClose={onClose}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
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
    padding: 20,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    zIndex: 2,
  },
  title: {
    color: 'white',
    paddingRight: 20,
  },
  titlePrincipal: {
    color: 'white',
    fontWeight: 'bold',
    left: 25,
    top: 5,
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
    height: 90,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: 'white', // Línea divisoria blanca
  },
  icon: {
    marginRight: 30,
  },
  tituloText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    top: -60,
    textAlign: 'center',
  },
  iconoModal: {
    backgroundColor: 'green',
  },
  descripcionContainer: {
    flexDirection: 'row',
    width: '90%', // Ajusta el ancho deseado
  },
  descripcionText: {
    color: 'white',
    fontSize: 14,
    marginTop: 2,
  },
  closeIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Color de fondo del círculo
    borderRadius: 100, // Radio del círculo
    padding: 10, // Espaciado dentro del círculo
    alignSelf: 'center',
    top: -80, // Alinear el contenedor en el centro
  },
  tituloSubText: {
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  additionalText: {
    color: 'white',
    fontSize: 15,
    fontWeight:'bold'
  }
});
