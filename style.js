import React from 'react';
import styled from 'styled-components';

const AppLoading = () => (
  <CenteredContainer>
    <Spinner />
  </CenteredContainer>
)

const CenteredContainer = styled.View`
  align-items: center;
  background-color: #fff;
  flex: 1;
  justify-content: center;
`;

const Spinner = styled.ActivityIndicator.attrs({
  color: '#2B7ED7',
  size: 'large'
})``;

export default AppLoading;