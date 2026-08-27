// pages/Index.tsx
import { Header } from '@/components/Header';
import { CepSearch } from '@/components/CepSearch';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Descubra o dia da coleta na sua rua
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Digite seu CEP e mostraremos os dias e horários da coleta seletiva no seu bairro
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <CepSearch />
        </div>
      </section>
    </div>
  );
};

export default Index;