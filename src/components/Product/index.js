import React from 'react';
import { Item } from './styles';


export default function Product({ item, adstype, type }) {
  return (
    <Item data={item.item} type={type} adstype={adstype} />
  )
}
