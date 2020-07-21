/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

export const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.6);
  flex: 1;
`;

export const Window = styled.View`
  background-color: #fff;
  border-radius: 4px;
  margin: auto 20px;
  min-height: 100px;
  padding: 10px;
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
  background-color: #1f5da0;
  border-radius: 4px;
  height: 40px;
  justify-content: center;
  margin-top: 5px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: Poppins Regular;
`;

export const Label = ({ title }) => (
  <LabelText>
    { title }
  </LabelText>
);

export const LabelText = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  font-family: Poppins Regular;
`;
