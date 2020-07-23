import { Alert } from 'react-native';
import moment from 'moment';
import firebase from '../../config';

function showError(message) {
  Alert.alert(
    'Erro',
    message,
    [
      { text: 'Ok' },
    ],
  );
}

export async function tryRegister(data, setAuthenticatedUser, onError) {
  let proced = false;
  let createdUser;

  // creating user
  await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then(({ user }) => {
      createdUser = {
        id: user.uid,
      };
      proced = true;
    })
    .catch((error) => {
      // Handle errors here
      if (error.code === 'auth/weak-password') {
        showError('Sua senha é muito fraca')
      } else if (error.code === 'auth/email-already-in-use') {
        showError('Este e-mail já está vinculado à outra conta');
      } else {
        console.log(error.code);
      }

      onError();
    });

  // setting data
  if (proced) {
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
            image: 'https://firebasestorage.googleapis.com/v0/b/saldo-textil-ef063.appspot.com/o/defaults%2Fprofile.jpg?alt=media&token=5262d2cf-531b-4f9c-858f-ad27598c72ad',
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
            image: 'https://firebasestorage.googleapis.com/v0/b/saldo-textil-ef063.appspot.com/o/defaults%2Fprofile.jpg?alt=media&token=5262d2cf-531b-4f9c-858f-ad27598c72ad',
            name: data.name,
            phone: data.phone,
            premium: false,
            type: data.type,
          };
          break;
      }
  
      await firebase.database().ref(`users/${createdUser.id}`).set(newSignIn)
        .then(() => {
          setAuthenticatedUser({ ...newSignIn, id: createdUser.id }, data.email);
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
  
}
