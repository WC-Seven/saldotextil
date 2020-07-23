import React from 'react';
import { Alert, Linking, Modal, TouchableOpacity } from 'react-native';

import {
  Andress, Avatar, Bio, BioDetails, Container, EditButton, Name, MyAnnouncement, MyAds, SpacedView, Message, FilterBox,
  DarkBackground, WindowWithOptions, Image, CloseButton, EditImageText, EditImageButton, Window, ListItem
} from './styles';

import { pickImageFromCamera, pickImageFromLibrary } from '../../components/ImagePicker';
import { user as userFunctions } from '../../database/functions';

import FiltersModal from '../../components/Modal';
import Filters from '../../components/Filters';
import GeneralContext from '../../context';
import { announcement } from '../../database/functions';
import { Icon } from 'react-native-elements';

export default function Profile({ navigation, route }) {
  const { currentUser, currentEmail, setAuthUser } = React.useContext(GeneralContext);
  const [userAnn, setUserAnn] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [filters, setFilters] = React.useState({
    adstype: 'selling',
    type: 'confeccao',
  });

  const { user } = route.params;
  const noImage = 'http://html-color.org/pt/EDE9EA.jpg';

  const [modalOptions, setModalOptions] = React.useState(false);
  const [modalImage, setModalImage] = React.useState(false);
  const [imagePickerStatus, setImagePickerStatus] = React.useState(false);

  React.useEffect(() => {
    setUserAnn([]);
    announcement.read((arr) => setUserAnn(arr), 'primaryAnnouncements', filters.adstype, filters.type, 'user', route.params.owner ? currentUser.id : user.id);
    console.log(userAnn);
  }, [filters.adstype, filters.type]);

  async function getImage(type) {
    if (type === 'camera') {
      const response = await pickImageFromCamera();
      setImagePickerStatus(false);
      if (!response.cancelled) {
        userFunctions.updateImage(currentUser, response.uri, setAuthUser);
      }
    } else if (type === 'library') {
      const response = await pickImageFromLibrary();
      setImagePickerStatus(false);
      if (!response.cancelled) {
        userFunctions.updateImage(currentUser, response.uri, setAuthUser, currentEmail);
      }
    }
  }

  return (
    <Container>
      <Modal animationType="fade" transparent visible={imagePickerStatus}>
        <DarkBackground>
          <Window>
            <ListItem title="Tirar uma foto" onPress={() => getImage('camera')} />
            <ListItem title="Importar da biblioteca" onPress={() => getImage('library')} />
            <ListItem title="Cancelar" onPress={() => setImagePickerStatus(false)} last />
          </Window>
        </DarkBackground>
      </Modal>

      <Modal transparent visible={modalOptions} animationType="fade">
        <DarkBackground>
          <Window>
           <ListItem title="Ver imagem" onPress={() => { setModalOptions(false); setModalImage(true); }} />
           {
             route.params.owner ? (
              <ListItem title="Mudar imagem" onPress={() => { setModalOptions(false); setImagePickerStatus(true); }} />
             ) : <></>
           }
           <ListItem title="Cancelar" onPress={() => setModalOptions(false)} last />
          </Window>
        </DarkBackground>
      </Modal>

      <Modal transparent visible={modalImage} animationType="fade">
        <DarkBackground>
          <CloseButton>
            <Icon name="close" color="#fff" type="material-community" onPress={() => setModalImage(false)} />
          </CloseButton>
          <Image source={{ uri: route.params.owner ? currentUser.image || noImage : user.image || noImage }} />
          {
            route.params.owner ? (
              <EditImageButton onPress={() => { setModalImage(false); setImagePickerStatus(true)}}>
                <EditImageText>Editar imagem</EditImageText>
              </EditImageButton>
            ) : <></>
          }
        </DarkBackground>
      </Modal>


      <FiltersModal
        status={{
          value: modal,
          set: (bool) => setModal(bool),
        }}
        options={[
          {
            title: 'Tipo de anúncio',
            options: [
              { name: 'Venda', action: () => setFilters({ ...filters, adstype: 'selling'}), active: filters.adstype === 'selling' },
              { name: 'Compra', action: () => setFilters({ ...filters, adstype: 'buying'}), active: filters.adstype === 'buying' }
            ]
          },
          {
            title: 'Tipo de produto',
            options: [
              { name: 'Confecções', action: () => setFilters({ ...filters, type: 'confeccao'}), active: filters.type === 'confeccao' },
              { name: 'Malhas', action: () => setFilters({ ...filters, type: 'malha'}), active: filters.type === 'malha' },
              { name: 'Outros', action: () => setFilters({ ...filters, type: 'outros'}), active: filters.type === 'outros' }

            ]
          }
        ]}
      />

      <Bio>
        <TouchableOpacity onPress={() => setModalOptions(true)}>
          <Avatar source={{ uri: route.params.owner ? currentUser.image || noImage : user.image || noImage }} />
        </TouchableOpacity>
        <BioDetails>
          <Name>{ route.params.owner ? currentUser.name : user.name }</Name>
          <Andress>
            { route.params.owner ? currentUser.andress.city : user.andress.city }
            { ' - ' }
            { route.params.owner ? currentUser.andress.state : user.andress.state }
          </Andress>
          {
            route.params.owner ? (
              <EditButton onPress={() => navigation.navigate('UpdateProfile')} >
                <Name>Editar perfil</Name>
              </EditButton>
            ) : (
              <EditButton onPress={
                user.phone !== '' ? () => {
                  let number = user.phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '').replace('+', '');
                  if (number.substring(0, 2) !== '55') {
                    number = `55${number}`;
                  }
                  
                  Linking.openURL(`https://wa.me/${number}`);
                } : () => {
                  Alert.alert(
                    'Impossível enviar mensagem',
                    'Parece que esta pessoa não tem nenhum número vinculado a conta',
                    [{ text: 'Ok' }]
                  );
                }
              } >
                <Name>Mensagem</Name>
              </EditButton>
            )
          }
        </BioDetails>
      </Bio>



      <FilterBox>
        <Filters
          data={[
            {
              title: 'Tipo de produto',
              action: () => setModal(true)
            },
          ]}
        />
      </FilterBox>
      

      <MyAnnouncement>
        
        {
          userAnn[0] ? (
            <>
              {
                userAnn.map(item => (
                  <MyAds key={item.uid} item={item} adstype={filters.adstype} type={filters.type} />
                ))
              }
            </>
          ) : (
            <Message>{
              route.params.owner ? 'Quando você postar algum anúncio, ele aparecerá aqui.' : `Parece que ${user.name} não postou nada ainda. `
            }</Message>
          )
        }
        
        
      </MyAnnouncement>
      <SpacedView />
    </Container>
  );
}
