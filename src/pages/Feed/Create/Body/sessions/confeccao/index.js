import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

import AnnouncementContext from '../../../context';

import {
  Container, HorizontalContainer, Label, Select, TextInput, Title,
  CenteredContainer, Spinner, LabelDescription,
} from './styles';

import femaleCategory from './settings/femaleCategory';
import maleCategory from './settings/maleCategory';
import infantCategory from './settings/infantCategory';

import colors from '../settings/colors';
import sizes from '../settings/sizes';

export default function Confeccao({ item }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const { body, setBody } = React.useContext(AnnouncementContext);

  React.useEffect(() => {
    if (item) {
      setBody({
        gender: item.gender ? item.gender : 'feminino',
        category: item.category ? item.category : 'Blusas',
        subcategory: item.subcategory ? item.subcategory : '',
        colors: item.colors ? item.colors : [],
        sizes: item.sizes ? item.sizes : [],
        quantity: item.quantity ? item.quantity.substring(0, item.quantity.indexOf(' ')) : '',
        measure: item.quantity ? item.quantity.substring(item.quantity.indexOf(' ')+1, item.quantity.length).replace('s', '') : ''
      });
    } else {
      setBody({
        gender: 'feminino',
        category: 'Blusas',
        subcategory: '',
        colors: [],
        sizes: [],
        quantity: '',
      });
    }
    setIsLoading(false);
  }, []);

  const category = React.useMemo(() => {
    switch (body.gender) {
      case 'feminino':
        return femaleCategory;
      case 'masculino':
        return maleCategory;
      default:
        return infantCategory;
    }
  }, [body.gender]);

  function returnDefaultCategory(gender) {
    switch (gender) {
      case 'feminino':
        return 'Blusas';
      case 'masculino':
        return 'Camisetas';
      default:
        return 'Bermudas e Shorts';
    }
  }

  return (
    <>
      {
        isLoading === true ? (
          <CenteredContainer>
            <Spinner />
          </CenteredContainer>
        ) : (
          <Container>
            <KeyboardAvoidingView enabled behavior="position">
              <Select
                selectedValue={body.gender}
                onValueChange={value => {
                  setBody({
                    ...body,
                    gender: value,
                    category: returnDefaultCategory(value),
                    subcategory: '',
                  });
                }}
                title="Público"
                items={[
                  { value: 'feminino', label: 'Feminino' },
                  { value: 'masculino', label: 'Masculino' },
                  { value: 'infantil', label: 'Infantil' },
                ]}
              />

              <Select
                selectedValue={body.category}
                onValueChange={value => {
                  setBody({
                    ...body,
                    category: value,
                    subcategory: '',
                  });
                }}
                title="Categorias"
                items={category}
              />
            </KeyboardAvoidingView>
            <Label title="Subcategorias" />
            <MultiSelect
              styleDropdownMenuSubsection={{ height: 40, borderRadius: 4, backgroundColor: '#f2f2f2' }}
              styleInputGroup={{ marginTop: 20 }}
              styleRowList={{ paddingVertical: 3 }}

              styleTextDropdown={{ fontSize: 15, paddingHorizontal: 10 }}
              selectText="(Selecione mais de uma)"
              textColor="#222"

              searchInputPlaceholderText="Buscar cores..."
              searchInputStyle={{ height: 40 }}

              uniqueKey="value"
              displayKey="label"

              items={category.find(item => item.label === body.category).subcategorias}
              selectedItems={body.subcategory}
              onSelectedItemsChange={
                selectedItems => setBody({ ...body, subcategory: selectedItems })
              }

              tagBorderColor="#1f5da0"
              tagRemoveIconColor="#1f5da0"
              tagTextColor="#1f5da0"

              submitButtonColor="#1f5da0"
              submitButtonText="Ok"
            />

            <Label title="Cores" />
            <LabelDescription title="Não é obrigatório em anúncios de compra" />
            <MultiSelect
              styleDropdownMenuSubsection={{ height: 40, borderRadius: 4, backgroundColor: '#f2f2f2' }}
              styleInputGroup={{ marginTop: 20 }}
              styleRowList={{ paddingVertical: 3 }}

              styleTextDropdown={{ fontSize: 15, paddingHorizontal: 10 }}
              selectText="(Selecione mais de uma)"
              textColor="#222"

              searchInputPlaceholderText="Buscar cores..."
              searchInputStyle={{ height: 40 }}

              uniqueKey="id"
              displayKey="name"

              items={colors}
              selectedItems={body.colors}
              onSelectedItemsChange={
                selectedItems => setBody({ ...body, colors: selectedItems })
              }

              tagBorderColor="#1f5da0"
              tagRemoveIconColor="#1f5da0"
              tagTextColor="#1f5da0"

              submitButtonColor="#1f5da0"
              submitButtonText="Ok"
            />

            <Label title="Tamanho" />
            <LabelDescription title="Não é obrigatório em anúncios de compra" />
            <MultiSelect
              styleDropdownMenuSubsection={{ height: 40, borderRadius: 4, backgroundColor: '#f2f2f2' }}
              styleInputGroup={{ marginTop: 20 }}
              styleRowList={{ paddingVertical: 3 }}

              styleTextDropdown={{ fontSize: 15, paddingHorizontal: 10 }}
              selectText="(Selecione mais de uma)"
              textColor="#222"

              searchInputPlaceholderText="Buscar tamanhos..."
              searchInputStyle={{ height: 40 }}

              uniqueKey="id"
              displayKey="name"

              items={sizes}
              selectedItems={body.sizes}
              onSelectedItemsChange={
                selectedItems => setBody({ ...body, sizes: selectedItems })
              }

              tagBorderColor="#1f5da0"
              tagRemoveIconColor="#1f5da0"
              tagTextColor="#1f5da0"

              submitButtonColor="#1f5da0"
              submitButtonText="Ok"
            />

            <Label title="Quantidade" />
            <HorizontalContainer>
              <TextInput
                value={body.quantity}
                onChangeText={value => setBody({ ...body, quantity: value })}
                placeholder="Ex.: 234"
                keyboardType="number-pad"
              />
              <Select
                selectedValue={body.measure}
                onValueChange={value => setBody({ ...body, measure: value })}
                items={[{ value: '', label: 'Selecione' }, { value: 'peça', label: 'Peça' }, { value: 'kg', label: 'Kg' }]}
              />
            </HorizontalContainer>
          </Container>
        )
      }
    </>
  );
}
