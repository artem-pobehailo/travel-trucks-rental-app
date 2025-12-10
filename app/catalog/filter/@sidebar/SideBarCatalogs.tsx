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
  const { filters, setFilters, campers } =
    useCatalogStore();

  const safeCatalogs = campers;

  const locations = Array.from(
    new Set(safeCatalogs.map(c => c.location))
  );

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
          <div className={css.inputWrapper}>
            <input
              className={css.textSidebar}
              type="text"
              placeholder="City"
              value={
                localFilters.location
                  ? localFilters.location
                      .split(', ')
                      .reverse()
                      .join(', ')
                  : ''
              }
              onChange={e => {
                const reversed = e.target.value
                  .split(', ')
                  .reverse()
                  .join(', ');
              }}
              onFocus={() => setOpen(true)}
            />
          </div>
          {open && (
            <ul>
              {locations.map(loc => {
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
            className={`${css.item} ${
              localFilters.transmission === 'automatic'
                ? css.checked
                : ''
            }`}
            onClick={() => {
              setLocalFilters(prev => ({
                ...prev,
                transmission:
                  prev.transmission === 'automatic'
                    ? ''
                    : 'automatic',
              }));
            }}
          >
            <p className={css.textAuto}>
              <span>
                <svg className={css.svgF}>
                  <use href="/sprite.svg#icon-diagram" />
                </svg>
              </span>
              Automatic
            </p>
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
            className={`${css.item} ${
              localFilters.form === 'panelTruck'
                ? css.checked
                : ''
            }`}
            onClick={() =>
              setLocalFilters(prev => ({
                ...prev,
                form:
                  prev.form === 'panelTruck'
                    ? ''
                    : 'panelTruck',
              }))
            }
          >
            <p className={css.textAuto}>
              <span>
                <svg className={css.svgF}>
                  <use href="/sprite.svg#icon-bi_grid-1x2" />
                </svg>
              </span>
              Van
            </p>
          </li>

          <li
            className={`${css.item} ${
              localFilters.form === 'fullyIntegrated'
                ? css.checked
                : ''
            }`}
            onClick={() =>
              setLocalFilters(prev => ({
                ...prev,
                form:
                  prev.form === 'fullyIntegrated'
                    ? ''
                    : 'fullyIntegrated',
              }))
            }
          >
            <p className={css.textAuto}>
              <span>
                <svg className={css.svgF}>
                  <use href="/sprite.svg#icon-bi_grid" />
                </svg>
              </span>
              Fully Integrated
            </p>
          </li>

          <li
            className={`${css.item} ${
              localFilters.form === 'alcove'
                ? css.checked
                : ''
            }`}
            onClick={() =>
              setLocalFilters(prev => ({
                ...prev,
                form:
                  prev.form === 'alcove' ? '' : 'alcove',
              }))
            }
          >
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
