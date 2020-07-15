import React from 'react'
import { Button, Container, Description, FlexView, Label, PickDocument } from './styles';

export default function Publish() {
  return (
    <Container>
      <FlexView>
        <PickDocument
          iconName="paperclip"
          title="Anexar documento"
          onPress={() => {}}
        />

        <Label>
          Descrição
        </Label>

        <Description />
      </FlexView>
      
      <Button
        title="Publicar"
        onPress={() => {}}
      />
    </Container>
  );
}
