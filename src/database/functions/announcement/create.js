import { Alert } from 'react-native';
import firebase from '../../config';

export function create(section, folder, subfolder, data, action, onError = () => {}) {
  // Firebase Database Reference: section/folder/subfolder/ref

  const annid = `${data.user}${Date.now()}`;
  const imagesurl = [];

  if (data.images?.length > 0) {
    data.images.map((item, index, array) => fetch(item.uri)
      .then((file) => file.blob(), () => Alert.alert('Error', 'Error on blob', [{text: 'Ok'}]))
      .then((blob) => firebase.storage()
        .ref(`images/${annid}${index}${item.uri.substring(item.uri.lastIndexOf('.'), item.uri.length)}`)
        .put(blob), (e) => onError(e))
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => imagesurl.push(url))
      .then(() => {
        if (imagesurl.length === array.length) {
          sendToDatabase(
            section,
            folder,
            subfolder,
            { ...data, images: imagesurl },
            annid,
            action,
          );
        }
      }));
  } else {
    sendToDatabase(section, folder, subfolder, data, annid, action);
  }

  function sendToDatabase(sec, fold, sfold, ann, id, act) {
    firebase.database().ref(`${sec}/${fold}/${sfold}/${id}`).set(ann)
      .then(() => {
        act();
        Alert.alert(
          'Sucesso',
          'Seu anúncio foi veiculado ao Saldo Têxtil.',
          [
            {
              text: 'Ok',
            },
          ],
        );
      }, (e) => {
        onError(e)
        Alert.alert(
          'Erro',
          'Obtivemos um erro ao tentar veicular seu anúncio ao Saldo Têxtil.',
          [
            {
              text: 'Ok',
            },
          ],
        );
        return true;
      });
  }
}
