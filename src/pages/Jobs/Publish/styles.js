import React from 'react';
import styled from 'styled-components';

export const LoadingContainer = () => (
  <CenteredView>
    <Spinner />
  </CenteredView>
);

const CenteredView = styled.View`
  align-items: center;
  background-color: #2b7ed7;
  flex: 1;
  justify-content: center;
`;

const Spinner = styled.ActivityIndicator.attrs({
  color: '#fff',
  size: 'large'
})``;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 15
  }
})`
  background-color: #fff;
  flex: 1;
`;

export const TextInput = styled.TextInput`
  background-color: #f2f2f2;
  border-radius: 8px;
  color: #333;
  font-family: Poppins Regular;
  font-size: 18px;
  height: 50px;
  margin-bottom: 10px;
  padding: 6px 15px 0px;
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
  background-color: #2b7ed7;
  border-radius: 8px;
  height: 50px;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: Poppins Medium;
  font-size: 16px;
  padding-top: 4px;
`;

export const Label = ({ title }) => (
  <LabelText type="label">
    { title }
  </LabelText>
);

const LabelText = styled.Text`
  color: #666;
  font-family: Poppins SemiBold;
  padding-top: 3px;
  ${props => props.type === 'label' ? 'margin-top: 10px; font-size: 17px;' : 'font-size: 26px;'}
`;

export const Title = ({ title }) => (
  <LabelText type="title">
    { title }
  </LabelText>
);