import React from 'react';
import { StatusBar } from 'react-native';

import { BottomContainer, Button, ButtonReverse, Image, TextInput, TopContainer } from './styles';

export default function Authenticate() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2B7ED7" />
      <TopContainer>
        <Image source={require('../../../assets/images/logo-light.png')} />
      </TopContainer>
      <BottomContainer>
        <TextInput placeholder="E-mail" />
        <TextInput placeholder="Senha" />

        <Button title="Entrar" onPress={() => {}} />
        <ButtonReverse title="Não tem uma conta? Cadastre-se" onPress={() => {}} />
      </BottomContainer>
    </>
  );
}
