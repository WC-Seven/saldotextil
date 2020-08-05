import React from 'react';
import { View, Platform, ToastAndroid, Alert, StatusBar, SegmentedControlIOSComponent} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Container, MaskedInput, LoadingContainer, Textarea, TextInput, Button, Label, Title } from './styles';

import GeneralContext from '../../../context';
import { getCitiesByState, getStates } from '../../../utils/locals';
import { announcement } from '../../../database/functions';

export default function CreateJob ({ navigation }) {
  const { currentUser } = React.useContext(GeneralContext);

  const [isLoading, setIsLoading] = React.useState(false);

  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  const [job, setJob] = React.useState({
    assignments: '',
    city: currentUser.andress.city ?? 'Adamantina',
    contactMailAndress: '',
    contactWhatsapp: '',
    description: '',
    position: '',
    requirements: '',
    salary: '',
    state: currentUser.andress.state ?? 'SP',
    title: '',
    user: currentUser.id,
    userImage: currentUser.image,
  });

  React.useEffect(() => {
    const get = async () => {
      await getStates().then((response) => {
        setStates(response);
      });
    }

    get();
  }, []);

  React.useEffect(() => {
    const get = async () => {
      await getCitiesByState(job.state).then((response) => {
        setCities(response);
      });
    }
    
    get();
  }, [job.state]);

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
    console.log(error);

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
        <Label title="Sobre a vaga" />
        <TextInput value={job.title} onChangeText={value => setJob({...job, title: value})} placeholder="Vaga" />
        <TextInput value={job.position} onChangeText={value => setJob({...job, position: value})} placeholder="Tipo de contrato" />


        <Label title="Localização" />
        <View style={{ height: 50, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 8, paddingHorizontal: 8 }}>
          <Picker selectedValue={job.state} onValueChange={value => setJob({...job, state: value})}>
            <Picker.Item value="" label="Estado (Selecione)" />
            {
              states.map((item) => (
                <Picker.Item value={item.uf} label={item.name} key={item.id} />
              ))
            }
          </Picker>
        </View>

        <View style={{ height: 50, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 8, paddingHorizontal: 8 }}>
          <Picker selectedValue={job.city} onValueChange={value => setJob({...job, city: value})}>
            <Picker.Item value="" label={job.state === '' ? "Selecione um estado" : cities[0] ? "Cidades (selecione)" : "Carregando..."} />
            {
              cities.map((item) => (
                <Picker.Item value={item.name} label={item.name} key={item.id} />
              ))
            }
          </Picker>
        </View>

        <Label title="Contato" />
        <TextInput value={job.contactMailAndress} onChangeText={value => setJob({...job, contactMailAndress: value})}  placeholder="E-mail (contato)" />
        <MaskedInput
          value={job.contactWhatsapp}
          onChangeText={value => setJob({...job, contactWhatsapp: value})}
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
          value={job.description}
          onChangeText={value => setJob({...job, description: value})}
          multiline
          numberOfLines={3}
          placeholder="Descrição da vaga"
        />

        <Textarea
          value={job.requirements}
          onChangeText={value => setJob({...job, requirements: value})}
          multiline
          numberOfLines={3}
          placeholder="Requisitos"
        />

          <Textarea
          value={job.assignments}
          onChangeText={value => setJob({...job, assignments: value})}
          multiline
          numberOfLines={3}
          placeholder="Atribuições"
        />

        <TextInput value={job.salary} onChangeText={value => setJob({...job, salary: value})} placeholder="Salário"/>

        <Button
          title="Anunciar"
          onPress={() => {
            if (
              job.assignments !== '' &&
              job.city !== '' &&
              job.contactMailAndress !== '' &&
              job.contactWhatsapp !== '' &&
              job.description !== '' &&
              job.position !== '' &&
              job.requirements !== '' &&
              job.salary !== '' &&
              job.state !== '' &&
              job.title !== '' &&
              job.user === currentUser.id &&
              job.userImage === currentUser.image
            ) {
              onLoading();
              announcement.create('secondaryAnnouncements', 'jobs', 'ads', job, () => onSuccess(), (e) => onError(e));
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
