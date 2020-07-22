/* eslint-disable no-restricted-globals */
import { Alert } from 'react-native';
import { announcement } from '../../../../database/functions';

export async function verify(data, navigation, setIsLoading) {
  function showError(message) {
    return (
      Alert.alert(
        'Erro',
        message,
        [
          { text: 'Ok' },
        ],
      )
    );
  }

  if (data.type === '') {
    showError('Selecione o tipo de produto');
    return true;
  } if (!data.measure || data.measure === '') {
    showError('Selecione uma medida válida para a quantia inserida');
    return true;
  }

  // Verificação de dados para confecção
  if (data.type === 'confeccao') {
    if (data.adstype === '') {
      showError('Selecione o tipo de anúncio.');
      return true;
    }
    if (data.title === '') {
      showError('Defina um título para seu anúncio.');
      return true;
    }

    if (data.adstype === 'selling') {
      if (!data.images[0]) {
        showError('Insira pelo menos uma imagem do seu produto.');
        return true;
      } if (data.colors[0] === '' || data.colors === '') {
        showError('Selecione ao menos uma cor.');
        return true;
      } if (data.sizes[0] === '' || data.sizes === '') {
        showError('Selecione ao menos um tamanho.');
        return true;
      }
    }

    if (data.category === '') {
      showError('Selecione uma categoria.');
      return true;
    } if (data.gender === '') {
      showError('Selecione o gênero');
      return true;
    } if (data.quantity === 0 || !data.quantity || isNaN(data.quantity) === true) {
      showError('Selecione uma quantidade válida.');
      return true;
    } if (data.measure === '') {
      showError('Selecione uma medida válida.');
      return true;
    } if (!data.subcategory[0]) {
      showError('Selecione uma subcategoria');
      return true;
    }
  } else if (data.type === 'malha') {
    if (data.adstype === '') {
      showError('Seleocione o tipo de anúncio.');
      return true;
    } if (data.quantity === 0 || !data.quantity || isNaN(data.quantity)) {
      showError('Insira uma quantidade válida.');
      return true;
    } if (data.article === '' || !data.article || !data.article[0]) {
      showError('Selecione um artigo.');
      return true;
    } if (!data.articletype[0]) {
      showError('Selecione um tipo de artigo.');
      return true;
    } if (!data.composition[0]) {
      showError('Selecione uma composição.');
      return true;
    }

    if (data.adstype === 'selling') {
      if (!data.images[0]) {
        showError('Insira pelo menos uma imagem do seu produto.');
        return true;
      } if (!data.colors[0] || data.colors === '') {
        showError('É necessário informar a cor do produto.');
        return true;
      } if (!data.grammage || data.grammage === '') {
        showError('É necessário informar a gramatura do produto.');
        return true;
      } if (!data.width || data.width === '') {
        showError('É necessário informar a largura do produto.');
        return true;
      } if (!data.producttype || data.producttype === '') {
        showError('É necessário informar o tipo de produto.');
        return true;
      } if (!data.stitchtype || data.stitchtype === '') {
        showError('É necessário informar o tipo de malha do produto.');
        return true;
      } if (!data.stringtype || data.stringtype === '') {
        showError('É necessário informar o tipo de fio do produto.');
        return true;
      } if (!data.string || data.string === '') {
        showError('É necessário informar qual fio é usado no produto.');
        return true;
      }
    }
  } else if (data.type === 'outros') {
    if (data.adstype === 'selling') {
      if (!data.images[0]) {
        showError('Insira pelo menos uma imagem do seu produto.');
        return true;
      }
    }

    if (!data.quantity || isNaN(data.quantity) || data.quantity === '') {
      showError('Insira uma quantidade válida.');
      return null;
    }
  } else {
    showError('Tipo de produto não identificado');
    return null;
  }


  // Generic validation
  if (data.description === '') {
    showError('Diga mais sobre seu anúncio com uma descrição.');
    return true;
  } if (data.price === '') {
    showError('Insira o valor do seu produto');
    return true;
  } if (!data.user || data.user === '') {
    showError('Algo está errado, por favor faça seu login novamente.');
    return true;
  }

  const ann = {
    ...data,
    price: `R$ ${parseFloat(data.price).toFixed(2)} / ${data.measure}`,
    quantity: `${parseInt(data.quantity, 10)} ${data.measure}s`,
  };

  Alert.alert(
    'Seu anúncio está pronto para ser publicado',
    'Tem certeza que deseja fazer isso?',
    [
      {
        text: 'Não, cancelar',
      },
      {
        text: 'Sim, tenho certeza',
        onPress: async () => {
          setIsLoading(false);
          announcement.create('primaryAnnouncements', data.adstype, data.type, ann, () => navigation.navigate('Feed'));
        },
      },
    ],
  );
  return null;
}
