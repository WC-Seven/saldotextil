import React from 'react';
import { Icon } from 'react-native-elements';
import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px;
`;

export const Search = styled.TextInput`
  background-color: #f2f2f2;
  border-radius: 25px;
  font-size: 18px;
  font-family: Poppins Medium;
  height: 50px;
  padding: 5px 20px 0px;
`;

export const Bagde = ({ title, action }) => (
  <BadgeContainer onPress={action}>
    <Icon name="refresh" type="material-community" color="#F0F6FC" size={20} />
    <BadgeText>{ title }</BadgeText>
  </BadgeContainer>
);

export const BadgeBlade = styled.View`
  margin: 10px 0px;
  flex-direction: row;
`;

const BadgeContainer = styled.TouchableOpacity`
  background-color: #87B6E8;
  border-radius: 20px;
  padding: 6px 15px 3px;
  margin-right: 5px;
  flex-direction: row;
`;

const BadgeText = styled.Text`
  color: #F0F6FC;
  font-family: Poppins Medium;
  margin-left: 5px;
`;

export const Message = styled.Text`
  align-self: center;
  font-family: Poppins Medium;
  margin-top: 100px;
  color: #ccc;
`;
