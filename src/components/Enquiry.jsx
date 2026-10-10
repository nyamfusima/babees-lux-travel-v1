import React, { useEffect, useId, useRef, useState } from 'react';
import { Label } from './primitives.jsx';
import { whatsappIsPlaceholder, whatsappLink, brand } from '../site.config.js';
import { formMessage } from '../enquiry.js';

/* Mirrors what is actually on offer: the one published tour, plus the two
   enquiry-only routes. Nothing here implies a package that does not exist. */
const TRIPS = [
  'Mozambique Tour — Maputo & Bilene',
  'Group booking',
  'Custom itinerary',
  'Not decided yet'
];

const PARTY_SIZES = ['Just me', 'Two of us', '3 – 5', '6 – 10', 'More than 10'];

const EMPTY = {
  name: '',
  contact: '',
  destination: TRIPS[0],
  travellers: PARTY_SIZES[1],
  dates: '',
  details: ''
};

/** Minimal, forgiving checks — enough to catch a genuine mistake, no more. */
function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Please add a name so we know who we are writing to.';
  }

  const contact = values.contact.trim();
  if (!contact) {
    errors.contact = 'Please add a phone number or email address.';
  } else {
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact);
    const digits = contact.replace(/\D/g, '');
    if (!looksLikeEmail && digits.length < 9) {
      errors.contact = 'That does not look complete — please check the number or email.';
    }
  }

  return errors;
}

export default function Enquiry({ interest }) {
  const uid = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);

  /* A journey's "Enquire about this" button pre-fills the notes field. */
  useEffect(() => {
    if (!interest) return;
    setValues((current) => ({
      ...current,
      details: `I am interested in: ${interest.title}`,
      destination: interest.destination ?? current.destination
    }));
  }, [interest]);

  const field = (key) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    onChange: (event) => {
      const { value } = event.target;
      setValues((current) => ({ ...current, [key]: value }));
      /* Clear an error as soon as the visitor starts fixing it. */
      setErrors((current) => {
        if (!current[key]) return current;
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  });

  const describedBy = (key) => (errors[key] ? `${uid}-${key}-error` : undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCopied(false);

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus({
        type: 'error',
        message: 'Please check the highlighted fields and send again.'
      });
      const firstKey = Object.keys(found)[0];
      formRef.current?.querySelector(`#${CSS.escape(`${uid}-${firstKey}`)}`)?.focus();
      return;
    }

    const message = formMessage(values);

    /* The WhatsApp number is still the stand-in, so opening wa.me would send
       the visitor to a dead chat. Show the message to copy instead. */
    if (whatsappIsPlaceholder) {
      setDraft(message);
      setStatus({
        type: 'pending',
        message:
          'Your enquiry is ready, but the WhatsApp number for this site has not been connected yet. Copy the message below and send it to Babee’s Lux Travel directly.'
      });
      return;
    }

    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
    setDraft('');
    setStatus({
      type: 'sent',
      message:
        'WhatsApp should have opened in a new tab with your enquiry ready to send. If it did not, check that pop-ups are allowed.'
    });
  };

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      /* Clipboard access can be blocked; the text is on screen to select. */
      setCopied(false);
    }
  };

  return (
    <section className="section enquiry" id="enquire" aria-labelledby="enquiry-title">
      <div className="shell grid12">
        <div className="enquiry__copy">
          <Label light as="div">
            Start here
          </Label>
          <h2 id="enquiry-title">
            Tell us roughly
            <br />
            <span className="em">what you want.</span>
          </h2>
          <p className="enquiry__p">
            No detail is too vague at this stage. A destination and a month is
            plenty to work with, and we will take it from there.
          </p>
          <p className="enquiry__aside">
            This form does not take a booking or a payment. It opens a WhatsApp
            message with your answers filled in, so you can read it before
            anything is sent.
          </p>
        </div>

        <div className="enquiry__form">
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="form__head">
              <span>Your enquiry</span>
              <span>{brand.descriptor}</span>
            </div>

            <div className="form__grid">
              <div className="field field--full" data-invalid={Boolean(errors.name)}>
                <label className="field__label" htmlFor={`${uid}-name`}>
                  Your name
                </label>
                <input
                  {...field('name')}
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describedBy('name')}
                />
                {errors.name ? (
                  <span className="field__error" id={`${uid}-name-error`}>
                    {errors.name}
                  </span>
                ) : null}
              </div>

              <div className="field field--full" data-invalid={Boolean(errors.contact)}>
                <label className="field__label" htmlFor={`${uid}-contact`}>
                  WhatsApp number or email
                </label>
                <input
                  {...field('contact')}
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={describedBy('contact')}
                />
                {errors.contact ? (
                  <span className="field__error" id={`${uid}-contact-error`}>
                    {errors.contact}
                  </span>
                ) : null}
              </div>

              <div className="field">
                <label className="field__label" htmlFor={`${uid}-destination`}>
                  Which trip
                </label>
                <select {...field('destination')}>
                  {TRIPS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="field__label" htmlFor={`${uid}-travellers`}>
                  Travellers
                </label>
                <select {...field('travellers')}>
                  {PARTY_SIZES.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="field field--full">
                <label className="field__label" htmlFor={`${uid}-dates`}>
                  Preferred dates{' '}
                  <span className="field__optional">— a month or season is fine</span>
                </label>
                <input {...field('dates')} type="text" placeholder="e.g. late April, or 12–19 July" />
              </div>

              <div className="field field--full">
                <label className="field__label" htmlFor={`${uid}-details`}>
                  Anything else{' '}
                  <span className="field__optional">— optional</span>
                </label>
                <textarea {...field('details')} rows={3} />
              </div>
            </div>

            <div className="form__submit">
              <button className="button" type="submit">
                <span>Send enquiry</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* Announced to screen readers the moment it changes. */}
            <p
              className={`form__status ${status?.type === 'error' ? 'form__status--error' : ''}`}
              role="status"
              aria-live="polite"
            >
              {status?.message ?? ''}
            </p>

            {whatsappIsPlaceholder && draft ? (
              <div className="form__placeholder-note">
                <strong>Placeholder number — not yet connected</strong>
                <label className="sr-only" htmlFor={`${uid}-draft`}>
                  Your enquiry message, ready to copy
                </label>
                <textarea
                  className="form__copy-area"
                  id={`${uid}-draft`}
                  readOnly
                  rows={8}
                  value={draft}
                />
                <div className="form__submit">
                  <button className="button" type="button" onClick={copyDraft}>
                    <span>{copied ? 'Copied' : 'Copy message'}</span>
                    <span aria-hidden="true">⧉</span>
                  </button>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
