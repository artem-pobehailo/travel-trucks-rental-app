import { Catalog } from '@/types/catalog';
import { nextServer } from './api';

export const getCatalogs = async (
  page: number = 1,
  limit: number = 23
): Promise<Catalog[]> => {
  const { data } = await nextServer.get<{
    total: number;
    items: Catalog[];
  }>('/campers', {
    params: { page, limit },
  });
  return data.items || [];
};

export const getCatalogId = async (id: string) => {
  const res = await nextServer.get(`/campers/${id}`);
  return res.data;
};
