import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { isJson } from './utils';

const GeneralContext = React.createContext({
  nav: {},
  setNav: () => {},
  bsRef: null,
  isLogged: false,
  isLogging: null,
  setIsLogging: () => {},
  currentUser: {},
  currentEmail: '',
  setAuthUser: () => {},
  updateAuthEmail: () => {},
  updateAuthUser: () => {},
  destroyAuthUser: () => {}
});

export const GeneralContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [isLogging, setIsLogging] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentEmail, setCurrentEmail] = React.useState('');

  const [nav, setNav] = React.useState(null);
  const bsRef = React.createRef();

  const setAuthUser = async (user, email) => {
    await AsyncStorage.setItem('@USER', isJson(user) ? user : JSON.stringify(user));
    await AsyncStorage.setItem('@EMAIL', email);

    setCurrentUser(isJson(user) ? JSON.parse(user) : user);
    setCurrentEmail(email);
    setIsLogged(true);
  }

  const updateAuthUser = async (user) => {
    await AsyncStorage.setItem('@USER', isJson(user) ? user : JSON.stringify(user));
    setCurrentUser(isJson(user) ? JSON.parse(user) : user);
  }

  const updateAuthEmail = async (email) => {
    await AsyncStorage.setItem('@EMAIL', email);
    setCurrentEmail(email);
  }

  const destroyAuthUser = async () => {
    await AsyncStorage.removeItem('@USER');
    await AsyncStorage.removeItem('@EMAIL');

    setIsLogged(false);
    setCurrentEmail('');
    setCurrentUser({
      name: '',
      andress: {
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        number: '',
        complement: '',
        cep: '',
      },
      type: '',
      createdAt: '',
      premium: false,
      image: '',
      document: {
        cpf: '',
        cnpj: '',
      },
      phone: {
        ddd: '',
        number: '',
      },
    })
  }

  return (
    <GeneralContext.Provider value={{
      nav, setNav, bsRef, isLogged, isLogging, setIsLogging, currentUser, currentEmail, setAuthUser, updateAuthEmail, updateAuthUser, destroyAuthUser,
    }}>
      { children }
    </GeneralContext.Provider>
  );
}

export default GeneralContext;
