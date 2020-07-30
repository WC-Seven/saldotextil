import React from 'react';
import { Alert, Keyboard } from 'react-native';
import cep from 'cep-promise';

import { Container, Header, Horizontal, Save, SubTitle, TextInput, Title, Description } from './styles';
import GeneralContext from '../../../context';
import { user } from '../../../database/functions';

export default function Update() {
  const { currentUser, setAuthUser } = React.useContext(GeneralContext);

  const [cnpjField, setCnpjField] = React.useState(null);
  const [cpfField, setCpfField] = React.useState(null);

  const [newUser, setNewUser] = React.useState({
    andress: {
      cep: currentUser.andress.cep,
      city: currentUser.andress.city,
      complement: currentUser.andress.complement,
      neighborhood: currentUser.andress.neighborhood,
      number: currentUser.andress.number,
      state: currentUser.andress.state,
      street: currentUser.andress.street,
    },
    createdAt: currentUser.createdAt,
    document: {
      cpf: currentUser.document.cpf,
      cnpj: currentUser.document.cnpj,
    },
    id: currentUser.id,
    image: currentUser.image,
    name: currentUser.name,
    phone: currentUser.phone,
    landline: currentUser.landline,
    premium: currentUser.premium,
    type: currentUser.type
  });

  React.useEffect(() => {
    if (newUser.andress.cep.length === 10) {
      cep(newUser.andress.cep.replace('.', '').replace('-', ''))
        .then((data) => {
          setNewUser({
            ...newUser,
            andress: {
              ...newUser.andress,
              state: data.state || newUser.andress.state,
              city: data.city || newUser.andress.city,
              neighborhood: data.neighborhood || newUser.andress.neighborhood,
              street: data.street || newUser.andress.street,
            }
          });
          Keyboard.dismiss();
        })
        .catch(() => {
          Alert.alert('Erro', 'O CEP informado é inválido', [{ text: 'Ok' }])
        });
    }
  }, [newUser.andress.cep]);

  return (
    <Container>
      <SubTitle>
        Dados pessoais
      </SubTitle>

      <TextInput
        value={newUser.name}
        onChangeText={(s) => setNewUser({ ...newUser, name: s })}
        leftIcon="account-outline"
        placeholder="Nome de exibição"
      />
      
      <TextInput
        value={newUser.phone}
        onChangeText={(s) => setNewUser({ ...newUser, phone: s })}
        leftIcon="whatsapp"
        placeholder="Whatsapp"
        type="cel-phone"
      />
      
      <TextInput
        value={newUser.landline}
        onChangeText={(s) => setNewUser({ ...newUser, landline: s })}
        leftIcon="phone"
        placeholder="Telefone"
        type="cel-phone"
      />

      <SubTitle>
        Endereço
      </SubTitle>

      <TextInput
        value={newUser.andress.cep}
        onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, cep: s } })}
        leftIcon="map-marker"
        placeholder="CEP"
      />

      <TextInput
        value={newUser.andress.street}
        onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, street: s } })}
        leftIcon="home-outline"
        placeholder="Rua"
      />

      <Horizontal>
        <TextInput
          value={newUser.andress.number}
          onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, number: s } })}
          leftIcon="numeric"
          placeholder="Número"
          vertical filled
        />
        <TextInput
          value={newUser.andress.neighborhood}
          onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, neighborhood: s } })}
          leftIcon="home-group"
          placeholder="Bairro"
          vertical filled
        />
      </Horizontal>

      <TextInput
        value={newUser.andress.complement}
        onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, complement: s } })}
        leftIcon="plus-circle-outline"
        placeholder="Complemento"
      />

      <Horizontal>
        <TextInput
          value={newUser.andress.city}
          onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, city: s } })}
          leftIcon="city"
          placeholder="Cidade"
          vertical filled
        />
        <TextInput
          value={newUser.andress.state}
          onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, state: s } })}
          leftIcon="city-variant"
          placeholder="UF"
          vertical
        />
      </Horizontal>

      <Description>
        Se quiser modificar o tipo de registro, CPF, CNPJ, E-mail ou Senha, vá para configurações.
      </Description>

      <Save onPress={() => user.update(newUser, () => status.set(false), setAuthUser) } />
    </Container>
  );
}
