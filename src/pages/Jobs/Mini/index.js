import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { user } from '../../../database/functions';

export default function MiniJob ({ item, navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [announcement, setAnnouncement] = React.useState(false); 
  
  React.useEffect(() => {
    user.detail(item.user, (response) => {
      setAnnouncement({
        ...item,
        user: response
      });

      setIsLoading(false);
    });
  }, []);

  return (
    <View
      key={item.uid}
      style={{ marginTop: 20, paddingHorizontal: 15, flexDirection: 'row' }}
    >
      {
        isLoading ? (
          <>
            <View
              style={{ backgroundColor: '#f2f2f2', height: 40, width: 40, borderRadius: 4, marginTop: 8 }}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <View style={{ borderRadius: 4, marginBottom: 4, height: 25, width: 180, backgroundColor: '#f2f2f2' }} />
              <View style={{ borderRadius: 4, marginBottom: 4, height: 20, width: 80, backgroundColor: '#f2f2f2' }}/>
              <View style={{ borderRadius: 4, marginBottom: 4, height: 20, width: 100, backgroundColor: '#f2f2f2' }} />
              <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 0.3, height: 10 }} />
            </View>
          </>
        ) : (
          <>
            <Image
              source={{ uri: announcement.userImage }}
              style={{ height: 40, width: 40, borderRadius: 4, marginTop: 8 }}
            />
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('DetailJob', { name: announcement.title, announcement })}
            >
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text
                  style={{ fontSize: 18, fontFamily: 'Poppins Medium', paddingTop: 2, flex: 1 }}
                >
                  { announcement.title }
                </Text>
                <Text style={{ fontFamily: 'Poppins SemiBold' }}>
                  { announcement.user.type.substring(0, 2) === 'pf' ? announcement.user.name : announcement.user.fantasy }
                </Text>
                <Text style={{ fontFamily: 'Poppins Medium' }}>
                  { `${announcement.city} - ${announcement.state}` }
                </Text>
                <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 0.3, height: 10 }} />
              </View>
            </TouchableWithoutFeedback>
          </>
        )
      }
    </View>
  )
}