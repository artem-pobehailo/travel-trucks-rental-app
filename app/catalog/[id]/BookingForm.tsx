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

type ToastType = 'success' | 'error';

export default function BookingForm() {
  const { id } = useParams<{ id: string }>();

  const [date, setDate] = useState<Date | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 600);
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

    const nameRegex = /^[A-Za-zА-Яа-яЇїІіЄєҐґ\s'-]{2,}$/;

    if (!nameRegex.test(username.trim())) {
      showToast(
        'Please enter a valid name (letters only, min 2 characters).',
        'error'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast(
        'Please enter a valid email address.',
        'error'
      );
      return;
    }

    if (!date) {
      showToast(
        'Please choose a valid booking date.',
        'error'
      );
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      showToast(
        'Please choose a valid booking date.',
        'error'
      );
      return;
    }
    showToast('Your booking was successful!', 'success');
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
          />

          <input
            className={css.formInput}
            type="email"
            placeholder="Email*"
            name="email"
            required
          />

          <DatePicker
            locale={'en-GB'}
            selected={date}
            onChange={setDate}
            customInput={<CustomInput />}
          />

          <textarea
            className={css.formArea}
            placeholder="Comment"
            name="comment"
          />
        </div>
        <button className={css.ButtonRed} type="submit">
          Send
        </button>
      </form>

      {toast && (
        <div
          className={
            toast.type === 'success'
              ? css.toastSuccess
              : css.toastError
          }
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
