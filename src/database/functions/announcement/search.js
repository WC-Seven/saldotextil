import firebase from '../../config';

export function find(action, section, folder, subfolder, child, value) {
  let response;
  let find;

  find = firebase.database().ref(`${section}/${folder}/${subfolder}`)
    .orderByChild(child)
    .startAt(value)
    .endAt(value+"\uf8ff");

  find.on('value', (snapshot) => {
    if (snapshot.val()) {
      const keys = Object.keys(snapshot.val());
      response = Object.values(snapshot.val()).map((item, ind) => ({ ...item, uid: keys[ind] }));
      action(response.reverse());
    } else action([]);
  });
}
