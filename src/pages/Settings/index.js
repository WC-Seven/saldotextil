import React from 'react';
import { ToastAndroid } from 'react-native';
import { Container, ListItem } from './styles';

export default function Settings({ navigation }) {
  return (
    <Container>
      <ListItem
        leftIcon="textbox-password"
        title="Mudar senha"
        action={() => navigation.navigate('UpdatePassword')}
      />
      <ListItem
        leftIcon="book-open-outline"
        title="Termos e política"
        action={() => navigation.navigate('UserAgreement')}
        longAction={() => {
          ToastAndroid.showWithGravityAndOffset(
            "Desenvolvido por Gabriel Cardoso",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            20
          )
        }}
      />
      <ListItem
        leftIcon="message-alert-outline"
        title="Relatar um problema"
        action={() => navigation.navigate('Feedback')}
      />
      <ListItem
        leftIcon="exit-to-app"
        title="Sair da conta"
        action={() => {}}
      />

      <ListItem
        danger
        leftIcon="delete-outline"
        title="Apagar minha conta"
        action={() => {}}
      />
    </Container>
  );
}
