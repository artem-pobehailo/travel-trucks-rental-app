'use client';

import { Catalog } from '@/types/catalog';
import css from './SideBarCatalogs.module.css';
import { useEffect, useState } from 'react';
import { useCatalogStore } from '@/lib/store/catalogStore';

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
  const { filters, setFilters } = useCatalogStore();
  const toggleAutomatic = () => {
    setFilters({
      transmission:
        filters.transmission === 'automatic'
          ? ''
          : 'automatic',
    });
  };

  const [localFilters, setLocalFilters] =
    useState<LocalFilters>({
      location: '',
      form: '',
      AC: false,
      kitchen: false,
      bathroom: false,
      TV: false,
      transmission: '',
    });
  const [open, setOpen] = useState(false);

  const safeCatalogs = Array.isArray(catalogs)
    ? catalogs
    : [];

  const locations = Array.from(
    new Set(safeCatalogs.map(c => c.location))
  );

  const handleCheckbox = (key: keyof LocalFilters) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleTransmission = (value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      transmission:
        prev.transmission === value ? '' : value,
    }));
  };

  const handleRadio = (
    key: keyof LocalFilters,
    value: string
  ) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? '' : value,
    }));
  };

  const handleLocation = (loc: string) => {
    setLocalFilters(prev => ({
      ...prev,
      location: loc,
    }));
    setOpen(false);
  };

  const handleSearch = () => {
    setFilters(localFilters);
  };

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
            {localFilters.location
              ? localFilters.location
                  .split(', ')
                  .reverse()
                  .join(', ')
              : 'Kyiv, Ukraine'}

            {/* {selectedLocation
              ? selectedLocation
                  .split(', ')
                  .reverse()
                  .join(', ')
              : 'Kyiv, Ukraine'} */}
          </button>
          {open && (
            <ul>
              {Array.from(
                new Set(safeCatalogs.map(c => c.location))
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
                      handleLocation(loc);
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
          <li
            className={`${css.item} ${localFilters.AC ? css.checked : ''}`}
          >
            <label>
              <input
                type="checkbox"
                checked={localFilters.AC}
                onChange={() => handleCheckbox('AC')}
                className={css.checkbox}
              />
              <p className={css.textAuto}>
                <span>
                  <svg className={css.svgF}>
                    <use href="/sprite.svg#icon-wind" />
                  </svg>
                </span>
                AC
              </p>
            </label>
          </li>

          <li
            className={`${css.item} ${localFilters.transmission === 'automatic' ? css.checked : ''}`}
          >
            <label>
              <input
                type="radio"
                name="transmission"
                value="automatic"
                checked={
                  localFilters.transmission === 'automatic'
                }
                onChange={() =>
                  handleTransmission('automatic')
                }
                className={css.checkbox}
              />
              <p className={css.textAuto}>
                <span>
                  <svg className={css.svgF}>
                    <use href="/sprite.svg#icon-diagram" />
                  </svg>
                </span>
                Automatic
              </p>
            </label>
          </li>

          <li
            className={`${css.item} ${localFilters.kitchen ? css.checked : ''}`}
          >
            <label>
              <input
                type="checkbox"
                checked={localFilters.kitchen}
                onChange={() => handleCheckbox('kitchen')}
                className={css.checkbox}
              />
              <p className={css.textAuto}>
                <span>
                  <svg className={css.svgF}>
                    <use href="/sprite.svg#icon-cup-hot" />
                  </svg>
                </span>
                Kitchen
              </p>
            </label>
          </li>

          <li
            className={`${css.item} ${localFilters.TV ? css.checked : ''}`}
          >
            <label>
              <input
                type="checkbox"
                checked={localFilters.TV}
                onChange={() => handleCheckbox('TV')}
                className={css.checkbox}
              />
              <p className={css.textAuto}>
                <span>
                  <svg className={css.svgF}>
                    <use href="/sprite.svg#icon-tv" />
                  </svg>
                </span>
                TV
              </p>
            </label>
          </li>

          <li
            className={`${css.item} ${localFilters.bathroom ? css.checked : ''}`}
          >
            <label>
              <input
                type="checkbox"
                checked={localFilters.bathroom}
                onChange={() => handleCheckbox('bathroom')}
                className={css.checkbox}
              />
              <p className={css.textAuto}>
                <span>
                  <svg className={css.svgF}>
                    <use href="/sprite.svg#icon-ph_shower" />
                  </svg>
                </span>
                Bathroom
              </p>
            </label>
          </li>
        </ul>
      </div>
      <div className={css.filter}>
        <h2 className={css.filterTitel}>Vehicle type</h2>
        <ul className={css.list}>
          <li
            className={`${css.item} ${localFilters.form === 'van' ? css.checked : ''}`}
          >
            <label>
              <input
                type="radio"
                name="vehicleType"
                value="van"
                checked={localFilters.form === 'van'}
                onChange={() => handleRadio('form', 'van')}
                className={css.checkbox}
              />
              <p className={css.textAuto}>
                <span>
                  <svg className={css.svgF}>
                    <use href="/sprite.svg#icon-bi_grid-1x2" />
                  </svg>
                </span>
                Van
              </p>
            </label>
          </li>

          <li
            className={`${css.item} ${localFilters.form === 'fullyIntegrated' ? css.checked : ''}`}
          >
            <label>
              <input
                type="radio"
                name="vehicleType"
                value="fullyIntegrated"
                checked={
                  localFilters.form === 'fullyIntegrated'
                }
                onChange={() =>
                  handleRadio('form', 'fullyIntegrated')
                }
                className={css.checkbox}
              />
              <p className={css.textAuto}>
                <span>
                  <svg className={css.svgF}>
                    <use href="/sprite.svg#icon-bi_grid" />
                  </svg>
                </span>
                Fully Integrated
              </p>
            </label>
          </li>

          <li
            className={`${css.item} ${localFilters.form === 'alcove' ? css.checked : ''}`}
          >
            <label>
              <input
                type="radio"
                name="vehicleType"
                value="alcove"
                checked={localFilters.form === 'alcove'}
                onChange={() =>
                  handleRadio('form', 'alcove')
                }
                className={css.checkbox}
              />
              <p className={css.textAuto}>
                <span>
                  <svg className={css.svgF}>
                    <use href="/sprite.svg#icon-bi_grid-3x3-gap" />
                  </svg>
                </span>
                Alcove
              </p>
            </label>
          </li>
        </ul>
      </div>
      <div className={css.Button}>
        <button
          className={css.ButtonRed}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
