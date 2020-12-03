import React from 'react';
import { View } from 'react-native';
import Picker, { PickerItem } from '../../components/Picker';

import { BottomButton, SecondaryBottomButton, Container, SpacedView, Interruptor, Message } from './styles';

import Filters from '../../components/Filters';
import FiltersModal from '../../components/Modal';
import MiniJob from './Mini';
import CvMini from './CvMini';

import GeneralContext from '../../context';
import { announcement } from '../../database/functions';
import { getCitiesByState } from '../../utils/locals';

export default function Agents({ navigation }) {
  const { currentUser } = React.useContext(GeneralContext);
  const [modal, setModal] = React.useState({ adstype: false, localization: false });
  const [cities, setCities] = React.useState([]);

  const [filters, setFilters] = React.useState({
    localization: currentUser.andress.state,
    adstype: 'ads',
    city: currentUser.andress.city
  });
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    setResults([]);

    if (filters.city === '') {
      announcement.read((arr) => setResults(arr), 'secondaryAnnouncements', 'agents', filters.adstype, 'state', filters.localization, 10000);
    } else {
      announcement.read((arr) => setResults(arr), 'secondaryAnnouncements', 'agents', filters.adstype, 'city', filters.city, 10000);
    }
  }, [filters.adstype, filters.localization, filters.city]);

  React.useEffect(() => {
    const get = async () => {
      const response = await getCitiesByState(filters.localization);
      setCities(response);
    }
    get();
  }, [filters.localization]);

  return (
    <>
      <BottomButton
        title="Criar anúncio de vaga para representante"
        onPress={() => navigation.navigate('CreateAgent')}
        secondaryTitle="Anunciar currículo"
        secondaryOnPress={() => navigation.navigate('PublishAgent')}
      />
      <Container>
        {/* Modais */}
        <FiltersModal
          status={{
            value: modal.localization,
            set: (n) => setModal({ ...modal, localization: n })
          }}
          options={[
            {
              title: 'Estado',
              options: [
                { name: 'Nenhum', action: () => setFilters({ ...filters, localization: '' }), active: filters.localization === '' },
                { name: 'AC', action: () => setFilters({ ...filters, localization: 'AC' }), active: filters.localization === 'AC' },
                { name: 'AL', action: () => setFilters({ ...filters, localization: 'AL' }), active: filters.localization === 'AL' },
                { name: 'AP', action: () => setFilters({ ...filters, localization: 'AP' }), active: filters.localization === 'AP' },
                { name: 'AM', action: () => setFilters({ ...filters, localization: 'AM' }), active: filters.localization === 'AM' },
                { name: 'BA', action: () => setFilters({ ...filters, localization: 'BA' }), active: filters.localization === 'BA' },
                { name: 'CE', action: () => setFilters({ ...filters, localization: 'CE' }), active: filters.localization === 'CE' },
                { name: 'DF', action: () => setFilters({ ...filters, localization: 'DF' }), active: filters.localization === 'DF' },
                { name: 'ES', action: () => setFilters({ ...filters, localization: 'ES' }), active: filters.localization === 'ES' },
                { name: 'GO', action: () => setFilters({ ...filters, localization: 'GO' }), active: filters.localization === 'GO' },
                { name: 'MA', action: () => setFilters({ ...filters, localization: 'MA' }), active: filters.localization === 'MA' },
                { name: 'MT', action: () => setFilters({ ...filters, localization: 'MT' }), active: filters.localization === 'MT' },
                { name: 'MS', action: () => setFilters({ ...filters, localization: 'MS' }), active: filters.localization === 'MS' },
                { name: 'MG', action: () => setFilters({ ...filters, localization: 'MG' }), active: filters.localization === 'MG' },
                { name: 'PA', action: () => setFilters({ ...filters, localization: 'PA' }), active: filters.localization === 'PA' },
                { name: 'PB', action: () => setFilters({ ...filters, localization: 'PB' }), active: filters.localization === 'PB' },
                { name: 'PR', action: () => setFilters({ ...filters, localization: 'PR' }), active: filters.localization === 'PR' },
                { name: 'PE', action: () => setFilters({ ...filters, localization: 'PE' }), active: filters.localization === 'PE' },
                { name: 'PI', action: () => setFilters({ ...filters, localization: 'PI' }), active: filters.localization === 'PI' },
                { name: 'RJ', action: () => setFilters({ ...filters, localization: 'RJ' }), active: filters.localization === 'RJ' },
                { name: 'RN', action: () => setFilters({ ...filters, localization: 'RN' }), active: filters.localization === 'RN' },
                { name: 'RS', action: () => setFilters({ ...filters, localization: 'RS' }), active: filters.localization === 'RS' },
                { name: 'RO', action: () => setFilters({ ...filters, localization: 'RO' }), active: filters.localization === 'RO' },
                { name: 'RR', action: () => setFilters({ ...filters, localization: 'RR' }), active: filters.localization === 'RR' },
                { name: 'SC', action: () => setFilters({ ...filters, localization: 'SC' }), active: filters.localization === 'SC' },
                { name: 'SP', action: () => setFilters({ ...filters, localization: 'SP' }), active: filters.localization === 'SP' },
                { name: 'SE', action: () => setFilters({ ...filters, localization: 'SE' }), active: filters.localization === 'SE' },
                { name: 'TO', action: () => setFilters({ ...filters, localization: 'TO' }), active: filters.localization === 'TO' },
              ],
            },
          ]}
        />

        {/* Filtros */}
        <Interruptor data={
          [
            {
              title: 'Vagas para representantes',
              action: () => setFilters({...filters, adstype: 'ads'}),
              selected: filters.adstype === 'ads'
            },
            {
              title: 'Representantes disponíveis',
              action: () => setFilters({...filters, adstype: 'cv'}),
              selected: filters.adstype === 'cv'
            },
          ]
        } />
        <Filters
          data={[
            {
              title: modal.localization === '' ? 'Estado' : filters.localization,
              action: () => setModal({...modal, localization: true})
            }
          ]}
        />

        <Picker
          style={{ backgroundColor: '#f2f2f2', marginHorizontal: 10, borderRadius: 4, marginTop: 5, paddingHorizontal: 10 }}
          value={filters.city}
          onValueChange={value => setFilters({...filters, city: value})}
        >
          <PickerItem value="" label={filters.localization === '' ? "Selecione um estado" : cities[0] ? 'Cidade (todas)' : 'Carregando...'  } />

          {
            cities.map((item) => (
              <PickerItem value={item.name} label={item.name} key={item.name} />
            ))
          }
        
        </Picker>

        {
          results[0] ? (
            <>
              {
                filters.adstype === 'ads' ? (
                  <>
                    {
                      results.map((item) => (
                        <MiniJob key={item.uid} item={item} navigation={navigation} />
                      ))
                    }
                  </>
                ) : (
                  <>
                    {
                      results.map((item) => (
                        <CvMini item={item} key={item.uid} />
                      ))
                    }
                  </>
                )
              }
              <View style={{ height: 100 }} />
                  
            </>
          ) : (
            <Message>Não há {filters.adstype === 'ads' ? 'anúncios' : 'representantes'}</Message>
          )
        }

        

        <SpacedView />
      </Container>
    </>
  );
}
