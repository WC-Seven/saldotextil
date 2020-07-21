import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Container, HorizontalContainer, Label, Select, Title, TextInput } from './styles';

import AnnouncementContext from '../../../context';

export default function Outros() {
  const { body, setBody } = React.useContext(AnnouncementContext);

  return (
    <Container>
      <Title title="Especificações" />

      <Label title="Título" />
      <TextInput
        placeholder="Título"
        value={body.title}
        onChangeText={value => setBody({ ...body, title: value })}
      />

      <Label title="Quantidade" />
      <HorizontalContainer>
        <TextInput
          value={body.quantity}
          onChangeText={value => setBody({ ...body, quantity: value })}
          placeholder="Ex.: 234"
          keyboardType="number-pad"
        />
        <Select
          selectedValue={body.measure}
          onValueChange={value => setBody({ ...body, measure: value })}
          items={[{ value: '', label: 'Selecione' }, { value: 'unidade', label: 'Unidade' }, { value: 'metro', label: 'Metros' }, { value: 'kg', label: 'Kg' }]}
        />
      </HorizontalContainer>
    </Container>
  );
}
