import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useState} from 'react';
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
import { AuthContext } from '../../context/AuthContext';

// Modal de Cierre de Sesión
export const ModalConfirmLogout = ({visible, onClose, navigation}: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const {logOut,errorMessage,removeError} = useContext(AuthContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const cierreSesion = async ()=>{
    try {
      onClose()
      onLogin();
    } catch (error) {
      console.log('Error al guardar las credenciales:', error);
    }
  }
  const onLogin = () => {
    logOut();
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
            <Text style={styles.titlePrincipal}>Cerrar Sesión</Text>
            <TouchableOpacity
              onPress={() => onClose()}
              style={styles.iconClose}>
              <Icon name="close-circle-outline" size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          {/* CUERPO */}
          <View style={styles.formContainer}>
            <View style={styles.cierreSesion}>
            <View style={styles.closeIconContainer}>
              <Icon name="log-out" size={30} color={'white'} />
            </View>
            <View style={styles.buttonSeparator} />
            <Text style={styles.tituloText}>¿Quieres salir de tu App Bantrab?</Text>
            <View style={styles.buttonSeparator} />
              <TouchableOpacity
                style={styles.buttonGuardar}
                activeOpacity={0.8}
                onPress={cierreSesion}
              >
                 <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontWeight:'bold',
                      fontSize:20
                    }}>
                    Aceptar
                  </Text>
              </TouchableOpacity>
            </View>
            
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
    fontSize:20
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
    top: 10,
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
    borderRadius: 100, // Radio del círculo
    padding: 10, // Espaciado dentro del círculo
    alignSelf: 'center',
    top: -80, // Alinear el contenedor en el centro
  },
  cierreSesion:{
    top:50
  },buttonSeparator: {
    height: 10, // Ajusta el ancho del espacio entre los botones
  }
  ,buttonGuardar: {
    backgroundColor: '#17B5B3',
    alignContent: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    top:'100%'
  }

});
