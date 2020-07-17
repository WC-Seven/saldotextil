import React from 'react';
import { Button, Container, TextInput, Title } from './styles';

export default function UpdatePassword() {
  return (
    <Container>
      <TextInput placeholder="Senha atual" />
      <TextInput placeholder="Nova senha" />
      <TextInput placeholder="Repita a nova senha" />

      <Button title="Mudar senha" onPress={() => {}} />
    </Container>
  )
}