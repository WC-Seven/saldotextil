export const getStates = async () => {
  const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  const data = await response.json();
  return data.map(item => ({
    id: item.id,
    uf: item.sigla,
    name: item.nome,
  }));
} 

export const getCitiesByState = async (uf) => {
  const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  const data = await response.json();
  return data.map(item => ({
    id: item.id,
    name: item.nome,
    uf: item.microrregiao.mesorregiao.UF.sigla,
  }));
}
