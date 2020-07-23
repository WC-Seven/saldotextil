import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Linking, Alert } from 'react-native';

import GeneralContext from '../../../context';
import { announcement } from '../../../database/functions';

export const CvMiniature = ({ info }) => {
  return (
    <Container>
      <OwnerDescription>
        <FlexView>
          <Avatar source={{ uri: info.user.image }} />
          <TouchableOpacity
            onPress={() => Linking.openURL(info.image)}
          >
            <CvName>
              { `${info.user.name}\nBaixar currículo` }
            </CvName>
          </TouchableOpacity>
        </FlexView>
      </OwnerDescription>
      <Description>
        { info.description }
      </Description>
    </Container>
  )
}

export const Miniature = ({ info }) => {
  const navigation = useNavigation();
  const { currentUser } = React.useContext(GeneralContext);
  
  return (
    <Container>
      <OwnerDescription>
        <FlexView>
          <TouchableOpacity
            style={{ alignItems: 'center', flexDirection: 'row' }}
            onPress={() => navigation.navigate('User', { owner: currentUser.id === info.enterprise.id, user: info.enterprise })}
          >
            <Avatar source={{ uri: info.enterprise.image }} />
            <CvName>
              { `${info.enterprise.name}\n${info.city} - ${info.state}` }
            </CvName>
          </TouchableOpacity>
        </FlexView>

        <Menu
        >
          <MenuTrigger>
            <TouchableOpacity>
              <Icon
                name="dots-vertical"
                type="material-community"
                color="#333"
              />
            </TouchableOpacity>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ marginTop: 30 }}>
            <MenuOption style={{ padding: 10 }} text="Ver anúncio" onSelect={() => navigation.navigate('Detail', {
              name: info.title,
              image: info.image,
              enterprise: info.enterprise,
              description: info.description,
              phone: info.enterprise.phone
            })} />
            {
              info.id === currentUser.id ? (
                <>
                  <MenuOption style={{ padding: 10 }} text="Editar" onSelect={() => {
                    navigation.navigate('Update', { name: info.folder, item: info })
                  }} />
                  <MenuOption style={{ padding: 10 }} text="Excluir" onSelect={() => {
                    Alert.alert(
                      'Excluir anúncio',
                      'Essa ação é irreversível',
                      [
                        {
                          text: 'Cancelar',
                        },
                        {
                          text: 'Ok',
                          onPress: () => announcement.destroy('secondaryAnnouncements', info.folder, 'ads', [info.image], info.uid, () => {}),
                        },
                      ],
                    );
                  }} />
                </>
              ) : (
                <>
                  <MenuOption style={{ padding: 10 }} text="Reportar" onSelect={() => alert(info.title)} />
                </>
              )
            }
          </MenuOptions>
        </Menu>
      </OwnerDescription>
    

      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {
          name: info.title,
          image: info.image,
          enterprise: info.enterprise,
          description: info.description,
          phone: info.enterprise.phone
        })}
      >
        <Image source={{ uri: info.image }} />
        <Title>
          { info.title }
        </Title>
        <Description>
          { info.description }
        </Description>
      </TouchableOpacity>
    </Container>
  )
};

const FlexView = styled.View`
  align-items: center;
  flex: 1;
  flex-direction: row;
  padding-right: 20px;
`;

const OwnerDescription = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
`;

const Avatar = styled.Image`
  background-color: #f2f2f2;
  border-radius: 25px;
  height: 50px;
  width: 50px;
`;

const Name = styled.Text.attrs(props => ({
  numberOfLines: 1
}))`
  font-family: Poppins Medium;
  font-size: 16px;
  margin-top: 6px;
  margin-left: 10px;
  padding-right: 30px;
`;

const CvName = styled.Text.attrs(props => ({
  numberOfLines: 2
}))`
  font-family: Poppins Medium;
  font-size: 16px;
  margin-top: 6px;
  margin-left: 10px;
  padding-right: 30px;
`;

const Container = styled.View`
  width: 100%;
  height: auto;
  margin-top: 40px;
`;

const Image = styled.Image`
  border-radius: 10px;
  margin-bottom: 8px;
  overflow: hidden;
  height: 300px;
  resize-mode: cover;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 17px;
  font-family: Poppins Medium;
`;

const Description = styled.Text.attrs({
  numberOfLines: 4,
})`
  font-family: Poppins Regular;

`;


export const Loading = () => (
  <ExampleView>
    <ExampleHeader>
      <ExampleAvatar />
      <ExampleName />
    </ExampleHeader>
    <ExampleImage />
  </ExampleView>
);

const ExampleAvatar = styled.View`
  background-color: #f2f2f2;
  border-radius: 25px;
  height: 50px;
  width: 50px;
`;

const ExampleHeader = styled.View`
  align-items: center;
  flex-direction: row;
`;

const ExampleImage = styled.View`
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-bottom: 8px;
  height: 200px;
  width: 100%;
  margin-top: 10px;
`;

const ExampleName = styled.View`
  background-color: #f2f2f2;
  border-radius: 5px;
  height: 30px;
  width: 200px;
  margin-left: 10px;
`;

const ExampleView = styled.View`
  margin-top: 15px;
`;