'use client';
import Link from 'next/link';
import css from './CatalogPage.module.css';
import Image from 'next/image';
export default function CatalogPage() {
  return (
    <section className={css.wrapper}>
      {/* {!isMobile && (
        <aside className={styles.container}>
          <SideBarGoods
            filters={filters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            totalGoods={totalGoods}
            goodsLength={allGoods.length}
          />
        </aside>
      )} */}

      <main className={css.mainContent}>
        <ul className={css.list}>
          <li className={css.item}>
            <Image
              src="/hero_2x.jpg"
              alt="{category.name}"
              width={292}
              height={320}
              className={css.imagi}
            />
            <div>
              <div className={css.itemTitel}>
                <h2 className={css.titel}>Mavericks</h2>
                <p className={css.text}>
                  €8000.00
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
                  4.4(2 Reviews)
                </p>

                <p className={css.textMap}>
                  <span>
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-map" />
                    </svg>
                  </span>
                  Kyiv, Ukraine
                </p>
              </div>
              <p className={css.subText}>
                Embrace simplicity and freedom with the
                Mavericks panel truck...
              </p>
              <div className={css.auto}>
                <p className={css.textAuto}>
                  <span>
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-diagram" />
                    </svg>
                  </span>
                  Automatic
                </p>
                <p className={css.textAuto}>
                  <span>
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-Group" />
                    </svg>
                  </span>
                  Petrol
                </p>
                <p className={css.textAuto}>
                  <span>
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-cup-hot" />
                    </svg>
                  </span>
                  Kitchen
                </p>
                <p className={css.textAuto}>
                  <span>
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-wind" />
                    </svg>
                  </span>
                  AC
                </p>
              </div>
              <div className={css.ButtonRed}>
                <Link href="/details">Show more</Link>
              </div>
            </div>
          </li>
          <li className={css.item}>
            <Image
              src="/hero_2x.jpg"
              alt="{category.name}"
              width={292}
              height={320}
              className={css.imagi}
            />
            <div>
              <div className={css.itemTitel}>
                <h2 className={css.titel}>Mavericks</h2>
                <p className={css.text}>
                  €8000.00
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
                  4.4(2 Reviews)
                </p>

                <p className={css.textMap}>
                  <span>
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-map" />
                    </svg>
                  </span>
                  Kyiv, Ukraine
                </p>
              </div>
              <p className={css.subText}>
                Embrace simplicity and freedom with the
                Mavericks panel truck...
              </p>
              <div className={css.auto}>
                <p className={css.textAuto}>
                  <span>
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-diagram" />
                    </svg>
                  </span>
                  Automatic
                </p>
                <p className={css.textAuto}>
                  <span>
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-Group" />
                    </svg>
                  </span>
                  Petrol
                </p>
                <p className={css.textAuto}>
                  <span>
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-cup-hot" />
                    </svg>
                  </span>
                  Kitchen
                </p>
                <p className={css.textAuto}>
                  <span>
                    <svg className={css.svg}>
                      <use href="/sprite.svg#icon-wind" />
                    </svg>
                  </span>
                  AC
                </p>
              </div>
              <div className={css.ButtonRed}>
                <Link href="/details">Show more</Link>
              </div>
            </div>
          </li>
        </ul>
        <div className={css.ButtonGray}>
          <Link href="/details">Load more</Link>
        </div>
      </main>
    </section>
  );
}
