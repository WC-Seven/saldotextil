import React from 'react';
import styled from 'styled-components';

export const Container = styled.ScrollView`
  background-color: #fff;
  flex: 1;
  padding: 15px 15px 0px;
`;

export const SpacedView = styled.View`
  height: 60px;
`;

export const Message = styled.Text`
  align-self: center;
  font-family: Poppins Regular;
  margin-top: 100px;
`;

export const Interruptor = ({ data }) => (
  <VerticalView>
    {
      data.map (item => (
        <ButtonContainer selected={item.selected} onPress={item.action} key={item.title}>
          <ButtonText selected={item.selected}>{ item.title }</ButtonText>
        </ButtonContainer>
      ))
    }
  </VerticalView>
);

const VerticalView = styled.View`
  flex-direction: row;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0px 10px;
`;

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: ${props => !props.selected ? '#5B9BE0' : '#1D5A9A'};
  border-radius: 8px;
  flex: 1;
  height: 50px;
  justify-content: center;
  margin-right: 10px;
`;

const ButtonText = styled.Text`
  color: ${props => !props.selected ? '#F0F6FC' : '#F0F6FC'};
  font-family: Poppins Medium;
  padding-top: 3px;
`;