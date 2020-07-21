import firebase from '../../config';
import { Alert } from 'react-native';

export async function updateUser(user, action, setAuthenticatedUser) {
  await firebase.database().ref(`users/${user.id}`).set(user)
    .then(() => {
      Alert.alert(
        'Sucesso',
        'Informações atualizadas com sucesso',
        [
          { text: 'Ok' },
        ],
      );
      setAuthenticatedUser(user);
      action();
    })
    .catch(() => {
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