import { Alert } from 'react-native';
import firebase from '../../config';

export function update(section, folder, subfolder, data, action, onError = () => {}, annid) {
  // Firebase Database Reference: section/folder/subfolder/ref
  const imagesurl = [];

  console.log(data);

  if (data.images.length > 0) {
    data.images.map((item, index, array) => fetch(item.uri)
      .then((file) => file.blob(), () => console.log('Error in blob()'))
      .then((blob) => firebase.storage()
        .ref(`images/${annid}${index}${item.uri.substring(item.uri.lastIndexOf('.'), item.uri.length)}`)
        .put(blob), (e) => onError())
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
          'Seu anúncio foi atualizado com sucesso.',
          [
            {
              text: 'Ok',
            },
          ],
        );
      }, () => {
        onError()
        Alert.alert(
          'Erro',
          'Obtivemos um erro ao tentar atualizar seu anúncio.',
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
