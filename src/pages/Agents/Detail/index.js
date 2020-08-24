import React from 'react';
import { Container, Text } from './styles';
import { Image, View, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { Icon } from 'react-native-elements';

import moment from 'moment';
import 'moment/locale/pt-br';

export default function DetailAgent ({ route }) {
  const { announcement } = route.params;
  const { user } = announcement;


  const date = moment(announcement.createdAt).fromNow();
  return (
    <Container>

      <Text bold size={20}>{ announcement.title }</Text>
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
