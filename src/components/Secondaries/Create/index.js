import React from 'react';
import { Modal, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
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

              <TextInput
                value={ads.city}
                onChangeText={(s) => setAds({ ...ads, city: s })}
                placeholder="Cidade"
              />

              <Label>Estado</Label>
              <Picker
                style={{ backgroundColor: '#f2f2f2', paddingHorizontal: 10 }}
                selectedValue={ads.state}
                onValueChange={(v) => setAds({ ...ads, state: v })}
              >
                <Picker.Item value="AC" label="Acre" />
                <Picker.Item value="AL" label="Alagoas" />
                <Picker.Item value="AP" label="Amapá" />
                <Picker.Item value="AM" label="Amazonas" />
                <Picker.Item value="BA" label="Bahia" />
                <Picker.Item value="CE" label="Ceará" />
                <Picker.Item value="DF" label="Distrito Federal" />
                <Picker.Item value="ES" label="Espirito Santo" />
                <Picker.Item value="GO" label="Goiás" />
                <Picker.Item value="MA" label="Maranhão" />
                <Picker.Item value="MT" label="Mato Grosso" />
                <Picker.Item value="MS" label="Mato Grosso do Sul" />
                <Picker.Item value="MG" label="Minas Gerais" />
                <Picker.Item value="PA" label="Pará" />
                <Picker.Item value="PB" label="Paraíba" />
                <Picker.Item value="PR" label="Paraná" />
                <Picker.Item value="PE" label="Pernambuco" />
                <Picker.Item value="PI" label="Piauí" />
                <Picker.Item value="RJ" label="Rio de Janeiro" />
                <Picker.Item value="RN" label="Rio Grande do Norte" />
                <Picker.Item value="RS" label="Rio Grande do Sul" />
                <Picker.Item value="RO" label="Rondônia" />
                <Picker.Item value="RR" label="Roraima" />
                <Picker.Item value="SC" label="Santa Catarina" />
                <Picker.Item value="SP" label="São Paulo" />
                <Picker.Item value="SE" label="Sergipe" />
                <Picker.Item value="TO" label="Tocantins" />
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
          </Container>
        )
      }
    </>
  );
}
