import React from 'react';
import { Container } from './styles';

import Filters from '../../components/Filters';
import FiltersModal from '../../components/Modal';
import FloatingButton from '../../components/FloatingButton';
import MiniFloatingButton from '../../components/MiniFloatingButton';

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
            { title: 'Área de conhecimento', action: () => setModal({...modal, area: true})},
          ]}
        />
      </Container>
    </>
  );
}
