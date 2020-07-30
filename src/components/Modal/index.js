import React from 'react';
import { Modal, StatusBar, TouchableOpacity } from 'react-native';
import { Background, Window } from './styles';

export default function FilterModal({ status, options = [] }) {

  // options = [
  //   {
  //     title: 'Estado',
  //     options: [
  //       { name: 'Nenhum', action: () => req.setLocalization(''), active: req.localization === '' },
  //     ],
  //   },
  // ]

  return (
    <Modal animationType="fade" transparent visible={status.value}>
      <StatusBar barStyle="light-content" backgroundColor="#666" />
      
      <TouchableOpacity activeOpacity={1} style={{ backgroundColor: 'rgba(0,0,0,0.6)', flex: 1, height: 100 }} onPress={() => status.set(false)} />
      <Background>
        <Window
          close={() => status.set(false)}
          options={options}
        />
      </Background>
      <TouchableOpacity activeOpacity={1} style={{ backgroundColor: 'rgba(0,0,0,0.6)', flex: 1 }} onPress={() => status.set(false)} />
    </Modal>
  );
}
