import React from 'react';
import { Container } from './styles';

import Confeccao from './sessions/confeccao';
import Malha from './sessions/malha';
import Outros from './sessions/outros';

import AnnouncementContext from '../context';

export default function Body({ item }) {
  const { head } = React.useContext(AnnouncementContext);

  function switcher(type) {
    switch (type) {
      case 'confeccao':
        return <Confeccao item={item ? item : null} />;
      case 'malha':
        return <Malha item={item ? item : null} />;
      case 'outros':
        return <Outros item={item ? item : null} />;
      default:
        break;
    }
    return null;
  }

  return (
    <Container>
      {
        switcher(head.type)
      }
    </Container>
  );
}
