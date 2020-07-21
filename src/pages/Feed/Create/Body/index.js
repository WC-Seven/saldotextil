import React from 'react';
import { Container } from './styles';

import Confeccao from './sessions/confeccao';
import Malha from './sessions/malha';
import Outros from './sessions/outros';

import AnnouncementContext from '../context';

export default function Body() {
  const { head } = React.useContext(AnnouncementContext);

  function switcher(type) {
    switch (type) {
      case 'confeccao':
        return <Confeccao />;
      case 'malha':
        return <Malha />;
      case 'outros':
        return <Outros />;
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
