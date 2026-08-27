// components/CollectionResult.tsx
import { CollectionDisplay } from '@/types/collection';
import { Calendar, Clock, Building } from 'lucide-react';

interface CollectionResultProps {
  result: CollectionDisplay;
}

export const CollectionResult = ({ result }: CollectionResultProps) => {
  return (
    <div className="bg-card rounded-lg shadow-lg p-6 border">
      <h3 className="text-xl font-bold mb-2">
        Bairro: {result.neighborhood}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Horários da coleta seletiva
      </p>
      
      <div className="space-y-3">
        {result.schedules.map((schedule, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
            <Calendar className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="font-medium">{schedule.day}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{schedule.times.join(' · ')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Building className="w-4 h-4" />
                <span>Operado por: {schedule.operator}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};