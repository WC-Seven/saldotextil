import { Alert } from 'react-native';
import firebase from '../../config';

export async function updatePassword(email, oldPassword, newPassword, navigation, setIsLoading = (bool) => {}) {
  setIsLoading(true);
  firebase.auth().signInWithEmailAndPassword(email, oldPassword).then(() => {
    firebase.auth().currentUser.updatePassword(newPassword).then(() => {
      Alert.alert(
        'Sucesso',
        'Senha modificada com êxito',
        [
          {
            text: 'Ok',
            onPress: () => {
              setIsLoading(false);
              navigation.goBack();
            },
          },
        ],
      );
    }, () => {
      Alert.alert(
        'Erro',
        'Obtivemos um erro ao tentar atualizar sua senha, tente novamente mais tarde.',
        [
          {
            text: 'Ok',
            onPress: () => {
              setIsLoading(false);
              navigation.goBack();
            },
          },
        ],
      );
    });
  }, () => {
    Alert.alert(
      'Erro',
      'Senha incorreta.',
      [
        {
          text: 'Ok',
          onPress: () => {
            setIsLoading(false);
            navigation.goBack();
          },
        },
      ],
    );
  });
}
