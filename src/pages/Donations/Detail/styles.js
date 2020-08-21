import styled from 'styled-components';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Image = styled.Image`
  background-color: #f2f2f2;
  width: ${Dimensions.get('window').width}px;
  height: 150px;
`;

export const DarkContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.8);
  flex: 1;
`;

export const FullImage = styled.Image`
  background-color: #f2f2f2;
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').width}px;
`;

export const Text = styled.Text`
  color: ${props => props.muted ? '#aaa' : '#333'};
  font-family: Poppins ${props => props.weight ?? 'Regular'};
  font-size: ${props => props.size ?? 14}px;
  margin-top: ${props => props.top ?? 0}px;
`;

export const DetailBlade = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 10px 0px;
  borderTopWidth: 0.3px;
  borderBottomWidth: 0.3px;
`;
