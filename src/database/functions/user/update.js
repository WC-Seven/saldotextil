import firebase from '../../config';
import { Alert } from 'react-native';

export async function updateUser(user, onSuccess, updateAuthUser, onError = () => {}) {
  console.log(user);

  await firebase.database().ref(`users/${user.id}`).set(user)
    .then(() => {
      onSuccess();
      Alert.alert(
        'Sucesso',
        'Informações atualizadas com sucesso',
        [
          { text: 'Ok' },
        ],
      );
      updateAuthUser(user);
    })
    .catch((e) => {
      onError();
      Alert.alert(
        'Erro',
        'Houve um erro ao tentar atualizar as informações',
        [
          { text: 'Ok' },
        ],
      );
      return false;
    });
}