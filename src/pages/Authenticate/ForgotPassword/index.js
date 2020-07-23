import React from 'react';
import { Button, Container, TextInput, Text, LoadingContainer } from './styles';

import { auth } from '../../../database/functions';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState('');

  const startLoading = () => {
    setIsLoading(true);
    navigation.setOptions({
      headerShown: false
    });
  }

  const stopLoading = () => {
    setIsError(false);
    setIsLoading(false);
    navigation.setOptions({
      headerShown: true
    });
  }

  const success = () => {
    setIsSuccess(true);
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  }

  const error = (e) => {
    if (e === 'auth/invalid-email') {
      setErrorMessage('Este endereço de e-mail é inválido.');
    } else if (e === 'auth/user-not-found') {
      setErrorMessage('Este endereço de e-mail ainda não foi cadastrado em nossa plataforma.');
    } else {
      setErrorMessage('Algo deu errado, tente novamente mais tarde');
    }
    setIsError(true);
    console.log(e);
    setTimeout(() => {
      stopLoading();
    }, 1500)
  }

  
  return (
    <>
      {
        isLoading ? (
          <LoadingContainer success={isSuccess} error={isError} errorMessage={errorMessage} />
        ) : (
          <Container>
            <Text>
              Para redefinir sua senha precisamos que informe seu e-mail cadastrado no Saldo Têxtil,
              em seguida enviaremos um E-mail de redefinição de senha neste endereço.
            </Text>

            <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={(s) => setEmail(s)}
            />

            <Button title="Enviar E-mail de redefinição" onPress={() => {
              startLoading();
              auth.sendResetEmail(email, () => success(), (e) => error(e))
            }} />
          </Container>
        )
      }
    </>
  );
}