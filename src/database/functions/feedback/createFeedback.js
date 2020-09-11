import firebase from '../../config';
import { Alert } from 'react-native';

export function createFeedBack(type, data, action) {
  // Feedback type: default, user, announcement
  const id = `${Date.now()}-${data.sentBy.id}`;
  firebase
    .database()
    .ref(`feedback/${type}/${id}`)
    .set(data)
    .then(() => {
      action();
      Alert.alert(
        'Feedback enviado com sucesso',
        'Obrigado pelo seu feedback. Vamos analisar e responderemos o mais rápido possível.',
        [
          { text: 'Ok' }
        ]
      );
    });
}