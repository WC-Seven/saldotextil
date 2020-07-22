import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';

export const LoadingContainer = () => (
  <CenteredContainer>
    <Spinner />
  </CenteredContainer>
);

const CenteredContainer = styled.View`
  background-color: #fff;
  flex: 1;
  align-items :center;
  justify-content: center;
`;

const Spinner = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#2b7ed7',
})``;

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 15px;
`;

export const PickImage = ({ onPress }) => (
  <PickImageContainer onPress={onPress}>
    <Icon name="plus" size={60} color="#ccc" type="material-community" />
  </PickImageContainer>
);

export const ImagePicked = ({ onPress, source }) => (
  <PickImageContainer onPress={onPress} >
    <Image source={source} />
  </PickImageContainer>
);

const Image = styled.Image`
  height: 200px;
  width: 100%;
  border-radius: 10px;
`;

const PickImageContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  border: 1px dashed #ccc;
  height: 200px;
  justify-content: center;
`;

export const TextInput = styled.TextInput`
  height: 50px;
  border-radius: 4px;
  background-color: #f2f2f2;
  padding: 0px 10px;
  font-size: 20px;
  font-family: Poppins Medium;
  color: #333;
  margin-top: 10px;
  padding-top: 4px;
`;
export const Label = styled.Text`
  color: #333;
  font-family: Poppins SemiBold;
  font-size: 16px;
  margin-top: 20px;
`;
export const Description = styled.TextInput.attrs({
  multiline: true
})`
  background-color: #f2f2f2;
  border-radius: 4px;
  font-size: 16px;
  height: 300px;
  text-align-vertical: top;
  padding: 10px;
  margin-top: 10px;
`;

export const FlexView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Button = ({ onPress, title }) => (
  <ButtonContainer onPress={onPress} >
    <ButtonText>
      { title }
    </ButtonText>
  </ButtonContainer>
);

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #2b7ed7;
  border-radius: 4px;
  height: 40px;
  justify-content: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: Poppins Medium;
  font-size: 16px;
  margin-top: 6px;
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

const ListItemContainer = styled.TouchableOpacity`
  min-height: 40px;
  padding: 10px 20px;
  ${props => (props.last ? '' : 'border-bottom-width: 0.3px;')}
`;

const ListItemText = styled.Text`
  font-family: Poppins Regular;
`;
