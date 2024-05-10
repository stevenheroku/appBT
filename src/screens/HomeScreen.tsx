  import React from 'react';
  import { Button, StyleSheet, Text, View } from 'react-native';
  import { MenuUp } from '../components/Menu/MenuUp';
import { Productos } from '../components/CuentasCliente/Productos';
import { OpcionesApp } from '../components/OpcionesApp';
import { ModalCarga } from '../components/ModalCarga/ModalCarga';

  export const HomeScreen = ({ navigation }:any) => {
    const handlePress = () => {
      // Navegar a la vista deseada con parámetros si es necesario
      navigation.navigate('DetalleCuenta');
    };
      return (
        <View style={styles.opciones}>
        <View style={styles.container}>
          <MenuUp navigation={navigation} />
          <OpcionesApp navigation={navigation}/>
          
          {/**pasar siempre el navigation al componente de las pantallas para poder navegars */}
          
          <Productos navigation={navigation} />
          
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      opciones:{
        flex:1,
        backgroundColor:'#1A1A1A'
      }
    });