import React from 'react';
import { Container, TextInput } from './styles';

export default function Search({ route }) {
  return (
    <Container>
      <TextInput placeholder={`Pesquise ${route.params.name.toLowerCase()}`} />
    </Container>
  );
}
