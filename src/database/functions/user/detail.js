import firebase from '../../config';

export function detailUser(id, action) {
  let response = {};

  firebase.database().ref(`users/${id}`)
    .on('value', (snapshot) => {
      while (snapshot === null || snapshot === undefined) {
        response = {};
      }
      response = snapshot.val();
      action(response);
    });
}
