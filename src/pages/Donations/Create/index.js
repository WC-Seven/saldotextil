import React from 'react';
import { Modal, Text, TouchableOpacity, View, StatusBar, Alert, ScrollView, Platform, ToastAndroid } from 'react-native';
import Picker, { PickerItem } from '../../../components/Picker';
import { Checkbox } from 'react-native-paper';
import { 
  Button, Container, ImagePicker, DarkContainer, Window, ListItem, Label, Textarea, TextInput, LoadingContainer,
} from './styles';

import GeneralContext from '../../../context';

import { pickImageFromCamera, pickImageFromLibrary } from '../../../components/ImagePicker';
import { getCitiesByState, getStates } from '../../../utils/locals';
import { announcement } from '../../../database/functions';

export default function CreateDonation({ navigation, route }) {
  const { currentUser } = React.useContext(GeneralContext);
  const [imagePickerStatus, setImagePickerStatus] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [donation, setDonation] = React.useState({
    images: route.params?.item.images ? [{ uri: route.params.item.images[0] }] : [],
    title: route.params?.item.title ?? '',
    productDescription: route.params?.item.productDescription ?? '',
    observation: route.params?.item.observation ?? '',
    deliveryOn: !route.params?.item.deliveryOn ?? false,
    
    city: route.params ? route.params.item.city : currentUser.andress.city ?? 'Adamantina',
    state: route.params ? route.params.item.state : currentUser.andress.state ?? 'SP',

    user: currentUser.id,
    userImage: currentUser.image,
    createdAt: new Date().getTime(),
  });


  React.useEffect(() => {
    getStates().then((response) => setStates(response));
  }, []);
  
  React.useEffect(() => {
    getCitiesByState(donation.state).then((response) => setCities(response));
  }, [donation.state]);

  async function getImage(type) {
    if (type === 'camera') {
      const response = await pickImageFromCamera();
      setImagePickerStatus(false);
      if (!response.cancelled) setDonation({ ...donation, images: [{ uri: response.uri }] });
    }
    
    else if (type === 'library') {
      const response = await pickImageFromLibrary();
      setImagePickerStatus(false);
      if (!response.cancelled) setDonation({ ...donation, images: [{ uri: response.uri }] });
    }
  }

  if (isLoading) return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2b7ed7" />
      <LoadingContainer />
    </>
  );

  const onSuccess = () => {
    navigation.goBack();
  }

  const onError = () => {
    navigation.setOptions({ headerShown: true });
    setIsLoading(false);
  }

  const onLoading = () => {
    navigation.setOptions({ headerShown: false });
    setIsLoading(true);
  }

  return (
    <ScrollView>
      <Modal
        animationType="fade"
        transparent
        visible={imagePickerStatus}
        onRequestClose={() => setImagePickerStatus(false)}
      >
        <DarkContainer>
          <StatusBar backgroundColor="rgba(0,0,0,0.6)" barStyle="light-content" />
          <TouchableOpacity style={{flex: 1}} onPress={() => setImagePickerStatus(false)} />
          <Window>
            <ListItem title="Tirar uma foto" onPress={() => getImage('camera')} />
            <ListItem title="Importar da biblioteca" onPress={() => getImage('library')} last />
          </Window>
          <TouchableOpacity style={{flex: 1}} onPress={() => setImagePickerStatus(false)} />
        </DarkContainer>
      </Modal>


      <ImagePicker
        image={donation.images[0] ? donation.images[0].uri : ''}
        onHandlePickImage={() => setImagePickerStatus(true)}
        onHandleRemoveImage={() => {
          Alert.alert(
            'Remover imagem',
            'Tem certeza disso?',
            [
              { text: 'Cancelar' },
              { text: 'Continuar', onPress: () => setDonation({ ...donation, images: [] })}
            ]
          )
        }}
      />
      <Container>

        <TextInput value={donation.title} onChangeText={value => setDonation({...donation, title: value })} placeholder="Produto *" />
        <Textarea value={donation.productDescription} onChangeText={value => setDonation({...donation, productDescription: value })} placeholder="Descrição do produto *" numberOfLines={3} />
        <Textarea value={donation.observation} onChangeText={value => setDonation({...donation, observation: value })} placeholder="Observação" numberOfLines={2} />

        <Label title="Localização *" />
          <Picker
            style={{ height: 50, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 8, paddingHorizontal: 8 }}
            value={donation.state} 
            onValueChange={value => setDonation({...donation, state: value})}
          >
            <PickerItem value="" label="Estado (Selecione)" />
            {
              states.map((item) => (
                <PickerItem value={item.uf} label={item.name} key={item.id} />
              ))
            }
          </Picker>

          <Picker
            style={{ height: 50, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 8, paddingHorizontal: 8 }}
            value={donation.city}
            onValueChange={value => setDonation({...donation, city: value})}
          >
            <PickerItem value="" label={donation.state === '' ? "Selecione um estado" : cities[0] ? "Cidades (selecione)" : "Carregando..."} />
            {
              cities.map((item) => (
                <PickerItem value={item.name} label={item.name} key={item.id} />
              ))
            }
          </Picker>

          <Label title="Retirada no local?" />
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Checkbox
              color="#2b7ed7"
              status={!donation.deliveryOn ? 'checked' : 'unchecked'}
              onPress={() => setDonation({...donation, deliveryOn: !donation.deliveryOn})}
            />
            <Text onPress={() => setDonation({...donation, deliveryOn: !donation.deliveryOn})} style={{marginLeft: 5}}>
              É necessário retirar no local
            </Text>
          </View>
          
          
      </Container>
      <View style={{ backgroundColor: '#fff' }}>
        <Button
          title={ route.params?.item ? "Atualizar" : "Publicar"}
          onPress={() => {
            if (donation.images[0]) {
              if (donation.city !== '' && donation.state !== '') {
                if (donation.title !== '' && donation.productDescription !== '') {
                  onLoading();
                  if (route.params?.item) {
                    announcement.update('secondaryAnnouncements', 'donations', 'ads', donation, () => onSuccess(), (e) => onError(e), route.params.item.uid);
                  } else {
                    announcement.create('secondaryAnnouncements', 'donations', 'ads', donation, () => onSuccess(), (e) => onError(e));
                  }
                } else {
                  showError('Insira as informações obrigatórias.')
                }
              } else {
                showError('Defina a localização.')
              }
            } else {
              showError('É necessário que você adicione uma imagem.')
            }
          }}
        />
      </View>
    </ScrollView>
  );
}

function showError(message) {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  } else {
    Alert.alert(
      'Erro',
      message,
      [{ text: 'Ok' }],
    );
  }
}