import React from 'react';
import { Andress, Avatar, Bio, BioDetails, Container, EditButton, Name, MyAnnouncement, MyAds, SpacedView } from './styles';

import Update from './Update';

export default function Profile({ route }) {
  const [isUpdatePerfilActive, setIsUpdatePerfilActive] = React.useState(false);

  return (
    <Container>
      <Update
        status={{
          value: isUpdatePerfilActive,
          set: (b) => setIsUpdatePerfilActive(b),
        }}
      />


      <Bio>
        <Avatar source={{ uri: 'http://html-color.org/pt/EDE9EA.jpg' }} />
        <BioDetails>
          <Name>Gabriel Henrique Cardoso</Name>
          <Andress>Jaraguá do Sul - SC</Andress>
          {
            route.params.owner ? (
              <EditButton onPress={() => setIsUpdatePerfilActive(true)} >
                <Name>Editar perfil</Name>
              </EditButton>
            ) : (
              <EditButton onPress={() => {}} >
                <Name>Mensagem</Name>
              </EditButton>
            )
          }
        </BioDetails>
      </Bio>


      <MyAnnouncement>
        <MyAds />
        <MyAds />
        <MyAds />
        <MyAds />
        <MyAds />
        <MyAds />
        <MyAds />
        
      </MyAnnouncement>
      <SpacedView />
    </Container>
  );
}
