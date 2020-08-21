import React from 'react';
import { Alert, Modal, TouchableOpacity, TouchableWithoutFeedback, View, Linking } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Container, DarkContainer, DetailBlade, FullImage, Image, Text } from './styles';

import GeneralContext from '../../../context';
import { announcement } from '../../../database/functions';

import moment from 'moment';
import 'moment/locale/pt-br';

export default function DetailDonation({ navigation, route }) {
  const { currentUser } = React.useContext(GeneralContext);
  const { item } = route.params;

  const date = moment(item.createdAt).fromNow();

  const [isModalActive, setIsModalActive] = React.useState(false);
  const noImage = 'https://firebasestorage.googleapis.com/v0/b/saldo-textil-ef063.appspot.com/o/defaults%2Fnoimageavailable.jpg?alt=media&token=1b7c718e-e6d6-49d0-a1c1-3eb7dae80c39';
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
              <Text muted>{ date }</Text>
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
                        navigation.navigate('Feedback', { announcement: { uid: item.uid, name: item.title, image: item.images[0] || noImage } })
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
          onPress={() => {
            const phone = "55" + item.user.phone.replace('(', '').replace(')', '').replace('-', '');
            Linking.openURL(`https://wa.me/${phone}`)
          }}
        >
          <Text style={{ color: '#fff', paddingTop: 5 }}>Whatsapp</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
