import React from 'react';
import { Alert, View, Platform, ToastAndroid, StatusBar, Text } from 'react-native';
import { Button, Container, LoadingContainer, TextInput } from './styles';

import * as DocumentPicker from 'expo-document-picker';

import { announcement } from '../../../database/functions';
import GeneralContext from '../../../context';

export default function PublicAgent({ navigation }) {
  const { currentUser } = React.useContext(GeneralContext);

  const [isLoading, setIsLoading] = React.useState(false);
  const [cv, setCv] = React.useState({
    user: currentUser.id,
    userImage: currentUser.image,
    state: currentUser.andress.state,
    images: [],

    product: '',
    experience: '',
    productExperience: '',
    commission: '',
    observations: ''
  });

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

  const onLoading = () => {
    setIsLoading(true);
    navigation.setOptions({
      headerShown: false,
    });
  }

  const onSuccess = () => {
    navigation.goBack();
  }

  const onError = () => {
    setIsLoading(false);
    Alert.alert('Erro', 'Algo deu errado', [{ text: 'Ok'}]);
    navigation.setOptions({
      headerShown: true,
    });
  }

  return (
    <>
      {
        isLoading ? (
          <>
            <LoadingContainer />
            <StatusBar barStyle="light-content" backgroundColor="#2b7ed7" />        
          </>
        ) : (
          <>
            <Container>
              <Button
                onPress={() => pickDocument()}
                title={ cv.images[0] ? cv.images[0].name : "Anexar currículo" }
              />

              <TextInput
                style={{ marginTop: 20 }}
                placeholder="Produto que pretendo representar"
                value={cv.product}
                onChangeText={value => setCv({...cv, product: value})}
              />
              <TextInput
                placeholder="Experiência na área"
                value={cv.experience}
                onChangeText={value => setCv({...cv, experience: value})}
              
              />
              <TextInput
                placeholder="Produtos já representados"
                value={cv.productExperience}
                onChangeText={value => setCv({...cv, productExperience: value})}
              
              />
              <TextInput
                placeholder="Comissão pretendida"
                value={cv.commission}
                onChangeText={value => setCv({...cv, commission: value})}
              />

              <TextInput
                style={{height: 100, textAlignVertical: 'top'}}
                multiline
                placeholder="Observações"
                value={cv.observations}
                onChangeText={value => setCv({...cv, observations: value})}
              />
              <Text>Estados e cidades que pretende atuar, e demais informações.</Text>

              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Button
                  onPress={() => {
                    if (
                      cv.images[0] &&
                      cv.product !== '' &&
                      cv.experience !== '' &&
                      cv.productExperience !== '' &&
                      cv.commission !== ''
                    ) {
                      onLoading();
                      announcement.create('secondaryAnnouncements', 'agents', 'cv', cv, () => onSuccess(), (e) => onError(e));
                    } else {
                      if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                          'Preencha todos os campos e anexe um currículo',
                          ToastAndroid.SHORT,
                          ToastAndroid.CENTER
                        );
                      } else {
                        Alert.alert(
                          'Erro',
                          'Preencha todos os campos e anexe um currículo',
                          [{ text: 'Ok' }],
                        );
                      }
                    }
                  }}
                  title="Publicar currículo"
                />
              </View>
            </Container>
          </>
        )
      }
    </>
  );
}
