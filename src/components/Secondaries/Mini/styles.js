import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';

export const Miniature = ({ info }) => {
  const navigation = useNavigation();
  return (
    <Container>
      <OwnerDescription>
        <FlexView>
          <TouchableOpacity
            style={{ alignItems: 'center', flexDirection: 'row' }}
            onPress={() => navigation.navigate('User', { owner: false })}
          >
            <Avatar source={{ uri: info.enterprisePhoto }} />
            <Name>
              { info.enterprise }
            </Name>
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
                phone: info.enterprisePhone
              })} />
            <MenuOption style={{ padding: 10 }} text="Editar" onSelect={() => alert(info.title)} />
            <MenuOption style={{ padding: 10 }} text="Desabilitar" onSelect={() => alert(info.title)} />
            <MenuOption style={{ padding: 10 }} text="Excluir" onSelect={() => alert(info.title)} />
            <MenuOption style={{ padding: 10 }} text="Reportar" onSelect={() => alert(info.title)} />
          </MenuOptions>
        </Menu>
      </OwnerDescription>
    

      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {
          name: info.title,
          image: info.image,
          enterprise: info.enterprise,
          description: info.description,
          phone: info.enterprisePhone
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

const Name = styled.Text.attrs({
  numberOfLines: 1
})`
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
