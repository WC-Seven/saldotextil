import React from 'react';
import { Modal, Alert } from 'react-native';
import { LoadingContainer, Button, Container, Description, FlexView, Label, PickImage, TextInput, DarkContainer, Window, ListItem, ImagePicked } from './styles';

import { pickImageFromCamera, pickImageFromLibrary } from '../../ImagePicker';

import GeneralContext from '../../../context';
import { announcement } from '../../../database/functions';

const showError = (message) => {
  Alert.alert(
    'Erro',
    message,
    [{ text: 'Ok' }]
  )
}

export default function Create({ navigation, route }) {
  const { currentUser } = React.useContext(GeneralContext);
  const [imagePickerStatus, setImagePickerStatus] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [ads, setAds] = React.useState({
    images: [{ uri: '' }],
    title: '',
    description: '',
    user: currentUser.id,
    userImage: currentUser.image,
  });

  async function getImage(type) {
    if (type === 'camera') {
      const response = await pickImageFromCamera();
      setImagePickerStatus(false);
      if (!response.cancelled) {
        setAds({ ...ads, images: [{ uri: response.uri }]});
      }
    } else if (type === 'library') {
      const response = await pickImageFromLibrary();
      setImagePickerStatus(false);
      if (!response.cancelled) {
        setAds({ ...ads, images: [{ uri: response.uri }] });
      }
    }
  }

  let section = 'secondaryAnnouncements';
  let folder = route.params.name === 'Doações' ? 'donations' : route.params.name === 'Empregos' ? 'jobs' : 'agents';

  return (
    <>
      {
        isLoading ? (
          <LoadingContainer />
        ) : (
          <Container>
            <Modal animationType="fade" transparent visible={imagePickerStatus}>
              <DarkContainer>
                <Window>
                  <ListItem title="Tirar uma foto" onPress={() => getImage('camera')} />
                  <ListItem title="Importar da biblioteca" onPress={() => getImage('library')} />
                  <ListItem title="Cancelar" onPress={() => setImagePickerStatus(false)} last />
                </Window>
              </DarkContainer>
            </Modal>
      
            <FlexView>
              {
                ads.images[0].uri === '' ? (
                  <PickImage onPress={() => setImagePickerStatus(true)} />
                ) : (
                  <ImagePicked
                    onPress={() => {
                      Alert.alert(
                        'Remover imagem da postagem',
                        'Tem certeza de que deseja fazer isso?',
                        [
                          { text: 'Não, cancelar' },
                          { text: 'Sim', onPress: () => setAds({ ...ads, images: '' }) }
                        ]
                      );
                    }}
                    source={{ uri: ads.images[0].uri }}
                  />
                )
              }
      
              <TextInput
                value={ads.title}
                onChangeText={(s) => setAds({ ...ads, title: s })}
                placeholder="Título"
              />
      
              <Label>Descrição</Label>
              <Description
                value={ads.description}
                onChangeText={(s) => setAds({ ...ads, description: s })}
              />
            </FlexView>
            <Button title="Publicar" onPress={() => {
              if (ads.title === '' || ads.description === '') {
                showError('O anúncio deve conter pelo menos um título e uma descrição');
                return true;
              }
      
              if (ads.images[0].uri === '' && route.params.name !== 'Doações') {
                Alert.alert(
                  'Que tal uma imagem?',
                  'Uma imagem relaciona ao cargo chama atenção de quem procura por vagas, que tal usar uma?',
                  [
                    {
                      text: 'Não', onPress: () => {
                        setIsLoading(true);
                        announcement.create(section, folder, 'ads', {...ads, images: []}, () => navigation.goBack(), () => setIsLoading(false));
                      },
                    },
                    {
                      text: 'Sim, escolher uma imagem', onPress: () => {setImagePickerStatus(true); return true;}
                    }
                  ]
                )
              } else {
                setIsLoading(true);
                announcement.create(section, folder, 'ads', ads, () => navigation.goBack(), () => setIsLoading(false));
              }
            }} />
          </Container>
        )
      }
    </>
  );
}
