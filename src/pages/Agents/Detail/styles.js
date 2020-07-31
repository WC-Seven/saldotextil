import styled from 'styled-components';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0px 15px;
  background-color: #fff;
`;

export const Text = styled.Text`
  color: #333;
  font-family: Poppins ${props => props.bold ? 'SemiBold' : 'Regular'};
  font-size: ${props => props.size ?? 16}px;
`;