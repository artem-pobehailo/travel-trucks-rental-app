'use client';

import { Catalog } from '@/types/catalog';
import css from './SideBarCatalogs.module.css';
import { ChangeEvent, useState } from 'react';

interface SideBarProps {
  catalogs?: Catalog[];
}

interface LocalFilters {
  location: string;
  form: string;
  AC: boolean;
  kitchen: boolean;
  bathroom: boolean;
  TV: boolean;
  transmission: string;
}

export default function SideBarCatalog({
  catalogs = [],
}: SideBarProps) {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState('');

  const locations = Array.from(
    new Set(catalogs.map(c => c.location))
  );

  // const Filter = {
  //   id: catalogs.id,
  //   name: catalogs.,
  //   price: good.price,
  //   image: good.image,
  //   size: selectedSize,
  //   quantity,
  //   feedbackCount: good.feedbackCount,
  //   avgRating: good.avgRating,
  // };

  return (
    <div className={css.sidebar}>
      <div className={css.location}>
        <h2 className={css.subTitel}>Location</h2>
        <div className={css.customSelect}>
          <button
            className={css.textSidebar}
            onClick={() => setOpen(!open)}
          >
            <svg className={css.svg}>
              <use href="/sprite.svg#icon-map" />
            </svg>
            {selectedLocation
              ? selectedLocation
                  .split(', ')
                  .reverse()
                  .join(', ')
              : 'All locations'}
          </button>
          {open && (
            <ul>
              {Array.from(
                new Set(catalogs.map(c => c.location))
              ).map(loc => {
                const locat = loc
                  .split(', ')
                  .reverse()
                  .join(', ');
                return (
                  <li
                    className={css.textSidebar}
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setOpen(false);
                    }}
                  >
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-map" />
                    </svg>
                    {locat}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <h2 className={css.subTitel}>Filters</h2>
      <div className={css.filter}>
        <h2 className={css.filterTitel}>
          Vehicle equipment
        </h2>
        <ul className={css.list}>
          <li className={css.item}>
            <p className={css.textAuto}>
              <span>
                <svg className={css.svgF}>
                  <use href="/sprite.svg#icon-wind" />
                </svg>
              </span>
              AC
            </p>
          </li>
          <li className={css.item}>
            <p className={css.textAuto}>
              <span>
                <svg className={css.svgF}>
                  <use href="/sprite.svg#icon-diagram" />
                </svg>
              </span>
              Automatic
            </p>
          </li>
          <li className={css.item}>
            <p className={css.textAuto}>
              <span>
                <svg className={css.svgF}>
                  <use href="/sprite.svg#icon-cup-hot" />
                </svg>
              </span>
              Kitchen
            </p>
          </li>
          <li className={css.item}>
            <p className={css.textAuto}>
              <span>
                <svg className={css.svgF}>
                  <use href="/sprite.svg#icon-tv" />
                </svg>
              </span>
              TV
            </p>
          </li>
          <li className={css.item}>
            <p className={css.textAuto}>
              <span>
                <svg className={css.svgF}>
                  <use href="/sprite.svg#icon-ph_shower" />
                </svg>
              </span>
              Bathroom
            </p>
          </li>
        </ul>
      </div>
      <div className={css.filter}>
        <h2 className={css.filterTitel}>Vehicle type</h2>
        <ul className={css.list}>
          <li className={css.item}>
            <p className={css.textAuto}>
              <span>
                <svg className={css.svgF}>
                  <use href="/sprite.svg#icon-bi_grid-1x2" />
                </svg>
              </span>
              Van
            </p>
          </li>
          <li className={css.item}>
            <p className={css.textAuto}>
              <span>
                <svg className={css.svgF}>
                  <use href="/sprite.svg#icon-bi_grid" />
                </svg>
              </span>
              Fully Integrated
            </p>
          </li>
          <li className={css.item}>
            <p className={css.textAuto}>
              <span>
                <svg className={css.svgF}>
                  <use href="/sprite.svg#icon-bi_grid-3x3-gap" />
                </svg>
              </span>
              Alcove
            </p>
          </li>
        </ul>
      </div>
      <div className={css.Button}>
        <button className={css.ButtonRed}>Search</button>
      </div>
    </div>
  );
}
