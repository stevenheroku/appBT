import { createContext, useState } from "react";
import { RegisterData, Usuario } from "../interfaces/Usuario";
import apiRequests from '../api/apiYoloKids';
import { AuthState } from "./authReducer";
const configUrl = require('../datosURL.json');

type CuentasContextProps = {
    errorMessage: string | null;
    token: string | null;
    cuentas: any | null;
    status: 'checking' | 'authenticated' | 'no-authenticated';
    getCuentas: (registerData:RegisterData) => void;
    getCuentas2:() => void;
  };

  const authInitialState: any = {
    status: 'checking',
    token: null,
    cuentas: [],
    errorMessage: '',
  };
  
export const CuentasContext = createContext({} as CuentasContextProps);

export const CuentasProvider = ({ children }:any) => {
    // Estado para almacenar las cuentas bancarias
    const [cuentas, setCuentas] = useState(authInitialState);
  
    // Función para obtener las cuentas bancarias de la API (aquí iría tu lógica de API)
    const getCuentas = async () => {
      try {
        // Lógica para obtener las cuentas de la API
        const cuentasData = await apiRequests.post<any>(configUrl.CuentasDummy,{}); // Aquí reemplaza por tu método para obtener las cuentas
        console.log(cuentasData)
        //setCuentas(cuentasData); // Actualizamos el estado con las cuentas obtenidas
      } catch (error) {
        console.error('Error al obtener las cuentas:', error);
      }
    };

    const getCuentas2 = async () => {
      try {
        const response = await fetch(configUrl.CuentasDummy, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            correo: 'username',
            password: 'password',
            nombre: '',
          }),
        });

        if (response.ok) {
          const cuentasData = await response.json();
          console.log('Cuentas Data:', cuentasData);
          // Actualizar el estado con las cuentas obtenidas
          // setCuentas(cuentasData);
        } else {
          console.error('Error al obtener las cuentas:', response.status);
        }
      } catch (error) {
        console.error('Error al obtener las cuentas:', error);
      }
    };
  
    // Devolvemos el provider con el estado y las funciones
    return (
      <CuentasContext.Provider 
      value={{ 
        ...cuentas, 
      getCuentas ,
      getCuentas2}}>
        {children}
      </CuentasContext.Provider>
    );
  };