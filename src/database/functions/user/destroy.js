import firebase from '../../config';
import { Alert } from 'react-native';

export async function destroyUser(userRef, userImage, destroyAuthenticateUser) {
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/saldo-textil-ef063.appspot.com/o/defaults%2Fprofile.jpg?alt=media&token=5262d2cf-531b-4f9c-858f-ad27598c72ad';
  
  if (userImage !== defaultImage && userImage !== null) {
    const userImageRef = firebase.storage().refFromURL(userImage).fullPath;
    firebase.storage().ref(userImageRef).delete().then(() => {
      firebase.auth().currentUser.delete()
        .then(() => {
          firebase.database().ref(`users/${userRef}`).remove().then(() => {
            destroyAuthenticateUser();
          });
        }, () => {
          Alert.alert(
            'Ops, algo deu errado.',
            'Obtivemos um erro ao deletar sua conta, caso este erro persistir, faça login novamente e tente denovo',
            [
              { text: 'Ok' },
            ],
          );
        });
    });
  } else {
    firebase.auth().currentUser.delete()
      .then(() => {
        firebase.database().ref(`users/${userRef}`).remove().then(() => {
          destroyAuthenticateUser();
        });
      }, () => {
        Alert.alert(
          'Ops, algo deu errado.',
          'Obtivemos um erro ao deletar sua conta, caso este erro persistir, faça login novamente e tente denovo',
          [
            { text: 'Ok' },
          ],
        );
      });
  }
}