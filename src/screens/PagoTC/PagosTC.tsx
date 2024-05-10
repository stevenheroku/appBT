import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { MenuUp } from '../../components/Menu/MenuUp';
import { OpcionesApp } from '../../components/OpcionesApp';
import { Productos } from '../../components/CuentasCliente/Productos';

export const PagosTC = ({navigation}:any) => {
    return (
        <View style={styles.opciones}>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#383838' }}>
        <View style={styles.container}>
          
          
          <Productos navigation={navigation} />
          
          </View>
          </SafeAreaView>
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