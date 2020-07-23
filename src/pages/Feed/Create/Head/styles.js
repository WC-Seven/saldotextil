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
  padding: 15px 15px 0px 15px;
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
  background-color: #2b7ed7;
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

const TitleText = styled.Text`
  font-size: 24px;
  font-family: Poppins SemiBold;
  margin-top: 20px;
`;

export const Title = ({ title }) => (
  <TitleText>
    { title }
  </TitleText>
);

export const TextInput = styled.TextInput`
  background-color: #f2f2f2;
  border-radius: 4px;
  flex: 1;
  height: 40px;
  margin-right: 5px;
  padding: 0px 10px;
  font-family: Poppins Regular;
`;

const LabelText = styled.Text`
  text-transform: uppercase;
  margin-top: 10px;
  font-size: ${props => (props.size ? props.size : '14')}px;
  font-family: Poppins Regular;
`;

export const Label = ({ title }) => (
  <LabelText size={14}>
    { title }
  </LabelText>
);