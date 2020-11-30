import React from 'react';
import { View, Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { BottomButton, Container, Message } from './styles';

import MiniDonation from './Mini';

import GeneralContext from '../../context';
import { getCitiesByState, getStates } from '../../utils/locals';
import { announcement } from '../../database/functions';

export default function Donations({ navigation }) {
  const { currentUser } = React.useContext(GeneralContext);

  const [results, setResults] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  const [filters, setFilters] = React.useState({
    state: currentUser.andress.state ?? 'SP',
    city: currentUser.andress.city ?? 'Adamantina'
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
      <BottomButton title="Fazer doação" onPress={() => navigation.navigate('CreateDonation')} />

      <Container>
        <View style={
            Platform.OS === 'ios'
            ? { height: 50, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 8, paddingHorizontal: 8 }
            : { marginBottom: 10, paddingHorizontal: 8 }
          }>
          <Picker selectedValue={filters.state} onValueChange={value => setFilters({...filters, state: value})}>
            <Picker.Item value="" label="Estado (Selecione)" />
            {
              states.map((item) => (
                <Picker.Item value={item.uf} label={item.name} key={item.id} />
              ))
            }
          </Picker>
        </View>

        <View style={{ height: 50, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 8, paddingHorizontal: 8 }}>
          <Picker selectedValue={filters.city} onValueChange={value => setFilters({...filters, city: value})}>
            <Picker.Item value="" label={filters.state === '' ? "Selecione um estado" : cities[0] ? "Cidades (todas)" : "Carregando..."} />
            {
              cities.map((item) => (
                <Picker.Item value={item.name} label={item.name} key={item.id} />
              ))
            }
          </Picker>
        </View>

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
