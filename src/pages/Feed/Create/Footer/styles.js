/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

export const Button = ({ title, onPress }) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>
      { title }
    </ButtonText>
  </ButtonContainer>
);

export const Price = styled.TextInput.attrs({
  placeholder: 'R$ 00,00',
  keyboardType: 'number-pad',
})`
  background-color: #f2f2f2;
  border-radius: 4px;
  font-size: 20px;
  height: 40px;
  margin-top: 4px;
  padding: 5px 10px 0px;
  font-family: Poppins Regular;

`;


export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 15px;
`;

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #2b7ed7;
  border-radius: 4px;
  height: 40px;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: Poppins Regular;
  padding-top: 4px;
`;

export const Description = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 5,
  placeholder: 'Diga-nos mais sobre o seu produto',
})`
  background-color: #f2f2f2;
  border-radius: 4px;
  height: 200px;
  padding: 10px 10px;
  text-align-vertical: top;
  font-family: Poppins Regular;
`;

export const Label = ({ title }) => <LabelText>{ title }</LabelText>;

const LabelText = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  text-transform: uppercase;
  font-family: Poppins Regular;
`;

export const Text = styled.Text`
  font-size: 19px;
  font-family: Poppins Regular;
`;
