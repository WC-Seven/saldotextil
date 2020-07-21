import firebase from '../../config';

export async function updateImage(user, uri, setAuthenticatedUser) {
  if (user.image !== defaultImage && user.image !== null) {
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
        setAuthenticatedUser({ ...user, image: url });
      });
    });
}
