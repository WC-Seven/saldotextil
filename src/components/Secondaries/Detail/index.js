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
        <Text regular size={15}>{ enterprise }</Text>

        <Break size={30} />
        <Text regular size={14}>
          { description }
        </Text>
      </SubContainer>

      <Button title="Aplicar" onPress={() => Linking.openURL(`https://wa.me/${phone}`)} />
    </Container>
  );
}
