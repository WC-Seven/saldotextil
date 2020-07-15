import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 15px;
`;

export const PickImage = () => (
  <PickImageContainer>
    <Icon name="plus" size={40} color="#ccc" type="material-community" />
  </PickImageContainer>
);

const PickImageContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #ddd;
  border-radius: 10px;
  height: 200px;
  justify-content: center;
`;

export const TextInput = styled.TextInput`
  height: 50px;
  border-radius: 4px;
  background-color: #ddd;
  padding: 0px 10px;
  font-size: 20px;
  font-family: Poppins Medium;
  color: #333;
  margin-top: 10px;
  padding-top: 4px;
`;
export const Label = styled.Text`
  color: #333;
  font-family: Poppins SemiBold;
  font-size: 16px;
  margin-top: 20px;
`;
export const Description = styled.TextInput.attrs({
  multiline: true
})`
  background-color: #ddd;
  border-radius: 4px;
  font-size: 16px;
  height: 300px;
  text-align-vertical: top;
  padding: 10px;
  margin-top: 10px;
`;

export const FlexView = styled.KeyboardAvoidingView`
  flex: 1;
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
