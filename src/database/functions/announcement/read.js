import firebase from '../../config';

export function read(action, section, folder, subfolder, child = '', value = '', quantity = 0) {
  let response;
  let find;

  if (child !== '' && value !== '') {
    find = firebase.database().ref(`${section}/${folder}/${subfolder}`).orderByChild('title').limitToLast(2);
  } else {
    find = firebase.database().ref(`${section}/${folder}/${subfolder}`).orderByChild('createdAt').limitToLast(quantity);
  }

  find.on('value', (snapshot) => {
    if (snapshot.val()) {
      const keys = Object.keys(snapshot.val());
      response = Object.values(snapshot.val()).map((item, ind) => ({ ...item, uid: keys[ind] }));
      
      action(response.reverse());
    } else action([]);
  });
}
