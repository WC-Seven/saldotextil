import React from 'react'
import { CvMiniature, Miniature, Loading } from './styles'

import { user } from '../../../database/functions';

export default function Mini({ item, type = 'ads', folder }) {
  const [ annUser, setAnnUser ] = React.useState(null);

  React.useEffect(() => {
    user.detail(item.enterprise, (obj) => setAnnUser(obj));
  }, []);

  return (
    <>
      {
        annUser ? (
          <>
            {
              type === 'ads' ? (
                <Miniature info={{...item, id: annUser.id, enterprise: annUser, folder }} />
              ) : (
                <CvMiniature info={{...item, user: annUser, folder }} />
              )
            }
          </>
        ) : (
          <Loading />
        )
      }
    </>
  );
}
