import React from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { Picker } from '@react-native-community/picker';
import {
  CenterContainer, Spinner, Container, TextInput, TextInputFormat,
  TextInputFill, Label, InlineForm, LastView, Button,
} from './styles';

import GeneralContext from '../../../context';
import { auth } from '../../../database/functions';

export default function Register() {
  const { setAuthUser } = React.useContext(GeneralContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [register, setRegister] = React.useState({
    name: '',
    fantasy: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    type: '',
    premium: false,
    document: {
      cpf: '',
      cnpj: '',
    },
    andress: {
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      complement: '',
      cep: '',
    },
  });

  return (
    <>
      {
        isLoading ? (
          <CenterContainer>
            <Spinner />
          </CenterContainer>
        ) : (
          <Container>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <Label title="Informações de cadastro" />
            <Picker
              selectedValue={register.type}
              onValueChange={value => setRegister({ ...register, type: value })}
              style={{
                backgroundColor: '#f2f2f2', height: 40, color: '#666', marginBottom: 10,
              }}
            >
              <Picker.Item disabled value="" label="Tipo de Registro (selecione)" />
              <Picker.Item value="pf" label="Pessoa Física" />
              <Picker.Item value="pj" label="Pessoa Jurídica" />
              <Picker.Item value="pf-rep" label="Representante" />
              <Picker.Item value="pj-ind" label="Indústria" />
              <Picker.Item value="pj-com" label="Comércio" />
            </Picker>
            {
              register.type === '' || register.type === 'pf' || register.type === 'pf-rep' ? (
                <>
                  <Label title="Informações Pessoais" />
                  <TextInput
                    value={register.name}
                    onChangeText={value => setRegister({ ...register, name: value })}
                    placeholder="Nome"
                  />
                  <TextInputFormat
                    type="cpf"
                    value={register.document.cpf}
                    onChangeText={
                      value => setRegister(
                        { ...register, document: { ...register.document, cpf: value } },
                      )
                    }
                    placeholder="CPF"
                  />
                </>
              ) : (
                <>
                  <Label title="Informações da Empresa" />
                  <TextInput
                    value={register.name}
                    onChangeText={value => setRegister({ ...register, name: value })}
                    placeholder="Razão Social"
                  />
                  <TextInput
                    value={register.fantasy}
                    onChangeText={value => setRegister({ ...register, fantasy: value })}
                    placeholder="Nome Fantasia"
                  />
                  <TextInputFormat
                    type="cnpj"
                    value={register.document.cnpj}
                    onChangeText={
                      value => setRegister(
                        { ...register, document: { ...register.document, cnpj: value } },
                      )
                    }
                    placeholder="CNPJ"
                  />
                </>
              )
            }

            {/* Number */}
            <TextInputFormat
              type="cel-phone"
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99)',
              }}
              value={register.phone}
              onChangeText={value => setRegister({ ...register, phone: value })}
              placeholder="Telefone"
            />

            <TextInput
              autoCompleteType="email"
              value={register.email}
              onChangeText={value => setRegister({ ...register, email: value })}
              placeholder="E-mail"
            />
            <TextInput
              secureTextEntry
              value={register.password}
              onChangeText={value => setRegister({ ...register, password: value })}
              placeholder="Senha"
            />
            <TextInput
              secureTextEntry
              value={register.passwordConfirm}
              onChangeText={value => setRegister({ ...register, passwordConfirm: value })}
              placeholder="Confirme a senha"
            />

            <Label title="Endereço" />
            <TextInput
              value={register.andress.neighborhood}
              onChangeText={
                value => setRegister(
                  { ...register, andress: { ...register.andress, neighborhood: value } },
                )
              }
              placeholder="Bairro"
            />
            <InlineForm>
              <TextInputFill
                value={register.andress.street}
                onChangeText={
                  value => setRegister(
                    { ...register, andress: { ...register.andress, street: value } },
                  )
                }
                side="right"
                placeholder="Rua"
              />
              <TextInput
                value={register.andress.number}
                onChangeText={
                  value => setRegister(
                    { ...register, andress: { ...register.andress, number: value } },
                  )
                }
                placeholder="Número"
              />
            </InlineForm>

            <TextInput
              value={register.andress.complement}
              onChangeText={
                value => setRegister(
                  { ...register, andress: { ...register.andress, complement: value } },
                )
              }
              placeholder="Complemento"
            />
            <TextInput
              value={register.andress.cep}
              onChangeText={
                value => setRegister(
                  { ...register, andress: { ...register.andress, cep: value } },
                )
              }
              placeholder="CEP"
            />

            <InlineForm>
              <TextInputFill
                value={register.andress.city}
                onChangeText={
                  value => setRegister(
                    { ...register, andress: { ...register.andress, city: value } },
                  )
                }
                side="right"
                placeholder="Cidade"
              />
              <TextInput
                value={register.andress.state}
                onChangeText={
                  value => setRegister(
                    { ...register, andress: { ...register.andress, state: value } },
                  )
                }
                placeholder="UF"
              />
            </InlineForm>

            <TouchableOpacity
              onPress={() => {
                setIsLoading(true);
                auth.register(register, setAuthUser, () => setIsLoading(false));
              }}
            >
              <Button title="Cadastrar" />
            </TouchableOpacity>
            <LastView />
          </Container>
        )
      }
    </>
  );
}
