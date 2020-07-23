import React from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

export const FilterBox = styled.View`
  padding: 15px 15px 0px 15px;
`;

export const Container = styled.ScrollView`
  background-color: #fff;
  flex: 1;
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
  borderColor: #666;
  borderWidth: 1px;
  borderRadius: 30px;
  height: 40px;
  justify-content: center;
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
    <MyAdsContainer onPress={() => navigation.navigate('FeedInspect', { name: item.title, item: item, type, adstype })}>
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
