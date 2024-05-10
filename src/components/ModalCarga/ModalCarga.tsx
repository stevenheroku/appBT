import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, ActivityIndicator, Text, Image, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Modal de transferir
export const ModalCarga = ({ visible }: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const spinValue = new Animated.Value(0);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    if (visible) {
      startSpinAnimation();
    }
  }, [visible]);

  const startSpinAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={() => {}}></TouchableOpacity>
      <View style={styles.overlayContainer}>
        {/* Contenedor de color para el borderRadius */}
        <View style={styles.centeredView}>
          <View style={styles.formContainer}>
            {/* <ActivityIndicator size="large" color="#ffffff" /> */}
            <Animated.Image source={require('../../assets/images/logoBT.png')} style={[styles.image, { transform: [{ rotate: spin }]},{ tintColor: '#FFFFFF' }]} /> 
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(25, 167, 168, 0.9)',
    justifyContent: 'flex-end',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 20,
    width: '80%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    alignSelf: 'center',
    marginVertical: 100,
  },
  text:{
    color:'#ffffff',
    fontSize:20,
  },
  image: {
    width: 100,
    height: 100,
  },
 
});
