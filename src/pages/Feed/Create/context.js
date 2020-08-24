/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

const AnnouncementContext = React.createContext({
  modal: {
    typeModal: false,
    adsTypeModal: false,
  },
  head: {},
  body: {},
  isLoading: false,
  setIsLoading: () => {},
  setModal: () => {},
  setHead: () => {},
  setBody: () => {},
});

export const AnnouncementContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modal, setModal] = React.useState({ typeModal: false, adsTypeModal: false });
  const [head, setHead] = React.useState({
    title: '',
    type: 'confeccao',
    adstype: '',
    user: '',
    images: [],
    description: '',
    status: true,
    price: '',
    createdAt: moment().format(),
  });
  const [body, setBody] = React.useState({});

  return (
    <AnnouncementContext.Provider
      value={{
        modal,
        head,
        body,
        isLoading,
        setIsLoading,
        setModal,
        setHead,
        setBody,
      }}
    >
      { children }
    </AnnouncementContext.Provider>
  );
};

export default AnnouncementContext;
