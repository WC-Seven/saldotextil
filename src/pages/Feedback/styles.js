import React from 'react';
import styled from 'styled-components';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
  padding: 15px;
`;

export const Title = styled.Text`
  color: #333;
  font-family: Poppins SemiBold;
  font-size: 28px;
`;

export const Description = styled.TextInput.attrs({
  multiline: true
})`
  background-color: #eee;
  border-radius: 4px;
  font-size: 16px;
  height: 200px;
  text-align-vertical: top;
  padding: 10px;
  margin-top: 10px;
`;

export const Button = ({ onPress, title }) => (
  <ButtonContainer onPress={onPress} >
    <ButtonText>
      { title }
    </ButtonText>
  </ButtonContainer>
);

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #2b7ed7;
  border-radius: 4px;
  height: 40px;
  justify-content: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: Poppins Medium;
  font-size: 16px;
  margin-top: 6px;
`;
