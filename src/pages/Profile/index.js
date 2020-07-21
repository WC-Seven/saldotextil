import React from 'react';
import { Andress, Avatar, Bio, BioDetails, Container, EditButton, Name, MyAnnouncement, MyAds, SpacedView } from './styles';

import GeneralContext from '../../context';
import { Alert, Linking } from 'react-native';

export default function Profile({ navigation, route }) {
  const { currentUser } = React.useContext(GeneralContext);

  const { user } = route.params;
  console.log(currentUser);

  const noImage = 'http://html-color.org/pt/EDE9EA.jpg';

  return (
    <Container>
      <Bio>
        <Avatar source={{ uri: route.params.owner ? currentUser.image || noImage : user.image || noImage }} />
        <BioDetails>
          <Name>{ route.params.owner ? currentUser.name : user.name }</Name>
          <Andress>
            { route.params.owner ? currentUser.andress.city : user.andress.city }
            { ' - ' }
            { route.params.owner ? currentUser.andress.state : user.andress.state }
          </Andress>
          {
            route.params.owner ? (
              <EditButton onPress={() => navigation.navigate('UpdateProfile')} >
                <Name>Editar perfil</Name>
              </EditButton>
            ) : (
              <EditButton onPress={
                user.phone !== '' ? () => {
                  let number = user.phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '').replace('+', '');
                  if (number.substring(0, 2) !== '55') {
                    number = `55${number}`;
                  }
                  
                  Linking.openURL(`https://wa.me/${number}`);
                } : () => {
                  Alert.alert(
                    'Impossível enviar mensagem',
                    'Parece que esta pessoa não tem nenhum número vinculado a conta',
                    [{ text: 'Ok' }]
                  );
                }
              } >
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
