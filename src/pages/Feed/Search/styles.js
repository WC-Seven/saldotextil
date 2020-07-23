import React from 'react';
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
`;

const BadgeText = styled.Text`
  color: #F0F6FC;
  font-family: Poppins Medium;
`;

export const Message = styled.Text`
  align-self: center;
  font-family: Poppins Medium;
  margin-top: 100px;
  color: #ccc;
`;
