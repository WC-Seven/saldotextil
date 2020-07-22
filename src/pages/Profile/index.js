import React from 'react';
import { Andress, Avatar, Bio, BioDetails, Container, EditButton, Name, MyAnnouncement, MyAds, SpacedView, Message, FilterBox } from './styles';
import { Alert, Linking } from 'react-native';


import FiltersModal from '../../components/Modal';
import Filters from '../../components/Filters';
import GeneralContext from '../../context';
import { announcement } from '../../database/functions';

export default function Profile({ navigation, route }) {
  const { currentUser } = React.useContext(GeneralContext);
  const [modal, setModal] = React.useState(false);
  const [filters, setFilters] = React.useState({
    adstype: 'selling',
    type: 'confeccao',
  })
  const [userAnn, setUserAnn] = React.useState([]);

  const { user } = route.params;
  const noImage = 'http://html-color.org/pt/EDE9EA.jpg';

  React.useEffect(() => {
    setUserAnn([]);
    announcement.read((arr) => setUserAnn(arr), 'primaryAnnouncements', filters.adstype, filters.type, 'user', route.params.owner ? currentUser.id : user.id);
    console.log(userAnn);
  }, [filters.adstype, filters.type]);

  return (
    <Container>
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
              { name: 'Confeçções', action: () => setFilters({ ...filters, type: 'confeccao'}), active: filters.type === 'confeccao' },
              { name: 'Malhas', action: () => setFilters({ ...filters, type: 'malha'}), active: filters.type === 'malha' },
              { name: 'Outros', action: () => setFilters({ ...filters, type: 'outros'}), active: filters.type === 'outros' }

            ]
          }
        ]}
      />

      <Bio>
        <Avatar source={{ uri: route.params.owner ? currentUser.image || noImage : user.image || noImage }} />
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
