/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { BlurView } from 'expo-blur';
import styled from 'styled-components';

import AnnouncementContext from '../context';

export const ImageLabel = ({ title }) => (
  <LabelTitle>
    { title }
  </LabelTitle>
);

const LabelTitle = styled.Text`
  font-size: 16px;
  padding: 20px 0px 0px 20px;
  font-family: Poppins SemiBold;
`;

export const Imagepicker = ({ onPress }) => (
  <ImagePickerElement onPress={onPress}>
    <Icon name="plus" type="material-community" size={50} color="#ccc" />
  </ImagePickerElement>
);

export const ImagePickerElement = styled.TouchableOpacity`
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 4px;
  height: 100px;
  justify-content: center;
  margin-left: 10px;
  width: 100px;
`;

export const ImageViewer = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
})`
  flex-direction: row;
  padding: 5px 0px 0px 7px;
`;

export const Image = ({ index, source }) => {
  const [intensity, setIntensity] = React.useState(0);
  const { head, setHead } = React.useContext(AnnouncementContext);

  function showRemove() {
    if (intensity === 0) {
      setIntensity(80);
      setTimeout(() => {
        setIntensity(0);
      }, 2000);
    } else {
      console.log(index);

      if (index !== undefined) {
        const tempArr = head.images;
        tempArr.splice(index, 1);
        setHead({ ...head, images: tempArr });
      }
    }
  }

  return (
    <TouchableOpacity onPress={() => showRemove()}>
      <ImageContainer source={source}>
        <BlurView style={{ flex: 1, alignItems: 'flex-end', padding: 5 }} intensity={intensity} tint="dark">
          <IconClose status={intensity > 0} />
        </BlurView>
      </ImageContainer>
    </TouchableOpacity>
  );
};

const IconClose = styled(Icon).attrs(props => ({
  name: 'close-circle',
  type: 'material-community',
  color: props.status ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
}))``;


const ImageContainer = styled.ImageBackground`
  border-radius: 4px;
  height: 100px;
  margin-left: 10px;
  overflow: hidden;
  width: 100px;
`;


export const ImagePickerContainer = styled.View`
  background-color: #fff;
`;
