'use client';
import Link from 'next/link';
import css from './CatalogPage.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Catalog } from '@/types/catalog';
import { getCatalogs } from '@/lib/clientApi';
import { useQuery } from '@tanstack/react-query';

import { useCatalogStore } from '@/lib/store/catalogStore';
import Loader from '@/components/Loader/Loader';
import SideBarCatalog from '../@sidebar/SideBarCatalogs';

export default function CatalogPage() {
  const {
    campers,
    loading,
    error,
    page,
    total,
    fetchCampers,
  } = useCatalogStore();

  useEffect(() => {
    fetchCampers(1, false);
  }, [fetchCampers]);

  const handleLoadMore = () => {
    fetchCampers(page + 1, true);
  };

  const hasMore = campers.length < total;

  const handleResetFilters = () => {
    window.location.reload();
  };

  console.log('campers:', campers);
  console.log('loading:', loading);
  console.log('error:', error);
  return (
    <section className={css.wrapper}>
      <div className={css.catalogContent}>
        <SideBarCatalog />
        <main className={css.mainContent}>
          <ul className={css.list}>
            {Array.isArray(campers) &&
              campers.map(c => {
                const loc = c.location
                  .split(', ')
                  .reverse()
                  .join(', ');
                const price = Number(c.price).toFixed(2);
                return (
                  <li key={`${c.id}`} className={css.item}>
                    <div className={css.imageWrapper}>
                      <Image
                        src={c.gallery[0].original}
                        alt={c.name}
                        fill
                        sizes=" 292px"
                        className={css.imagi}
                        quality={75}
                        loading="eager"
                      />
                    </div>
                    <div className={css.textWrapper}>
                      <div className={css.itemTitel}>
                        <h2 className={css.titel}>
                          {c.name}
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
                          {c.rating}({c.reviews.length}{' '}
                          Reviews)
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
                        {c.description}
                      </p>
                      <div className={css.auto}>
                        <p className={css.textAuto}>
                          <span>
                            <svg className={css.svg}>
                              <use href="/sprite.svg#icon-diagram" />
                            </svg>
                          </span>
                          {c.transmission}
                        </p>
                        <p className={css.textAuto}>
                          <span>
                            <svg className={css.svg}>
                              <use href="/sprite.svg#icon-Group" />
                            </svg>
                          </span>
                          {c.engine}
                        </p>

                        {c.kitchen && (
                          <p className={css.textAuto}>
                            <span>
                              <svg className={css.svg}>
                                <use href="/sprite.svg#icon-cup-hot" />
                              </svg>
                            </span>
                            Kitchen
                          </p>
                        )}

                        {c.AC && (
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
                        <Link href={`/catalog/${c.id}`}>
                          Show more
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
          {hasMore && !loading && campers.length > 0 && (
            <button
              className={css.ButtonGray}
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load more'}
            </button>
          )}
        </main>
      </div>
    </section>
  );
}
