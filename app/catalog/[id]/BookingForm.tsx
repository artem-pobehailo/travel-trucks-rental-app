'use client';

import { useState } from 'react';
import css from './BookingForm.module.css';
import { useParams } from 'next/navigation';

export default function BookingForm() {
  const { id } = useParams<{ id: string }>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clearMessage = () => {
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const date = formData.get('date') as string;
    const comment = formData.get('comment') as string;
    const camperId = formData.get('camperId');

    if (username.trim().length < 2) {
      setError('Name must contain at least 2 characters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(date)) {
      setError('Date must be in format YYYY-MM-DD.');
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    if (!date || date < today) {
      setError('Please choose a valid booking date.');
      return;
    }

    setSuccess(true);
  };

  return (
    <div className={css.bookingFormWrapper}>
      <h2 className={css.formTitel}>
        Book your campervan now
      </h2>
      <p className={css.formText}>
        Stay connected! We are always ready to help you.
      </p>

      <form action={handleSubmit}>
        <input type="hidden" name="camperId" value={id} />
        <div className={css.form}>
          <input
            className={css.formInput}
            type="text"
            placeholder="Name*"
            name="username"
            required
            onInput={clearMessage}
          />

          <input
            className={css.formInput}
            type="email"
            placeholder="Email*"
            name="email"
            required
            onInput={clearMessage}
          />

          <input
            className={css.formInput}
            type="text"
            placeholder="Booking date* YYYY-MM-DD"
            name="date"
            required
            onInput={clearMessage}
          />

          <textarea
            className={css.formArea}
            placeholder="Comment"
            name="comment"
            onInput={clearMessage}
          />
        </div>
        <button className={css.ButtonRed} type="submit">
          Send
        </button>
      </form>

      {error && <p className={css.error}>{error}</p>}

      {success && (
        <p className={css.formTitel}>
          Your booking has been sent successfully!
        </p>
      )}
    </div>
  );
}
