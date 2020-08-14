import React from 'react';
import { Container, Button, TextInput, Title, Break, LoadingContainer } from './styles';

import GeneralContext from '../../../context';
import { user } from '../../../database/functions';
import { StatusBar } from 'react-native';

export default function UpdateEmail({ navigation  }) {
  const { currentEmail, updateAuthEmail } = React.useContext(GeneralContext);

  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const [data, setData] = React.useState({
    email: currentEmail || '',
    password: '',
    newEmail: '',
  });

  const onSuccess = () => {
    setMessage("E-mail modificado com sucesso");
    updateAuthEmail(data.newEmail);

    setTimeout(() => {
      setMessage("");
      navigation.goBack();
    }, 1500);
  };

  const onPasswordWrong = () => {
    setMessage("Senha incorreta");

    setTimeout(() => {
      setData({ ...data, password: '' });
      setIsLoading(false);
      setMessage("");
    }, 1500);
  };

  const onError = (e) => {
    if (e === 'auth/no-email') {
      setMessage('Insira um novo e-mail.');
    } else if (e.code === 'auth/invalid-email') {
      setMessage('O endereço de E-mail fornecido é inválido.');
    } else if (e.code === 'auth/email-already-in-use') {
      setMessage('Endereço indisponível');
    } else {
      setMessage('Algo deu errado');
    }

    setTimeout(() => {
      setIsLoading(false);
      setMessage("");
    }, 1500);
  };

  return (
    <>
      {
        isLoading ? (
          <>
            <StatusBar backgroundColor="#2b7ed7" barStyle="light-content" />
            <LoadingContainer message={message} />
          </>
        ) : (
          <Container>
            <Title>Confirme seu login</Title>

            <TextInput placeholder="E-mail" value={data.email} onChangeText={value => setData({ ...data, email: value })} editable={false} />
            <TextInput placeholder="Senha" secureTextEntry value={data.password} onChangeText={value => setData({ ...data, password: value })} />

            <Break />

            <Title>Insira seu novo E-mail</Title>
            <TextInput placeholder="Novo E-mail" value={data.newEmail} onChangeText={value => setData({ ...data, newEmail: value })} />

            <Button
              title="Mudar"
              onPress={() => {
                navigation.setOptions({
                  headerShown: false
                });
                setIsLoading(true);
                user.updateEmail(data.email, data.password, data.newEmail, () => onSuccess(), () => onPasswordWrong(), (e) => onError(e) );
              }}
            />
          </Container>
        )
      }
    </>
  );
}
