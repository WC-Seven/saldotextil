/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

export const ModalButton = ({ title, left, onPress }) => (
  <ButtonContainer left={left} onPress={onPress}>
    <ButtonText>
      { title }
    </ButtonText>
  </ButtonContainer>
);
export const Container = styled.View`
  background-color: #fff;
  padding: 15px;
`;

export const HorizontalView = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

export const VerticalBreak = styled.View`
  width: 20px;
`;

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #1f5da0;
  border-radius: 5px;
  flex: 1;
  ${props => (props.left ? 'margin-left: 5px;' : '')}
  height: 40px;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: Poppins Regular;
  padding-top: 4px;
`;

export const DarkContainer = styled.View`
  background-color: rgba(0,0,0,0.6);
  flex: 1;
`;

export const Window = styled.View`
  background-color: #fff;
  border-radius: 4px;
  margin: auto 30px;
`;

export const ListItem = ({ title, last, onPress }) => (
  <ListItemContainer last={last} onPress={onPress}>
    <ListItemText>
      { title }
    </ListItemText>
  </ListItemContainer>
);

const ListItemText = styled.Text`
  font-family: Poppins Regular;
`;

const ListItemContainer = styled.TouchableOpacity`
  min-height: 40px;
  padding: 10px 20px;
  ${props => (props.last ? '' : 'border-bottom-width: 0.3px;')}
`;

export const Selected = styled.Text`
  border-bottom-width: 0.5px;
  font-size: 16px;
  margin-top: 10px;
  padding-bottom: 7px;
  font-family: Poppins Regular;
`;
