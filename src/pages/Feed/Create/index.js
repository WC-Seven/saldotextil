/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  ScrollView, KeyboardAvoidingView, View, ActivityIndicator, TouchableOpacity, Text, StatusBar,
} from 'react-native';

import GeneralContext from '../../../context'
import AnnouncementContext, { AnnouncementContextProvider } from './context';

import Head from './Head';
import Body from './Body';
import Footer from './Footer';

function Switcher({ navigation, item }) {
  // item is received when the component is used to edit an announcement;
  const { isLogged, setIsLogging } = React.useContext(GeneralContext);
  const { isLoading } = React.useContext(AnnouncementContext);
  
  if (!isLogged) {
    navigation.setOptions({
      headerStyle: { backgroundColor: '#2b7ed7', elevation: 0 },
      headerTintColor: 'white'
    })

    return (
      <View style={{
        flex: 1,
        backgroundColor: '#2b7ed7',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <StatusBar barStyle='light-content' backgroundColor="#2b7ed7" />
        <Text
          style={{
            color: 'white',
            fontFamily: 'Poppins Medium',
            fontSize: 20,
            maxWidth: '80%',
            textAlign: 'center'
          }}
        >
          É necessário ter uma conta para criar anúncios no Saldo Têxtil.
          Torne-se membro agora mesmo!
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setIsLogging(true)}
          style={{
            backgroundColor: 'white',
            borderRadius: 100,
            marginTop: 20,
            paddingHorizontal: 30,
            paddingVertical: 10
          }}
        >
          <Text
            style={{
              color: '#2b7ed7',
              fontFamily: 'Poppins Medium',
              marginBottom: -3
            }}
          >Entre ou cadastre-se</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      {
        isLoading === true ? (
          <View style={{
            flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
          }}
          >
            <ActivityIndicator size="small" color="#1f5da0" />
          </View>
        ) : (
          <KeyboardAvoidingView enabled behavior="height">
            <ScrollView style={{ backgroundColor: '#fff' }}>
              <Head item={item ? item : null} />
              <Body item={item ? item : null} />
              <Footer navigation={navigation} item={item ? item : null} />
            </ScrollView>
          </KeyboardAvoidingView>
        )
      }
    </>
  );
}

export default function AdsCreate({ navigation, route }) {
  return (
    <AnnouncementContextProvider>
      <Switcher navigation={navigation} item={route.params?.announcement ? route.params.announcement : null} />
    </AnnouncementContextProvider>
  );
}
