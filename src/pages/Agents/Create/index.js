import React from 'react';
import { View, Platform, ToastAndroid, Alert, StatusBar } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Container, MaskedInput, LoadingContainer, Textarea, TextInput, Button, Label, Title } from './styles';
import moment from 'moment';
import GeneralContext from '../../../context';
import { getCitiesByState, getStates } from '../../../utils/locals';
import { announcement } from '../../../database/functions';

export default function CreateAgent ({ navigation }) {
  const { currentUser , currentEmail} = React.useContext(GeneralContext);

  const [isLoading, setIsLoading] = React.useState(false);

  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  const [agent, setAgent] = React.useState({
    assignments: '',
    city: currentUser.andress.city,
    contactMailAndress: currentEmail,
    contactWhatsapp: currentUser.phone,
    description: '',
    position: '',
    requirements: '',
    commission: '',
    state: currentUser.andress.state,
    title: '',
    user: currentUser.id,
    userImage: currentUser.image,
    createdAt: moment(),
  });

  React.useEffect(() => {
    getStates().then((response) => {
      setStates(response);
    });
  }, []);

  React.useEffect(() => {
    getCitiesByState(agent.state).then((response) => {
        setCities(response);
      });
  }, [agent.state]);

  const onLoading = () => {
    setIsLoading(true);
    navigation.setOptions({
      headerShown: false,
    });
  }

  const onSuccess = () => {
    navigation.goBack();
  }

  const onError = (error) => {
    setIsLoading(false);
    navigation.setOptions({
      headerShown: true,
    });

    Alert.alert('Erro', 'Ocorreu algum erro ao tentar criar o anúncio', [{ text: 'Ok' }]);
  }

  return (
    isLoading ? (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#2b7ed7" />
        <LoadingContainer />
      </>
    ) : (
      <Container>
        <Title title="Novo anúncio" />
        <Label title="Sobre a representação" />
        <TextInput value={agent.title} onChangeText={value => setAgent({...agent, title: value})} placeholder="Representa qual produto" />
        <TextInput value={agent.position} onChangeText={value => setAgent({...agent, position: value})} placeholder="Cargo" />


        <Label title="Área de atuação" />
        <View style={{ height: 50, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 8, paddingHorizontal: 8 }}>
          <Picker selectedValue={agent.state} onValueChange={value => setAgent({...agent, state: value})}>
            <Picker.Item value="" label="Estado (Selecione)" />
            {
              states.map((item) => (
                <Picker.Item value={item.uf} label={item.name} key={item.id} />
              ))
            }
          </Picker>
        </View>

        <View style={{ height: 50, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 8, paddingHorizontal: 8 }}>
          <Picker selectedValue={agent.city} onValueChange={value => setAgent({...agent, city: value})}>
            <Picker.Item value="" label={agent.state === '' ? "Selecione um estado" : cities[0] ? "Cidades (selecione)" : "Carregando..."} />
            {
              cities.map((item) => (
                <Picker.Item value={item.name} label={item.name} key={item.id} />
              ))
            }
          </Picker>
        </View>

        <Label title="Contato" />
        <TextInput value={agent.contactMailAndress} onChangeText={value => setAgent({...agent, contactMailAndress: value})}  placeholder="E-mail (contato)" />
        <MaskedInput
          value={agent.contactWhatsapp}
          onChangeText={value => setAgent({...agent, contactWhatsapp: value})}
          type="cel-phone"
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) "
          }}
          placeholder="Whatsapp (contato)"
        />


        <Label title="Informações" />
        <Textarea
          value={agent.description}
          onChangeText={value => setAgent({...agent, description: value})}
          multiline
          numberOfLines={3}
          placeholder="Descrição geral do produto a ser representado"
        />

        <Textarea
          value={agent.requirements}
          onChangeText={value => setAgent({...agent, requirements: value})}
          multiline
          numberOfLines={3}
          placeholder="Requisitos necessários do representante"
        />

        <Textarea
          value={agent.assignments}
          onChangeText={value => setAgent({...agent, assignments: value})}
          multiline
          numberOfLines={3}
          placeholder="Atribuições do representante"
        />

        <Textarea
          value={agent.commission}
          onChangeText={value => setAgent({...agent, commission: value})}
          multiline
          numberOfLines={3}
          placeholder="Forma de pagamento da comissão"
        />

        <Button
          title="Anunciar"
          onPress={() => {
            if (
              agent.assignments !== '' &&
              agent.city !== '' &&
              agent.contactMailAndress !== '' &&
              agent.contactWhatsapp !== '' &&
              agent.description !== '' &&
              agent.position !== '' &&
              agent.requirements !== '' &&
              agent.state !== '' &&
              agent.title !== '' &&
              agent.commission !== '' &&
              agent.user === currentUser.id &&
              agent.userImage === currentUser.image
            ) {
              onLoading();
              announcement.create('secondaryAnnouncements', 'agents', 'ads', agent, () => onSuccess(), (e) => onError(e));
            } else {
              if (Platform.OS === 'android') {
                ToastAndroid.showWithGravity(
                  'Preencha todos os campos',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                )
              } else {
                Alert.alert(
                  'Erro',
                  'Preencha todos os campos',
                  [{ text: 'Ok' }],
                );
              }
            }
          }}
        />
        <View style={{ height: 25 }} />
      </Container>
    )
  );
}
