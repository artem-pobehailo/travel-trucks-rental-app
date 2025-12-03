import Link from 'next/link';
import css from './Hero.module.css';

export default function Hero() {
  return (
    <section className={css.heroSection}>
      <div>
        <h1 className={css.heroTitle}>
          Campers of your dreams
        </h1>
        <p className={css.heroDesc}>
          You can find everything you want in our catalog
        </p>
        <div className={css.ButtonRed}>
          <Link href="/catalog">View Now</Link>
        </div>
      </div>
    </section>
  );
}
