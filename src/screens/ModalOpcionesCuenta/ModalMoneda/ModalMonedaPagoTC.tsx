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
export const ModalMonedaPagoTC = ({visible, onClose, navigation}: any) => {
  const [moneda] = useState([
    {id: 1, nombre: 'Q', selected: false},
    {id: 2, nombre: 'USD', selected: false},
  ]);

  useEffect(() => {
  
  }, []);

  const navigate =(item:string)=>{

    if(item==='Q')
    {
      navigation.navigate('PagosTarjeta', {moneda: item});
      console.log(1)
    }else if(item==='USD')
    {
      navigation.navigate('PagosTarjeta', {moneda: item});
      console.log(2)

    }
    onClose();
  }

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
            <Text style={styles.titlePrincipal}>Seleccionar moneda</Text>
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
            <Text style={styles.titleSub}>Selecciona la moneda para realizar el pago de tu tarjeta</Text>

              <ScrollView showsVerticalScrollIndicator={false}>
                {moneda.map(item => (
                  <View key={item.id}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.item}
                      onPress={()=>navigate(item.nombre)}
                      >
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        
                        <Text style={styles.optionText}>{item.nombre}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
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
  item: {
    flexDirection: 'row',
    height: 80,
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
  titleSub:{
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign:'center',
    paddingLeft:50,
    paddingRight:50
  },
  optionContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
});
