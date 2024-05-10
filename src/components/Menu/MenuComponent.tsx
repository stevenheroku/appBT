import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalConfirmLogout } from '../CerrarSesion/ModalConfirmLogout';

export const MenuComponent = ({navigation }: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const [modalEditarAliasVisible, setModalEditarAliasVisible] = useState(false);

  const handlePress2 = () => {
    // Abre el modal correspondiente
    setModalEditarAliasVisible(true);
    setShowMenu(false);
  };

  const closeModalEditarAlias = () => {
    // Cierra el modal
    setModalEditarAliasVisible(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleIconPress = (screen: any) => {
    navigation.navigate(screen);
    toggleMenu();
  };
  
  const modalUpColor = '#ce2020';
  return (
    <View style={{ justifyContent:'flex-end'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showMenu}
        onRequestClose={() => toggleMenu()}>
        <TouchableOpacity
          style={{...styles.modalBackground, opacity: showMenu ? 1 : 0}}
          activeOpacity={1}
          onPressOut={() => setShowMenu(false)}>
          <View style={{...styles.modalContainer, height: '20%'}}>
            <TouchableOpacity
              onPress={() => setShowMenu(false)}
              style={styles.toggleIconBajar}>
              <Icon name="arrow-down-outline" size={30} color={'white'} />
            </TouchableOpacity>
            <View style={styles.linea}></View>
            <View style={styles.iconRow}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => handleIconPress('HomeDrawer')}>
                <Icon name="home-outline" size={30} color={'#818787'} />
                <Text style={styles.textIcono}>Inicio</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.icon}
                onPress={() => handleIconPress('About')}>
                <Icon name="add-circle-outline" size={30} color={'#818787'} />
                <Text style={styles.textIcono}>Solicitar Productos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.icon}
                onPress={handlePress2}>
                <Icon name="log-out" size={30} color={'#FFFFFF'} />
                <Text style={styles.textIconoSalir}>Salir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {(!showMenu) && (
        <View style={styles.overlayContainer}>
        <View style={{...styles.modalContainerUp}}>
        <TouchableOpacity onPress={() => toggleMenu()} style={styles.toggleIconSubir}>
          <Icon name="arrow-up-outline" size={30} color={'white'} />
        </TouchableOpacity>
        </View>
        </View>

      )}
      <ModalConfirmLogout visible={modalEditarAliasVisible} onClose={closeModalEditarAlias} navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383838',
  },
  modalContainerUp: {
    width: '100%',
    height:40,
    top:0,
    left: 0,
    right: 0,
    backgroundColor: '#383838',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  icon: {
    alignItems: 'center',
    top: 20,
  },
  toggleIconBajar: {
    top: -10,
    right: 10,
  },
  toggleIconSubir: {
    alignItems:'center',
    justifyContent:'center',
    flex: 1,
  },
  linea: {
    borderBottomWidth: 0.8, // Puedes ajustar el grosor de la línea
    borderBottomColor: '#3F3F3F', // Puedes ajustar el color de la línea
    width: '80%',
  },
  textIcono: {
    color: '#838584',
  },
  textIconoSalir: {
    color: 'white',
  },
  //agregar estoa  todas las demás vistas para que se posicione abajo si es necesario
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
});
