import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Icon } from 'react-native-elements';

import GeneralContext from '../../context';
import { Container, ListContainer, ListItem, ListLabel } from './styles';
import { StatusBar } from 'react-native';

function BottomSheet(props) {
  const { nav, bsRef, isLogged } = React.useContext(GeneralContext);

  const items = [
    {
      icon: 'plus',
      name: 'Criar anúncio',
      action: () => {
        nav.navigate('CreateAnnouncement');
        bsRef.current.close();
      },
    },
    {
      icon: 'newspaper',
      name: 'Meus anúncios',
      action: () => {
        nav.navigate('MyAnnouncements');
        bsRef.current.close();
      }
    },
    {
      icon: 'briefcase-outline',
      name: 'Empregos',
      action: () => {
        nav.navigate('Jobs');
        bsRef.current.close();
      },
    },
    {
      icon: 'flag-outline',
      name: 'Representantes',
      action: () => {
        nav.navigate('Agents');
        bsRef.current.close();
      },
    },
    {
      icon: 'gift-outline',
      name: 'Doações',
      action: () => {
        nav.navigate('Donations');
        bsRef.current.close();
      },
    },
  ]

  return (
    <RBSheet
      animationType="fade"
      height={350}
      openDuration={250}
      closeDuration={100}
      closeOnDragDown
      closeOnPressMask
      closeOnPressBack
      customStyles={{
        container: {
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
        }
      }}

      ref={bsRef}
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.5)" />
      <Container>
        <ListContainer>
          {
            items.map(item => (
              <ListItem key={item.name} onPress={item.action}>
                <Icon color="#464646" name={item.icon} type="material-community" size={30} />
                <ListLabel>
                  {item.name}
                </ListLabel>
              </ListItem>
            ))
          }
        </ListContainer>
      </Container>
    </RBSheet>
  );
}

export default BottomSheet;
