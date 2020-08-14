import firebase from '../../config';

function updateAnnUserImageFromUid(uid, image, section, folder, subfolder) {
  firebase.database().ref(`${section}/${folder}/${subfolder}`).orderByChild('user').equalTo(uid).on('child_added', snapshot => {
    snapshot.ref.update({ userImage: image });
  });
}

export async function deleteImage(user, setAuthenticatedUser, email) {
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/saldo-textil-ef063.appspot.com/o/defaults%2Fprofile.jpg?alt=media&token=5262d2cf-531b-4f9c-858f-ad27598c72ad';
  
  if (user.image !== defaultImage && user.image !== null) {
    const userImageRef = firebase.storage().refFromURL(user.image).fullPath;
    firebase.storage().ref(userImageRef).delete();
  }

  firebase.database().ref(`users/${user.id}`).update({ image: defaultImage }).then(() => {
    setAuthenticatedUser({ ...user, image: defaultImage }, email);
  });

  for (var a = 0; a < 2; a++) {
    if (a === 0) {
      for (let b = 0; b < 2; b++) {
        for (let c = 0; c < 3; c++) {
          updateAnnUserImageFromUid(user.id, defaultImage, `${a === 0 ? 'primaryAnnouncements' : 'secondaryAnnouncements'}`, `${b === 0 ? 'selling' : 'buying'}`, `${c === 0 ? 'confeccao' : c === 1 ? 'malha' : 'outros' }`);
        }
      }
    } else {
      for (let b = 0; b < 3; b++) {
        for (let c = 0; c < 2; c++) {
          updateAnnUserImageFromUid(user.id, defaultImage, `${a === 0 ? 'primaryAnnouncements' : 'secondaryAnnouncements'}`, `${b === 0 ? 'jobs' : b === 1 ? 'donations' : 'agents'}`, `${b === 1 ? '/ads' : `/${ c === 0 ? 'ads' : 'cv'}`}`);
        }
      }
    }
  }
}

export async function updateImage(user, uri, setAuthenticatedUser, email) {
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/saldo-textil-ef063.appspot.com/o/defaults%2Fprofile.jpg?alt=media&token=5262d2cf-531b-4f9c-858f-ad27598c72ad';

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
        setAuthenticatedUser({ ...user, image: url }, email);
      });

      for (var a = 0; a < 2; a++) {
        if (a === 0) {
          for (let b = 0; b < 2; b++) {
            for (let c = 0; c < 3; c++) {
              updateAnnUserImageFromUid(user.id, url, `${a === 0 ? 'primaryAnnouncements' : 'secondaryAnnouncements'}`, `${b === 0 ? 'selling' : 'buying'}`, `${c === 0 ? 'confeccao' : c === 1 ? 'malha' : 'outros' }`);
            }
          }
        } else {
          for (let b = 0; b < 3; b++) {
            for (let c = 0; c < 2; c++) {
              updateAnnUserImageFromUid(user.id, url, `${a === 0 ? 'primaryAnnouncements' : 'secondaryAnnouncements'}`, `${b === 0 ? 'jobs' : b === 1 ? 'donations' : 'agents'}`, `${b === 1 ? '/ads' : `/${ c === 0 ? 'ads' : 'cv'}`}`);
            }
          }
        }
      }
    });
}
