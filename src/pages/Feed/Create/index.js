/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import {
  ScrollView, KeyboardAvoidingView, View, ActivityIndicator,
} from 'react-native';

import AnnouncementContext, { AnnouncementContextProvider } from './context';

import Head from './Head';
import Body from './Body';
import Footer from './Footer';

function Switcher({ navigation, item }) {
  // item is received when the component is used to edit an announcement;
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
