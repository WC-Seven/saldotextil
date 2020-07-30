import React from 'react';
import styled from 'styled-components';
import { TextInputMask } from 'react-native-masked-text';

export const LoadingContainer = () => (
  <CenteredView>
    <Spinner />
  </CenteredView>
);

export const CenteredView = styled.View`
  align-items: center;
  background-color: #2b7ed7;
  flex: 1;
  justify-content: center;
`;

export const Spinner = styled.ActivityIndicator.attrs({
  size: 'large',
  color: 'white'
})``;

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 15px;
`;

export const TextInput = styled.TextInput`
  background-color: #f4f4f4;
  border-radius: 10px;
  font-family: Poppins Regular;
  font-size: 16px;
  height: 50px;
  margin-bottom: 10px;
  padding: 4px 15px 0px;
`;

export const MaskInput = styled(TextInputMask)`
  background-color: #f4f4f4;
  border-radius: 10px;
  font-family: Poppins Regular;
  font-size: 16px;
  height: 50px;
  margin-bottom: 10px;
  padding: 4px 15px 0px;
`;

export const Label = styled.Text`
  color: #666;
  font-family: Poppins Medium;
`;

export const Button = ({ title, onPress, enabled = true }) => (
  <ButtonContainer onPress={onPress} enabled={enabled}>
    <ButtonText>
      { title }
    </ButtonText>
  </ButtonContainer>
);

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: ${props => props.enabled ? "#2b7ed7" : "#AAA" };
  border-radius: 10px;
  height: 50px;
  justify-content: center;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: Poppins Medium;
  padding-top: 3px;
  max-width: 80%;
  text-align: center;
`;
