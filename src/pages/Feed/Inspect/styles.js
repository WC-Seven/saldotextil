import React from 'react';
import styled from 'styled-components';

import { useNavigation } from '@react-navigation/native';

import { Icon } from 'react-native-elements';
import { Dimensions } from 'react-native';

export const Container = styled.ScrollView`
  background-color: #fff;
  flex: 1;
`;

export const OptionsButton = ({ onPress }) => (
  <OptionsButtonContainer onPress={onPress}>
    <Icon name="dots-vertical" type="material-community" /> 
  </OptionsButtonContainer>
);

export const RbSheetOption = ({ iconName, title, onPress }) => (
  <RbSheetOptionContainer onPress={onPress}>
    <Icon name={iconName || home} type="material-community" color="#666" iconStyle={{ marginRight: 10 }} size={30} />
    <RbSheetOptionText>
      { title }
    </RbSheetOptionText>
  </RbSheetOptionContainer>
)

export const ImageScrollView = () => (
  <ImageScrollViewContainer>
    <ImageScrollViewImage />
    <ImageScrollViewImage />
    <ImageScrollViewImage />
    <ImageScrollViewImage />
    <ImageScrollViewImage />
    <ImageScrollViewImage />
  </ImageScrollViewContainer>
);

export const PublishInspect = () => {
  const navigation = useNavigation();
  
  return (
    <PublishInspectContainer>
      <PublishInpectHeader onPress={() => navigation.navigate('User', { owner: false })}>
        <PIfirstElement>
          <PublishInspectAvatar />
          <PublishInpectName>{'Gabriel Henrique\nJaraguá do Sul - SC'}</PublishInpectName>
        </PIfirstElement>
        <PIsecondElement>
          <Icon name="phone" type="material-community" color="#333" iconStyle={{ marginLeft: 5}} />
          <Icon name="whatsapp" type="material-community" color="#333" iconStyle={{ marginLeft: 5}} />
        </PIsecondElement>
      </PublishInpectHeader>
    </PublishInspectContainer>
  );
}

export const BuyButton = ({ title, onPress }) => (
  <BuyButtonContainer onPress={onPress}>
    <BuyButtonText>
      { title }
    </BuyButtonText>
  </BuyButtonContainer>
);

export const Detail = () => (
  <DetailContainer>
    <Table>
      <Row>
        <Value bg="#fafafa"><Text>Categoria</Text></Value>
        <Value bg="#fafafa"><Text>Deed sads sadd</Text></Value>
      </Row>
      <Row>
        <Value bg="#f2f2f2"><Text>Subcategoria</Text></Value>
        <Value bg="#f2f2f2"><Text>Deed sads sadd</Text></Value>
      </Row>
      <Row>
        <Value bg="#fafafa"><Text>Categoria</Text></Value>
        <Value bg="#fafafa"><Text>Deed sads sadd</Text></Value>
      </Row>
      <Row>
        <Value bg="#f2f2f2"><Text>Subcategoria</Text></Value>
        <Value bg="#f2f2f2"><Text>Deed sads sadd</Text></Value>
      </Row>
    </Table>
  </DetailContainer>
);

export const ImageScrollViewContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  pagingEnabled: true,
})``;

export const ImageScrollViewImage = styled.Image`
  background-color: #ddd;
  border-radius: 10px;
  height: 300px;
  width: ${Dimensions.get('window').width}px;
`;

export const InsideContainer = styled.View`
  padding: 25px;
`;

export const Title = styled.Text`
  color: #333;
  font-family: Poppins SemiBold;
  font-size: 25px;
`;

export const Quantity = styled.Text`
  font-size: 20px;
  margin-top: 15px;
  font-family: Poppins Regular;
`;

export const Price = styled.Text`
  color: #333;
  font-family: Poppins Light;
  font-size: 45px;  
`;

const Text = styled.Text`
  font-family: Poppins Regular;
  flex-wrap: wrap;
  width: 100%;
`;

const DetailContainer = styled.View`
  border-radius: 10px;
  overflow: hidden;
  margin-top: 15px;
`;
const Table = styled.View``;
const Row = styled.View`
  flex-direction: row;
`;
const Value = styled.View`
  background-color: ${props=>props.bg};
  min-height: 50px;
  padding: 15px;
  width: 0;
  flex-grow: 1;
  flex-wrap: wrap;
`;

export const Cents = styled.Text`
  font-size: 20px;
  align-items: flex-start;
  padding-left: 10px;
  font-family: Poppins Regular;
`;

const OptionsButtonContainer = styled.TouchableOpacity`
  padding: 5px;
  border-radius: 20px;
`;

const RbSheetOptionContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  margin: 0px 10px;
  flex-direction: row;
  height: 40px;
  margin-bottom: 10px;
  padding: 0px 15px;
`;

const RbSheetOptionText = styled.Text`
  color: #333;
  font-family: Poppins Medium;
  font-size: 17px;
  margin-top: 6px;
  margin-left: 5px;
`;

const PublishInspectContainer = styled.View``;
const PublishInpectHeader = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 6px 0px 4px;
`;
const PIfirstElement = styled.View`
  flex-direction: row;
`;
const PIsecondElement = styled.View`
  flex-direction: row;
`;
const PublishInspectAvatar = styled.Image`
  background-color: #ccc;
  border-radius: 35px;
  height: 50px;
  width: 50px;
`;
const PublishInpectName = styled.Text`
  color: #333;
  font-family: Poppins Regular;
  font-size: 17px;
  margin-left: 20px;
`;

const BuyButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #2B7ED7;
  border-radius: 10px;
  min-height: 60px;
  justify-content: center;
`;

const BuyButtonText = styled.Text`
  color: white;
  font-family: Poppins Medium;
  font-size: 16px;
  margin-top: 6px;
`;