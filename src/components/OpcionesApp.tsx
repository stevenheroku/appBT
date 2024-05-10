import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalPagarTarjetas } from '../screens/ModalOpcionesCuenta/ModalSeleccionPagoTC';

const opcionesData = [
  { id: '1', title: 'Transferencias Propias', icon: 'person-outline', color: '#1DB4A9', screen: 'TransferenciasPropias', type: 'screen' },
  { id: '2', title: 'Pagos de Tarjetas', icon: 'card-outline', color: '#EF156B', screen: 'ModalPagarTarjetas', type: 'modal' },
  { id: '3', title: 'Transferencias otras Personas', icon: 'people-outline', color: '#F7C819', screen: 'ModalPagarTarjetas', type: 'modal' },
  { id: '4', title: 'Pagos de Servicios', icon: 'phone-portrait-outline', color: '#17738E', screen: 'TransferenciaMoviles', type: 'screen' },
];

const OpcionItem = ({ navigation, title, icon, colores, screen, type }: any) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handlePress = () => {
    if (type === 'modal') {
      setModalVisible(true);
    } else {
      navigation.navigate(screen);
    }
  };

  const closeModal = () => {
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
      <TouchableOpacity style={styles.opcionItem} onPress={handlePress}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={50} color={colores} style={styles.iconos} />
        </View>
        <Text style={styles.opcionText}>{title}</Text>
      </TouchableOpacity>

      {/* Renderizar el modal correspondiente */}
      {type === 'modal' && screen==='ModalPagarTarjetas'&&(
         <ModalPagarTarjetas visible={modalVisible} onClose={closeModal} navigation={navigation}/>
      )}
    </View>
  );
};

export const OpcionesApp = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <FlatList
        overScrollMode="never"
        data={opcionesData}
        horizontal
        scrollEnabled={false}
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
    width: 90, 
    justifyContent: 'center',
    marginRight: 20, 
    marginLeft:2
  },
  iconContainer: {
    backgroundColor: '#272727',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcionText: {
    marginTop: 10,
    color: 'white',
    textAlign: 'center',
    fontSize: 11,
    width: 90, 
  },
  iconos: {
    backgroundColor: '#272727',
    borderRadius: 10,
    alignContent:'center',
    alignItems:'center',
    justifyContent: 'center',
    padding:5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
