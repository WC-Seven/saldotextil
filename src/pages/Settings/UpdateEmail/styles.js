import React from 'react';
import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 15px;
`;

export const LoadingContainer = ({ message }) => (
  <CenteredView>
    {
      message === '' ? (
        <Spinner />
      ) : (
        <Message>
          { message }
        </Message>
      )
    }
  </CenteredView>
);

const Message = styled.Text`
  color: #fff;
  font-family: Poppins SemiBold;
  font-size: 20px;
  max-width: 80%;
  text-align: center;
  align-self: center;
`;

const CenteredView = styled.View`
  background-color: #2b7ed7;
  flex:1;
  justify-content: center;
`;

const Spinner = styled.ActivityIndicator.attrs({
  color: '#fff',
  size: 'large'
})``;

export const Title = styled.Text`
  color: #333;
  font-size: 24px;
  font-family: Poppins SemiBold;
  padding-top: 10px;
`;

export const Break = styled.View`
  height: 25px;
`;

export const TextInput = styled.TextInput`
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