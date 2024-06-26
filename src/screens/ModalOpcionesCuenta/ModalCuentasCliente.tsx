import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MenuComponent} from '../../components/Menu/MenuComponent';

const options = [
  {
    id: 1,
    title: 'A cuentas propias',
    icon: 'arrow-forward-circle-outline',
    descripcion: 'Transfiere dinero entre tus cuentas Bantrab',
  },
  {
    id: 2,
    title: 'A cuentas de terceros',
    icon: 'arrow-forward-circle-outline',
    descripcion: 'Transfiere dinero a cuentas Bantrab de otras personas',
  },
  {
    id: 3,
    title: 'Otros Bancos',
    icon: 'arrow-forward-circle-outline',
    descripcion:
      'Envía dinero a cuentas, tarjetas y préstamos en otros bancos o traer dinero de esas cuentas',
  },
  {
    id: 4,
    title: 'Transferencias móviles',
    icon: 'arrow-forward-circle-outline',
    descripcion: 'Transfiere dinero a número de celular',
  },
];

const Item = ({title, type, navigation, icon, descripcion}: any) => {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.item}>
        <Icon name={icon} size={20} color="white" style={{paddingRight: 20}} />
        {/* Agregar el ícono de cuentas al inicio de la lista */}
        <View style={{flexDirection: 'column', marginLeft: 10}}>
          <Text style={styles.optionText}>{title}</Text>
          <View style={styles.descripcionContainer}>
            <Text style={styles.descripcionText} numberOfLines={4}>
              {descripcion}
            </Text>
          </View>
          
        </View>

        <Icon
          name="chevron-forward-outline"
          size={20}
          color="white"
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

// Modal de transferir
export const ModalCuentasCliente = ({visible, onClose, navigation}: any) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
        onPress={toggleMenu}></TouchableOpacity>
      <View style={styles.overlayContainer}>
        {/* Contenedor de color para el borderRadius */}
        <View style={styles.formContainer}>
          {/* ENCABEZADO */}
          <View style={{top: -80, flexDirection: 'row'}}>
            <Text style={styles.titlePrincipal}>Transferir</Text>
            <TouchableOpacity
              onPress={() => onClose()}
              style={styles.iconClose}>
              <Icon name="close-circle-outline" size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          {/* CUERPO */}
          <View style={styles.formContainer}>
            <View style={styles.closeIconContainer}>
              <Icon name="close-circle-outline" size={30} color={'white'} />
            </View>
            <Text style={styles.tituloText}>
              Selecciona el tipo de transferencia
            </Text>

            <View style={{height: '100%', width: '100%'}}>
              {options.map(item => (
                <Item
                  key={item.id}
                  title={item.title}
                  navigation={navigation}
                  icon={item.icon}
                  descripcion={item.descripcion}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
      <MenuComponent navigation={navigation} customTop="23%" />
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
    height: '80%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    zIndex: 2,
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
    padding: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: 'white', // Línea divisoria blanca
  },
  icon: {
    marginLeft: 'auto',
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
});
