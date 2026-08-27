// utils/cepUtils.ts
import { ViaCepResponse, CepSearchResult } from '@/types/cep';
import { searchByNeighborhood } from './collectionUtils';

export const fetchCep = async (cep: string): Promise<ViaCepResponse | null> => {
  try {
    const cleanCep = cep.replace(/[^0-9]/g, '');
    
    if (cleanCep.length !== 8) {
      throw new Error('CEP inválido');
    }
    
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar CEP');
    }
    
    const data = await response.json();
    
    if (data.erro) {
      return null; // CEP não encontrado
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
};

export const searchByCep = async (cep: string): Promise<CepSearchResult | null> => {
  const cepData = await fetchCep(cep);
  
  if (!cepData) {
    return null;
  }
  
  // Busca informações de coleta pelo bairro
  const collectionInfo = searchByNeighborhood(cepData.bairro);
  
  return {
    cep: cepData.cep,
    street: cepData.logradouro || 'Rua não informada',
    neighborhood: cepData.bairro,
    city: cepData.localidade,
    state: cepData.uf,
    collectionInfo
  };
};