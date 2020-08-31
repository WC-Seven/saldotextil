import React from 'react';
import { Container, Text } from './styles';
import { Alert, Image, View, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { Icon } from 'react-native-elements';

import moment from 'moment';
import 'moment/locale/pt-br';

import GeneralContext from '../../../context';
import { announcement as Actions } from '../../../database/functions';

export default function DetailAgent ({ navigation, route }) {
  const { currentUser } = React.useContext(GeneralContext);
  const { announcement } = route.params;
  const { user } = announcement;

  React.useEffect(() => {
    if (currentUser.id === announcement.user.id) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{ backgroundColor: '#f2f2f2', borderRadius: 4, alignItems: 'center', padding: 5, marginRight: 15, flexDirection: 'row' }}
            onPress={() => {
              Alert.alert(
                'Tem certeza disso?',
                'Essa é uma ação irreversível',
                [
                  { text: 'Cancelar' },
                  { text: 'Sim, tenho certeza', onPress: () => Actions.destroy('secondaryAnnouncements', 'agents', 'ads', [], announcement.uid, () => navigation.goBack())}
                ]
              )
            }}            
          >
            <Text style={{ marginHorizontal: 5, paddingTop: 2 }}>Excluir</Text>
            <Icon name="delete" type="material-community" />
          </TouchableOpacity>
        )
      });
    }
  }, []);


  const date = moment(announcement.createdAt).fromNow();
  return (
    <Container>

      <Text>{ `${announcement.city} - ${announcement.state}` }</Text>
      <Text>{ `Cargo: ${announcement.position}` }</Text>
      <Text muted>{ date }</Text>

      <View style={{
        marginTop: 20,
        flexDirection: 'row',
        borderTopWidth: 0.3,
        borderBottomWidth: 0.3,
        paddingTop: 10,
        paddingBottom: 10,
      }}>
        <Image source={{ uri: user.image }} style={{ height: 60, width: 60, borderRadius: 30 }} />

        <View style={{ marginLeft: 10, flex: 1 }}>
          {
            user.type.substring(0, 2) === 'pf' ? (
              <Text size={18} bold>Contato com { user.name }</Text>
            ) : (
              <Text size={18} bold>Contato com { user.fantasy }</Text>
            )
          }

          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {
              const number = announcement.contactWhatsapp
                .replace(' ', '')
                .replace('(', '')
                .replace(')', '')
                .replace('-', '');

              Linking.openURL(`https://wa.me/+55${number}`)
            }}
          >
            <Icon name="whatsapp" type="material-community" color="#2b7ed7" />
            <Text style={{ color: '#2b7ed7', marginLeft: 5 }}>{ announcement.contactWhatsapp }</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${announcement.contactMailAndress}`)}>
            <Text style={{ color: '#2b7ed7' }}>{ announcement.contactMailAndress }</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ padding: 15, backgroundColor: '#f2f2f2', marginTop: 15, borderRadius: 15 }}>
        <Text bold size={20}>Descrição do Produto</Text>
        <Text>{ announcement.description }</Text>

        <Text style={{ marginTop: 20 }} bold size={20}>Requisitos</Text>
        <Text>{ announcement.requirements }</Text>

        <Text style={{ marginTop: 20 }} bold size={20}>Atribuições</Text>
        <Text>{ announcement.assignments }</Text>

        <Text style={{ marginTop: 20 }} bold size={20}>Comissão</Text>
        <Text>{ announcement.commission }</Text>
      </View>
    </Container>
  );
}
