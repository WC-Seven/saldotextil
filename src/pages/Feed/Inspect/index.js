import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { StatusBar } from 'react-native';

import { BuyButton, Container, Detail, ImageScrollView, InsideContainer, OptionsButton, RbSheetOption, Quantity, Price, Cents, PublishInspect } from './styles';

export default function FeedInspect({ navigation, route }) {
  React.useEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: {
        marginRight: 10,
      },
      headerRight: () => (
        <OptionsButton onPress={() => rbRef.current.open()} />
      )
    });
  }, []);

  const rbRef = React.createRef();

  return (
    <Container>
      <RBSheet
        ref={rbRef}
        animationType="slide"
        height={400}
        openDuration={250}
        closeDuration={100}
        closeOnDragDown
        closeOnPressMask
        closeOnPressBack
      >
        <StatusBar backgroundColor="#aaa" barStyle="light-content" />
        {/* Opções para todos os usuários */}
        <RbSheetOption iconName="flag" title="Reportar" onPress={() => {}} />
        <RbSheetOption iconName="email" title="Mensagem para o vendendor" onPress={() => {}} />

        {/* Opções para owner */}
        <RbSheetOption iconName="pencil" title="Editar publicação" onPress={() => {}} />
        <RbSheetOption iconName="card-bulleted-off" title="Desativar publicação" onPress={() => {}} />
        <RbSheetOption iconName="delete" title="Excluir publicação" onPress={() => {}} />
      </RBSheet>
      

      <ImageScrollView />
      <InsideContainer>
        

        <PublishInspect />

        <Detail />

        <Quantity>241 disponíveis</Quantity>
        <Price>R$ 2.674<Cents>,80</Cents></Price>

        <BuyButton title="Entrar em contato" />
      </InsideContainer>
    </Container>
  );
}
