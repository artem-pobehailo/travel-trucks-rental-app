'use client';

import css from './SideBarCatalogs.module.css';

export default function SideBarCatalog() {
  return (
    <div className={css.sidebar}>
      <div className={css.location}>
        <h2 className={css.subTitel}>Location</h2>
        <p className={css.textSidebar}>
          <span>
            <svg className={css.svg}>
              <use href="/sprite.svg#icon-map" />
            </svg>
          </span>
          Kyiv, Ukraine
        </p>
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
