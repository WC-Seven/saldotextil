/* eslint-disable object-curly-newline */
import React from 'react';
import MultiSelect from 'react-native-multiple-select';

import AnnouncementContext from '../../../context';
import { Container, HorizontalContainer, Label, LabelDescription, Select, TextInput, Title } from './styles';

import article from './settings/article';
import articletype from './settings/articletype';
import composition from './settings/composition';

import colors from '../settings/colors';

export default function Malha({ item }) {
  const { body, setBody } = React.useContext(AnnouncementContext);

  React.useEffect(() => {
    if (item) {
      setBody({
        article: item.article ? item.article : '',
        articletype: item.articletype ? item.articletype : '',
        composition: item.composition ? item.composition : '',
        string: item.string ? item.string : '',
        stringtype: item.stringtype ? item.stringtype : '',
        stitchtype: item.stitchtype ? item.stitchtype : '',
        producttype: item.producttype ? item.producttype : '',
        width: item.width ? item.width : '',
        grammage: item.grammage ? item.grammage : '',
        colors: item.colors ? item.colors : [],
        quantity: item.quantity ? item.quantity.substring(0, item.quantity.indexOf(' ')) : '',
        measure: item.quantity ? item.quantity.substring(item.quantity.indexOf(' ')+1, item.quantity.length).replace('s', '') : '',
      });
    } else {
      setBody({
        article: '',
        articletype: '',
        composition: '',
        string: '',
        stringtype,
        stitchtype: '',
        producttype: '',
        width: '',
        grammage: '',
        colors: [],
        quantity: '',
        measure: '' 
      });
    }
  }, []);

  return (
    <Container>
      <Select
        title="Artigo"
        selectedValue={body.article}
        onValueChange={value => setBody({ ...body, article: value })}
        items={[{ value: '', label: 'Selecione' }, ...article]}
      />

      <Select
        title="Tipo de Artigo"
        selectedValue={body.articletype}
        onValueChange={value => setBody({ ...body, articletype: value })}
        items={[{ value: '', label: 'Selecione' }, ...articletype]}
      />

      <Select
        title="Composição"
        selectedValue={body.composition}
        onValueChange={value => setBody({ ...body, composition: value })}
        items={[{ value: '', label: 'Selecione' }, ...composition]}
      />

      <Label title="Fio" />
      <TextInput
        placeholder="Fio"
        value={body.string}
        onChangeText={value => setBody({ ...body, string: value })}
      />

      <Label title="Tipo de Fio" />
      <TextInput
        placeholder="Tipo de Fio"
        value={body.stringtype}
        onChangeText={value => setBody({ ...body, stringtype: value })}
      />

      <Label title="Tipo de Malha" />
      <TextInput
        placeholder="Tipo de malha"
        value={body.stitchtype}
        onChangeText={value => setBody({ ...body, stitchtype: value })}
      />

      <Label title="Tipo de Produto" />
      <TextInput
        placeholder="Tipo de Produto"
        value={body.producttype}
        onChangeText={value => setBody({ ...body, producttype: value })}
      />

      <Label title="Largura" />
      <LabelDescription title="Indique usando 'm' (metros)" />
      <TextInput
        placeholder="Largura"
        value={body.width}
        onChangeText={value => setBody({ ...body, width: value })}
      />

      <Label title="Gramatura" />
      <TextInput
        placeholder="Gramatura"
        value={body.grammage}
        onChangeText={value => setBody({ ...body, grammage: value })}
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
          items={[
            { value: '', label: 'Selecione' },
            { value: 'peça', label: 'Peça' },
            { value: 'metro', label: 'Metros' },
            { value: 'kg', label: 'Kg' },
          ]}
        />
      </HorizontalContainer>
    </Container>
  );
}
