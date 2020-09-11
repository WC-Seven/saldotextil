import React from 'react';
import { Icon } from 'react-native-elements';
import styled from 'styled-components';

export const Container = styled.View`
  height: 50px;
  margin: 0px 10px 0px;
  flex-direction: row;
`;

export const Button = ({ title, onPress }) => (
  <ButtonContainer onPress={onPress}>
    <Icon name="close" color="transparent" type="material-community" />
    <ButtonText>{ title }</ButtonText>
    <Icon name="menu-down" color="#aaa" type="material-community" />
  </ButtonContainer>
)

export const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 6px;
  flex: 1;
  margin: 2px;
  justify-content: space-between;
  padding: 0px 5px;
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  color: #666;
  font-family: Poppins Medium;
  font-size: 14px;
  text-align: center;
`;