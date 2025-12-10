import { nextServer } from './api';
import { isAxiosError } from 'axios';

interface CatalogRequestParams {
  location?: string;
  form?: string;
  AC?: string;
  kitchen?: string;
  page?: number;
  limit?: number;
}

export const getCatalogs = async (
  params: CatalogRequestParams = {},
  page: number = 1,
  limit: number = 4
) => {
  try {
    const response = await nextServer.get('/campers', {
      params,
    });
    const items = response.data?.items || [];

    return {
      data: items,
      total: response.data?.total || 0,
      page: Number(params.page) || 1,
      limit: Number(params.limit) || 4,
      hasMore: items.length >= (Number(params.limit) || 4),
    };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error(
        'Error in getCampers:',
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      console.error('Error in getCampers:', error.message);
    } else {
      console.error('Unknown error in getCampers');
    }
    throw error;
  }
};

export const getCatalogId = async (id: string) => {
  const res = await nextServer.get(`/campers/${id}`);
  return res.data;
};
