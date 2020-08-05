import React from 'react';
import { Container, Message, TextInput } from './styles';

import { announcement } from '../../../database/functions';
import Mini from '../Mini';
import MiniJob from '../../../pages/Jobs/Mini';
import MiniAgents from '../../../pages/Agents/Mini';
import MiniDonation from '../../../pages/Donations/Mini';

export default function Search({ route, navigation }) {
  const [results, setResults] = React.useState([]);
  const [query, setQuery] = React.useState('');

  const folder = route.params.name === 'Empregos' ? 'jobs' : route.params.name === 'Representantes' ? 'agents' : 'donations';

  React.useEffect(() => {
    if (query === '') {
      setResults([]);
    } else {
      announcement.find((arr) => setResults(arr), 'secondaryAnnouncements', folder, 'ads', 'title', query);
    }
  }, [query])

  return (
    <Container>
      <TextInput
        value={query}
        onChangeText={(s) => setQuery(s)}
        placeholder={`Pesquise ${route.params.name.toLowerCase()}`}
      />

      {
        results[0] ? (
          <>
            {
              route.params.name === 'Empregos' ? (
                <>
                  {
                    results.map(item => (
                      <MiniJob
                          key={item.uid}
                          navigation={navigation}
                          item={item}
                        />
                    ))
                  }
                </>
              ) : (
                <>
                  {
                    route.params.name === 'Representantes' ? (
                      <>
                        {
                          results.map(item => (
                            <MiniAgents
                                key={item.uid}
                                navigation={navigation}
                                item={item}
                              />
                          ))
                        }
                      </>
                    ) : (
                      <>
                        {
                          results.map(item => (
                            <MiniDonation
                                key={item.uid}
                                navigation={navigation}
                                item={item}
                              />
                          ))
                        }
                      </>
                    )
                  }
                </>
              )
            }
          </>
        ) : (
          <Message>Sem resultados</Message>
        )
      }
    </Container>
  );
}
