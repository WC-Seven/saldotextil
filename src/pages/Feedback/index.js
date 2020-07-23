import React from 'react';
import { Button, Container, Description, Title, UserDetail, AnnDetail } from './styles';

import GeneralContext from '../../context';
import { createFeedBack } from '../../database/functions/feedback/createFeedback';
import { Alert } from 'react-native';

import { user } from '../../database/functions';

export default function Feedback({ navigation, route }) {
  const { currentUser } = React.useContext(GeneralContext);

  const [userToReport, setUserToReport] = React.useState(null);
  const [annToReport, setAnnToReport] = React.useState(null);

  const [type, setType] = React.useState('default');
  const [feedback, setFeedback] = React.useState({
    sentBy: {
      id: currentUser.id,
      name: currentUser.name,
    },
    description: {
      user: '',
      announcement: '',
      text: '',
    }
  });

  React.useEffect(() => {
    if(route.params?.user) {
      user.detail(route.params.user, (obj) => {
        setUserToReport(obj);
        setFeedback({ ...feedback, description: { user: route.params.user } });
        setType('user');

        navigation.setOptions({
          headerTitle: 'Reportar usuário'
        });
      });
    }

    else if (route.params?.announcement) {
      if (route.params.announcement.uid && route.params.announcement.image && route.params.announcement.name) {
        setAnnToReport(route.params.announcement);
        setFeedback({ ...feedback, description: { announcement: route.params.announcement.uid } });
        setType('announcement');

        navigation.setOptions({
          headerTitle: 'Reportar anúncio'
        });
      }
    }
  }, [])

  return (
    <Container>
      <Title>Relate-nos o que houve</Title>

      {
        userToReport ? (
          <UserDetail user={userToReport} />
        ) : <></>
      }
      {
        annToReport ? (
          <AnnDetail ann={annToReport} />
        ) : <></>
      }

      <Description autoFocus value={feedback.description.text} onChangeText={(s) => setFeedback({ ...feedback, description: { ...feedback.description, text: s }})} />
      <Button
        title="Enviar feedback"
        action={() => {
          if (feedback.description.text.length < 50) {
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
          createFeedBack(type, feedback, () => navigation.goBack());
        }} />
    </Container>
  );
}
