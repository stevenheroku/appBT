import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MenuComponent } from '../../components/Menu/MenuComponent';

export const Transferir = ({ navigation }: any) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleIconPress = (screen: any) => {
    navigation.navigate(screen);
    toggleMenu();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleMenu}>
        <Text>Presiona para transferir</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showMenu}
        onRequestClose={() => toggleMenu()}>
        <TouchableOpacity
          style={{ ...styles.modalBackground, opacity: showMenu ? 1 : 0 }}
          activeOpacity={1}
          onPressOut={() => setShowMenu(false)}>
          <View style={{ ...styles.modalContainer, height: '20%' }}>
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
                onPress={() => handleIconPress('OtraPantalla')}>
                <Icon name="log-out" size={30} color={'#FFFFFF'} />
                <Text style={styles.textIconoSalir}>Salir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

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
  toggleIconBajar: {
    top: -10,
    right: 10,
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
  linea: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#3F3F3F',
    width: '80%',
  },
  textIcono: {
    color: '#838584',
  },
  textIconoSalir: {
    color: 'white',
  },
});
