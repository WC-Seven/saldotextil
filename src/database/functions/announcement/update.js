import { Alert } from 'react-native';
import firebase from '../../config';

export function update(section, folder, subfolder, annid, ann, action) {
  firebase.database().ref(`${section}/${folder}/${subfolder}/${annid}`).set(ann)
    .then(() => {
      Alert.alert(
        'Sucesso',
        'Seu anúncio foi atualizado com sucesso.',
        [
          {
            text: 'Ok',
            onPress: () => action,
          },
        ],
      );
    }, () => {
      Alert.alert(
        'Erro',
        'Obtivemos um erro ao tentar atualizar o seu anúncio.',
        [
          {
            text: 'Ok',
          },
        ],
      );
    });
}
