import React from 'react';
import styled from 'styled-components';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

const CenteredView = styled.View`
  height: 150px;
  align-items: center;
  padding-top: 15px;
`;

export const Spinner = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#2B7ED7'
})``;

export const Footer = () => (
  <CenteredView>
    <Spinner />
  </CenteredView>
);

export const Bar = styled.View`
  height: 60px;
  justify-content: center;
  margin-top: 50px;
  padding: 0px 10px;
`;

export const Search = styled.TextInput`
  background-color: #f2f2f2;
  border-radius: 25px;
  font-size: 18px;
  font-family: Poppins Medium;
  height: 50px;
  padding: 5px 20px 0px;
`;

export const FlatListHeader = styled.View`
  background-color: #fff;
  padding: 5px 0px;
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f2;
`;

