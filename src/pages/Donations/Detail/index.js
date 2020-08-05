import React from 'react';
import { Alert, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Container, DarkContainer, DetailBlade, FullImage, Image, Text } from './styles';

import GeneralContext from '../../../context';
import { announcement } from '../../../database/functions';

export default function DetailDonation({ navigation, route }) {
  const { currentUser } = React.useContext(GeneralContext);
  const { item } = route.params;

  const [isModalActive, setIsModalActive] = React.useState(false);

  return (
    <>
      <Modal
        visible={isModalActive}
        onRequestClose={() => setIsModalActive(false)}
        transparent animationType="fade"
      >
        <DarkContainer>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setIsModalActive(false)}
            activeOpacity={1}
          />
          <FullImage source={{ uri: item.images[0]}} />
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setIsModalActive(false)}
            activeOpacity={1}
          />
        </DarkContainer>
      </Modal>

      <Container>
        <TouchableWithoutFeedback onPress={() => setIsModalActive(true)}> 
          <Image source={{ uri: item.images[0]}} />
        </TouchableWithoutFeedback>

        <View style={{ padding: 15 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text weight="SemiBold" size={21}>{ item.title }</Text>
              <Text>{ item.productDescription }</Text>
            </View>
            <Menu>
              <MenuTrigger>
                <Icon name="dots-vertical" type="material-community" />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={{ marginTop: 30 }}>
                {
                  item.user.id === currentUser.id ? (
                    <>
                      <MenuOption style={{ padding: 10 }} text="Editar" onSelect={() => {
                        navigation.navigate('CreateDonation', { item })
                      }} />
                      <MenuOption style={{ padding: 10 }} text="Excluir" onSelect={() => {
                        Alert.alert(
                          'Excluir anúncio',
                          'Essa ação é irreversível',
                          [
                            {
                              text: 'Cancelar',
                            },
                            {
                              text: 'Ok',
                              onPress: () => announcement.destroy('secondaryAnnouncements', 'donations', 'ads', item.images, item.uid, () => navigation.goBack())
                            },
                          ],
                        );
                      }} />
                    </>
                  ) : (
                    <>
                      <MenuOption style={{ padding: 10 }} text="Reportar" onSelect={() => {
                        navigation.navigate('Feedback', { announcement: { uid: item.uid, name: item.title, image: item.image || noImage } })
                      }} />
                    </>
                  )
                }
              </MenuOptions>
            </Menu>

          </View>
          
          <DetailBlade>
            <Avatar source={{ uri: item.user.image }} size="medium" rounded />
            <View style={{ marginLeft: 10 }}>
              <Text weight="SemiBold" size={16}> { `${item.user.type.substring(0,2) === 'pf' ? item.user.name : item.user.fantasy}` } </Text>
              <Text> { `${item.city} - ${item.state}` } </Text>
            </View>            
          </DetailBlade>

          {
            item.observations ? (
              <>
                <Text weight="Bold" size={17} top={20}>Observações</Text>
                <Text>{ item.observations }</Text>
              </>
            ) : <></>
          }
          
          <Text weight="Bold" top={20}>Necessário retirar no local?</Text>
          <Text>{ item.deliveryOn ? 'Sim' : 'Não' }</Text>
        </View>
      </Container>
      <View style={{ backgroundColor: '#fff', padding: 15 }}>
        <TouchableOpacity
          style={{ borderRadius: 10, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2b7ed7' }}
        >
          <Text style={{ color: '#fff', paddingTop: 5 }}>Whatsapp</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
