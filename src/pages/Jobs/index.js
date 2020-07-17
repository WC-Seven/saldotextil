import React from 'react';
import { Container, SpacedView } from './styles';

import Filters from '../../components/Filters';
import FiltersModal from '../../components/Modal';
import FloatingButton from '../../components/FloatingButton';
import MiniFloatingButton from '../../components/MiniFloatingButton';
import Mini from '../../components/Secondaries/Mini';

export default function Jobs({ navigation }) {
  const [modal, setModal] = React.useState({ adstype: false, area: false, localization: false });

  const [filters, setFilters] = React.useState({ adstype: 'ads', area: '', localization: '' });

  return (
    <>
      <FloatingButton iconName="pencil" action={() => navigation.navigate('Create', { name: 'Empregos' })} />
      <MiniFloatingButton iconName="file-account" action={() => navigation.navigate('Publish', { name: 'Empregos' })} />
      <Container>
        {/* Modais */}
        <FiltersModal
          status={{
            value: modal.adstype,
            set: (n) => setModal({ ...modal, adstype: n })
          }}
          options={[
              {
                title: 'Tipo de anúncio',
                options: [
                  { name: 'Anúncios', action: () => setFilters({ ...filters, adstype: 'ads' }), active: filters.adstype === 'ads' },
                  { name: 'Currículos', action: () => setFilters({ ...filters, adstype: 'cv' }), active: filters.adstype === 'cv' },
                ],
              },
            ]}
        />
        <FiltersModal
          status={{
            value: modal.area,
            set: (n) => setModal({ ...modal, area: n })
          }}
          options={[
            {
              title: 'Área de conhecimento',
              options: [
                { name: 'Nenhum', action: () => setFilters({ ...filters, area: '' }), active: filters.area === ''},
                { name: 'Administração', action: () => setFilters({ ...filters, area: 'admnistracao' }), active: filters.area === 'admnistracao'},
                { name: 'Agronomia', action: () => setFilters({ ...filters, area: 'agronomia' }), active: filters.area === 'agronomia'},
                { name: 'Agropecuária', action: () => setFilters({ ...filters, area: 'agropecuaria' }), active: filters.area === 'agropecuaria'},
                { name: 'Artes visuais', action: () => setFilters({ ...filters, area: 'artes visuais' }), active: filters.area === 'artes visuais'},
                { name: 'Arquitetura', action: () => setFilters({ ...filters, area: 'arquitetura' }), active: filters.area === 'arquitetura'},
                { name: 'Automação', action: () => setFilters({ ...filters, area: 'automacao' }), active: filters.area === 'automacao'},
                { name: 'Biotecnologia', action: () => setFilters({ ...filters, area: 'biotecnologia' }), active: filters.area === 'biotecnologia'},
                { name: 'Ciências biológicas', action: () => setFilters({ ...filters, area: 'ciencias biologicas' }), active: filters.area === 'ciencias biologicas'},
                { name: 'Ciências contábeis', action: () => setFilters({ ...filters, area: 'ciencias contabeis' }), active: filters.area === 'ciencias contabeis'},
                { name: 'Ciências econômicas', action: () => setFilters({ ...filters, area: 'ciencias economicas' }), active: filters.area === 'ciencias economicas'},
                { name: 'Ciências sociais', action: () => setFilters({ ...filters, area: 'ciencias sociais' }), active: filters.area === 'ciencias sociais'},
                { name: 'Comércio', action: () => setFilters({ ...filters, area: 'comercio' }), active: filters.area === 'comercio'},
                { name: 'Design', action: () => setFilters({ ...filters, area: 'design' }), active: filters.area === 'design'},
                { name: 'Engenharias', action: () => setFilters({ ...filters, area: 'engenharias' }), active: filters.area === 'engenharias'},
                { name: 'Estatística', action: () => setFilters({ ...filters, area: 'estatisca' }), active: filters.area === 'estatisca'},
                { name: 'Filosofia', action: () => setFilters({ ...filters, area: 'filosofia' }), active: filters.area === 'filosofia'},
                { name: 'Gastronomia', action: () => setFilters({ ...filters, area: 'gastronomia' }), active: filters.area === 'gastronomia'},
                { name: 'Gestões', action: () => setFilters({ ...filters, area: 'gestoes' }), active: filters.area === 'gestoes'},
                { name: 'Intérprete', action: () => setFilters({ ...filters, area: 'interprete' }), active: filters.area === 'interprete'},
                { name: 'Letras', action: () => setFilters({ ...filters, area: 'letras' }), active: filters.area === 'letras'},
                { name: 'Logística', action: () => setFilters({ ...filters, area: 'logistica' }), active: filters.area === 'logistica'},
                { name: 'Jornalismo', action: () => setFilters({ ...filters, area: 'jornalismo' }), active: filters.area === 'jornalismo'},
                { name: 'Marketing', action: () => setFilters({ ...filters, area: 'marketing' }), active: filters.area === 'marketing'},
                { name: 'Medicina', action: () => setFilters({ ...filters, area: 'medicina' }), active: filters.area === 'medicina'},
                { name: 'Música', action: () => setFilters({ ...filters, area: 'musica' }), active: filters.area === 'musica'},
                { name: 'Pedagogia', action: () => setFilters({ ...filters, area: 'pedagogia' }), active: filters.area === 'pedagogia'},
                { name: 'Psicologia', action: () => setFilters({ ...filters, area: 'psicologia' }), active: filters.area === 'psicologia'},
                { name: 'Publicidade', action: () => setFilters({ ...filters, area: 'publicidade' }), active: filters.area === 'publicidade'},
                { name: 'Saúde', action: () => setFilters({ ...filters, area: 'saude' }), active: filters.area === 'saude'},
                { name: 'Segurança', action: () => setFilters({ ...filters, area: 'seguranca' }), active: filters.area === 'seguranca'},
                { name: 'Tecnologia da Informação', action: () => setFilters({ ...filters, area: 'tecnologia da informacao' }), active: filters.area === 'tecnologia da informacao'},
                { name: 'Teologia', action: () => setFilters({ ...filters, area: 'teologia' }), active: filters.area === 'teologia'},
                { name: 'Transporte', action: () => setFilters({ ...filters, area: 'transporte' }), active: filters.area === 'transporte'},
                { name: 'Turísmo', action: () => setFilters({ ...filters, area: 'turismo' }), active: filters.area === 'turismo'},
                { name: 'Veterinária e afins', action: () => setFilters({ ...filters, area: 'veterinaria e afins' }), active: filters.area === 'veterinaria e afins'},
                { name: 'Outros', action: () => setFilters({ ...filters, area: 'outros' }), active: filters.area === 'outros'},
              ]
            }
          ]}
        />
        <FiltersModal
          status={{
            value: modal.localization,
            set: (n) => setModal({ ...modal, localization: n })
          }}
          options={[
            {
              title: 'Estado',
              options: [
                { name: 'Nenhum', action: () => setFilters({ ...filters, localization: '' }), active: filters.localization === '' },
                { name: 'AC', action: () => setFilters({ ...filters, localization: 'AC' }), active: filters.localization === 'AC' },
                { name: 'AL', action: () => setFilters({ ...filters, localization: 'AL' }), active: filters.localization === 'AL' },
                { name: 'AP', action: () => setFilters({ ...filters, localization: 'AP' }), active: filters.localization === 'AP' },
                { name: 'AM', action: () => setFilters({ ...filters, localization: 'AM' }), active: filters.localization === 'AM' },
                { name: 'BA', action: () => setFilters({ ...filters, localization: 'BA' }), active: filters.localization === 'BA' },
                { name: 'CE', action: () => setFilters({ ...filters, localization: 'CE' }), active: filters.localization === 'CE' },
                { name: 'DF', action: () => setFilters({ ...filters, localization: 'DF' }), active: filters.localization === 'DF' },
                { name: 'ES', action: () => setFilters({ ...filters, localization: 'ES' }), active: filters.localization === 'ES' },
                { name: 'GO', action: () => setFilters({ ...filters, localization: 'GO' }), active: filters.localization === 'GO' },
                { name: 'MA', action: () => setFilters({ ...filters, localization: 'MA' }), active: filters.localization === 'MA' },
                { name: 'MT', action: () => setFilters({ ...filters, localization: 'MT' }), active: filters.localization === 'MT' },
                { name: 'MS', action: () => setFilters({ ...filters, localization: 'MS' }), active: filters.localization === 'MS' },
                { name: 'MG', action: () => setFilters({ ...filters, localization: 'MG' }), active: filters.localization === 'MG' },
                { name: 'PA', action: () => setFilters({ ...filters, localization: 'PA' }), active: filters.localization === 'PA' },
                { name: 'PB', action: () => setFilters({ ...filters, localization: 'PB' }), active: filters.localization === 'PB' },
                { name: 'PR', action: () => setFilters({ ...filters, localization: 'PR' }), active: filters.localization === 'PR' },
                { name: 'PE', action: () => setFilters({ ...filters, localization: 'PE' }), active: filters.localization === 'PE' },
                { name: 'PI', action: () => setFilters({ ...filters, localization: 'PI' }), active: filters.localization === 'PI' },
                { name: 'RJ', action: () => setFilters({ ...filters, localization: 'RJ' }), active: filters.localization === 'RJ' },
                { name: 'RN', action: () => setFilters({ ...filters, localization: 'RN' }), active: filters.localization === 'RN' },
                { name: 'RS', action: () => setFilters({ ...filters, localization: 'RS' }), active: filters.localization === 'RS' },
                { name: 'RO', action: () => setFilters({ ...filters, localization: 'RO' }), active: filters.localization === 'RO' },
                { name: 'RR', action: () => setFilters({ ...filters, localization: 'RR' }), active: filters.localization === 'RR' },
                { name: 'SC', action: () => setFilters({ ...filters, localization: 'SC' }), active: filters.localization === 'SC' },
                { name: 'SP', action: () => setFilters({ ...filters, localization: 'SP' }), active: filters.localization === 'SP' },
                { name: 'SE', action: () => setFilters({ ...filters, localization: 'SE' }), active: filters.localization === 'SE' },
                { name: 'TO', action: () => setFilters({ ...filters, localization: 'TO' }), active: filters.localization === 'TO' },
              ],
            },
          ]}
        />

        {/* Filtros */}
        <Filters
          data={[
            { title: 'Tipo de anúncio', action: () => setModal({...modal, adstype: true}) },
            { title: 'Localização', action: () => setModal({...modal, localization: true})}
          ]}
        />
        <Filters
          data={[
            { title: filters.area !== '' ? 'Área de conhecimento' : 'Área de conhecimento (nenhum)', action: () => setModal({...modal, area: true})},
          ]}
        />

        <Mini
          item={{
            title: 'Auxiliar de produção',
            image: 'data:image/jpeg;base64,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',
            enterprise: 'WEB - Seviços Industriais',
            enterprisePhoto: 'https://plataformafasttrade.com.br/wp-content/uploads/2019/06/weg-700x300.png',
            description: 'Duis eu libero eget felis maximus consectetur non vitae quam. Fusce eu ultricies urna. Suspendisse diam massa, molestie vitae tellus eu, placerat posuere leo. Aliquam facilisis eros et diam pellentesque scelerisque. Donec lacinia ipsum nec dictum eleifend. Duis id diam at arcu tristique pharetra. Donec iaculis ex eget sollicitudin accumsan.',
            enterprisePhone: '+5547999937426'
          }}
        />

        <SpacedView />
      </Container>
    </>
  );
}
