

import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import Icon from 'react-native-vector-icons/Ionicons';
  
  export const Retirar = ({navigation}: any) => {
    const handlePress = () => {
      // Navegar a la vista deseada con parámetros si es necesario
      navigation.openDrawer();
    };
    return (
    
          <View style={styles.container}>
            <View style={styles.menu}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}>
                <Icon name="backspace-outline" size={30} color="#51AAA2" />
              </TouchableOpacity>
              <View>
              </View>
            </View>
            <Text style={styles.textoPrincipal}>Retirar </Text>
          </View>
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
  