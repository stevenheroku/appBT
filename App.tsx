import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './src/nagivation/AuthStack';
import { AuthProvider } from './src/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
      <NavigationContainer>
        <AuthProvider>
          <AuthStack />
        </AuthProvider>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1 // Asegura que el SafeAreaView se expanda a todo el espacio disponible
  }
});