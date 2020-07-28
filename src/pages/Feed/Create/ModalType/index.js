import React from 'react';
import { Picker } from '@react-native-community/picker';
import {
  Container, Window, Button, Label,
} from './styles';

import AnnouncementContext from '../context';

export default function ModalType() {
  const {
    modal, setModal, head, setHead,
  } = React.useContext(AnnouncementContext);

  return (
    <Container>
      <Window>
        <Label title="Selecione um tipo de produto" />
        <Picker
          selectedValue={head.type}
          onValueChange={value => setHead({ ...head, type: value })}
        >
          <Picker.Item value="" label="Tipo de produto (selecione)" />
          <Picker.Item value="confeccao" label="Confecção" />
          <Picker.Item value="malha" label="Malhas" />
          <Picker.Item value="outros" label="Outros" />
        </Picker>

        <Button title="Fechar" onPress={() => setModal({ ...modal, typeModal: false })} />
      </Window>
    </Container>
  );
}
