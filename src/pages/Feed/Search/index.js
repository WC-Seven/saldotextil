import React from 'react';
import { FlatList } from 'react-native';

import { Bagde, BadgeBlade, Container, Message, Search } from './styles';
import { announcement } from '../../../database/functions';

import Product from '../../../components/Product';

export default function SearchAnnouncements() {
  const [results, setResults] = React.useState([]);
  const [filters, setFilters] = React.useState({ adstype: 'selling', type: 'confeccao' });
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (query === '') {
      setResults([]);
    } else {
      announcement.find((arr) => setResults(arr), 'primaryAnnouncements', filters.adstype, filters.type, 'title', query);
    }
  }, [query, filters.adstype, filters.type]);

  return (
    <Container>
      <Search autoFocus placeholder="Pesquise algo" value={query} onChangeText={(s) => setQuery(s)} />

      <BadgeBlade>
        <Bagde
          title={ filters.adstype === 'selling' ? "venda" : "compra" }
          action={ filters.adstype === 'selling' ? () => {
            setFilters({ ...filters, adstype: 'buying' });
          } : () => {
            setFilters({ ...filters, adstype: 'selling' });
          }}
        />
        <Bagde
          title={ filters.type === 'confeccao' ? "confecções" : filters.type === 'malha' ? "malhas" : "outros"}
          action={ filters.type === 'confeccao' ? () => {
            setFilters({ ...filters, type: 'malha' });
          } : filters.type === 'malha' ? () => {
            setFilters({ ...filters, type: 'outros' });
          } : () => {
            setFilters({ ...filters, type: 'confeccao' });
          }}  
        />
      </BadgeBlade>

      {
        results[0] ? (
          <FlatList
            data={results}
            renderItem={(item) => <Product item={item} adstype={filters.adstype} type={filters.type} />}
            keyExtractor={(item) => item.uid}
          />
        ) : (
          <Message>Não há resultados</Message>
        )
      }
      
    </Container>
  );
}
