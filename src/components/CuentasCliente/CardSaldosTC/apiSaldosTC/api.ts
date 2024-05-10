const configUrl = require('../../../../datosURL.json');


  async function  getSaldosCuentas(idCliente:string,noCuenta:string,tipo:string)  {
    try {
      const response = await fetch(`${configUrl.saldosCuentasDummy}?idCliente=${idCliente}&noCuenta=${noCuenta}&tipo=${tipo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.ok) {
        const cuentasData = await response.json();
        //console.log('Cuentas Data:', cuentasData.payload);
        return cuentasData;
        // Actualizar el estado con las cuentas obtenidas
        // setCuentas(cuentasData.payload);
      } else {
        console.log('Error al obtener el saldo de la cuenta:', response.status);
        // Retornar un objeto vacío o null en caso de error, dependiendo de tus necesidades
        return null;
      }
    } catch (error) {
      console.log('Error al obtener los saldos:', error);
      // Retornar un objeto vacío o null en caso de error, dependiendo de tus necesidades
      return null;
    }
  };

  async function  getSaldosCuentas2  (idCliente:string,noCuenta:string,tipo:string)  {
    try {
      const response = await fetch(`${configUrl.transactionsTC}?idCliente=${idCliente}&noCuenta=${noCuenta}&tipo=${tipo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.ok) {
        const cuentasData = await response.json();
        console.log('Cuentas Data:', cuentasData);
        return cuentasData;
        // Actualizar el estado con las cuentas obtenidas
        // setCuentas(cuentasData.payload);
      } else {
        console.log('Error al obtener el saldo de la cuenta:', response.status);
        // Retornar un objeto vacío o null en caso de error, dependiendo de tus necesidades
        return null;
      }
    } catch (error) {
      console.log('Error al obtener los saldos:', error);
      // Retornar un objeto vacío o null en caso de error, dependiendo de tus necesidades
      return null;
    }
  };

  export const methods = {  getSaldosCuentas,getSaldosCuentas2  };