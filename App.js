import React from 'react';
import { StatusBar } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';

import Routes from './src/routes';
import BottomSheet from './src/components/BottomSheet'


export const MainContext = React.createContext({
  bsRef: () => {},    // Referência ao BottomSheet Component
  setNav: () => {},   // Função useState para uso do objeto navigation
  nav: {},            // Objeto navigation
});

export default function App() {
  const bottomSheetRef = React.useRef(null);
  const [nav, setNav] = React.useState({});

  // Custom fonts
  let [fontsLoaded] = useFonts({
    'Poppins Light': require('./assets/fonts/Poppins-Light.otf'),
    'Poppins Regular': require('./assets/fonts/Poppins-Regular.otf'),
    'Poppins Medium': require('./assets/fonts/Poppins-Medium.otf'),
    'Poppins SemiBold': require('./assets/fonts/Poppins-SemiBold.otf'),
    'Poppins Bold': require('./assets/fonts/Poppins-Bold.otf'),
  })

  return (
    <>
      {
        !fontsLoaded ? (
          <AppLoading />
        ) : (
          <MainContext.Provider value={{ bsRef: () => bottomSheetRef.current.toggle(), setNav, nav }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <MenuProvider>
              <BottomSheet ref={bottomSheetRef} />
              <Routes />
            </MenuProvider>
          </MainContext.Provider>
        )
      }
    </>
  );
}
