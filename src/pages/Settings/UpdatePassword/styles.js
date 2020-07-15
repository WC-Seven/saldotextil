import React from 'react';
import styled from 'styled-components';

export const Container = styled.ScrollView`
  background-color: #fff;
  flex: 1;
  padding: 15px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 24px;
  font-family: Poppins SemiBold;
  margin-top: 24px;
`;

export const TextInput = styled.TextInput.attrs({
  secureTextEntry: true
})`
  background-color: #eee;
  border-radius: 10px;
  color: #333;
  font-family: Poppins Medium;
  font-size: 18px;
  height: 50px;
  margin-top: 10px;
  padding: 8px 20px 0px;
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
