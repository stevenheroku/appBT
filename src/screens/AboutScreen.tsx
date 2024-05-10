import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MenuUp} from '../components/Menu/MenuUp';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export const AboutScreen = ({navigation}: any) => {
  const handlePress = () => {
    // Navegar a la vista deseada con parámetros si es necesario
    navigation.navigate('DetalleCuenta');
  };
  return (
    <View style={styles.opciones}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#FECB0E', '#F18A43', '#EF5150']}
          start={{x: 0.5, y: 0}}
          end={{x: 1, y: 0.5}}
          style={styles.container}>
          <MenuUp navigation={navigation} transparente={true}/>
          <View>
            <Text style={styles.title}>Acerca De</Text>
          </View>
          <View style={styles.info}>
            <Icon
              name="information-circle-outline"
              size={30}
              color="#000000"
              style={styles.icono}
            />
            <Text style={styles.texto}>Yolo Kids es una aplicación diseñada para niños, en el cual
            permite llevar el control de su cuentas de ahorros que tenga creada.</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
    justifyContent: 'space-between',
  },
  opciones: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  info: {
    backgroundColor: '#ffffff',
    padding: 40,
    width: '100%',
    height: '70%', // Ajusta según el porcentaje deseado
    marginTop: 'auto',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    top: '150%',
  },
  icono: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
    paddingTop:50,
    color:'#000000',
    alignItems:'stretch',
    fontWeight: 'bold',
  }
});
