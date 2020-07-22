import React from 'react';
import { Container, Message, TextInput } from './styles';

import { announcement } from '../../../database/functions';
import Mini from '../Mini';

export default function Search({ route }) {
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
              results.map(item => (
                <Mini
                    key={`${item.title}-${item.user}`}
                    item={{
                      title: item.title,
                      image: item.images[0],
                      enterprise: item.user,
                      description: item.description,
                      city: item.city,
                      state: item.state,
                      uid: item.uid
                    }}
                    type='ads'
                    folder={folder}
                  />
              ))
            }
          </>
        ) : (
          <Message>Sem resultados</Message>
        )
      }
    </Container>
  );
}
