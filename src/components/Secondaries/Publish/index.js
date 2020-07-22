import React from 'react'
import { Button, Container, Description, FlexView, Label, PickDocument, LoadingContainer } from './styles';
import { Alert } from 'react-native';

import * as DocumentPicker from 'expo-document-picker';

import { announcement } from '../../../database/functions';
import GeneralContext from '../../../context';

export default function Publish({ navigation, route }) {
  const { currentUser } = React.useContext(GeneralContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cv, setCv] = React.useState({
    user: currentUser.id,
    userImage: currentUser.image,
    state: currentUser.andress.state,
    images: [],
    description: '',
  });

  const folder = route.params.name === 'Empregos' ? 'jobs' : 'agents';

  const pickDocument = () => {
    if (!cv.images[0]) {
      DocumentPicker.getDocumentAsync({}).then(document => {
        if (document.type === 'success') {
          setCv({ ...cv, images: [{ uri: document.uri, name: document.name }]});
        }
      })
    } else {
      Alert.alert(
        'Remover arquivo',
        'Tem certeza disso?',
        [
          { text: 'Não, cancelar' },
          { text: 'Sim', onPress: () => setCv({ ...cv, images: [] }) }
        ]
      )
    }
  }

  return (
    <>
      {
        isLoading ? (
          <LoadingContainer />
        ) : (
          <Container>
            <FlexView>
              <PickDocument
                iconName="paperclip"
                title={ cv.images[0] ? cv.images[0].name : "Anexar documento" }
                onPress={() => pickDocument()}
              />

              <Label>
                Descrição
              </Label>

              <Description value={cv.description} onChangeText={(s) => setCv({ ...cv, description: s }) } />
            </FlexView>
            
            <Button
              title="Publicar"
              onPress={() => {
                if (cv.description === '' || cv.images[0].uri === '') {
                  Alert.alert('Erro', 'É necessário que anexe seu currículo e crie uma descrição', [{ text: 'Ok' }]);
                  return true;
                } else {
                  setIsLoading(true);
                  announcement.create('secondaryAnnouncements', folder, 'cv', cv, () => navigation.goBack(), () => setIsLoading(false))
                }
              }}
            />
          </Container>
        )
      }
    </>
  );
}
