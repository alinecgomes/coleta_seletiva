// types/cep.ts

import { CollectionDisplay } from './collection';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export interface CepSearchResult {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  collectionInfo: CollectionDisplay | null;
  isInvalidCity?: boolean;
}