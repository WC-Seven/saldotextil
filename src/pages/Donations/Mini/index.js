import React from 'react';
import { View, Image, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { user } from '../../../database/functions';

export default function MiniDonation ({ navigation, item }) {
  const [isModalOpenned, setIsModalOpenned] = React.useState(false);
  const [donation, setDonation] = React.useState(null);

  React.useState(() => {
    user.detail(item.user, (response) => setDonation({ ...item, user: response }))
  }, []);

  if (!donation) return (
    <View style={{ marginVertical: 10, borderRadius: 10, minHeight: 80, flexDirection: 'row' }}>
      <Image style={{ height: 80, width: 80, backgroundColor: '#f0f0f0', borderRadius: 10 }} />

      <View style={{ marginLeft: 10 }}>
        <View style={{ backgroundColor: '#f2f2f2', height: 30, width: Math.round(Math.random()*4)*50+50, borderRadius: 4 }}/>
        <View style={{ marginTop: 8, backgroundColor: '#f2f2f2', height: 20, width: Math.round(Math.random()*4)*50+70, borderRadius: 4 }}/>
      </View>
    </View>
  );

  return (
    <>
      <Modal visible={isModalOpenned} transparent animationType="fade" onRequestClose={() => setIsModalOpenned(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <StatusBar backgroundColor="rgba(0,0,0,0.8)" barStyle="light-content" />
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setIsModalOpenned(false)} activeOpacity={1} />
            <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }} source={{ uri: donation.images[0] }} />
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setIsModalOpenned(false)} activeOpacity={1} />
        </View>
      </Modal>

      
      <View style={{ marginVertical: 10, borderRadius: 10, minHeight: 80, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => setIsModalOpenned(true)}>
          <Image style={{ height: 80, width: 80, backgroundColor: '#f0f0f0', borderRadius: 10 }} source={{ uri: donation.images[0] }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('DetailDonation', { item: donation })}
          style={{ marginLeft: 10, flex: 1 }}
          activeOpacity={1}
        >
          <Text style={{ color: '#333', fontSize: 18, fontFamily: 'Poppins Medium' }}>{ donation.title }</Text>
          <Text style={{ color: '#333', fontFamily: 'Poppins Regular', marginRight: 15 }}>{ `${donation.productDescription}\n${donation.city} - ${donation.state}` }</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
