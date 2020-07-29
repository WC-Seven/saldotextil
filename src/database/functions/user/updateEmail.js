import firebase from '../../config';

export function updateEmail (login, password, newEmail, onSuccess, onPasswordWrong, onError) {
  firebase.auth().signInWithEmailAndPassword(login, password)
    .then(() => {
      if (newEmail !== '') {
        firebase.auth().currentUser.updateEmail(newEmail)
        .then(() => {
          onSuccess();
        })
        .catch((e) => {
          onError(e);
        });
      } else {
        onError('auth/no-email');
      }
      
    })
    .catch(() => {
      onPasswordWrong();
    });
}