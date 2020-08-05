import React from 'react';
import { StatusBar, Platform, Alert } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import Routes from './src/routes';
import BottomSheet from './src/components/BottomSheet'
import GeneralContext, { GeneralContextProvider } from './src/context';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  })
});

export default function App() {
  const { isLogged, setAuthUser, currentUser } = React.useContext(GeneralContext);
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token)
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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
          <MenuProvider>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <GeneralContextProvider>
              <BottomSheet />
              <Routes />
            </GeneralContextProvider>
          </MenuProvider>
        )
      }
    </>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = status;
  
  if (status !== 'granted') {
    const { status } = await Permission.askAsync(Permission.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') { return; }

  token = await Notifications.getExpoPushTokenAsync();

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF2B7ED7',
    });
  }

  fetch('https://push-services.herokuapp.com/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      application: "1",
      token: token.data,
    })
  }).then((response) => {
    response.json().then((data) => {
      switch(data.code) {
        case 'success-subscribe': break;
        case 'already-subscrived': break;
        case 'error-subscribe': 
          Alert.alert('Erro', 'Erro ao inscrever-se para notificações', [{ text: 'Ok' }]);
          break;
      }
    });
  });

  return token;
}
