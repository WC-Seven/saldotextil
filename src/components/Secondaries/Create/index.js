import React from 'react'
import { Button, Container, Description, FlexView, Label, PickImage, TextInput } from './styles'

export default function Create() {
  return (
    <Container>
      <FlexView>
        <PickImage />

        <TextInput placeholder="Título" />

        <Label>Descrição</Label>
        <Description />
      </FlexView>
      <Button title="Publicar" onPress={() => {}} />
    </Container>
  );
}
