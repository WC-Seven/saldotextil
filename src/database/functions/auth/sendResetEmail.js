import firebase from '../../config';

export function sendResetEmail(emailAndress, onSuccess, onError) {
  firebase.auth().sendPasswordResetEmail(emailAndress).then(() => {
    onSuccess();
  }).catch((e) => {
    onError(e.code);
  })
}