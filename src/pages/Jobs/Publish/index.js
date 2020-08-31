import React from 'react';
import { Alert, View, Platform, ToastAndroid, StatusBar } from 'react-native';
import { Button, Container, LoadingContainer, TextInput } from './styles';

import * as DocumentPicker from 'expo-document-picker';

import { announcement } from '../../../database/functions';
import GeneralContext from '../../../context';

export default function PublicJob({ navigation }) {
  const { currentUser } = React.useContext(GeneralContext);

  const [isLoading, setIsLoading] = React.useState(false);
  const [cv, setCv] = React.useState({
    user: currentUser.id,
    userImage: currentUser.image,
    city: currentUser.andress.city,
    state: currentUser.andress.state,
    images: [],

    intendedSector: '',
    intendedPosition: '',
    graduation: '',
    intendedSalary: ''
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
                placeholder="Setor pretendido"
                value={cv.intendedSector}
                onChangeText={value => setCv({...cv, intendedSector: value})}
              />
              <TextInput
                placeholder="Cargo pretendido"
                value={cv.intendedPosition}
                onChangeText={value => setCv({...cv, intendedPosition: value})}
              
              />
              <TextInput
                placeholder="Formação"
                value={cv.graduation}
                onChangeText={value => setCv({...cv, graduation: value})}
              
              />
              <TextInput
                placeholder="Salário pretendido"
                value={cv.intendedSalary}
                onChangeText={value => setCv({...cv, intendedSalary: value})}
              />
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Button
                  onPress={() => {
                    if (
                      cv.images[0] &&
                      cv.intendedSector !== '' &&
                      cv.intendedPosition !== '' &&
                      cv.graduation !== '' &&
                      cv.intendedSalary !== ''
                    ) {
                      onLoading();
                      announcement.create('secondaryAnnouncements', 'jobs', 'cv', cv, () => onSuccess(), (e) => onError(e));
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
