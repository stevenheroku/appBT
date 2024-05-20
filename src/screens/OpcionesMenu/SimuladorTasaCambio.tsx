


import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuOptions from '../../components/MenuOpciones/MenuOptions';

export const SimuladorTasaCambio = ({navigation}: any) => {
  const handlePress = () => {
    // Navegar a la vista deseada con parámetros si es necesario
    navigation.openDrawer();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#383838' }}>
        <View style={styles.container}>
        <MenuOptions navigation={navigation} name="Simulador Tasa Cambio" />

        </View>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
    backgroundColor:'#1A1A1A'
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#262626',
    height: 70,
    alignItems: 'center',
  },
  textoPrincipal: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
  },
});
