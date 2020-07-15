import React from 'react';
import { Item } from './styles';

import { MainContext } from '../../../App';

export default function Product() {
  const { nav } = React.useContext(MainContext);

  return (
    <Item navigation={nav} />
  )
}
