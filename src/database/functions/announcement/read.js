import firebase from '../../config';

export function read(action, section, folder, subfolder, child = '', value = '') {
  let response;
  let find;

  if (child !== '' && value !== '') {
    find = firebase.database().ref(`${section}/${folder}/${subfolder}`).orderByChild(child).equalTo(value);
  } else {
    find = firebase.database().ref(`${section}/${folder}/${subfolder}`);
  }

  find.on('value', (snapshot) => {
    if (snapshot.val()) {
      const keys = Object.keys(snapshot.val());
      response = Object.values(snapshot.val()).map((item, ind) => ({ ...item, uid: keys[ind] }));
      action(response);
    } else response = {};
  });
}
