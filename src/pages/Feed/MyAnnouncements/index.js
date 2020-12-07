import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Container, MyAds, SpacedView, Message, FilterBox } from './styles';

import FiltersModal from '../../../components/Modal';
import Filters from '../../../components/Filters';
import GeneralContext from '../../../context';
import { announcement } from '../../../database/functions';

export default function MyAnnouncements() {
  const { currentUser, isLogged, setIsLogging } = React.useContext(GeneralContext);
  const [userAnn, setUserAnn] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [filters, setFilters] = React.useState({
    adstype: 'selling',
    type: 'confeccao',
  });

  React.useEffect(() => {
    if (isLogged) {
      setUserAnn([]);
      announcement.read((arr) => setUserAnn(arr), 'primaryAnnouncements', filters.adstype, filters.type, 'user', currentUser.id, 1000);
    }
  }, [filters.adstype, filters.type]);

  if (!isLogged) {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: '#666',
            fontFamily: 'Poppins Medium',
            marginBottom: 10,
            textAlign: 'center',
            width: '80%',
          }}
        >
          Publique anúncios, vagas de empregos, vagas para representantes, currículos e doações com uma conta no Saldo Têxtil.
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setIsLogging(true)}
          style={{
            backgroundColor: '#2b7ed7',
            borderRadius: 100,
            paddingHorizontal: 30,
            paddingVertical: 10
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins Regular',
              marginBottom: -3
            }}
          >Entre ou cadastre-se</Text>
        </TouchableOpacity>
      </View>
    )
  }

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
              { name: 'Confecções', action: () => setFilters({ ...filters, type: 'confeccao'}), active: filters.type === 'confeccao' },
              { name: 'Malhas', action: () => setFilters({ ...filters, type: 'malha'}), active: filters.type === 'malha' },
              { name: 'Outros', action: () => setFilters({ ...filters, type: 'outros'}), active: filters.type === 'outros' }

            ]
          }
        ]}
      />

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
      

        
      {
        userAnn[0] ? (
          <FlatList 
            data={userAnn}
            keyExtractor={item => item.uid}
            renderItem={item => <MyAds key={item.item.uid} item={item.item} adstype={filters.adstype} type={filters.type} />}
            numColumns={2}
            style={{ padding: 15 }}
          />
        ) : (
          <Message>
            Quando você postar algum anúncio, ele aparecerá aqui.
          </Message>
        )
      }
        
        
      <SpacedView />
    </Container>
  );
}
