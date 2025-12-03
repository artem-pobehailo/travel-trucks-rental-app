'use client';

import Link from 'next/link';
import css from './Header.module.css';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <div className={css.container}>
        <div className={css.group}>
          <Link href="/" className={css.logo}>
            <svg
              className={css.iconlogo}
              width={136}
              height={16}
            >
              <use href="/sprite.svg#icon-Logo"></use>
            </svg>
          </Link>

          <nav className={css.nav}>
            <ul className={css.listNav}>
              <li>
                <Link
                  className={` ${pathname === '/' ? css.active : ''}`}
                  href="/"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className={` ${
                    pathname === '/catalog'
                      ? css.active
                      : ''
                  }`}
                  href="/catalog"
                >
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
