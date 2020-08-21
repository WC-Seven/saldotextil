import React from 'react';
import cep from 'cep-promise';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity, StatusBar, Alert, Keyboard, Platform, ToastAndroid, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';

import {
  CenterContainer, Spinner, Container, TextInput, TextInputFormat,
  TextInputFill, Label, InlineForm, LastView, Button, Description,
} from './styles';

import GeneralContext from '../../../context';
import { auth } from '../../../database/functions';

export default function Register({ navigation }) {
  const { setAuthUser } = React.useContext(GeneralContext);

  const [isLoading, setIsLoading] = React.useState(false);

  const [cnpjField, setCnpjField] = React.useState(null);
  const [cpfField, setCpfField] = React.useState(null);
  const [documentIsValid, setDocumentIsValid] = React.useState(false);

  const [agree, setAgree] = React.useState(false);

  const [register, setRegister] = React.useState({
    name: '',
    fantasy: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    landline: '',
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

  React.useEffect(() => {
    if (register.andress.cep.length === 10) {
      cep(register.andress.cep.replace('.', '').replace('-', ''))
        .then((data) => {
          setRegister({
            ...register,
            andress: {
              ...register.andress,
              state: data.state || register.andress.state,
              city: data.city || register.andress.city,
              neighborhood: data.neighborhood || register.andress.neighborhood,
              street: data.street || register.andress.street,
            }
          });
          Keyboard.dismiss();
        })
        .catch(() => {
          Alert.alert('Erro', 'O CEP informado é inválido', [{ text: 'Ok' }])
        });
    }
  }, [register.andress.cep]);

  React.useEffect(() => {

    // PF
    if (register.type.substring(0, 2) === 'pf' || register.type === '') {
      // clear cnpj field
      if (register.document.cnpj !== '') {
        setRegister({
          ...register,
          document: {
            ...register.document,
            cnpj: ''
          }
        });
      }

      // verify cpf
      if (register.document.cpf.length === 14) {
        const cpfIsValid = cpfField.isValid();
  
        if (cpfIsValid) {
          setDocumentIsValid(true);
          Keyboard.dismiss();
        } else {
          Alert.alert(
            'Erro',
            'Número de CPF Inválido',
            [
              { text: 'Ok' },
            ],
          );
        }
      } else {
        setDocumentIsValid(false);
      }
    }
    
    // PJ
    else if (register.type.substring(0, 2) === 'pj') {
      // clear cpf
      if (register.document.cpf !== '') {
        setRegister({
          ...register,
          document: {
            ...register.document,
            cpf: '',
          },
        });
      }

      // verify cnpj
      if (register.document.cnpj.length === 18) {
        const cnpjIsValid = cnpjField.isValid();

        if (cnpjIsValid) {
          setDocumentIsValid(true);
          Keyboard.dismiss();
        } else {
          Alert.alert(
            'Erro',
            'Número de CNPJ inválido',
            [
              { text: 'Ok' },
            ],
          );
        }
      } else {
        setDocumentIsValid(false);
      }
    }
    
    
    
  }, [register.document.cpf, register.document.cnpj, register.type]);

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
              <Picker.Item value="pf-aut" label="Autônomo" />
              <Picker.Item value="pj-com" label="Comércio" />
              <Picker.Item value="pj-ent" label="Entidade Filantrópica" />
              <Picker.Item value="pj-ind" label="Indústria" />
              <Picker.Item value="pj-ong" label="ONG" />
              <Picker.Item value="pf" label="Pessoa física" />
              <Picker.Item value="pj" label="Pessoa jurídica" />
              <Picker.Item value="pf-pre" label="Prestador de serviços" />
              <Picker.Item value="pf-rep" label="Representante" />
              <Picker.Item value="pf-out" label="Outros" />
            </Picker>
            {
              register.type.substring(0, 2) === '' || register.type.substring(0, 2) === 'pf' ? (
                <>
                  <Label title="Informações Pessoais" />
                  <TextInput
                    value={register.name}
                    onChangeText={value => setRegister({ ...register, name: value })}
                    placeholder="Nome *"
                  />
                  <TextInputFormat
                    type="cpf"
                    value={register.document.cpf}
                    onChangeText={
                      value => setRegister(
                        { ...register, document: { ...register.document, cpf: value } },
                      )
                    }
                    placeholder="CPF *"
                    ref={(ref) => setCpfField(ref)}
                  />
                </>
              ) : (
                <>
                  <Label title="Informações da Empresa" />
                  <TextInput
                    value={register.name}
                    onChangeText={value => setRegister({ ...register, name: value })}
                    placeholder="Razão Social *"
                  />
                  <TextInput
                    value={register.fantasy}
                    onChangeText={value => setRegister({ ...register, fantasy: value })}
                    placeholder="Nome Fantasia *"
                  />
                  <TextInputFormat
                    type="cnpj"
                    value={register.document.cnpj}
                    onChangeText={
                      value => setRegister(
                        { ...register, document: { ...register.document, cnpj: value } },
                      )
                    }
                    placeholder="CNPJ *"
                    ref={(ref) => setCnpjField(ref)}
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
              placeholder="Whatsapp *"
            />

            <TextInputFormat
              type="cel-phone"
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99)',
              }}
              value={register.landline}
              onChangeText={value => setRegister({ ...register, landline: value })}
              placeholder="Telefone Fixo"
            />

            <TextInput
              autoCompleteType="email"
              value={register.email}
              onChangeText={value => setRegister({ ...register, email: value })}
              placeholder="E-mail *"
            />
            <Description>
              Sua senha deve conter pelo menos 8 digitos.
            </Description>
            <TextInput
              secureTextEntry
              value={register.password}
              onChangeText={value => setRegister({ ...register, password: value })}
              placeholder="Senha *"
            />
            <TextInput
              secureTextEntry
              value={register.passwordConfirm}
              onChangeText={value => setRegister({ ...register, passwordConfirm: value })}
              placeholder="Confirme a senha *"
            />

            <Label title="Endereço" />
            <TextInputFormat
              keyboardType="numeric"
              type="custom"
              options={{
                mask: "99.999-999"
              }}
              value={register.andress.cep}
              onChangeText={
                value => setRegister(
                  { ...register, andress: { ...register.andress, cep: value } },
                )
              }
              placeholder="CEP *"
            />
            <TextInput
              value={register.andress.neighborhood}
              onChangeText={
                value => setRegister(
                  { ...register, andress: { ...register.andress, neighborhood: value } },
                )
              }
              placeholder="Bairro *"
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
                placeholder="Rua *"
              />
              <TextInput
                value={register.andress.number}
                onChangeText={
                  value => setRegister(
                    { ...register, andress: { ...register.andress, number: value } },
                  )
                }
                placeholder="Num. *"
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

            <InlineForm>
              <TextInputFill
                value={register.andress.city}
                onChangeText={
                  value => setRegister(
                    { ...register, andress: { ...register.andress, city: value } },
                  )
                }
                side="right"
                placeholder="Cidade *"
              />
              <TextInput
                value={register.andress.state}
                onChangeText={
                  value => setRegister(
                    { ...register, andress: { ...register.andress, state: value } },
                  )
                }
                placeholder="UF *"
              />
            </InlineForm>

            <InlineForm>
              <CheckBox
                disabled={false}
                value={agree}
                onValueChange={() => setAgree(!agree)}
                tintColors={{
                  true: '#2b7ed7'
                }}
                onCheckColor="#2b7ed7"
                onTintColor="#2b7ed7"
              />
              <Description>
                Você concorda com os <Text onPress={() => navigation.navigate('UserAgreement')} style={{ color: '#2b7ed7' }}>termos de uso</Text>
              </Description>
            </InlineForm>
            

            <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={() => {
                if (agree && documentIsValid) { 
                  setIsLoading(true);
                  setAgree(false);
                  auth.register(register, setAuthUser, () => setIsLoading(false));
                } else {
                  if (!agree) {
                    if(Platform.OS === 'android') {
                      ToastAndroid.showWithGravity(
                        "É necessário aceitar os termos de uso",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    } else {
                      Alert.alert(
                        'Confirmação necessária',
                        'Aceite os termos de uso para criar sua conta',
                        [{ text: 'Ok' }],
                      )
                    }
                  } else if (!documentIsValid) {
                    Alert.alert('Erro', 'Número de documento inválido', [{ text: 'Ok' }]);
                  }
                }
              }}
            >
              <Button disabled={!(agree && documentIsValid)} title="Cadastrar" />
            </TouchableOpacity>
            <LastView />
          </Container>
        )
      }
    </>
  );
}
