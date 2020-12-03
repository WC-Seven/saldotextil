/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Picker, { PickerItem } from '../../../../../../components/Picker';

export const Title = ({ title }) => (
  <TitleText>
    { title }
  </TitleText>
);

export const Label = ({ title }) => (
  <LabelText size={14}>
    { title }
  </LabelText>
);

export const LabelDescription = ({ title }) => (
  <LabelText size={12}>
    { title }
  </LabelText>
);

export const CenteredContainer = styled.View`
  align-items: center;
  background-color: #fff;
  flex: 1;
  justify-content: center;
`;

export const Spinner = styled.ActivityIndicator.attrs({
  size: 'large',
  color: 'black',
})``;

export const Container = styled.View`
  flex: 1;
`;

export const HorizontalContainer = styled.View`
  flex-direction: row;
`;

export const TextInput = styled.TextInput`
  background-color: #f2f2f2;
  border-radius: 4px;
  flex: 1;
  height: 40px;
  margin-right: 5px;
  padding: 0px 10px;
  font-family: Poppins Regular;
`;

export const Select = ({
  title, items, selectedValue, onValueChange,
}) => (
  <>
    <LabelText>
      { title }
    </LabelText>
    <Picker
      style={{ backgroundColor: Platform.OS === 'android' ? '#f2f2f2' : '#ffffff00', borderRadius: 4, flex: 1 }}
      value={selectedValue}
      onValueChange={onValueChange}
    >
      {
        items.map(item => (
          <PickerItem key={item.value} value={item.value} label={item.label} />
        ))
      }
    </Picker>
  </>
);

const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  font-family: Poppins SemiBold;
`;

const LabelText = styled.Text`
  text-transform: uppercase;
  margin-top: 10px;
  font-size: ${props => (props.size ? props.size : '14')}px;
  font-family: Poppins Regular;
`;

export const PickerBg = styled.View`
  background-color: #f2f2f2;
  border-radius: 4px;
  flex: 1;
`;
