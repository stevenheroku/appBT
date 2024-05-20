import React from 'react';
import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const DATA = [
  {
    id: '1',
    title: 'Ajustes',
    icono: 'settings-outline',
    type: 'monetaria',
    direction: 'Settigns',
  },
  {
    id: '2',
    title: 'Gestiones',
    icono: 'hand-left-outline',
    type: 'monetaria',
    direction: 'Gestiones',
  },
  {
    id: '3',
    title: 'Solicitar Producto',
    icono: 'add-circle-outline',
    type: 'monetaria',
    direction: 'SolicitarProducto',
  },
  {
    id: '4',
    title: 'Operaciones Programadas',
    icono: 'calendar-outline',
    type: 'monetaria',
    direction: 'OperacionProgramadas',
  },
  {
    id: '5',
    title: 'Ahorro Programado',
    icono: 'cash-outline',
    type: 'monetaria',
    direction: 'AhorroProgramado',
  },
  {
    id: '6',
    title: 'Contacto',
    icono: 'call-outline',
    type: 'monetaria',
    direction: 'Contacto',
  },
  {
    id: '7',
    title: 'Simulador tasa de cambio',
    icono: 'chevron-expand-outline',
    type: 'monetaria',
    direction: 'SimuladorTasaCambio',
  },
  {
    id: '8',
    title: 'Tutoriales',
    icono: 'videocam-outline',
    type: 'monetaria',
    direction: 'Tutoriales',
  }
];

const Item = ({title, type, navigation, direction, icono}: any) => {

  const handlePress = () => {
    // Navegar a la vista deseada con parámetros si es necesario
    navigation.navigate(direction);
  };
  const renderIcon = () => {
    return <Icon name={icono} size={24} color="#ffffff" style={styles.icon} />;

    // Puedes agregar más lógica para otros tipos de cuentas si es necesario
    return null;
  };
  return (
    
    <TouchableOpacity onPress={handlePress} activeOpacity={0.5}>

      <View style={styles.item}>
        
        {/* Agregar el ícono de cuentas al inicio de la lista */}
        {renderIcon()}
        <Text style={styles.title}>{title}</Text>
        <Icon
          name="chevron-forward-outline"
          size={20}
          color="white"
          style={styles.chevronIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

export const MenuButtonItem = ({text, onPress, navigation}: any) => {
  return (


    <View style={styles.formContainer}>

      {DATA.map((item) => (
        <Item
          key={item.id}
          title={item.title}
          type={item.type}
          navigation={navigation}
          icono={item.icono}
          direction={item.direction}
        />
      ))}
    </View>

  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingRight: 15,
    marginBottom:20
  },
  tituloText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: 'white', // Línea divisoria blanca
  },
  title: {
    color: 'white',
    fontSize: 16,
    marginLeft: 20,
  },
  icon: {
    justifyContent: 'flex-end',
  },
  chevronIcon: {
    marginLeft: 'auto', // Establece marginLeft a 'auto' para mover el icono a la derecha
  },
});
