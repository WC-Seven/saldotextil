import React from 'react';
import { ToastAndroid, Alert } from 'react-native';
import { Container, ListItem } from './styles';

import GeneralContext from '../../context';
import { user } from '../../database/functions';

export default function Settings({ navigation }) {
  const { destroyAuthUser, currentUser } = React.useContext(GeneralContext);
  
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
        action={() => destroyAuthUser()}
      />

      <ListItem
        danger
        leftIcon="delete-outline"
        title="Apagar minha conta"
        action={() => {
          Alert.alert(
            'Tem certeza que quer fazer isso?',
            'A exclusão da conta é uma ação irreversível, seus anúncios serão desvinculados e não haverá como recuperá-los.',
            [
              {
                text: 'Não, cancelar'
              },
              {
                text: 'Sim, eu tenho certeza',
                onPress: () => {
                  Alert.alert(
                    'Nós sentiremos sua falta',
                    'Foi ótimo estar com você durante este tempo, não se esqueça que você poderá se inscrever novamente no Saldo Têxtil quando quiser',
                    [
                      {
                        text: 'Eu quero ficar',
                        onPress: () => {
                          Alert.alert(
                            'Ufa, que alívio',
                            'Que bom que decidiu permanecer conosco, nós nos importamos muito com você! \n\n Continue aproveitando o Saldo Têxtil!',
                            [
                              { text: 'Ok' }
                            ]
                          )
                        }
                      },
                      { 
                        text: 'Apagar conta',
                        onPress: () => {
                          user.destroy(currentUser.id, currentUser.image, () => destroyAuthUser());
                        }
                      }
                    ]
                  )
                }
              }
            ]
          )
        }}
      />
    </Container>
  );
}
