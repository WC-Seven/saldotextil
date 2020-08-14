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

async function createUser (data, setAuthenticatedUser, onError) {
  let proced = false;
  let createdUser;

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
      } else if (error.code === 'auth/invalid-email') {
        showError('E-mail inválido');
      }
      onError();
    });

  // setting data
  if (proced) {
    if (createdUser.id) {
      let newSignIn;
      // Recebendo dados específicos de pessoa física ou jurídica
      switch (data.type.substring(0, 2)) {
        case 'pj':
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
            landline: data.landline,
            premium: false,
            type: data.type,
          };
          break;

        default:
          newSignIn = {
            andress: data.andress,
            createdAt: moment().format('L'),
            document: {
              cpf: data.document.cpf,
            },
            image: 'https://firebasestorage.googleapis.com/v0/b/saldo-textil-ef063.appspot.com/o/defaults%2Fprofile.jpg?alt=media&token=5262d2cf-531b-4f9c-858f-ad27598c72ad',
            name: data.name,
            phone: data.phone,
            landline: data.landline,
            premium: false,
            type: data.type,
          };
          break;
      }

      await firebase.database().ref(`users/${createdUser.id}`).set({ ...newSignIn, id: createdUser.id })
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

export async function tryRegister(data, setAuthenticatedUser, onError) {
  if ( data.type.substring(0, 2) === 'pf' ) {
    if (
      data.name !== '' &&
      data.email !== '' &&
      data.password !== '' &&
      data.passwordConfirm !== '' &&
      data.phone !== '' &&
      data.landline !== '' &&
      data.andress.state !== '' &&
      data.andress.city !== '' &&
      data.andress.neighborhood !== '' &&
      data.andress.street !== '' &&
      data.andress.number !== '' &&
      data.andress.cep !== ''
    ) {
      // Verificações específicas encadeadas
      if (data.password.length >= 8) {
        if (data.password === data.passwordConfirm) {
          if (data.andress.state.length === 2) {
  
            // Proceding to creating authentication
            // creating user
            await createUser(data, setAuthenticatedUser, onError);
            
          } else {
            onError();
            showError('A UF deve ter apenas dois caracteres');
          }
        } else {
          onError();
          showError('As senhas não coincidem');
        }
      } else {
        onError();
        showError('A senha deve conter pelo menos 8 digitos.');
      }
      

    } else {
      onError();
      showError('Insira todos os campos obrigatórios.');
    }
  } else if (data.type.substring(0, 2) === 'pj') {
    if (
      data.name !== '',
      data.fantasy !== '',
      data.email !== '' &&
      data.password !== '' &&
      data.passwordConfirm !== '' &&
      data.phone !== '' &&
      data.landline !== '' &&
      data.andress.state !== '' &&
      data.andress.city !== '' &&
      data.andress.neighborhood !== '' &&
      data.andress.street !== '' &&
      data.andress.number !== '' &&
      data.andress.cep !== ''
    ) {
      if (data.password.length >= 8) {
        if (data.password === data.passwordConfirm) {
          if (data.andress.state.length === 2) {
  
            // Proceding to creating authentication
            // creating user
            await createUser(data, setAuthenticatedUser, onError);
            
          } else {
            onError();
            showError('A UF deve ter apenas dois caracteres');
          }
        } else {
          onError();
          showError('As senhas não coincidem');
        }
      } else {
        onError();
        showError('Insira todos os campos obrigatórios.');
      }
    } else {
      onError();
      showError('Insira todos os campos obrigatórios.');
    }
  } else {
    onError();
    showError('Selecione um tipo de registro')
  }
}
