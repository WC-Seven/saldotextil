import React from 'react';
import { Image, Modal, View, Text, TouchableOpacity, Linking } from 'react-native';

import { user } from '../../../database/functions';

export default function CvMini ({ item }) {
  const [announcement, setAnnouncement] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  React.useEffect(() => {
    user.detail(item.user, (response) => {
      setAnnouncement({ ...item, user: response });
    });
  }, []);

  return (
    <View style={{ padding: 15 }}>
      

      {
        !announcement ? (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ height: 50, width: 50, backgroundColor: '#f2f2f2', borderRadius: 10 }} />
            
            <View style={{ marginLeft: 10, justifyContent: 'space-between' }}>
              <View style={{ height: 24, width: 250, borderRadius: 10, backgroundColor: '#f2f2f2' }} />
              <View style={{ height: 22, width: 200, borderRadius: 10, backgroundColor: '#f2f2f2' }} />
            </View>
          </View>
        ) : (
          <>
            <Modal
              transparent
              animationType="fade"
              visible={isModalVisible}
              statusBarTranslucent        
              onRequestClose={() => setIsModalVisible(false)}
            >
              <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', flex: 1 }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => setIsModalVisible(false)} />
                <View style={{ marginHorizontal: 30, minHeight: 200, backgroundColor: '#fff', padding: 15 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      style={{ height: 90, width: 90, borderRadius: 10 }}
                      source={{ uri: announcement.user.image }}
                    />

                    <View style={{ marginLeft: 10}}>
                      <Text style={{ fontSize: 16, fontFamily: 'Poppins SemiBold' }}>{ announcement.user.name }</Text>
                      <Text style={{ fontSize: 16, fontFamily: 'Poppins Medium' }}>{ `${announcement.city} - ${announcement.state}` }</Text>
                    </View>
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontFamily: 'Poppins Regular' }}>{ `Produto pretendido - ${announcement.product}` }</Text>

                    <Text style={{ fontFamily: 'Poppins Regular' }}>{ `Experiência - ${announcement.experience}` }</Text>
                    <Text style={{ fontFamily: 'Poppins Regular' }}>{ `Produtos já representado - ${announcement.productExperience}` }</Text>

                    <View style={{ marginTop: 5, backgroundColor: '#f2f2f2', padding: 15, borderRadius: 10 }}>
                      <Text style={{ fontFamily: 'Poppins Regular', marginTop: 3 }} >
                        { announcement.observations ?? 'Sem observações' }
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => Linking.openURL(announcement.images[0])}
                    style={{ marginTop: 10, backgroundColor: '#2b7ed7', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
                  >
                    <Text style={{ color: '#fff', fontFamily: 'Poppins Medium', paddingTop: 4 }} >Ver currículo</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ flex: 1 }} onPress={() => setIsModalVisible(false)} />
              </View>
            </Modal>



            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setIsModalVisible(true)}>
              <Image style={{ height: 50, width: 50, backgroundColor: '#f2f2f2', borderRadius: 10 }} source={{ uri: announcement.user.image }} />
              
              <View style={{ marginLeft: 10, justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Poppins SemiBold' }}>{ announcement.user.name }</Text>
                <Text style={{ fontFamily: 'Poppins Regular' }}>{ `${announcement.user.andress.city} - ${announcement.user.andress.state}` }</Text>
                <Text style={{ fontFamily: 'Poppins Regular' }}>{ announcement.experience }</Text>
              </View>
            </TouchableOpacity>
          </>
        )
      }
    </View>
  );
}
