import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';

export const LoadingContainer = () => (
  <CenteredView>
    <Spinner />
  </CenteredView>
);

const CenteredView = styled.View`
  align-items: center;
  background-color: #2b7ed7;
  flex: 1;
  justify-content: center;
`;

const Spinner = styled.ActivityIndicator.attrs({
  color: '#fff',
  size: 'large'
})``;

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
  padding: 15px;
`;

export const TextInput = styled.TextInput`
  background-color: #f2f2f2;
  border-radius: 8px;
  color: #333;
  font-family: Poppins Regular;
  font-size: 18px;
  height: 50px;
  margin-bottom: 10px;
  padding: 6px 15px 0px;
`;

export const Textarea = styled.TextInput`
  background-color: #f2f2f2;
  border-radius: 8px;
  color: #333;
  font-family: Poppins Regular;
  font-size: 18px;
  height: ${ props => props.numberOfLines ? props.numberOfLines * 50 : 50}px;
  margin-bottom: 10px;
  padding: 10px 15px 6px;
  text-align-vertical: top;
`;

export const Button = ({ title, onPress }) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>
      { title }
    </ButtonText>
  </ButtonContainer>
);

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #2b7ed7;
  border-radius: 8px;
  height: 50px;
  justify-content: center;
  margin: 15px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: Poppins Medium;
  font-size: 16px;
  padding-top: 4px;
`;

export const Label = ({ title }) => (
  <LabelText type="label">
    { title }
  </LabelText>
);

const LabelText = styled.Text`
  color: #666;
  font-family: Poppins SemiBold;
  padding-top: 3px;
  ${props => props.type === 'label' ? 'margin-top: 10px; font-size: 17px;' : 'font-size: 26px;'}
`;

export const Title = ({ title }) => (
  <LabelText type="title">
    { title }
  </LabelText>
);

export const ImagePicker = ({ image, onHandlePickImage, onHandleRemoveImage }) => {
  if (image === '') {
    return (
      <ImagePickerContainer onPress={onHandlePickImage}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="tree-outline" type="material-community" color="rgba(0,0,0,0.1)" />
            <Icon name="image-outline" type="material-community" color="rgba(0,0,0,0.1)" />
            <Icon name="tshirt-crew-outline" type="material-community" color="rgba(0,0,0,0.1)" />
          </View>
          <Text style={{ color: "rgba(0,0,0,0.1)", fontWeight: 'bold' }}>
            Adicione uma imagem
          </Text>
        </View>
      </ImagePickerContainer>
    );
  }

  return (
    <TouchableOpacity onPress={onHandleRemoveImage}>
      <Image source={{ uri: image }} />
    </TouchableOpacity>
  );
} 

const Image = styled.Image`
  width: ${Dimensions.get('window').width}px;
  min-height: 200px; 
`;

const ImagePickerContainer = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.02);
  min-height: 100px;
`;

export const DarkContainer = styled.View`
  background-color: rgba(0,0,0,0.6);
  flex: 1;
`;

export const Window = styled.View`
  background-color: #fff;
  border-radius: 4px;
  margin: 0px 30px;
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