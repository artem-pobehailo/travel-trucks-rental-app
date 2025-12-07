import { Catalog } from '@/types/catalog';
import { create } from 'zustand';

import { getCatalogs } from '../clientApi';

export type CatalogFilters = {
  location: string;
  AC: boolean;
  transmission: string;
  kitchen: boolean;
  TV: boolean;
  bathroom: boolean;
  form: string;
};
export type CatalogResponse = {
  total: number;
  items: Catalog[];
};

type CatalogStore = {
  items: Catalog[];

  total: number;
  isLoading: boolean;
  page: number;
  filters: CatalogFilters;
  setFilters: (filters: CatalogFilters) => void;
  loadCatalogs: (reset?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
};

export const useCatalogStore = create<CatalogStore>(
  (set, get) => ({
    items: [],
    total: 0,
    isLoading: false,
    page: 1,

    filters: {
      location: '',
      form: '',
      AC: false,
      kitchen: false,
      bathroom: false,
      TV: false,
      transmission: '',
    },

    setFilters: (filters: CatalogFilters) => {
      const currentFilters = get().filters;
      const filtersChanged = Object.keys(filters).some(
        key =>
          filters[key as keyof CatalogFilters] !==
          currentFilters[key as keyof CatalogFilters]
      );

      if (filtersChanged) {
        set({ filters, page: 1, items: [] });
        get().loadCatalogs(true);
      }
    },

    loadCatalogs: async (reset = false) => {
      const { page, filters } = get();

      set({ isLoading: true });

      const data: Catalog[] = await getCatalogs(
        page,
        4,
        filters
      );

      set(state => ({
        items: reset ? data : [...state.items, ...data],
        isLoading: false,
      }));
    },

    loadMore: async () => {
      set(state => ({ page: state.page + 1 }));
      await get().loadCatalogs();
    },
  })
);
