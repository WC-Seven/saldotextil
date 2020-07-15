import React from 'react';
import styled from 'styled-components';

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
`;

export const Andress = styled.Text`
  font-family: Poppins Medium;
  font-size: 15px;
  margin-top: -10px;
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

export const MyAds = () => (
  <MyAdsContainer>
    <MyAdsImage />
    <MyAdsTitle>Camisas femininas sdfsdfs</MyAdsTitle>
  </MyAdsContainer>
);

const MyAdsContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 10px;
  flex: 1 0 auto;
  margin: 5px;
  padding: 10px;
  max-width: 45%;
`;

const MyAdsImage = styled.Image`
  background-color: #ccc;
  border-radius: 4px;

  height: 130px;
  width: 100%;
`;

const MyAdsTitle = styled.Text`
  color: #666;
  font-family: Poppins Medium;
  margin-top: 3px;
`;

export const SpacedView = styled.View`
  height: 80px;
`;
