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

export default function Head({ item }) {
  const [imagePickerStatus, setImagePickerStatus] = React.useState(false);
  const {
    head, setHead, modal, setModal,
  } = React.useContext(AnnouncementContext);

  React.useEffect(() => {
    if (item) {
      setHead({
        title: item.title,
        type: item.type,
        adstype: item.adstype,
        user: item.user,
        images: item.images.map(uri => ({ uri })),
        description: item.description,
        status: true,
        price: item.price.replace('R$ ', '').substring(0, item.price.indexOf('/')-3),
        createdAt: item.createdAt,
      });
    }
  }, []);

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
          <ModalButton
            color={ head.adstype === '' ? '#aaa' : '#2b7ed7'}
            title={ head.adstype === '' ? "Tipo de Anúncio" : head.adstype === 'selling' ? 'Vendendo' : 'Comprando'}
            onPress={() => setModal({ ...modal, adsTypeModal: true })}
          />
          <ModalButton
            left
            color={ head.type === '' ? '#aaa' : '#2b7ed7'}
            title={ head.type === '' ? "Tipo de Produto" : head.type === 'confeccao' ? 'Confecções' : head.type === 'malha' ? 'Malhas' : 'Outros'}
            onPress={() => setModal({ ...modal, typeModal: true })}
          />
        </HorizontalView>

        <Label title="Título" />
        <TextInput placeholder="Título de exibição" value={head.title} onChangeText={(s) => setHead({ ...head, title: s })} />
      </Container>
    </>
  );
}
