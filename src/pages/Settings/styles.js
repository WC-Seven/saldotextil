import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
  padding: 15px;
`;

export const ListItem = ({ leftIcon, title, action, longAction = () => {}, danger = false }) => (
  <ListItemContainer onPress={action} onLongPress={() => {}}>
    <Icon name={leftIcon || 'circle'} type="material-community" color={ danger ? "#f00" : "#666"} size={30} />
    <ListItemText danger={danger}>{ title }</ListItemText>
  </ListItemContainer>
);

const ListItemContainer = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  height: 40px;
  margin-bottom: 10px;
`;

const ListItemText = styled.Text`
  color: ${props => props.danger ? '#f00' : '#666' };
  font-family: Poppins Medium;
  font-size: 16px;
  margin: 4px 0px 0px 10px;
`;