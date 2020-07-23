import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Container, HorizontalContainer, Label, Select, Title, TextInput } from './styles';

import AnnouncementContext from '../../../context';

export default function Outros({ item }) {
  const { body, setBody } = React.useContext(AnnouncementContext);

  React.useEffect(() => {
    if (item) {
      setBody({
        quantity: item.quantity ? item.quantity.substring(0, item.quantity.indexOf(' ')) : '',
        measure: item.quantity ? item.quantity.substring(item.quantity.indexOf(' ')+1, item.quantity.length).replace('s', '') : '',
      })
    } else {
      setBody({
        quantity: '',
        measure: ''
      })
    }
  }, []);

  return (
    <Container>
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
