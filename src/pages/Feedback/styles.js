import React from 'react';
import styled from 'styled-components';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 15
  }
})`
  background-color: #fff;
  flex: 1;
`;

export const Title = styled.Text`
  color: #333;
  font-family: Poppins SemiBold;
  font-size: 28px;
`;

export const Description = styled.TextInput.attrs({
  multiline: true
})`
  background-color: #eee;
  border-radius: 4px;
  font-size: 16px;
  height: 200px;
  text-align-vertical: top;
  padding: 10px;
  margin-top: 10px;
`;

export const Button = ({ action, title }) => (
  <ButtonContainer onPress={action} >
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

export const AnnDetail = ({ ann }) => (
  <BladeView>
    <AnnAvatar source={{ uri: ann.image }} />
    <Text>
      { `Reportando "${ann.name}"` }
      { '\n' }
      { 'Agradecemos pela contribuição.' }
    </Text>
  </BladeView>
);

export const UserDetail = ({ user }) => (
  <BladeView>
    <Avatar source={{ uri: user.image }} />
    <Text>
      { `Reportando ${user.name}` }
      { '\n' }
      { 'Agradecemos pela contribuição.' }
    </Text>
  </BladeView>
)

const BladeView = styled.View`
  align-items: center;
  flex-direction: row;
  height: 100px;
  padding: 0px 10px;
  width: 100%;
`;

const Avatar = styled.Image`
  background-color: #eee;
  width: 50px;
  height: 50px;
  border-radius: 40px;
`;

const AnnAvatar = styled.Image`
  background-color: #eee;
  width: 50px;
  height: 50px;
  border-radius: 8px;
`;

const Text = styled.Text`
  font-family: Poppins Regular;
  margin-left: 10px;
  flex: 1;
`;