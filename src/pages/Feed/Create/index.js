/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  ScrollView, KeyboardAvoidingView, View, ActivityIndicator,
} from 'react-native';

import AnnouncementContext, { AnnouncementContextProvider } from './context';

import Head from './Head';
import Body from './Body';
import Footer from './Footer';

function Switcher({ navigation }) {
  const { isLoading } = React.useContext(AnnouncementContext);

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
              <Head />
              <Body />
              <Footer navigation={navigation} />
            </ScrollView>
          </KeyboardAvoidingView>
        )
      }
    </>
  );
}

export default function AdsCreate({ navigation }) {
  return (
    <AnnouncementContextProvider>
      <Switcher navigation={navigation} />
    </AnnouncementContextProvider>
  );
}
