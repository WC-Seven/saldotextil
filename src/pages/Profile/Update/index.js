import React from 'react';
import { Modal, BackHandler, Alert } from 'react-native';

import { Close, Container, Header, Horizontal, Save, SubTitle, TextInput, Title } from './styles';

export default function Update({ status }) {
  return (
    <Modal animationType="fade" transparent visible={status.value}>
      <Container>
        <Header>
          <Title>Editar Perfil</Title>
          <Close onPress={() => status.set(false)} />
        </Header>

        <SubTitle>
          Dados pessoais
        </SubTitle>

        <TextInput
          leftIcon="account-outline"
          placeholder="Nome de exibição"
        />
        <TextInput
          leftIcon="card-text-outline"
          placeholder="CPF"
        />
        <TextInput
          leftIcon="phone-outline"
          placeholder="Telefone"
        />
        <TextInput
          leftIcon="whatsapp"
          placeholder="Whatsapp"
        />

        <SubTitle>
          Endereço
        </SubTitle>

        <TextInput
          leftIcon="home-outline"
          placeholder="Rua"
        />

        <Horizontal>
          <TextInput
            leftIcon="numeric"
            placeholder="Número"
            vertical filled
          />
          <TextInput
            leftIcon="home-group"
            placeholder="Bairro"
            vertical filled
          />
        </Horizontal>

        <TextInput
          leftIcon="plus-circle-outline"
          placeholder="Complemento"
        />

        <Horizontal>
          <TextInput
            leftIcon="city"
            placeholder="Cidade"
            vertical filled
          />
          <TextInput
            leftIcon="city-variant"
            placeholder="UF"
            vertical
          />
        </Horizontal>

        <Save />
      </Container>
    </Modal>
  );
}
