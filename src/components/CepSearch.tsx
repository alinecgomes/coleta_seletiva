// components/CepSearch.tsx
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { searchByCep } from '@/utils/cepUtils';
import { CepSearchResult } from '@/types/cep';
import { CollectionResult } from './CollectionResult';

export const CepSearch = () => {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CepSearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    const cleanCep = cep.replace(/[^0-9]/g, '');
    
    if (cleanCep.length !== 8) {
      setError('Digite um CEP válido com 8 dígitos');
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await searchByCep(cep);
      
      if (!data) {
        setError('CEP não encontrado. Verifique o número digitado.');
      } else {
        setResult(data);
        if (!data.collectionInfo) {
          setError(`Nenhuma informação de coleta encontrada para o bairro: ${data.neighborhood}`);
        }
      }
    } catch (err) {
      setError('Erro ao buscar o CEP. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <Input
            placeholder="Digite seu CEP (ex: 96810-086)"
            value={cep}
            onChange={handleCepChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            maxLength={9}
            className="h-12 text-lg"
          />
        </div>
        <Button onClick={handleSearch} disabled={loading} size="lg" className="h-12 px-6">
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Buscar
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg mb-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* Informações do Endereço */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">
                  {result.street}
                </p>
                <p className="text-sm text-blue-700">
                  {result.neighborhood} - {result.city}/{result.state}
                </p>
                <p className="text-xs text-blue-600">
                  CEP: {result.cep}
                </p>
              </div>
            </div>
          </div>

          {/* Informações de Coleta */}
          {result.collectionInfo ? (
            <CollectionResult result={result.collectionInfo} />
          ) : (
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 text-center">
              <p className="text-yellow-800">
                Nenhuma informação de coleta disponível para este bairro.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};