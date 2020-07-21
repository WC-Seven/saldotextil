import React from 'react';
import { Item } from './styles';

import { useNavigation } from '@react-navigation/native';

export default function Product({ item }) {
  const nav = useNavigation();

  return (
    <Item navigation={nav} data={item.item} />
  )
}
