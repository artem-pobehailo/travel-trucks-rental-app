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
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { useFavorites } from '@/components/useFavorites/useFavorites';

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
  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <section className={css.wrapper}>
      <div className={css.catalogContent}>
        <SideBarCatalog />
        <main className={css.mainContent}>
          {loading && (
            <div className={css.message}>
              <Loader />
            </div>
          )}

          {!loading && error && (
            <div className={css.message}>
              <ErrorMessage message=" Try changing or cleaning filters." />
            </div>
          )}

          {!loading && !error && campers.length > 0 && (
            <>
              <ul className={css.list}>
                {Array.isArray(campers) &&
                  campers.map(c => {
                    const loc = c.location
                      .split(', ')
                      .reverse()
                      .join(', ');
                    const price = Number(c.price).toFixed(
                      2
                    );
                    return (
                      <li
                        key={`${c.id}`}
                        className={`${css.item} ${isFavorite(c.id) ? css.favoriteItem : ''}`}
                      >
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
                            <div className={css.vector}>
                              <p className={css.text}>
                                €{price}
                              </p>
                              <button
                                className={
                                  isFavorite(c.id)
                                    ? `${css.vectorButton} ${css.activeFav}`
                                    : css.vectorButton
                                }
                                onClick={() =>
                                  toggleFavorite(c)
                                }
                              >
                                <svg className={css.svg}>
                                  <use href="/sprite.svg#icon-Vector" />
                                </svg>
                              </button>
                            </div>
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
                            {c.TV && (
                              <p className={css.textAuto}>
                                <span>
                                  <svg className={css.svg}>
                                    <use href="/sprite.svg#icon-tv" />
                                  </svg>
                                </span>
                                TV
                              </p>
                            )}
                            {c.bathroom && (
                              <p className={css.textAuto}>
                                <span>
                                  <svg className={css.svg}>
                                    <use href="/sprite.svg#icon-ph_shower" />
                                  </svg>
                                </span>
                                bathroom
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
              {hasMore &&
                !loading &&
                campers.length > 0 && (
                  <button
                    className={css.ButtonGray}
                    onClick={handleLoadMore}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load more'}
                  </button>
                )}
            </>
          )}
        </main>
      </div>
    </section>
  );
}
