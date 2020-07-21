/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Container, Button, Label, Description, Price, Text,
} from './styles';

import AnnouncementContext from '../context';
import GeneralContext from '../../../../context';
import { verify } from '../Functions/verify';

export default function Footer({ navigation }) {
  // eslint-disable-next-line object-curly-newline
  const { head, body, setIsLoading, setHead } = React.useContext(AnnouncementContext);
  const [exibPrice, setExibPrice] = React.useState('R$ ');
  const { currentUser } = React.useContext(GeneralContext);

  function handlePriceChange(value) {
    if (value.substring(0, 3) !== 'R$ ') {
      if (value.length >= 3) {
        setExibPrice(`R$ ${value.substring(2, value.length)}`);
      } else {
        setExibPrice('R$ 0');
        setHead({ ...head, price: 0 });
      }
    } else {
      setExibPrice(value);
      const price = value.substring(3, value.length);
      setHead({ ...head, price });
    }
  }

  return (
    <Container>
      <Label title="Preço unitário" />
      <Price
        value={exibPrice}
        onChangeText={value => handlePriceChange(value)}
      />

      <Label title="Descrição" />
      <Description
        value={head.description}
        onChangeText={value => setHead({ ...head, description: value })}
      />

      <Label title="Valor total" />
      <Text>
        { !isNaN(head.price) ? `R$ ${(((parseFloat(head.price) || 0) * (parseInt(body.quantity, 10) || 1)).toFixed(2)).replace('.', ',')}` : 'R$ --' }
      </Text>

      <Button
        title="Publicar"
        onPress={() => {
          verify({
            ...head,
            ...body,
            user: currentUser.id,
            userImage: currentUser.image,
            city: currentUser.andress.city,
            state: currentUser.andress.state,
          }, navigation, setIsLoading);
        }}
      />
    </Container>
  );
}
