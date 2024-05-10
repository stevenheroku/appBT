import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';

export const captureAndShareView = async (viewRef:any) => {
  try {
    const imageURI = await captureRef(viewRef, {
      format: 'png',
      quality: 1,
    });

    const shareOptions = {
      title: 'Compartir imagen',
      message: 'Pago realizado con éxito',
      url: imageURI, // Utiliza la URI local de la imagen
      failOnCancel: false,
    };

    // Compartir la imagen junto con el mensaje
    await Share.open(shareOptions);

    console.log('Imagen capturada y compartida:', imageURI);
  } catch (error) {
    console.error('Error al capturar y compartir la imagen:', error);
  }
};
