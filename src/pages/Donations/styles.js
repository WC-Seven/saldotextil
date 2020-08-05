import React from 'react';
import styled from 'styled-components';

export const Container = styled.ScrollView`
  background-color: #fff;
  flex: 1;
  padding: 15px;
`;

export const Message = styled.Text`
  align-self: center;
  font-family: Poppins Regular;
  margin-top: 100px;
`;

export const BottomButton = ({ title, onPress }) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>
      { title }
    </ButtonText>
  </ButtonContainer>
);

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #fff;
  border-radius: 30px;
  bottom: 20px;
  elevation: 5;
  min-height: 60px;
  justify-content: center;
  left: 20px;
  position: absolute;
  right: 20px;
  z-index: 1;
`;

const ButtonText = styled.Text`
  color: #2b7ed7;
  font-family: Poppins Medium;
  font-size: 17px;
  padding-top: 3px;
  text-align: center;
`;
