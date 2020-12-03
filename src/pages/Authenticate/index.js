import React from 'react';
import { StatusBar, AsyncStorage, Keyboard, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';

import { BottomContainer, Button, ButtonReverse, Image, Loading, TextInput, TopContainer, Legend } from './styles';

import GeneralContext from '../../context';
import { auth } from '../../database/functions';

export default function Authenticate({ navigation }) {
  const { setAuthUser } = React.useContext(GeneralContext);
  const [isKeyboardShown, setIsKeyboardShown] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [login, setLogin] = React.useState({ email: '', password: '' });

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => setIsKeyboardShown(true);
  const _keyboardDidHide = () => setIsKeyboardShown(false);

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

  if (isLoading) return <Loading />

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={isKeyboardShown? "#fff" : "#2B7ED7"} />
      {
        !isKeyboardShown && (
          <TopContainer>
            <Image source={require('../../../assets/images/logo-light.png')} />
          </TopContainer>
        ) 
      }
      
      <BottomContainer onPress={() => Keyboard.dismiss()}>
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
        <ButtonReverse title="Não tem uma conta? Cadastre-se" onPress={() => navigation.navigate('Register')} />
        <ButtonReverse title="Esqueci minha senha" onPress={() => navigation.navigate('ForgotPassword')} />
      </BottomContainer>
    </KeyboardAvoidingView>
  );
}
