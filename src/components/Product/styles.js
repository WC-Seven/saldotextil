import React from 'react';
import styled from 'styled-components';
import { Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

function numberToReal(number) {
  var number = number.toFixed(2).split('.');
  number[0] = "R$ " + number[0].split(/(?=(?:...)*$)/).join('.');
  return number.join(',');
}

// Configurations
export const Item = ({ data, type, adstype }) => {
  const navigation = useNavigation();
  const [isImageModalActive, setIsImageModalActive] = React.useState(false);
  const [imageModal, setImageModal] = React.useState([ '' ]);

  const noImage = 'https://firebasestorage.googleapis.com/v0/b/saldo-textil-ef063.appspot.com/o/defaults%2Fnoimageavailable.jpg?alt=media&token=1b7c718e-e6d6-49d0-a1c1-3eb7dae80c39';
  
  const price = parseFloat(data.price.substring(3, data.price.indexOf('/')-1));
  const measure = data.price.substring(data.price.indexOf('/'), data.price.length);

  return (
  <Container>
    {
      data.images ? (
        <Modal visible={isImageModalActive} transparent animationType="fade">
          <DarkContainer>
            <CloseButtonHeader onPress={() => setIsImageModalActive(false)}>
              <Icon name="close" type="material-community" color="#fff" />
            </CloseButtonHeader>

            <ImageScrollView>
                {
                  imageModal.map(item => (
                    <ImageBig source={{ uri: item }} />
                  ))
                }
            </ImageScrollView>
          </DarkContainer>
        </Modal>
      ) : <></>
    }
    <Touchable onPress={() => {
      if (data.images) {
        setImageModal(data.images)
        setIsImageModalActive(true);
      };
    }}>
      <Image source={{ uri: data.images ? data.images[0] : noImage }} />
    </Touchable>
    <Details>
      <Top>
        <Title>{ data.title }</Title>
        <Subtitle>{ `${data.city} - ${data.state}` }</Subtitle>

        <Price>
          { numberToReal(price) } <Measure>{ measure }</Measure>
        </Price>
      </Top>
      <Bottom>
        <Touchable onPress={() => {
          setImageModal([ data.userImage || noImage ]);
          setIsImageModalActive(true);
        }}>
          <ProfileImage source={{ uri: data.userImage || noImage }} />
        </Touchable>
        <Button onPress={() => navigation.navigate('FeedInspect', { name: data.title, item: data, type, adstype })}>
          <ButtonText>
            Ver detalhes
          </ButtonText>
        </Button>
      </Bottom>
    </Details>
  </Container>
)};

const ImageScrollView = styled.ScrollView.attrs({
  horizontal: true
})``;

const DarkContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.9);
  flex: 1;
`;

const CloseButtonHeader = styled.TouchableOpacity`
  align-items: center;
  align-self: flex-end;
  border-radius: 15px;
  height: 30px;
  justify-content: center;
  margin: 10px 10px 0 0;
  width: 30px;
`;

const ImageBig = styled.Image`
  background-color: #ccc;
  height: ${Dimensions.get('screen').width}px;
  width: ${Dimensions.get('screen').width}px;
  margin: auto;
`;

// Components
export const Container = styled.View`
  background-color: #fff;
  border-radius: 10px;
  elevation: 1;
  flex-direction: row;
  min-height: 140px;
  margin: 10px 10px 0px;
  padding: 10px;
`;

export const Touchable = styled.TouchableOpacity``;

export const Image = styled.Image`
  background-color: #f2f2f2;
  border-radius: 13px;
  height: 100px;
  width: 100px;
`;

export const Details = styled.View`
  flex: 1;
  flex-direction: column;
  padding-left: 10px;
`;

export const Title= styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #666;
  font-size: 15px;
  font-family: Poppins Medium;
`;

export const Subtitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #666;
  font-size: 13px;
  font-family: Poppins Regular;
`;

export const Top = styled.View`
  flex: 1;
`;

export const Bottom = styled.View`
  align-self: baseline;
  flex-direction: row;
`;

export const ProfileImage = styled.Image`
  background-color: #f2f2f2;
  border-radius: 15px;
  height: 30px;
  width: 30px;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  background-color: #F0F6FC;
  border-radius: 4px;
  flex: 1;
  height: 30px;
  justify-content: center;
  margin-left: 10px;
`;

export const ButtonText = styled.Text`
  color: #6A819A;
`;

export const Price = styled.Text`
  color: #666;
  font-family: Poppins Medium;
  font-size: 19px;
  margin: 10px 0px 0px;
`;

export const Measure = styled.Text`
  font-size: 13px;
`;
