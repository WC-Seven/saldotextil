import React from 'react';
import { View, Platform } from 'react-native';
import Picker, { PickerItem } from '../../components/Picker';
import { BottomButton, Container, Message } from './styles';

import MiniDonation from './Mini';

import GeneralContext from '../../context';
import { getCitiesByState, getStates } from '../../utils/locals';
import { announcement } from '../../database/functions';

export default function Donations({ navigation }) {
  const { currentUser, isLogged } = React.useContext(GeneralContext);

  const [results, setResults] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  const [filters, setFilters] = React.useState({
    state: '',
    city: ''
  });

  React.useEffect(() => {
    getStates().then(response => setStates(response));
  }, []);

  React.useEffect(() => {
    getCitiesByState(filters.state).then(response => setCities(response));
  }, [filters.state]);

  React.useEffect(() => {
    if (filters.city === '') {
      announcement.read((response) => setResults(response), 'secondaryAnnouncements', 'donations', 'ads', 'state', filters.state, 1000);
    } else {
      announcement.read((response) => setResults(response), 'secondaryAnnouncements', 'donations', 'ads', 'city', filters.city, 1000);
    }
  }, [filters.city, filters.state]);

  return (
    <>
      {
        isLogged && (
          <BottomButton title="Fazer doação" onPress={() => navigation.navigate('CreateDonation')} />
        )
      }

      <Container>
        <Picker
          style={{ height: 50, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 8, paddingHorizontal: 8 }}
          value={
            filters.state === ''
              ? 'Estado (Selecione)'
              : states.find(item => item.uf === filters.state).name
          }
          onValueChange={value => {
            setFilters({...filters, state: value, city: '' });
          }}
        >
          <PickerItem value="" label="Estado (Selecione)" />
          {
            states.map((item) => (
              <PickerItem value={item.uf} label={item.name} key={item.id} />
            ))
          }
        </Picker>

        <Picker
          style={{ height: 50, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 8, paddingHorizontal: 8 }}
          value={
            filters.state === ''
              ? 'Selecione um estado'
              : !cities[0]
                ? 'Carregando'
                : filters.city === ''
                  ? 'Cidades (todas)'
                  : filters.city
            }
          onValueChange={value => setFilters({...filters, city: value})}
        >
          <PickerItem value="" label={filters.state === '' ? "Selecione um estado" : cities[0] ? "Cidades (todas)" : "Carregando..."} />
          {
            cities.map((item) => (
              <PickerItem value={item.name} label={item.name} key={item.id} />
            ))
          }
        </Picker>

        {
          results[0] ? (
            <>
              {
                results.map((item) => (
                  <MiniDonation key={item.uid} item={item} navigation={navigation} />
                ))
              }
              <View style={{ height: 100 }} />
            </>
          ) : (
            <Message>Não há items</Message>
          )
        }   
      </Container>
    </>
  );
}
