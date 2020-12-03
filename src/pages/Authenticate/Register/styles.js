/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { TextInputMask } from 'react-native-masked-text';

export const CenterContainer = styled.View`
  align-items: center;
  background-color: #fff;
  flex: 1;
  justify-content: center;
`;

export const Spinner = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#1f5da0',
})``;

export const Button = ({ title, disabled }) => (
  <ButtonContainer disabled={disabled}>
    <ButtonText>
      { title }
    </ButtonText>
  </ButtonContainer>
);

export const InlineForm = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const LastView = styled.View`
  height: 30px;
`;

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding-bottom: 30px;
  padding: 15px;
`;

export const Label = ({ title }) => (
  <LabelText>
    { title }
  </LabelText>
);

const LabelText = styled.Text`
  font-size: 14px;
  margin: 14px 0px 4px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.View`
  align-items: center;
  background-color: ${ props => props.disabled ? '#666' : '#2b7ed7' };
  border-radius: 4px;
  height: 50px;
  justify-content: center;
`;

export const Description = styled.Text`
  color: #aaa;
  font-family: Poppins Medium;
  margin-top: 5px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: Poppins Medium;
  font-size: 15px;
  padding-top: 3px;
  text-transform: capitalize;
`;

export const TextInputFormat = styled(TextInputMask)`
  background-color: #f2f2f2;
  border-radius: 4px;
  font-size: 15px;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 10px;
`;

export const TextInput = styled.TextInput`
  background-color: #f2f2f2;
  border-radius: 4px;
  font-family: Poppins Regular;
  font-size: 15px;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 10px;
`;

export const TextInputFill = styled.TextInput`
  background-color: #f2f2f2;
  border-radius: 4px;
  flex: 1;
  font-family: Poppins Regular;
  font-size: 15px;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 10px;
  margin-${props => props.side}: 5px;
`;
