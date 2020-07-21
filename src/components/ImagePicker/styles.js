/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

export const Container = styled.View`
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

const ListItemText = styled.Text``;

const ListItemContainer = styled.TouchableOpacity`
  min-height: 40px;
  padding: 10px 20px;
  ${props => (props.last ? '' : 'border-bottom-width: 0.3px;')}
`;
