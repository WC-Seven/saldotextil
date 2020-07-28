import firebase from '../../config';
import { Alert } from 'react-native';

function deleteAnnFromUid(uid, section, folder, subfolder) {
  firebase.database().ref(`${section}/${folder}/${subfolder}`).orderByChild('user').equalTo(uid).on('child_added', snapshot => {
    snapshot.ref.remove();
  });
} 

export function destroyUser (userRef, userImage, destroyAuthenticateUser) {
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/saldo-textil-ef063.appspot.com/o/defaults%2Fprofile.jpg?alt=media&token=5262d2cf-531b-4f9c-858f-ad27598c72ad';
  
  if (userImage !== defaultImage && userImage !== null) {
    const userImageRef = firebase.storage().refFromURL(userImage).fullPath;
    firebase.storage().ref(userImageRef).delete().then(() => {

      for (var a = 0; a < 2; a++) {
        if (a === 0) {
          for (let b = 0; b < 2; b++) {
            for (let c = 0; c < 3; c++) {
              deleteAnnFromUid(userRef, `${a === 0 ? 'primaryAnnouncements' : 'secondaryAnnouncements'}`, `${b === 0 ? 'selling' : 'buying'}`, `${c === 0 ? 'confeccao' : c === 1 ? 'malha' : 'outros' }`);
            }
          }
        } else {
          for (let b = 0; b < 3; b++) {
            for (let c = 0; c < 2; c++) {
              deleteAnnFromUid(userRef, `${a === 0 ? 'primaryAnnouncements' : 'secondaryAnnouncements'}`, `${b === 0 ? 'jobs' : b === 1 ? 'donations' : 'agents'}`, `${b === 1 ? '/ads' : `/${ c === 0 ? 'ads' : 'cv'}`}`);
            }
          }
        }
      }

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
    for (var a = 0; a < 2; a++) {
      if (a === 0) {
        for (let b = 0; b < 2; b++) {
          for (let c = 0; c < 3; c++) {
            deleteAnnFromUid(userRef, `${a === 0 ? 'primaryAnnouncements' : 'secondaryAnnouncements'}`, `${b === 0 ? 'selling' : 'buying'}`, `${c === 0 ? 'confeccao' : c === 1 ? 'malha' : 'outros' }`);
          }
        }
      } else {
        for (let b = 0; b < 3; b++) {
          for (let c = 0; c < 2; c++) {
            deleteAnnFromUid(userRef, `${a === 0 ? 'primaryAnnouncements' : 'secondaryAnnouncements'}`, `${b === 0 ? 'jobs' : b === 1 ? 'donations' : 'agents'}`, `${b === 1 ? '/ads' : `/${ c === 0 ? 'ads' : 'cv'}`}`);
          }
        }
      }
    }

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