import React from 'react';
import { Modal, Alert } from 'react-native';
import Picker, { PickerItem } from '../../../components/Picker';
import { LoadingContainer, Button, Container, Description, FlexView, SpacedView, Label, PickImage, TextInput, DarkContainer, Window, ListItem, ImagePicked } from './styles';

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
    state: '',
    city: '',
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
                          { text: 'Sim', onPress: () => setAds({ ...ads, images: [{ uri: '' }] }) }
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

              <TextInput
                value={ads.city}
                onChangeText={(s) => setAds({ ...ads, city: s })}
                placeholder="Cidade"
              />

              <Label>Estado</Label>
              <Picker
                style={{ backgroundColor: '#f2f2f2', paddingHorizontal: 10 }}
                value={ads.state}
                onValueChange={(v) => setAds({ ...ads, state: v })}
              >
                <PickerItem value="AC" label="Acre" />
                <PickerItem value="AL" label="Alagoas" />
                <PickerItem value="AP" label="Amapá" />
                <PickerItem value="AM" label="Amazonas" />
                <PickerItem value="BA" label="Bahia" />
                <PickerItem value="CE" label="Ceará" />
                <PickerItem value="DF" label="Distrito Federal" />
                <PickerItem value="ES" label="Espirito Santo" />
                <PickerItem value="GO" label="Goiás" />
                <PickerItem value="MA" label="Maranhão" />
                <PickerItem value="MT" label="Mato Grosso" />
                <PickerItem value="MS" label="Mato Grosso do Sul" />
                <PickerItem value="MG" label="Minas Gerais" />
                <PickerItem value="PA" label="Pará" />
                <PickerItem value="PB" label="Paraíba" />
                <PickerItem value="PR" label="Paraná" />
                <PickerItem value="PE" label="Pernambuco" />
                <PickerItem value="PI" label="Piauí" />
                <PickerItem value="RJ" label="Rio de Janeiro" />
                <PickerItem value="RN" label="Rio Grande do Norte" />
                <PickerItem value="RS" label="Rio Grande do Sul" />
                <PickerItem value="RO" label="Rondônia" />
                <PickerItem value="RR" label="Roraima" />
                <PickerItem value="SC" label="Santa Catarina" />
                <PickerItem value="SP" label="São Paulo" />
                <PickerItem value="SE" label="Sergipe" />
                <PickerItem value="TO" label="Tocantins" />
              </Picker>
      
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
            <SpacedView />
          </Container>
        )
      }
    </>
  );
}
