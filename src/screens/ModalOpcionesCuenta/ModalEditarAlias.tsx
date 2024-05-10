import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {stylesModalEditarAlias} from '../../theme/stylesModalEditar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export const ModalEditarAlias = ({visible, onClose, navigation}: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const [aliasText, setAliasText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [bottomPadding, setBottomPadding] = useState(0);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleGuardarCambios = () => {
    // Implementa la lógica para guardar cambios
  };

  const handleEliminarAlias = () => {
    // Implementa la lógica para eliminar el alias
  };

  const isBotonesDeshabilitados = aliasText.length === 0;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}>
    
        <ScrollView
          contentContainerStyle={stylesModalEditarAlias.scrollContainer}
          keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          style={stylesModalEditarAlias.modalBackground}
          activeOpacity={1}
          onPress={() => {}}></TouchableOpacity>
        <View style={stylesModalEditarAlias.overlayContainer}>
          {/* Contenedor de color para el borderRadius */}
          <View style={stylesModalEditarAlias.formContainer}>
            {/* ENCABEZADO */}
            <View style={{top: -80, flexDirection: 'row'}}>
              <Text style={stylesModalEditarAlias.titlePrincipal}>
                Editar alias
              </Text>
              <TouchableOpacity
                onPress={() => onClose()}
                style={stylesModalEditarAlias.iconClose}>
                <Icon name="close-circle-outline" size={30} color={'white'} />
              </TouchableOpacity>
            </View>
            {/* CUERPO */}
            <View style={stylesModalEditarAlias.formContainer}>
              <View style={stylesModalEditarAlias.closeIconContainer}>
                <Icon name="close-circle-outline" size={30} color={'white'} />
              </View>
              <Text style={stylesModalEditarAlias.tituloText}>
                Escribe un alias para identificar fácilmente tu producto. Este
                nombre se mostrará en cada operación que realices.
              </Text>
              <View>
                <TextInput
                  style={stylesModalEditarAlias.input}
                  placeholder="Alias"
                  placeholderTextColor="#ffffff"
                  onChangeText={text => setAliasText(text)}
                />
              </View>
              <View style={stylesModalEditarAlias.button}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    stylesModalEditarAlias.buttonGuardar,
                    {opacity: isBotonesDeshabilitados ? 0.6 : 1},
                  ]}
                  onPress={handleGuardarCambios}
                  disabled={isBotonesDeshabilitados}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    Guardar cambios
                  </Text>
                </TouchableOpacity>
                <View style={stylesModalEditarAlias.buttonSeparator} />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    stylesModalEditarAlias.buttonEliminar,
                    {opacity: isBotonesDeshabilitados ? 0.6 : 1},
                  ]}
                  onPress={handleEliminarAlias}
                  disabled={isBotonesDeshabilitados}>
                  <Text
                    style={{
                      color: isBotonesDeshabilitados ? '#C0C0C0' : '#17B5B3',
                      textAlign: 'center',
                    }}>
                    Eliminar alias
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        </ScrollView>
        <KeyboardSpacer
          onToggle={visible => {
            setKeyboardHeight(visible ? keyboardHeight : 0);
          }}
          style={[stylesModalEditarAlias.keyboardSpacer, {height: keyboardHeight}]}
        />
    </Modal>
  );
};
