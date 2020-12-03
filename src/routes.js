import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Useless center component
import Others from './pages/Others';

// Tab Bar pages
import Feed from './pages/Feed';
import FeedInspect from './pages/Feed/Inspect';
import Profile from './pages/Profile';

// Stack pages
import Authenticate from './pages/Authenticate';
import Register from './pages/Authenticate/Register';
import ForgotPassword from './pages/Authenticate/ForgotPassword';

import Agents from './pages/Agents';
import CreateAnnouncement from './pages/Feed/Create';
import Donations from './pages/Donations';
import Feedback from './pages/Feedback';
import Jobs from './pages/Jobs';
import SearchAnnouncements from './pages/Feed/Search';
import Settings from './pages/Settings';
import UpdateProfile from './pages/Profile/Update';
import UpdatePassword from './pages/Settings/UpdatePassword';
import UpdateEmail from './pages/Settings/UpdateEmail';
import UpdateType from './pages/Settings/UpdateType';
import UserAgreement from './pages/UserAgreement';
import MyAnn from './pages/Feed/MyAnnouncements';
import Developer from './pages/Developer';

import CreateJob from './pages/Jobs/Create';
import DetailJob from './pages/Jobs/Detail';
import PublishJob from './pages/Jobs/Publish';

import CreateAgent from './pages/Agents/Create';
import DetailAgent from './pages/Agents/Detail';
import PublishAgent from './pages/Agents/Publish';

import CreateDonation from './pages/Donations/Create';
import DetailDonation from './pages/Donations/Detail';

// Secondaries
import SecondaryCreate from './components/Secondaries/Create';
import SecondaryDetail from './components/Secondaries/Detail';
import SecondaryPublish from './components/Secondaries/Publish';
import SecondaryUpdate from './components/Secondaries/Update';
import SecondarySearch from './components/Secondaries/Search';

import GeneralContext from './context';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function options(navigation, title) {
  return ({
    headerLeftContainerStyle: { marginLeft: 15 },
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" type="material-community" />
      </TouchableOpacity>
    ),
    headerTitle: title,
    headerTitleStyle: {
      fontFamily: 'Poppins Medium',
      marginTop: 6
    },
    headerStyle: {
      elevation: 0,
    }
  }) 
};

function optionsWithSearch(navigation, title) {
  return ({
    headerLeftContainerStyle: { marginLeft: 15 },
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" type="material-community" />
      </TouchableOpacity>
    ),
    headerTitle: title,
    headerTitleStyle: {
      fontFamily: 'Poppins Medium',
      marginTop: 6
    },
    headerStyle: {
      elevation: 0,
    },
    headerRight: () => (
      <TouchableOpacity
        style={{ backgroundColor: '#f2f2f2', padding: 4, borderRadius: 20 }}
        onPress={() => navigation.navigate('Search', { name: title })}
      >
        <Icon name="magnify" type="material-community" size={30} />
      </TouchableOpacity>
    ),
    headerRightContainerStyle: {
      marginRight: 15
    }
  });
}

export default function Routes () {
  const { isLogged } = React.useContext(GeneralContext);

  return (
    <NavigationContainer>
      {
        isLogged ? (
          <Stack.Navigator keyboardHandlingEnabled={false}>
            <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false, title: 'Principal' }} />
            <Stack.Screen name="MyAnnouncements" component={MyAnn} options={({ navigation }) => options(navigation, 'Meus anúncios')} />
            <Stack.Screen name="Agents" component={Agents} options={({ navigation }) => optionsWithSearch(navigation, 'Representantes')} />
            <Stack.Screen name="Donations" component={Donations} options={({ navigation }) => optionsWithSearch(navigation, 'Doações')} />
            <Stack.Screen name="Jobs" component={Jobs} options={({ navigation }) => optionsWithSearch(navigation, 'Empregos')} />

            <Stack.Screen name="CreateAnnouncement" component={CreateAnnouncement} options={({ navigation, route }) => options(navigation, route.params?.announcement ? 'Editar anúncio' : 'Criar anúncio')} />
            <Stack.Screen name="SearchAnnouncements" component={SearchAnnouncements} options={({ navigation }) => options(navigation, 'Pesquisar')} />
            <Stack.Screen name="Create" component={SecondaryCreate} options={({ navigation, route }) => options(navigation, `Criar anúncio - ${route.params.name}`)} />
            <Stack.Screen name="Detail" component={SecondaryDetail} options={({ navigation, route }) => options(navigation, route.params.name)} />
            <Stack.Screen name="Publish" component={SecondaryPublish} options={({ navigation, route }) => options(navigation, `Publicar Currículo - ${route.params.name}`)} />
            <Stack.Screen name="Update" component={SecondaryUpdate} options={({ navigation }) => options(navigation, 'Editar')} />
            <Stack.Screen name="Search" component={SecondarySearch} options={({ navigation, route }) => options(navigation, `Pesquisar ${route.params.name}`)} />
            <Stack.Screen name="Feedback" component={Feedback} options={({ navigation }) => options(navigation, 'Feedback')} />
            <Stack.Screen name="UserAgreement" component={UserAgreement} options={({ navigation }) => options(navigation, 'Termos de Uso')} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} options={({ navigation }) => options(navigation, 'Mudar senha')} />
            <Stack.Screen name="UpdateEmail" component={UpdateEmail} options={({ navigation }) => options(navigation, 'Mudar E-mail')} />
            <Stack.Screen name="UpdateType" component={UpdateType} options={({ navigation }) => options(navigation, 'Mudar Tipo de Registro')} />
            <Stack.Screen name="Settings" component={Settings} options={({ navigation }) => options(navigation, 'Configurações')} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={({ navigation }) => options(navigation, 'Editar Perfil')} />
            <Stack.Screen name="Developer" component={Developer} options={({ navigation }) => options(navigation, 'Desenvolvedor')} />
            
            <Stack.Screen name="CreateJob" component={CreateJob} options={({ navigation }) => options(navigation, 'Criar anúncio - Emprego')} />
            <Stack.Screen name="DetailJob" component={DetailJob} options={({ navigation }) => options(navigation, '')} />
            <Stack.Screen name="PublishJob" component={PublishJob} options={({ navigation }) => options(navigation, 'Anunciar currículo')} />

            <Stack.Screen name="CreateAgent" component={CreateAgent} options={({ navigation }) => options(navigation, 'Criar anúncio - Representantes')} />
            <Stack.Screen name="DetailAgent" component={DetailAgent} options={({ navigation, route }) => options(navigation, route.params.announcement.title ?? 'Vaga' )} />
            <Stack.Screen name="PublishAgent" component={PublishAgent} options={({ navigation }) => options(navigation, 'Anunciar currículo')} />

            <Stack.Screen name="CreateDonation" component={CreateDonation} options={({ navigation }) => options(navigation, 'Criar anúncio - Doação')} />
            <Stack.Screen name="DetailDonation" component={DetailDonation} options={({ navigation }) => options(navigation, 'Detalhes')} />

            <Stack.Screen 
              name="FeedInspect"
              component={FeedInspect}
              options={({ route }) => ({
                title: route.params.name,
                headerTitleStyle: {
                  fontFamily: 'Poppins Medium',
                  marginTop: 5
                },
              })}
            />
            <Stack.Screen
              name="User"
              component={Profile}
              options={({ navigation, route }) => ({
                headerStyle: {
                  elevation: 0,
                },
                headerTitle: '',
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Feedback', { user: route.params?.user.id })}>
                    <Icon name="flag" type="material-community" />
                  </TouchableOpacity>
                ),
                headerRightContainerStyle: {
                  marginRight: 20,
                }
              })}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Authenticate" component={Authenticate} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={({ navigation }) => options(navigation, 'Registre-se')} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={({ navigation }) => options(navigation, 'Redefinir senha')} />
            <Stack.Screen name="UserAgreement" component={UserAgreement} options={({ navigation }) => options(navigation, 'Termos de Uso')} />
          </Stack.Navigator>
        )
      }
    </NavigationContainer>
  );
}

function ProfileStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerStyle: {
            elevation: 0,
          },
          headerTitle: '',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Icon name="settings-outline" type="material-community" size={29} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            marginRight: 20,
          }
        })}
        initialParams={{ owner: true }}
      />
    </Stack.Navigator>
  )
}

function BottomTabs () {
  const { bsRef } = React.useContext(GeneralContext);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = 'card-text-outline';
          } else if (route.name === 'Profile') {
            iconName = 'account-outline';
          }

          return <Icon name={iconName} size={size+5} color={color} type="material-community" />
        },
      })}
      tabBarOptions={{
        activeTintColor: '#2B7ED7',
        style: {
          position: 'absolute',
          backgroundColor: '#f2f2f2',
          borderRadius: 50,
          margin: 15,
          height: 70,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        },
        showLabel: false
      }}
    >
      <Tabs.Screen name="Feed" component={Feed} />
      <Tabs.Screen
        name="Others"
        component={Others}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => bsRef.current.open()}
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Icon name="dots-horizontal" type="material-community" size={40} color="#666" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen name="Profile" component={ProfileStack} />
    </Tabs.Navigator>
  );
}
