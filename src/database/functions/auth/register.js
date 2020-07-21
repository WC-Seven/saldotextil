import { Alert } from 'react-native';
import moment from 'moment';
import firebase from '../../config';

export async function tryRegister(data, setAuthenticatedUser) {
  let createdUser;

  // creating user
  await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then(({ user }) => {
      createdUser = {
        id: user.uid,
      };
    })
    .catch((error) => {
      // Handle errors here
      if (error.code === 'auth/weak-password') {
        Alert.alert(
          'Erro',
          'Sua senha é muito fraca',
          [
            { text: 'Ok' },
          ],
        );
      }
    });

  // setting data
  if (createdUser.id) {
    let newSignIn;
    console.log(`Account type: ${data.type.substring(0, 2)}`);
    // Recebendo dados específicos de pessoa física ou jurídica
    switch (data.type.substring(0, 2)) {
      case 'pj':
        console.log('Pessoa Jurídica');
        newSignIn = {
          andress: data.andress,
          createdAt: moment().format('L'),
          document: {
            cnpj: data.document.cnpj,
          },
          image: 'https://propus.science/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
          name: data.name,
          fantasy: data.fantasy,
          phone: data.phone,
          premium: false,
          type: data.type,
        };
        break;

      default:
        console.log('Pessoa Física');
        newSignIn = {
          andress: data.andress,
          createdAt: moment().format('L'),
          document: {
            cpf: data.document.cpf,
          },
          image: 'https://propus.science/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
          name: data.name,
          phone: data.phone,
          premium: false,
          type: data.type,
        };
        break;
    }

    await firebase.database().ref(`users/${createdUser.id}`).set(newSignIn)
      .then(() => {
        setAuthenticatedUser({ ...newSignIn, id: createdUser.id });
        Alert.alert(
          'Cadastro Realizado!',
          'Seja bem-vindo ao Saldo Têxtil',
          [
            { text: 'Vamos lá' },
          ],
        );
      })
      .catch(() => {
        Alert.alert(
          'Erro',
          'Algo deu errado, por favor, tente novamente em breve',
          [
            {
              text: 'Ok',
            },
          ],
        );
      });
  }
}
