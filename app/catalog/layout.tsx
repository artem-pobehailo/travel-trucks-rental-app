import { ReactNode } from 'react';
import SideBarCatalog from './filter/@sidebar/SideBarCatalogs';

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
        {children}
      </div>
    </>
  );
}
