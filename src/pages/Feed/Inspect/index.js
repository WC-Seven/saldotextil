import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { StatusBar, Alert } from 'react-native';

import { BuyButton, Container, Detail, ImageScrollView, InsideContainer, OptionsButton, RbSheetOption, Quantity, Price, Cents, PublishInspect, Title } from './styles';

import GeneralContext from '../../../context';
import { announcement } from '../../../database/functions';

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

  const price = item.price.substring(0, item.price.indexOf('/')-1).replace('.', ',');
  const measure = item.price.substring(item.price.indexOf('/'), item.price.length);
  const priceBig = price.substring(0, price.indexOf(','));
  const priceSmall = price.substring(price.indexOf(','), price.length);

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
                console.log(item);
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
        <Price>{ priceBig }<Cents>{ priceSmall }{ ' ' }{ measure }</Cents></Price>

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
