import { create } from 'zustand';
import { Catalog } from '@/types/catalog';
import { getCatalogs } from '../clientApi';

interface CatalogFilters {
  location: string;
  form: string;
  AC: boolean;
  kitchen: boolean;
  bathroom: boolean;
  TV: boolean;
  transmission: string;
}

interface CatalogState {
  campers: Catalog[];
  loading: boolean;
  error: string | null;
  noResults: boolean;
  page: number;
  total: number;
  filters: CatalogFilters;

  setFilters: (filters: Partial<CatalogFilters>) => void;
  fetchCampers: (
    page?: number,
    append?: boolean
  ) => Promise<void>;
  resetCampers: () => void;
}

export const useCatalogStore = create<CatalogState>(
  (set, get) => ({
    campers: [],
    loading: false,
    error: null,
    noResults: false,
    page: 1,
    total: 0,
    filters: {
      location: '',
      form: '',
      AC: false,
      kitchen: false,
      bathroom: false,
      TV: false,
      transmission: '',
    },

    setFilters: newFilters => {
      set(state => ({
        filters: { ...state.filters, ...newFilters },
      }));

      get().fetchCampers(1, false);
    },

    resetCampers: () =>
      set({ campers: [], page: 1, total: 0 }),

    fetchCampers: async function (
      page = 1,
      append = false
    ) {
      const { filters } = get();

      set({ loading: true, error: null, noResults: false });

      try {
        const params: Record<string, string> = {};

        if (filters.location)
          params.location = filters.location;
        if (filters.form) params.form = filters.form;

        if (filters.AC) params.AC = 'true';
        if (filters.kitchen) params.kitchen = 'true';
        if (filters.TV) params.TV = 'true';
        if (filters.bathroom) params.bathroom = 'true';

        if (filters.transmission)
          params.transmission = filters.transmission;

        params.page = String(page);
        params.limit = '4';

        const result = await getCatalogs(params);

        if (!result.data || result.data.length === 0) {
          set({
            campers: [],
            noResults: true,
            loading: false,
            total: 0,
          });
          return;
        }

        set(state => ({
          campers: append
            ? [...state.campers, ...result.data]
            : result.data,
          total: result.total,
          page,
          loading: false,
        }));
      } catch (error) {
        console.error('API error', error);
        set({
          error:
            'The server cannot find such filter combinations',
          loading: false,
          campers: [],
        });
      }
    },
  })
);
