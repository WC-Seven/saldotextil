import React from 'react';
import { Picker } from '@react-native-community/picker';
import {
  Container, Window, Button, Label,
} from './styles';

import AnnouncementContext from '../context';

export default function ModalAdsType() {
  const {
    modal, setModal, head, setHead,
  } = React.useContext(AnnouncementContext);

  return (
    <Container>
      <Window>
        <Label title="Selecione o tipo de anúncio" />
        <Picker
          selectedValue={head.adstype}
          onValueChange={value => setHead({ ...head, adstype: value })}
        >
          <Picker.Item value="" label="Tipo de anúncio (selecione)" />
          <Picker.Item value="selling" label="Anúncio de Venda" />
          <Picker.Item value="buying" label="Anúncio de Compra" />
        </Picker>
        <Button title="Fechar" onPress={() => setModal({ ...modal, adsTypeModal: false })} />
      </Window>
    </Container>
  );
}
