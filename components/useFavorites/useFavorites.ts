'use client';

import { useEffect, useState } from 'react';
import { Catalog } from '@/types/catalog';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Catalog[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (camper: Catalog) => {
    setFavorites(prev => {
      const exists = prev.find(
        item => item.id === camper.id
      );

      let updated;
      if (exists) {
        updated = prev.filter(
          item => item.id !== camper.id
        );
      } else {
        updated = [...prev, camper];
      }

      localStorage.setItem(
        'favorites',
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  const isFavorite = (id: number | string) => {
    return favorites.some(item => item.id === id);
  };

  return { favorites, toggleFavorite, isFavorite };
}
