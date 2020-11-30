import React from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

export const DarkBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.9);
`;

export const WindowWithOptions = ({ options, close }) => (
  <WindowContainer>
    {
      options.map(option => (
        <Option onPress={option.action}>
          <OptionText>
            { option.title }
          </OptionText>
        </Option>
      ))
    }

    <Option onPress={close}>
      <OptionText>Fechar</OptionText>
    </Option>
  </WindowContainer>
);

export const CloseButton = styled.TouchableOpacity`
  margin: 10px 10px 0px 0px;
  align-self: flex-end;
`;

export const EditImageButton = styled.TouchableOpacity`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 200px;
  bottom: 10px;
  height: 50px;
  justify-content: center;
  margin: 0px 10px 10px 0px;
  position: absolute;
  right: 10px;
  width: 50px;
`

export const Window = styled.View`
  background-color: #fff;
  border-radius: 4px;
  margin: 0px 30px;
  flex: 0 1 auto;
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

export const Image = styled.Image`
  height: ${Dimensions.get('window').width}px;
  width: ${Dimensions.get('window').width}px;
`;

const WindowContainer = styled.View`
  background-color: #fff;
  margin: auto 20px;
  padding: 10px;
`;

const Option = styled.TouchableOpacity`
  align-items: center;
  padding: 10px 10px;
  flex-direction: row;
`;

export const EditImageText = styled.Text`
  color: #fff;
  font-family: Poppins Medium;
  font-size: 16px;
  padding-top: 3px;
`;

const OptionText = styled.Text`
  color: #666;
  font-family: Poppins Medium;
`;

export const FilterBox = styled.View`
  padding: 15px 15px 0px 15px;
`;

export const Container = styled.ScrollView`
  background-color: #fff;
  flex: 1;
  padding-top: 20px;
`;

export const Avatar = styled.Image`
  border-radius: 50px;
  height: 100px;
  width: 100px;
`;

export const Bio = styled.View`
  margin: 0px 30px;
  flex-direction: row;
`;

export const BioDetails = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
`;

export const Name = styled.Text`
  font-family: Poppins Medium;
  font-size: 17px;
  margin-top: 5px;
  line-height: 19px;
`;

export const Andress = styled.Text`
  color: #666;
  font-family: Poppins Medium;
  font-size: 15px;
  margin-top: -6px;
`;

export const EditButton = styled.TouchableOpacity`
  align-items: center;
  border-color: #666;
  border-width: 1px;
  border-radius: 30px;
  height: 40px;
  justify-content: center;
  ${ props => props.big ? 'flex: 1; margin-right: 5px;' : 'min-width: 40px;'}
`;

export const MyAnnouncement = styled.View`
  justify-content: center;
  padding: 15px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const MyAds = ({ item, adstype, type }) => {
  const noImage = 'https://firebasestorage.googleapis.com/v0/b/saldo-textil-ef063.appspot.com/o/defaults%2Fnoimageavailable.jpg?alt=media&token=1b7c718e-e6d6-49d0-a1c1-3eb7dae80c39';
  const navigation = useNavigation();
  return (
    <MyAdsContainer onPress={() => navigation.push('FeedInspect', { name: item.title, item: item, type, adstype })}>
      <MyAdsImage source={{ uri: item.images ? item.images[0] : noImage }}  />
      <MyAdsTitle>{ item.title }</MyAdsTitle>
    </MyAdsContainer>
  );
}

const MyAdsContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  flex: 1 0 auto;
  margin: 5px;
  width: 45%;
`;

const MyAdsImage = styled.Image`
  background-color: #f2f2f2;
  border-radius: 4px;

  height: 130px;
  width: 100%;
`;

const MyAdsTitle = styled.Text.attrs({
  numberOfLines: 1
})`
  color: #666;
  font-family: Poppins Medium;
  margin-top: 3px;
`;

export const SpacedView = styled.View`
  height: 80px;
`;

export const Message = styled.Text`
  color: #ccc;
  font-family: Poppins Regular;
  align-self: center;
  margin-top: 100px;
  text-align: center;
  max-width: 300px;
`;
