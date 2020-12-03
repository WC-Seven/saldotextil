import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Portal } from 'react-native-paper';

// import { Container } from './styles';

const Picker = ({
  value,
  onValueChange,
  children,
  style
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsMenuOpen(true)}
        style={{
          ...style,
          alignItems: "center",
          backgroundColor: '#f2f2f2',
          flexDirection: 'row',
          height: 50,
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingVertical: 10
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontFamily: 'Poppins Regular',
            marginBottom: -3.5,
            textTransform: 'capitalize'
          }}
        >
          { value }
        </Text>
        <Icon name="menu-down" type="material-community" color="#666" />
      </TouchableOpacity>

      <Portal>
        {
          isMenuOpen && (
            <TouchableOpacity
              activeOpacity={1}
              onPressIn={() => setIsMenuOpen(false)}
              style={{
                alignItems: 'center',
                backgroundColor: '#00000066',
                height: Dimensions.get('window').height,
                justifyContent: 'center',
                width: Dimensions.get('window').width
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  maxHeight: '60%',
                  overflow: 'hidden',
                  paddingVertical: 10,
                  width: '80%'
                }}
              >
                <ScrollView removeClippedSubviews onStartShouldSetResponder>
                  {
                    React.Children.map(children, child => (
                      React.cloneElement(child, { onPressFunction: (value) => {
                        onValueChange(value);
                        setIsMenuOpen(false);
                      } })
                    ))
                  }
                </ScrollView>
              </TouchableOpacity>
            </TouchableOpacity>
          )
        }
      </Portal>
    </View>
  );
}

export const PickerItem = ({ value, label,onPressFunction }) => {
  return (
    <TouchableOpacity
      onPress={() => onPressFunction(value)}
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        height: 45,
        paddingHorizontal: 10
      }}
    >
      <Text>
        { label ?? '' }
      </Text>
    </TouchableOpacity>
  )
}

export default Picker;
