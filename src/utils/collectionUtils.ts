// utils/collectionUtils.ts
import { CollectionDisplay } from '@/types/collection';
import { collectionData } from '@/data/collectionData';

export const searchByNeighborhood = (searchTerm: string): CollectionDisplay | null => {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  if (!normalizedSearch) return null;
  
  // Busca diretamente no collectionData
  const filtered = collectionData.filter(item => 
    item.neighborhood.toLowerCase().includes(normalizedSearch)
  );
  
  if (filtered.length === 0) return null;
  
  // Agrupa por dia
  const dayMap = new Map<string, { times: string[]; operator: string }>();
  
  filtered.forEach(item => {
    if (!dayMap.has(item.day)) {
      dayMap.set(item.day, { times: [], operator: item.operator });
    }
    const entry = dayMap.get(item.day)!;
    if (!entry.times.includes(item.time)) {
      entry.times.push(item.time);
    }
  });
  
  return {
    neighborhood: filtered[0].neighborhood,
    schedules: Array.from(dayMap.entries()).map(([day, data]) => ({
      day,
      times: data.times,
      operator: data.operator
    }))
  };
};

export const getAllNeighborhoods = (): string[] => {
  const unique = new Set(collectionData.map(item => item.neighborhood));
  return Array.from(unique).sort();
};