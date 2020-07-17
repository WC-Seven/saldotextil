import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';

export const Container = styled.ScrollView`
  background-color: #fff;
  flex: 1;
`;


export const SubContainer = styled.View`
  flex: 1;
  padding: 30px 15px 0px;
`;

export const Image = styled.Image`
  background-color: #f2f2f2;
  width: ${Dimensions.get('window').width}px;
  min-height: ${(Dimensions.get('window').width/3)*2}px; 
`;

export const Text = styled.Text`
  color: #333;
  ${props => props.bold ? 'font-family: Poppins Bold;' : ''}
  ${props => props.semibold ? 'font-family: Poppins SemiBold;' : ''}
  ${props => props.medium ? 'font-family: Poppins Medium;' : ''}
  ${props => props.regular ? 'font-family: Poppins Regular;' : ''}
  ${props => props.light ? 'font-family: Poppins Light;' : ''}
  
  font-size: ${props => props.size}px;
  margin-top: ${props => -props.size + 10}px;
`;

export const Break = styled.View`
  height: ${props => props.size}px;
`;

export const Button = ({ title, onPress }) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>
      { title }
    </ButtonText>
  </ButtonContainer>
);

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #2B7ED7;
  border-radius: 10px;
  margin: 15px;
  min-height: 60px;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-family: Poppins Medium;
  font-size: 16px;
  margin-top: 6px;
`;
