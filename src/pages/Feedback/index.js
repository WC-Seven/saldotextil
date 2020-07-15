import React from 'react';
import { Button, Container, Description, Title } from './styles';

export default function Feedback() {
  return (
    <Container>
      <Title>Relate-nos o que houve</Title>
      <Description autoFocus />
      <Button title="Enviar feedback" action={() => {}} />
    </Container>
  );
}
