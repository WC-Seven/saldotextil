import React from 'react';
import { Icon } from 'react-native-elements';

import { Button } from './styles';

export default function MiniFloatingButton({ iconName, action }) {
  return (
    <Button onPress={action}>
      <Icon name={iconName || 'home'} color="#2B7ED7" type="material-community" size={30} />
    </Button>
  )
}
