import React from 'react';
import { FlatList } from 'react-native';
import { Container, MyAnnouncement, MyAds, SpacedView, Message, FilterBox } from './styles';

import FiltersModal from '../../../components/Modal';
import Filters from '../../../components/Filters';
import GeneralContext from '../../../context';
import { announcement } from '../../../database/functions';

export default function MyAnnouncements() {
  const { currentUser } = React.useContext(GeneralContext);
  const [userAnn, setUserAnn] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [filters, setFilters] = React.useState({
    adstype: 'selling',
    type: 'confeccao',
  });

  React.useEffect(() => {
    setUserAnn([]);
    announcement.read((arr) => setUserAnn(arr), 'primaryAnnouncements', filters.adstype, filters.type, 'user', currentUser.id, 1000);
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
