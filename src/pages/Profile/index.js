import React from 'react';
import { Andress, Avatar, Bio, BioDetails, Container, EditButton, Name, MyAnnouncement, MyAds, SpacedView } from './styles';

import Update from './Update';
import GeneralContext from '../../context';

export default function Profile({ navigation, route }) {
  const { currentUser } = React.useContext(GeneralContext);

  const { user } = route.params;
  console.log(currentUser);

  return (
    <Container>
      <Bio>
        <Avatar source={{ uri: route.params.owner ? currentUser.image : 'http://html-color.org/pt/EDE9EA.jpg' }} />
        <BioDetails>
          <Name>{ currentUser.name }</Name>
          <Andress>
            { route.params.owner ? 'asasdsd' : user.name }
            { ' - ' }
            { route.params.owner ? 'asdsad' : user.andress.state }
          </Andress>
          {
            route.params.owner ? (
              <EditButton onPress={() => {}} >
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
