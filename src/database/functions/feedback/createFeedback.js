import firebase from '../../config';
import { Alert } from 'react-native';

export function createFeedBack(type, data, action) {
  // Feedback type: default, user, announcement
  const id = `${data.sentBy.id}-${Date.now()}`;
  firebase
    .database()
    .ref(`feedback/${type}/${id}`)
    .set(data)
    .then(() => {
      action();
      Alert.alert(
        'Feedback enviado com sucesso',
        'Estamos trabalhando duro para ter um ambiente melhor à todos, sentimos muito pelo ocorrido e agradecemos pela sua contribuição! Quanto antes estaremos analisando seu feedback.',
        [
          { text: 'Ok' }
        ]
      );
    });
}