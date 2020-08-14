import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { StatusBar, Alert } from 'react-native';

import { BuyButton, Container, Detail, ImageScrollView, InsideContainer, OptionsButton, RbSheetOption, Quantity, Price, Cents, PublishInspect, Title } from './styles';

import GeneralContext from '../../../context';
import { announcement } from '../../../database/functions';

function numberBig(number, index) {
  var number = number.toFixed(2).split('.');
  number[0] = "R$ " + number[0].split(/(?=(?:...)*$)/).join('.');
  return number[index];
}

export default function FeedInspect({ navigation, route }) {
  const { currentUser } = React.useContext(GeneralContext);
  React.useEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: {
        marginRight: 10,
      },
      headerRight: () => (
        <OptionsButton onPress={() => rbRef.current.open()} />
      )
    });

  }, [rbRef]);

  const noImage = 'https://firebasestorage.googleapis.com/v0/b/saldo-textil-ef063.appspot.com/o/defaults%2Fnoimageavailable.jpg?alt=media&token=1b7c718e-e6d6-49d0-a1c1-3eb7dae80c39';

  const rbRef = React.createRef();
  const { item, type, adstype } = route.params;

  const price = parseFloat(item.price.substring(3, item.price.indexOf('/')-1));
  const measure = item.price.substring(item.price.indexOf('/'), item.price.length);

  return (
    <Container>
      <RBSheet
        ref={rbRef}
        animationType="fade"
        height={200}
        openDuration={250}
        closeDuration={100}
        closeOnDragDown
        closeOnPressMask
        closeOnPressBack
      >
        <StatusBar backgroundColor="#aaa" barStyle="light-content" />
        {
          item.user === currentUser.id ? (
            <>
              <RbSheetOption
                iconName="pencil"
                title="Editar publicação"
                onPress={() => {
                  rbRef.current.close();
                  navigation.navigate('CreateAnnouncement', { announcement: { ...item, adstype, type } });
                }}
              />
              <RbSheetOption
                iconName="delete"
                title="Excluir publicação"
                onPress={() => {
                  Alert.alert(
                    'Deseja excluir este anúncio?',
                    'Esta é uma ação irreversível.',
                    [
                      { 
                        text: 'Cancelar',
                      },
                      {
                        text: 'Sim, excluir',
                        onPress: () => {
                          announcement.destroy(
                            'primaryAnnouncements',
                            adstype,
                            type,
                            item.images,
                            item.uid,
                            () => navigation.goBack(),
                          )
                        }
                      }
                    ]
                  )
                }}
              />
            </>
          ) : (
            <>
              <RbSheetOption iconName="flag" title="Reportar" onPress={() => {
                rbRef.current.close();
                navigation.navigate('Feedback', { announcement: { uid: item.uid, name: item.title, image: item.images ? item.images[0] : noImage  } });
              }} />
              <RbSheetOption iconName="email" title="Mensagem para o vendendor" onPress={() => {}} />
            </>
          )
        }
      </RBSheet>
      

      <ImageScrollView arr={item.images || []} />
      <InsideContainer>
        <Title>{ route.params.name }</Title>
        
        <PublishInspect uid={item.user} image={item.userImage} />

        <Detail type={type} item={item} />

        <Quantity>{ item.quantity }</Quantity>
        <Price>{ numberBig(price, 0) }<Cents>{ `,${ numberBig(price, 1) } ${ measure }` }</Cents></Price>

        {
          item.user === currentUser.id ? (
            <BuyButton title="Este anúncio é seu" disabled uid={item.user} />
          ) : (
            <BuyButton title="Entrar em contato" uid={item.user} />
          )
        }
      </InsideContainer>
    </Container>
  );
}
