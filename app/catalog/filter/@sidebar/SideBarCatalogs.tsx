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
  transmission: 'automatic' | 'manual' | '';
}

export default function SideBarCatalog({
  catalogs = [],
}: SideBarProps) {
  const { filters, setFilters } = useCatalogStore();
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState('');

  const [localFilters, setLocalFilters] =
    useState<LocalFilters>({
      location: selectedLocation,
      form: filters.form,
      AC: filters.AC,
      kitchen: filters.kitchen,
      bathroom: filters.bathroom,
      TV: filters.TV,
      transmission:
        filters.transmission === 'automatic' ||
        filters.transmission === 'manual'
          ? filters.transmission
          : '',
    });

  useEffect(() => {
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      location: selectedLocation,
    }));
  }, [selectedLocation]);

  const handleCheckboxChange = (
    key: keyof LocalFilters
  ) => {
    setLocalFilters({
      ...localFilters,
      [key]: !localFilters[key],
    });
  };
  const handleFormChange = (form: string) => {
    setLocalFilters({
      ...localFilters,
      form,
    });
  };
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
  };
  const handleTransmissionChange = (
    value: 'automatic' | 'manual' | ''
  ) => {
    setLocalFilters({
      ...localFilters,
      transmission: value,
    });
  };

  const locations = Array.from(
    new Set(catalogs.map(c => c.location))
  );

  const handleSearch = () => {
    setFilters({
      ...filters,
      ...localFilters,
    });
  };

  const filteredCatalogs = catalogs.filter(catalog => {
    if (localFilters.transmission) {
      return (
        catalog.transmission === localFilters.transmission
      );
    }
    return true;
  });

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
              : 'Kyiv, Ukraine'}
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
                      handleLocationChange(loc);
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
                onChange={() => handleCheckboxChange('AC')}
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

          {/* Трансмісія: автоматична */}
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
                  handleTransmissionChange('automatic')
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

          {/* Трансмісія: ручна */}
          <li
            className={`${css.item} ${localFilters.transmission === 'manual' ? css.checked : ''}`}
          >
            <label>
              <input
                type="radio"
                name="transmission"
                value="manual"
                checked={
                  localFilters.transmission === 'manual'
                }
                onChange={() =>
                  handleTransmissionChange('manual')
                }
                className={css.checkbox}
              />
              <p className={css.textAuto}>
                <span>
                  <svg className={css.svgF}>
                    <use href="/sprite.svg#icon-diagram" />
                  </svg>
                </span>
                Manual
              </p>
            </label>
          </li>

          {/* Трансмісія: скинути вибір */}
          <li
            className={`${css.item} ${localFilters.transmission === '' ? css.checked : ''}`}
          >
            <label>
              <input
                type="radio"
                name="transmission"
                value=""
                checked={localFilters.transmission === ''}
                onChange={() =>
                  handleTransmissionChange('')
                }
                className={css.checkbox}
              />
              <p className={css.textAuto}>
                <span>
                  <svg className={css.svgF}>
                    <use href="/sprite.svg#icon-diagram" />
                  </svg>
                </span>
                All
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
                onChange={() =>
                  handleCheckboxChange('kitchen')
                }
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
                onChange={() => handleCheckboxChange('TV')}
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
                onChange={() =>
                  handleCheckboxChange('bathroom')
                }
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
                onChange={() => handleFormChange('van')}
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
                  handleFormChange('fullyIntegrated')
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
                onChange={() => handleFormChange('alcove')}
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
