import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { HomeScreen } from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { AboutScreen } from '../screens/AboutScreen';
import { DetalleCuenta } from '../screens/DetalleCuenta';

const Tab = createBottomTabNavigator();

export const HomeTab = () => {
    return (
        <Tab.Navigator>
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon  name="information-circle-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="DetalleCuenta"
            component={DetalleCuenta}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon  name="information-circle-outline" color={color} size={size} />
              ),
            }}
          />
          
          
        </Tab.Navigator>
      );
}
