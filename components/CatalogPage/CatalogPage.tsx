'use client';
import Link from 'next/link';
import css from './CatalogPage.module.css';
import Image from 'next/image';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Catalog } from '@/types/catalog';
import { getCatalogs } from '@/lib/clientApi';
import { useQuery } from '@tanstack/react-query';
export default function CatalogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const perPage = 4;
  const isFirstRender = useRef(true);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);

  const catalogsQuery = useQuery({
    queryKey: ['catalogs', page],
    queryFn: () => getCatalogs(page, perPage),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!catalogsQuery.data) return;
    if (page === 1) {
      setCatalogs(catalogsQuery.data);
    } else {
      setCatalogs(prev => [...prev, ...catalogsQuery.data]);
    }
  }, [catalogsQuery.data, page]);

  const handleLoadMore = () => {
    if (
      catalogsQuery.data &&
      catalogsQuery.data.length === perPage
    ) {
      setPage(prev => prev + 1);
    }
  };

  if (catalogsQuery.isLoading && isFirstRender.current) {
    return <p>Завантаження каталогів...</p>;
  }

  isFirstRender.current = false;

  if (!catalogs.length) {
    return <p>Каталоги відсутні</p>;
  }

  return (
    <section className={css.wrapper}>
      <main className={css.mainContent}>
        <ul className={css.list}>
          {catalogs.map(catalog => {
            const loc = catalog.location
              .split(', ')
              .reverse()
              .join(', ');
            const price = Number(catalog.price).toFixed(2);
            return (
              <li key={catalog.id} className={css.item}>
                <div className={css.imageWrapper}>
                  <Image
                    src={catalog.gallery[0].original}
                    alt={catalog.name}
                    fill
                    className={css.imagi}
                    quality={100}
                    loading="eager"
                  />
                </div>
                <div className={css.textWrapper}>
                  <div className={css.itemTitel}>
                    <h2 className={css.titel}>
                      {catalog.name}
                    </h2>
                    <p className={css.text}>
                      €{price}
                      <span>
                        <svg className={css.svg}>
                          <use href="/sprite.svg#icon-Vector" />
                        </svg>
                      </span>
                    </p>
                  </div>
                  <div className={css.map}>
                    <p className={css.textMap}>
                      <span>
                        <svg className={css.svg}>
                          <use href="/sprite.svg#icon-Rating-1" />
                        </svg>
                      </span>
                      {catalog.rating}(
                      {catalog.reviews.length} Reviews)
                    </p>

                    <p className={css.textMap}>
                      <span>
                        <svg className={css.svg}>
                          <use href="/sprite.svg#icon-map" />
                        </svg>
                      </span>
                      {loc}
                    </p>
                  </div>
                  <p className={css.subText}>
                    {catalog.description}
                  </p>
                  <div className={css.auto}>
                    <p className={css.textAuto}>
                      <span>
                        <svg className={css.svg}>
                          <use href="/sprite.svg#icon-diagram" />
                        </svg>
                      </span>
                      {catalog.transmission}
                    </p>
                    <p className={css.textAuto}>
                      <span>
                        <svg className={css.svg}>
                          <use href="/sprite.svg#icon-Group" />
                        </svg>
                      </span>
                      {catalog.engine}
                    </p>

                    {catalog.kitchen && (
                      <p className={css.textAuto}>
                        <span>
                          <svg className={css.svg}>
                            <use href="/sprite.svg#icon-cup-hot" />
                          </svg>
                        </span>
                        Kitchen
                      </p>
                    )}

                    {catalog.AC && (
                      <p className={css.textAuto}>
                        <span>
                          <svg className={css.svg}>
                            <use href="/sprite.svg#icon-wind" />
                          </svg>
                        </span>
                        AC
                      </p>
                    )}
                  </div>
                  <div className={css.ButtonRed}>
                    <Link href={`/catalog/${catalog.id}`}>
                      Show more
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          className={css.ButtonGray}
          onClick={handleLoadMore}
        >
          Load more
        </button>
      </main>
    </section>
  );
}
