import { Alert } from 'react-native';
import firebase from '../../config';

export function destroy(section, folder, subfolder, images, annid, action) {
  if (images) {
    images.map((donwloadurl) => {
      const imageRef = firebase.storage().refFromURL(donwloadurl).fullPath;
      firebase.storage().ref(imageRef).delete();
      return null;
    });
  }

  firebase.database().ref(`${section}/${folder}/${subfolder}/${annid}`).remove()
    .then(() => {
      Alert.alert(
        'Sucesso',
        'Anúncio excluído',
        [
          {
            text: 'Ok',
            onPress: action,
          },
        ],
      );
    }, () => {
      Alert.alert(
        'Erro',
        'Obtivemos um erro ao tentar excluir o seu anúncio',
        [
          {
            text: 'Ok',
            onPress: action,
          },
        ],
      );
    });
}
