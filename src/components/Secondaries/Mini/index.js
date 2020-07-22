import React from 'react'
import { CvMiniature, Miniature, Loading } from './styles'

import { user } from '../../../database/functions';

export default function Mini({ item, type = 'ads' }) {
  const [ annUser, setAnnUser ] = React.useState(null);

  React.useEffect(() => {
    user.detail(item.enterprise, (obj) => setAnnUser(obj))
  }, []);

  return (
    <>
      {
        annUser ? (
          <>
            {
              type === 'ads' ? (
                <Miniature info={{...item, enterprise: annUser.name, enterprisePhoto: annUser.image, enterprisePhone: annUser.phone }} />
              ) : (
                <CvMiniature info={{...item, user: annUser.name, userImage: annUser.image, userPhone: annUser.phone}} />
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
