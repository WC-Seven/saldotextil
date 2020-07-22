import React from 'react'
import { Container, Image, SubContainer, Text, Break, Button } from './styles'
import { Linking } from 'react-native';

export default function Detail({ route }) {
  const { name, enterprise, image, description, phone } = route.params;

  return (
    <Container>
      <Image source={{ uri: image }} />
      <SubContainer>
        <Text medium size={22}>{ name }</Text>
        <Text regular size={15}>{ enterprise.name }</Text>

        <Break size={30} />
        <Text regular size={14}>
          { description }
        </Text>
      </SubContainer>

      <Button title="Aplicar" onPress={phone !== '' ? () => {
                  let number = phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '').replace('+', '');
                  if (number.substring(0, 2) !== '55') {
                    number = `55${number}`;
                  }
                  
                  Linking.openURL(`https://wa.me/${number}`);
                } : () => {
                  Alert.alert(
                    'Impossível enviar mensagem',
                    'Parece que esta pessoa não tem nenhum número vinculado a conta',
                    [{ text: 'Ok' }]
                  );
                }} />
    </Container>
  );
}
