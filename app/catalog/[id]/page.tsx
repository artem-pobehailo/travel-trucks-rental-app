import { getCatalogId } from '@/lib/clientApi';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import CatalogDetailsTruck from './CatalogDetailsTruck';

type PageCatalogDetailsTruckProps = {
  params: Promise<{ id: string }>;
};
export default async function CatalogById({
  params,
}: PageCatalogDetailsTruckProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['truck', id],
    queryFn: () => getCatalogId(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CatalogDetailsTruck />
    </HydrationBoundary>
  );
}
