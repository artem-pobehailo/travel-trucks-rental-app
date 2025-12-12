'use client';

import React, { useState } from 'react';
import css from './BookingForm.module.css';
import { useParams } from 'next/navigation';
import DatePicker, {
  registerLocale,
} from 'react-datepicker';
import { enGB } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('en-GB', enGB);

export default function BookingForm() {
  const { id } = useParams<{ id: string }>();

  const [date, setDate] = useState<Date | null>(null);
  const dateString = date
    ? date.toLocaleDateString('en-GB')
    : '';

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clearMessage = () => {
    setError(null);
    setSuccess(false);
  };

  const CustomInput = React.forwardRef<
    HTMLDivElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <div
      className={css.formInput}
      onClick={onClick}
      ref={ref}
    >
      <span className={css.dateText}>
        {value || 'Booking date*'}
      </span>
    </div>
  ));

  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;

    if (username.trim().length < 2) {
      setError('Name must contain at least 2 characters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!date) {
      setError('Please choose a valid booking date.');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
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

          <DatePicker
            locale={'en-GB'}
            selected={date}
            onChange={d => {
              setDate(d);
              clearMessage();
            }}
            customInput={<CustomInput />}
            required
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
