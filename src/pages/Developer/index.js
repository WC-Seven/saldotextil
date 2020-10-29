import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';

// import { Container } from './styles';

const Developer = () => {
  return (
    <View
      contentContainerStyle={{ padding: 15 }}
      style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}
    >
      <Image
        style={{
          height: Dimensions.get('window').width,
          width: Dimensions.get('window').width,
          resizeMode: 'contain'
        }}
        source={require('../../../assets/images/din.png')}
      />

      <Text style={{ textAlign: 'center', fontFamily: 'Poppins Regular' }}>(47) 99935 9991</Text>
      <Text style={{ textAlign: 'center', fontFamily: 'Poppins Regular' }}>www.dinamicami.com.br</Text>
    </View>
  );
}

export default Developer;