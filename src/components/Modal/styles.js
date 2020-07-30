import React from 'react';
import styled from 'styled-components';

export const Background = styled.ScrollView`
  background-color: rgba(0, 0, 0, 0.6);
  flex: 0 1 auto;
`;

export const Window = ({ close, options }) => (
  <Container>
    {
      options.map(item => (
        <>
          <OptionHead key={item.title}>{ item.title }</OptionHead>
          <Options>
            {
              item.options?.map((n) => (
                <Option key={n.name} title={n.name} active={n.active} action={n.action} />
              ))
            }
          </Options>
        </>
      ))
    }
    <CloseButton onPress={() => close()}>
      <CloseText>Fechar</CloseText>
    </CloseButton>
  </Container>
);

const Container = styled.View`
  background-color: #fff;

  margin: 0px 30px;
  min-height: 100px;
  padding: 15px;
`;

const OptionHead = styled.Text`
  font-family: Poppins Medium;
  margin-top: 4px;
`;

const Options = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Option = ({ title, active, action }) => (
  <OptionContainer active={active} onPress={action}>
    <OptionText active={active}>{ title }</OptionText>
  </OptionContainer>
);

const OptionContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: ${ props => props.active ? '#87B6E8' : '#F0F6FC' };
  border-radius: 6px;
  flex: 1 0 auto;
  height: 28px;
  justify-content: center;
  margin: 0 5px 8px;
  padding: 0 8px;
`;

const OptionText = styled.Text`
  color: ${ props => props.active ? '#F0F6FC' : '#6A819A' };
  font-size: 12px;
  font-family: Poppins Medium;
  margin-top: 3px;
`;

const CloseButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #eee;
  border-radius: 4px;
  height: 40px;
  justify-content: center;
  margin-top: 10px;
`;

const CloseText = styled.Text`
  color: #666;
  font-family: Poppins Regular;
  font-size: 14px;
  margin-top: 5px;
`;
