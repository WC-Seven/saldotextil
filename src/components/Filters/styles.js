import React from 'react';
import styled from 'styled-components';

export const Container = styled.View`
  height: 50px;
  margin: 0px 10px 0px;
  flex-direction: row;
`;

export const Button = ({ title, onPress }) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>{ title }</ButtonText>
  </ButtonContainer>
)

export const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 6px;
  flex: 1;
  margin: 2px;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #666;
  font-family: Poppins Medium;
  font-size: 14px;
  text-align: center;
`;