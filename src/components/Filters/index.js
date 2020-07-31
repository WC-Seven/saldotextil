import React from 'react';
import { Container, Button } from './styles';

export default function Filters({ data = [] }) {
  return (
    <Container>
      {
        data.map((item) => (
          <Button key={item.title} title={item.title} onPress={item.action} />
        ))
      }
    </Container>
  )
}