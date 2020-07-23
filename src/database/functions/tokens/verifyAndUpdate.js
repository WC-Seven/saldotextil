import firebase from '../../config';

export function verifyAndUpdate (token) {
  const ref = firebase.database().ref("tokens").orderByChild('token').equalTo(token)
  
  ref.on('value', (snapshot) => {
    if (!snapshot.val()) {
      
      firebase.database().ref(`tokens/${Date.now()}`).set({ token: token })
    }
  });
}