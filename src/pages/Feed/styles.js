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
