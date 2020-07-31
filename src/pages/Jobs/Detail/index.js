import React from 'react';
import { Container, Text } from './styles';
import { Image, View, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { Icon } from 'react-native-elements';

export default function DetailJob ({ route }) {
  const { announcement } = route.params;
  const { user } = announcement;

  return (
    <Container>

      <Text bold size={20}>{ announcement.title }</Text>
      <Text>{ `${announcement.city} - ${announcement.state}` }</Text>
      <Text>{ `Tipo de contrato: ${announcement.position}` }</Text>
      <Text>{ `Salário: ${announcement.salary}` }</Text>

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

      <Text style={{ marginTop: 20 }} bold size={20}>Descrição da vaga</Text>
      <Text>{ announcement.description }</Text>

      <Text style={{ marginTop: 20 }} bold size={20}>Requisitos</Text>
      <Text>{ announcement.requirements }</Text>

      <Text style={{ marginTop: 20 }} bold size={20}>Atribuições</Text>
      <Text>{ announcement.assignments }</Text>

    </Container>
  );
}
