/* eslint-disable no-nested-ternary */
/* eslint-disable object-curly-newline */
import React from 'react';
import { View, Modal } from 'react-native';

import { Container, HorizontalView, ModalButton, VerticalBreak, DarkContainer, Window, ListItem, Selected, Title, TextInput, Label } from './styles';
import { ImagePickerContainer, Image, Imagepicker, ImageViewer, ImageLabel } from './imagepicker';
import { pickImageFromCamera, pickImageFromLibrary } from '../../../../components/ImagePicker';

import AnnouncementContext from '../context';
import ModalAdsType from '../ModalAdsType';
import ModalType from '../ModalType';

export default function Head() {
  const [imagePickerStatus, setImagePickerStatus] = React.useState(false);
  const {
    head, setHead, modal, setModal,
  } = React.useContext(AnnouncementContext);

  async function getImage(type) {
    if (type === 'camera') {
      const response = await pickImageFromCamera();
      setImagePickerStatus(false);
      if (!response.cancelled) {
        const newId = head.images.length + 1;
        const newItem = { id: newId, uri: response.uri };
        const newArray = [...head.images, newItem];
        setHead({ ...head, images: newArray });
      }
    } else if (type === 'library') {
      const response = await pickImageFromLibrary();
      setImagePickerStatus(false);
      if (!response.cancelled) {
        const newId = head.images.length + 1;
        const newItem = { id: newId, uri: response.uri };
        const newArray = [...head.images, newItem];
        setHead({ ...head, images: newArray });
      }
    }
  }
  return (
    <>
      <Modal animationType="fade" transparent visible={imagePickerStatus}>
        <DarkContainer>
          <Window>
            <ListItem title="Tirar uma foto" onPress={() => getImage('camera')} />
            <ListItem title="Importar da biblioteca" onPress={() => getImage('library')} />
            <ListItem title="Cancelar" onPress={() => setImagePickerStatus(false)} last />
          </Window>
        </DarkContainer>
      </Modal>

      <Modal animationType="fade" transparent visible={modal.typeModal}>
        <ModalType />
      </Modal>

      <Modal animationType="fade" transparent visible={modal.adsTypeModal}>
        <ModalAdsType />
      </Modal>

      <ImagePickerContainer>
        <ImageLabel title="Imagens" />
        <ImageViewer>
          {
            head.images.length < 5 ? (
              <Imagepicker onPress={() => setImagePickerStatus()} />
            ) : <View />
          }
          {
            head.images.map((image, index) => (
              <Image index={index} key={image.uri} source={{ uri: image.uri }} />
            ))
          }
          <VerticalBreak />
        </ImageViewer>
      </ImagePickerContainer>

      <Container>
        <HorizontalView>
          <ModalButton title="Tipo de Produto" onPress={() => setModal({ ...modal, typeModal: true })} />
          <ModalButton left title="Tipo de Anúncio" onPress={() => setModal({ ...modal, adsTypeModal: true })} />
        </HorizontalView>

        <Selected>
          { `${head.adstype ? (head.adstype === 'selling' ? 'Venda' : 'Compra') : 'Selecione um tipo de anúncio'} - ${head.type === 'confeccao' ? 'Confecção' : head.type === 'malha' ? 'Malhas' : 'Outros'}` }
        </Selected>

        <Title title="Especificações" />

        <Label title="Título" />
        <TextInput placeholder="Título de exibição" value={head.title} onChangeText={(s) => setHead({ ...head, title: s })} />
      </Container>
    </>
  );
}
