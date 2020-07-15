import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Icon } from 'react-native-elements';

import { MainContext } from '../../../App';
import { Container, ListContainer, ListItem, ListLabel } from './styles';

function BottomSheet(props, ref) {
  const { nav } = React.useContext(MainContext);
  const rbref = React.useRef(null);

  const items = [
    {
      icon: 'plus',
      name: 'Criar anúncio',
      action: () => {
        // missing function
        rbref.current.close();
      },
    },
    {
      icon: 'briefcase-outline',
      name: 'Empregos',
      action: () => {
        nav.navigate('Jobs');
        rbref.current.close();
      },
    },
    {
      icon: 'flag-outline',
      name: 'Representantes',
      action: () => {
        nav.navigate('Agents');
        rbref.current.close();
      },
    },
    {
      icon: 'gift-outline',
      name: 'Doações',
      action: () => {
        nav.navigate('Donations');
        rbref.current.close();
      },
    },
  ]

  // Send to Foward (App.js)
  React.useImperativeHandle(ref, () => ({
    toggle: () => rbref.current.open(),
  }));


  return (
    <RBSheet
      animationType="fade"
      height={300}
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

      ref={rbref}
    >
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

export default React.forwardRef(BottomSheet);
