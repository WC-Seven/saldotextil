import firebase from '../../config';

export function createFeedBack(type, data) {
  // Feedback type: default, user, announcement
  const id = `${data.sentBy.id}-${Date.now()}`;

  console.log(id);

  // firebase.database().ref(`feedback/${type}/`)
}