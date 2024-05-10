const configUrl = require('../datosURL.json');

async function getCuentas2() {
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
        //console.log('Cuentas Data:', cuentasData.payload);
        return cuentasData;
        // Actualizar el estado con las cuentas obtenidas
        // setCuentas(cuentasData.payload);
      } else {
        console.error('Error al obtener las cuentas:', response.status);
        // Retornar un objeto vacío o null en caso de error, dependiendo de tus necesidades
        return null;
      }
    } catch (error) {
      console.error('Error al obtener las cuentas:', error);
      // Retornar un objeto vacío o null en caso de error, dependiendo de tus necesidades
      return null;
    }
  };


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

  
  async function  getCuentasCliente(idCliente:string)  {
    try {
      const response = await fetch(`${configUrl.cuentasCliente}?idCliente=${idCliente}`, {
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
        console.log('Error al obtener las cuentas del cliente:', response.status);
        // Retornar un objeto vacío o null en caso de error, dependiendo de tus necesidades
        return null;
      }
    } catch (error) {
      console.log('Error al obtener las cuentas:', error);
      // Retornar un objeto vacío o null en caso de error, dependiendo de tus necesidades
      return null;
    }
  };

  async function  getTransactionTC  (idCliente:string,noCuenta:string,tipo:string)  {
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


  async function  getTiposPagosTC  (idCliente:string,noCuenta:string)  {
    try {
      const response = await fetch(`${configUrl.tiposPagosTC}?idCliente=${idCliente}&noCuenta=${noCuenta}`, {
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
        console.log('Error al obtener los pagos de la TC:', response.status);
        // Retornar un objeto vacío o null en caso de error, dependiendo de tus necesidades
        return null;
      }
    } catch (error) {
      console.log('Error al obtener los pagos de la TC:', error);
      // Retornar un objeto vacío o null en caso de error, dependiendo de tus necesidades
      return null;
    }
  };
  export const methods = { getCuentas2, getSaldosCuentas, getTransactionTC,getCuentasCliente,getTiposPagosTC };