/* eslint-disable react/prop-types */
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export async function pickImageFromLibrary() {
  const { permissionStatus } = await ImagePicker.requestCameraRollPermissionsAsync();
  if (permissionStatus !== undefined && permissionStatus !== 'granted') {
    Alert.alert('Erro', 'Desculpe, nós precisamos da sua permissão para acessar suas fotos', [{ text: 'Ok' }]);
  } else {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    return response;
  }
  return null;
}

export async function pickImageFromCamera() {
  const { permissionStatus } = await ImagePicker.requestCameraPermissionsAsync();
  if (permissionStatus !== undefined && permissionStatus !== 'granted') {
    Alert.alert('Erro', 'Desculpe, nós precisamos da sua permissão para acessar sua câmera', [{ text: 'Ok' }]);
  } else {
    const response = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    return response;
  }
  return null;
}
