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

// Modal de transferir
export const ModalInfoProgramarPago = ({visible, onClose, navigation}: any) => {
  const [moneda] = useState([
    {id: 1, nombre: 'Q', selected: false},
    {id: 2, nombre: 'USD', selected: false},
  ]);

  useEffect(() => {}, []);

  const navigate = (item: string) => {
    if (item === 'Q') {
      navigation.navigate('PagosTarjeta', {moneda: item});
      console.log(1);
    } else if (item === 'USD') {
      navigation.navigate('PagosTarjeta', {moneda: item});
      console.log(2);
    }
    onClose();
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
          <View style={{top: -50, flexDirection: 'row'}}>
            <Text style={styles.titlePrincipal}>Información</Text>
            <TouchableOpacity
              onPress={() => onClose()}
              style={styles.iconClose}>
              <Icon name="close-circle-outline" size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          {/* CUERPO */}
          <View style={styles.formContainer}>
            {/* <View style={styles.separator}></View> */}
            <View style={styles.optionContainer}>
  <View style={styles.iconContainer}>
    <Icon
      name="information-circle-outline"
      size={100}
      color="#248381"
    />
  </View>
  <View style={{marginTop: 20}}>
    <Text style={styles.title}>Programar pago</Text>
    <Text style={styles.titleSub}>
      Configúralo al finalizar el pago en curso
    </Text>
  </View>
  {/* Botón de continuar */}
  <View style={{...styles.formContainer, justifyContent: 'flex-end'}}>
    <TouchableOpacity
    onPress={() => onClose()}
      style={styles.botonContinuar}
      activeOpacity={0.8}>
      <Text style={styles.textButton}>Aceptar</Text>
    </TouchableOpacity>
  </View>
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

  formContainer: {
    backgroundColor: 'rgba(38, 38, 38, 1)', // Ajusta el color de fondo a tu preferencia
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    height: '45%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    zIndex: 2,
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

  optionText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  titleSub: {
    color: 'white',
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  botonContinuar: {
    width: '100%',
    height: 40,
    backgroundColor: '#51AAA2',
    borderRadius: 10,
    top: 10,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 40,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
});
