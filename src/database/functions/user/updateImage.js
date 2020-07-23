import firebase from '../../config';

export async function updateImage(user, uri, setAuthenticatedUser, email) {
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/saldo-textil-ef063.appspot.com/o/defaults%2Fprofile.jpg?alt=media&token=5262d2cf-531b-4f9c-858f-ad27598c72ad';

  if (user.image !== defaultImage && user.image !== null) {
    console.log(user);
    const userImageRef = firebase.storage().refFromURL(user.image).fullPath;
    firebase.storage().ref(userImageRef).delete();
  }

  fetch(uri)
    .then((filesystem) => filesystem.blob())
    .then((file) => firebase
      .storage()
      .ref(`user_profile_image/${user.id}${uri.substring(uri.lastIndexOf('.'), uri.length)}`)
      .put(file))
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      firebase.database().ref(`users/${user.id}`).set({ ...user, image: url }).then(() => {
        setAuthenticatedUser({ ...user, image: url }, email);
      });
    });
}
