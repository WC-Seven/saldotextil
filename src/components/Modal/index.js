import React from 'react';
import { Modal, StatusBar } from 'react-native';
import { Background, Window } from './styles';

export default function FilterModal({ status, options = [] }) {

  // options = [
  //   {
  //     title: 'Estado',
  //     options: [
  //       { name: 'Nenhum', action: () =>req.setLocalization(''), active: req.localization === '' },
  //     ],
  //   },
  // ]

  return (
    <Modal animationType="fade" transparent visible={status.value}>
      <StatusBar barStyle="light-content" backgroundColor="#666" />
      <Background>
        <Window
          close={() => status.set(false)}
          options={options}
        />
      </Background>
    </Modal>
  );
}
