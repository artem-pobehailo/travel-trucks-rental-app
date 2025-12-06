'use client';

import { getCatalogId } from '@/lib/clientApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import css from './CatalogDetailsTruck.module.css';
import { useParams } from 'next/navigation';

import Image from 'next/image';
import Loader from '@/components/Loader/Loader';
import SrarRating from './StarRating';
import BookingForm from './BookingForm';

type Review = {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};

export default function CatalogDetailsTruck() {
  const { id } = useParams<{ id: string }>();
  const {
    data: catalog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['truck', id],
    queryFn: () => getCatalogId(id),
    refetchOnMount: false,
  });
  const [activeSection, setActiveSection] = useState<
    'features' | 'reviews'
  >('features');

  if (isLoading) return <Loader />;
  if (isError || !catalog)
    return <div>Error loading product.</div>;

  return (
    <section className={css.categoriesSection}>
      <div className={css.itemTitel}>
        <h2 className={css.titel}>{catalog.name}</h2>
      </div>
      <div className={css.map}>
        <p className={css.reviews}>
          <span>
            <svg className={css.svg}>
              <use href="/sprite.svg#icon-Rating-1" />
            </svg>
          </span>
          {catalog.rating}({catalog.reviews.length} Reviews)
        </p>

        <p className={css.location}>
          <span>
            <svg className={css.svg}>
              <use href="/sprite.svg#icon-map" />
            </svg>
          </span>
          {catalog.location
            .split(', ')
            .reverse()
            .join(', ')}
        </p>
      </div>
      <div className={css.price}>
        <p className={css.text}>
          €{Number(catalog.price).toFixed(2)}
        </p>
      </div>
      <ul className={css.galleryList}>
        {catalog.gallery.map(
          (
            img: { original: string; thumb: string },
            index: number
          ) => (
            <li
              key={`${catalog.id}-${index}`}
              className={css.item}
            >
              <div className={css.imageWrapper}>
                <Image
                  src={img.original}
                  alt={`${catalog.name} image ${index + 1}`}
                  className={css.imagi}
                  width={292}
                  height={312}
                  loading="eager"
                />
              </div>
            </li>
          )
        )}
      </ul>
      <p className={css.subText}>{catalog.description}</p>
      <div className={css.sectionActiv}>
        <button
          className={`${css.butt} ${activeSection === 'features' ? css.active : ''}`}
          onClick={() => setActiveSection('features')}
        >
          Features
        </button>
        <button
          className={`${css.butt} ${activeSection === 'reviews' ? css.active : ''}`}
          onClick={() => setActiveSection('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={css.activ}>
        <div className={css.featuresReviews}>
          {activeSection === 'features' && (
            <div className={css.features}>
              <div className={css.auto}>
                <p className={css.textAuto}>
                  <span>
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-diagram" />
                    </svg>
                  </span>
                  {catalog.transmission
                    .charAt(0)
                    .toUpperCase() +
                    catalog.transmission.slice(1)}
                </p>
                <p className={css.textAuto}>
                  <span>
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-Group" />
                    </svg>
                  </span>
                  {catalog.engine.charAt(0).toUpperCase() +
                    catalog.engine.slice(1)}
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

                {catalog.water && (
                  <p className={css.textAuto}>
                    <span>
                      <svg className={css.svg}>
                        <use href="/sprite.svg#icon-ion_water-outline" />
                      </svg>
                    </span>
                    Water
                  </p>
                )}
                {catalog.gas && (
                  <p className={css.textAuto}>
                    <span>
                      <svg className={css.svg}>
                        <use href="/sprite.svg#icon-hugeicons_gas-stove" />
                      </svg>
                    </span>
                    Gas
                  </p>
                )}
                {catalog.microwave && (
                  <p className={css.textAuto}>
                    <span>
                      <svg className={css.svg}>
                        <use href="/sprite.svg#icon-lucide_microwave" />
                      </svg>
                    </span>
                    Microwave
                  </p>
                )}
                {catalog.refrigerator && (
                  <p className={css.textAuto}>
                    <span>
                      <svg className={css.svg}>
                        <use href="/sprite.svg#icon-solar_fridge-outline" />
                      </svg>
                    </span>
                    Refrigerator
                  </p>
                )}
                {catalog.radio && (
                  <p className={css.textAuto}>
                    <span>
                      <svg className={css.svg}>
                        <use href="/sprite.svg#icon-ui-radios" />
                      </svg>
                    </span>
                    Radio
                  </p>
                )}
                {catalog.TV && (
                  <p className={css.textAuto}>
                    <span>
                      <svg className={css.svg}>
                        <use href="/sprite.svg#icon-tv" />
                      </svg>
                    </span>
                    TV
                  </p>
                )}

                {catalog.bathroom && (
                  <p className={css.textAuto}>
                    <span>
                      <svg className={css.svg}>
                        <use href="/sprite.svg#icon-ph_shower" />
                      </svg>
                    </span>
                    Bathroom
                  </p>
                )}
              </div>
              <div className={css.datail}>
                <h2 className={css.subtitel}>
                  Vehicle details
                </h2>
                <ul className={css.subList}>
                  <li className={css.subItem}>
                    <p>Form</p>
                    <p> {catalog.form}</p>
                  </li>
                  <li className={css.subItem}>
                    <p>Length</p>
                    <p> {catalog.length}</p>
                  </li>
                  <li className={css.subItem}>
                    <p>Width</p>
                    <p> {catalog.width}</p>
                  </li>
                  <li className={css.subItem}>
                    <p>Height</p>
                    <p> {catalog.height}</p>
                  </li>
                  <li className={css.subItem}>
                    <p>Tank</p>
                    <p> {catalog.tank}</p>
                  </li>
                  <li className={css.subItem}>
                    <p>Consumption</p>
                    <p> {catalog.consumption}</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {activeSection === 'reviews' && (
            <div className={css.review}>
              <ul className={css.reviewList}>
                {catalog.reviews.map(
                  (review: Review, index: number) => (
                    <li
                      key={`${review.reviewer_name}-${review.reviewer_rating}-${index}`}
                    >
                      <div className={css.reviewHead}>
                        <p className={css.revText}>
                          {review?.reviewer_name.charAt(
                            0
                          ) || 'A'}
                        </p>

                        <div className={css.reviewStar}>
                          <p className={css.reviewName}>
                            {review.reviewer_name || 'A'}
                          </p>
                          <SrarRating
                            rating={review.reviewer_rating}
                          />
                        </div>
                      </div>
                      <p className={css.reviewText}>
                        {review.comment}
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>

        <div className={css.comment}>
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
