import React from 'react'
import { Miniature, Loading } from './styles'

import { user } from '../../../database/functions';

export default function Mini({ item }) {
  const [ annUser, setAnnUser ] = React.useState(null);

  React.useEffect(() => {
    user.detail(item.enterprise, (obj) => setAnnUser(obj))
  }, []);

  return (
    <>
      {
        annUser ? (
          <Miniature info={{...item, enterprise: annUser.name, enterprisePhoto: annUser.image, enterprisePhone: annUser.phone }} />
        ) : (
          <Loading />
        )
      }
    </>
  );
}
