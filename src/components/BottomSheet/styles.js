import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin: 0px 15px;
`;

export const ListContainer = styled.View`
  flex: 1;
`;

export const ListItem = styled.TouchableOpacity`
  align-items: center;
  border-radius: 8px;
  height: 60px;
  padding: 0 20px;
  flex-direction: row;
`;

export const ListLabel = styled.Text`
  color: #464646;
  font-family: Poppins Medium;
  font-size: 18px;
  margin-left: 10px;
  text-align-vertical: center;
  margin-top: 6px;
`;

export const BottomButton = styled.TouchableOpacity`
  align-items: center;
  border-radius: 8px;
  height: 50px;
  justify-content: center;
  margin-bottom: 15px;
`;

export const BottomText = styled.Text`
  color: #2B7ED7;
  font-size: 16px;
`;
