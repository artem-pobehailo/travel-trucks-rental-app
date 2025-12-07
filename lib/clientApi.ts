import { Catalog } from '@/types/catalog';
import { nextServer } from './api';
import { CatalogFilters } from './store/catalogStore';

interface CatalogRequestParams {
  page: number;
  limit: number;
  location?: string;
  form?: string;
  AC?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  bathroom?: boolean;
  transmission?: string;
}

export const getCatalogs = async (
  page: number = 1,
  limit: number = 23,
  filters?: CatalogFilters
): Promise<Catalog[]> => {
  const params: CatalogRequestParams = { page, limit };

  if (filters) {
    if (filters.location)
      params.location = filters.location;
    if (filters.form) params.form = filters.form;
    if (filters.AC !== undefined) params.AC = filters.AC;
    if (filters.kitchen !== undefined)
      params.kitchen = filters.kitchen;
    if (filters.TV !== undefined) params.TV = filters.TV;
    if (filters.bathroom !== undefined)
      params.bathroom = filters.bathroom;
    if (filters.transmission)
      params.transmission = filters.transmission;
  }

  try {
    const { data } = await nextServer.get<{
      total: number;
      items: Catalog[];
    }>('/campers', { params });
    return data.items || [];
  } catch (error) {
    console.error('Error fetching catalogs:', error);
    throw new Error('Failed to fetch catalogs');
  }
};

export const getCatalogId = async (id: string) => {
  const res = await nextServer.get(`/campers/${id}`);
  return res.data;
};
