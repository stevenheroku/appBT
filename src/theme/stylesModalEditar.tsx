import {StyleSheet} from 'react-native';

export const stylesModalEditarAlias = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  borderRadiusFiller: {
    backgroundColor: 'rgba(38, 38, 38, 1)', // Ajusta el color de fondo a tu preferencia
  },
  formContainer: {
    backgroundColor: 'rgba(38, 38, 38, 1)', // Ajusta el color de fondo a tu preferencia
    padding: 45,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    zIndex: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    paddingRight: 20,
  },
  titlePrincipal: {
    color: 'white',
    fontWeight: 'bold',
    left: 25,
    fontSize: 20,
  },
  iconClose: {
    marginLeft: 'auto', // Alinea el icono a la derecha
    alignItems: 'flex-end',
    right: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    height: 90,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: 'white', // Línea divisoria blanca
  },
  icon: {
    marginLeft: 'auto',
  },
  tituloText: {
    color: 'white',
    fontSize: 15,
    top: -70,
    textAlign: 'center',
  },
  iconoModal: {
    backgroundColor: 'green',
  },
  descripcionContainer: {
    flexDirection: 'row',
    width: '90%', // Ajusta el ancho deseado
  },
  descripcionText: {
    color: 'white',
    fontSize: 14,
    marginTop: 2,
  },
  closeIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Color de fondo del círculo
    borderRadius: 100, // Radio del círculo
    padding: 10, // Espaciado dentro del círculo
    alignSelf: 'center',
    top: -80, // Alinear el contenedor en el centro
  },
  input: {
    width: '100%',
    color: '#ffffff',
    height: 40,
    borderColor: '#B1B1B1',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    marginTop: 20, // Espacio entre los botones y el contenido anterior
    marginVertical: 10,
  },
  buttonGuardar: {
    backgroundColor: '#17B5B3',
    alignContent: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
  },
  buttonEliminar: {
    borderColor: '#17B5B3',
    borderWidth: 2,
    height: 40,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonSeparator: {
    height: 10, // Ajusta el ancho del espacio entre los botones
  },
  keyboardAwareContainer: {
    flex: 1,
  },
  keyboardAwareContentContainer: {
    flexGrow: 1,
  },  keyboardSpacer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },scrollContainer: {
    flexGrow: 1,
  }
});
