// components/Header.tsx
import { Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="border-b border-green-200 bg-gradient-to-r from-green-50 to-green-100/80 backdrop-blur supports-[backdrop-filter]:bg-green-50/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center shadow-md">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">Coleta Seletiva</h1>
              <p className="text-xs text-green-600/80">Reciclar é o caminho para um ambiente sustentável.</p>
            </div>
          </Link>
          
          {/* Slogan ou informações adicionais (opcional) */}
          <div className="hidden md:block text-right">
            <p className="text-xl font-bold text-green-800">Santa Cruz do Sul - RS</p>
          </div>
        </div>
      </div>
    </header>
  );
};