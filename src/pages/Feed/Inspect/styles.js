import React from 'react';
import styled from 'styled-components';

import { useNavigation } from '@react-navigation/native';

import { Icon } from 'react-native-elements';
import { Dimensions, Linking, Alert } from 'react-native';

import GeneralContext from '../../../context';
import { user } from '../../../database/functions';

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

export const ImageScrollView = ({ arr }) => (
  <ImageScrollViewContainer>
    {
      arr.map(item => (
        <ImageScrollViewImage key={item} source={{ uri: item }} />
      ))
    }
  </ImageScrollViewContainer>
);

export const PublishInspect = ({ uid, image }) => {
  const navigation = useNavigation();

  const { currentUser } = React.useContext(GeneralContext);
  const [inspectUser, setInspectUser] = React.useState(null);

  React.useEffect(() => {
    user.detail(uid, (response) => setInspectUser(response));
  }, []);
  
  return (
    <PublishInspectContainer>
      <PublishInpectHeader
        onPress={inspectUser ?
          () => navigation.navigate('User', { owner: currentUser.id === uid, user: inspectUser })
          : () => {}}>
        <PIfirstElement>
          <PublishInspectAvatar source={{ uri: image }} />
          {
            !inspectUser ? (
              <Spinner />
            ) : (
              <PublishInpectName>{`${inspectUser.name}\n${inspectUser.andress.city} - ${inspectUser.andress.state}`}</PublishInpectName>
            )
          }
        </PIfirstElement>
        <PIsecondElement>
          <Icon name="phone" type="material-community" color="#333" iconStyle={{ marginLeft: 5}} />
          <Icon name="whatsapp" type="material-community" color="#333" iconStyle={{ marginLeft: 5}} />
        </PIsecondElement>
      </PublishInpectHeader>
    </PublishInspectContainer>
  );
}

const Spinner = styled.ActivityIndicator.attrs({
  size: 'small', color: '#2B7ED7'
})`
  margin-left: 20px;
`;

export const BuyButton = ({ title, disabled = false, uid }) => {
  const [inspectUser, setInspectUser] = React.useState(null);

  React.useEffect(() => {
    user.detail(uid, (response) => setInspectUser(response));
  }, []);

  return (
    <BuyButtonContainer
      disabled={disabled}
      onPress={
        inspectUser ? () => {
          console.log('enabled');
          if (inspectUser.phone !== '') {
            let number = inspectUser.phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '').replace('+', '');
            if (number.substring(0, 2) !== '55') {
              number = `55${number}`;
            }
            
            if (!disabled) {
              Linking.openURL(`https://wa.me/${number}`);
            }
            } else {
            Alert.alert(
              'Erro',
              'Parece que este usuário teve algum problema com seu número de telefone',
              [
                { text: 'Ah, que pena' }
              ]
            );
            }
        } : () => {}
      }
    >
      {
        inspectUser ? (
          <BuyButtonText>
            { title }
          </BuyButtonText>
        ) : (
          <SpinnerWhite />
        )
      }
      
    </BuyButtonContainer>
  )
};

const SpinnerWhite = styled.ActivityIndicator.attrs({ size: 'small', color: '#fff' })``;

export const Detail = ({ type, item }) => (
  <DetailContainer>
    
      {
        type === 'outros' ? (
          <Table>
            {
              item.description ? (
                <Row>
                  <Value bg="#fafafa"><Text>{ item.description }</Text></Value>
                </Row>
              ) : (
                <Row>
                  <Value bg="#fafafa"><Text>Sem descrição</Text></Value>
                </Row>
              )
            }
          </Table>
        ) : type === 'confeccao' ? (
          <Table>
            {
              item.category ? (
                <Row>
                  <Value bg="#f2f2f2"><Text>Categoria</Text></Value>
                  <Value bg="#f2f2f2"><Text>{ item.category }</Text></Value>
                </Row>
              ) : <></>
            }
            {
              item.subcategory ? (
                <Row>
                  <Value bg="#fafafa"><Text>Subcategoria</Text></Value>
                  <Value bg="#fafafa"><Text>{ item.subcategory.map((item, index) => index === 0 ? item : `, ${item}`) }</Text></Value>
                </Row>
              ) : <></>
            }
            {
              item.colors ? (
                <Row>
                  <Value bg="#f2f2f2"><Text>Cores</Text></Value>
                  <Value bg="#f2f2f2"><Text>{ item.colors.map((item, index) => index === 0 ? item : `, ${item}`) }</Text></Value>
                </Row>
              ) : <></>
            }
            {
              item.sizes ? (
                <Row>
                  <Value bg="#fafafa"><Text>Cores</Text></Value>
                  <Value bg="#fafafa"><Text>{ item.sizes.map((item, index) => index === 0 ? item : `, ${item}`) }</Text></Value>
                </Row>
              ) : <></>
            }
          </Table>
        ) : (
          <Table>
            {
              item.article ? (
                <Row>
                  <Value bg="#f2f2f2"><Text>Artigo</Text></Value>
                  <Value bg="#f2f2f2"><Text>{ item.article }</Text></Value>
                </Row>
              ) : <></>
            }
            {
              item.articletype ? (
                <Row>
                  <Value bg="#fafafa"><Text>Tipo de artigo</Text></Value>
                  <Value bg="#fafafa"><Text>{ item.articletype }</Text></Value>
                </Row>
              ) : <></>
            }
            {
              item.composition ? (
                <Row>
                  <Value bg="#f2f2f2"><Text>Composição</Text></Value>
                  <Value bg="#f2f2f2"><Text>{ item.composition }</Text></Value>
                </Row>
              ) : <></>
            }
            {
              item.producttype ? (
                <Row>
                  <Value bg="#fafafa"><Text>Tipo de produto</Text></Value>
                  <Value bg="#fafafa"><Text>{ item.producttype }</Text></Value>
                </Row>
              ) : <></>
            }
            {
              item.stitchtype ? (
                <Row>
                  <Value bg="#f2f2f2"><Text>Tipo de malha</Text></Value>
                  <Value bg="#f2f2f2"><Text>{ item.stitchtype }</Text></Value>
                </Row>
              ) : <></>
            }
            {
              item.string ? (
                <Row>
                  <Value bg="#fafafa"><Text>Fio</Text></Value>
                  <Value bg="#fafafa"><Text>{ item.string }</Text></Value>
                </Row>
              ) : <></>
            }
            {
              item.stringtype ? (
                <Row>
                  <Value bg="#f2f2f2"><Text>Tipo de fio</Text></Value>
                  <Value bg="#f2f2f2"><Text>{ item.stringtype }</Text></Value>
                </Row>
              ) : <></>
            }
            {
              item.colors ? (
                <Row>
                  <Value bg="#fafafa"><Text>Cores</Text></Value>
                  <Value bg="#fafafa"><Text>{ item.colors.map((item, index) => index === 0 ? item : `, ${item}`) }</Text></Value>
                </Row>
              ) : <></>
            }
          </Table>
        )
      }
  </DetailContainer>
);

export const ImageScrollViewContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  pagingEnabled: true,
})``;

export const ImageScrollViewImage = styled.Image`
  background-color: #ddd;
  border-radius: 0px;
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
  background-color: ${props => props.disabled ? '#CCC' : '#2B7ED7' };
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