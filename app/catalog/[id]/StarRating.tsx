import css from './CatalogDetailsTruck.module.css';

interface StarRatingProps {
  rating: number;
}

export default function SrarRating({
  rating,
}: StarRatingProps) {
  const starsRat = Math.round(rating);
  const star = 5 - starsRat;
  const stars = [];
  for (let i = 0; i < starsRat; i++) {
    stars.push(
      <svg key={`${i}`} className={css.svgStar}>
        <use href="/sprite.svg#icon-Rating-1" />
      </svg>
    );
  }
  for (let i = 0; i < star; i++) {
    stars.push(
      <svg key={`${i}`} className={css.svgStarGrey}>
        <use href="/sprite.svg#icon-Rating" />
      </svg>
    );
  }
  return <div className={css.rev}>{stars}</div>;
}
