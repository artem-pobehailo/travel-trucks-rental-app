import { ReactNode, Suspense } from 'react';
import SideBarCatalog from './filter/@sidebar/SideBarCatalogs';
import Loader from '@/components/Loader/Loader';

type Props = {
  children: ReactNode;
};

export default function CatalogLayout({ children }: Props) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 64,
          paddingLeft: 64,
        }}
      >
        <SideBarCatalog />

        <Suspense fallback={<Loader />}>
          {children}
        </Suspense>
      </div>
    </>
  );
}
