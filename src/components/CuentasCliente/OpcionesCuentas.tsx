import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ModalPagarTarjetas } from '../../screens/ModalOpcionesCuenta/ModalSeleccionPagoTC';
import { ModalTransferir } from '../../screens/ModalOpcionesCuenta/ModalTrasnferir';



const opcionesData = [
  { id: '1', title: 'Transferir', icon: 'swap-horizontal-outline', color: '#1DB4A9', screen: 'Transferir', type: 'modal' },
  { id: '2', title: 'Pagar', icon: 'card-outline', color: '#EF156B', screen: 'PagosTarjeta',type: 'screen'},
  { id: '3', title: 'Ahorro por consumo', icon: 'people-outline', color: '#D5D5D5', screen: 'AhorroPorConsumo',type: 'modal' },
  { id: '4', title: 'Retirar', icon: 'phone-portrait-outline', color: '#EBD54C', screen: 'Retirar',type: 'modal'  },
  { id: '5', title: 'Tarjeta de débito', icon: 'card-outline', color: '#AE3165', screen: 'TarjetaDebito',type: 'modal'  },
  { id: '6', title: 'Ajustes', icon: 'settings-outline', color: '#34768A', screen: 'Ajustes',type: 'modal'  },
  { id: '7', title: 'Detalle', icon: 'search-outline', color: '#15ACAA', screen: 'Detalle' },
];


const OpcionItem = ({ navigation, title, icon, colores, screen, type,route }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handlePress = () => {
    if (type === 'modal') {
      console.log(screen)
      setModalVisible(true);
      //{renderModal()}
    } else {
      console.log('ss'+route)
      navigation.navigate(screen, {cuenta: route}); // Pasar parámetros si están definidos
      
    }
  };

  const closeModal = () => {
    // Cierra el modal
    setModalVisible(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setModalVisible(false);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} style={styles.opcionItem} onPress={handlePress}>
        <View style={[styles.opcionItemContainer, { backgroundColor: `${colores}40` }]}>
          <View style={styles.iconContainer}>
            <Icon name={icon} size={50} color={colores} style={styles.iconos} />
          </View>
        </View>
        <Text style={styles.opcionText}>{title}</Text>
      </TouchableOpacity>


      {/* Renderizar el modal correspondiente */}
      {type === 'modal' && screen==='ModalPagarTarjetas'&&(
         <ModalPagarTarjetas visible={modalVisible} onClose={closeModal} navigation={navigation}/>
      )}
      {type === 'modal' && screen==='AhorroPorConsumo'&&(
         <ModalPagarTarjetas visible={modalVisible} onClose={closeModal} navigation={navigation}/>
      )}
      {type === 'modal' && screen==='AhorroPorConsumo'&&(
         <ModalPagarTarjetas visible={modalVisible} onClose={closeModal} navigation={navigation}/>
      )}
      {type === 'modal' && screen==='Transferir'&&(
         <ModalTransferir visible={modalVisible} onClose={closeModal} navigation={navigation}/>
      )}
    </View>
  );
};

export const OpcionesCuentas = ({ navigation,route}: any) => {
  useEffect(() => {

    if(route.params !=null || route !=undefined)
    {
      console.log("PARAM: ", route);

    }
  }, [navigation, route]);
 
  return (
    <View style={styles.container}>
      <FlatList
         overScrollMode="never"
         data={opcionesData}
         horizontal
         showsHorizontalScrollIndicator={false}
         keyExtractor={(item) => item.id}
         renderItem={({ item }) => (
          <OpcionItem
          navigation={navigation}
          title={item.title}
          icon={item.icon}
          colores={item.color}
          screen={item.screen}
          type={item.type}
          route={route}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    flexDirection: 'row',
  },
  opcionItem: {
    alignItems: 'center',
    width: 60,
    justifyContent: 'center',
    marginRight: 25,
    marginLeft: 25,
  },
  opcionText: {
    marginTop: 10,
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 11,
    width: 90,
  },
  iconos: {
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  opcionItemContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },iconContainer: {
    backgroundColor: 'transparent', // Ajusta el color de fondo según tus necesidades
    borderRadius: 10,
  },
});
