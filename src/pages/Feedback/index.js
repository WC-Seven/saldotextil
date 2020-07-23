import React from 'react';
import { Button, Container, Description, Title } from './styles';

import GeneralContext from '../../context';
import { createFeedBack } from '../../database/functions/feedback/createFeedback';
import { Alert } from 'react-native';


export default function Feedback({ route }) {
  const { currentUser } = React.useContext(GeneralContext);
  const [text, setText] = React.useState('');

  return (
    <Container>
      <Title>Relate-nos o que houve</Title>
      <Description autoFocus value={text} onChangeText={(s) => setText(s)} />

      <Button
        title="Enviar feedback"
        action={() => {
          if (text.length < 50) {
            Alert.alert(
              'Erro',
              'É necessário enviar pelo menos 50 caracteres no corpo do feedback',
              [
                {
                  text: 'Ok'
                }
              ]
            )
            return true;
          }
          createFeedBack('default', {
            sentBy: {
              id: currentUser.id,
              name: currentUser.name,
            },
            description: {
              user,
              announcement: '',
              text: '',
            }
          });
        }} />
    </Container>
  );
}
