import React from 'react';
import { StatusBar, AsyncStorage } from 'react-native';

import { BottomContainer, Button, ButtonReverse, Image, Loading, TextInput, TopContainer, Legend } from './styles';

import GeneralContext from '../../context';
import { auth } from '../../database/functions';

export default function Authenticate() {
  const { setAuthUser } = React.useContext(GeneralContext);

  const [isLoading, setIsLoading] = React.useState(true);
  const [login, setLogin] = React.useState({ email: 'gabrielhvcardoso@gmail.com', password: '12345678' });

  React.useEffect(() => {
    const verify = async () => {
      const user = await AsyncStorage.getItem('@USER');
      const email = await AsyncStorage.getItem('@EMAIL');

      if (user && email !== '') {
        setAuthUser(user, email);
      } else {
        setIsLoading(false);
      }
    }
    verify();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2B7ED7" />
      {
        isLoading ? (
          <Loading />
        ) : (
          <>
            <TopContainer>
              <Image source={require('../../../assets/images/logo-light.png')} />
            </TopContainer>
            <BottomContainer>
              <Legend>Faça login ou registre-se</Legend>
              <TextInput
                value={login.email}
                onChangeText={(s) => setLogin({ ...login, email: s })}
                placeholder="E-mail"
              />

              <TextInput
                secureTextEntry
                value={login.password}
                onChangeText={(s) => setLogin({ ...login, password: s })}
                placeholder="Senha"
              />

              <Button
                title="Entrar"
                onPress={() => {
                  setIsLoading(true);
                  auth.login(
                    login,
                    setAuthUser,
                    () => setIsLoading(false)
                  );
                } } />
              <ButtonReverse title="Não tem uma conta? Cadastre-se" onPress={() => {}} />
            </BottomContainer>
          </>
        )
      }
    </>
  );
}
