'use client';

import CatalogPage from '@/components/CatalogPage/CatalogPage';
import SideBarCatalog from '../@sidebar/SideBarCatalogs';
import { useEffect, useState } from 'react';
import { getCatalogs } from '@/lib/clientApi';
import { Catalog } from '@/types/catalog';

export default function CatalogsPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);

  useEffect(() => {
    getCatalogs(1, 100).then(data => setCatalogs(data));
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        gap: 64,
        paddingLeft: 64,
      }}
    >
      <SideBarCatalog catalogs={catalogs} />
      <CatalogPage />
    </div>
  );
}
