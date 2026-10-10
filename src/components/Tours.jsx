import React from 'react';
import { Label, ActionLink, Arrow } from './primitives.jsx';
import { mozambiqueTour, getDepartures } from '../packages.js';
import { packageWhatsappLink, departureLabel } from '../enquiry.js';

/**
 * The published Mozambique tour.
 *
 * Everything rendered here comes from `src/packages.js`, which was transcribed
 * from the client's own posters. Departures that have already left are never
 * shown as bookable.
 */
export default function Tours({ onEnquire }) {
  const tour = mozambiqueTour;
  const { upcoming, past } = getDepartures();

  return (
    <section className="section tours" id="tours" aria-labelledby="tours-title">
      <div className="shell">
        <div className="grid12 tours__head">
          <Label as="div" className="tours__label">
            The tour
          </Label>
          <h2 className="tours__title" id="tours-title">
            Dates, price
            <br />
            and <span className="em">what is covered.</span>
          </h2>
        </div>

        <div className="grid12 tours__body">
          <div className="tours__detail">
            <p className="tours__lede">
              Four days between Maputo and Bilene — a city tour, a sunset cruise
              on the bay, then three nights on the lagoon. Road transfer from
              Johannesburg and back is part of the price.
            </p>

            {/* Price and the hard facts, as published. */}
            <dl className="facts">
              <div className="facts__row facts__row--price">
                <dt>Price</dt>
                <dd>
                  <span className="facts__price">{tour.price.display}</span>
                  <span className="facts__basis">{tour.price.basis}</span>
                </dd>
              </div>
              <div className="facts__row">
                <dt>Duration</dt>
                <dd>{tour.duration}</dd>
              </div>
              <div className="facts__row">
                <dt>Departs from</dt>
                <dd>{tour.departsFrom}</dd>
              </div>
              <div className="facts__row">
                <dt>To secure a place</dt>
                <dd>
                  {tour.deposit.display} {tour.deposit.label}
                </dd>
              </div>
            </dl>

            <p className="tours__note">
              Prices and inclusions are as published by Babee’s Lux Travel.
              Confirm the final detail for your date when you enquire.
            </p>
          </div>
        </div>

        {/* ---- Departure dates ---- */}
        <div className="departures" id="dates">
          <div className="departures__head">
            <h3>Departure dates</h3>
            <p>
              {upcoming.length > 0
                ? 'Each departure follows the same four-day itinerary.'
                : 'All published 2026 departures have now left.'}
            </p>
          </div>

          {upcoming.length > 0 ? (
            <ul className="departures__list">
              {upcoming.map((d) => (
                <li className="departure" key={d.start}>
                  <span className="departure__date">{departureLabel(d)}</span>
                  <span className="departure__meta">{tour.duration}</span>
                  <span className="departure__price">{tour.price.display} pp</span>
                  <a
                    className="link departure__cta"
                    href={packageWhatsappLink(tour, d)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span aria-hidden="true">Enquire on WhatsApp</span>
                    <span className="sr-only">
                      {`Enquire on WhatsApp about the ${departureLabel(d)} departure`}
                    </span>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          {past.length > 0 ? (
            <p className="departures__past">
              {past.length} earlier 2026{' '}
              {past.length === 1 ? 'departure has' : 'departures have'} already
              travelled{upcoming.length === 0 ? '. ' : ' — '}
              <a href="#contact">ask about dates beyond those listed</a>.
            </p>
          ) : null}
        </div>

        {/* ---- What is and is not included ---- */}
        <div className="grid12 inclusions">
          <div className="inclusions__col">
            <h3>What the price covers</h3>
            <ul className="ticks">
              {tour.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="inclusions__col">
            <h3>Not included</h3>
            <ul className="ticks ticks--out">
              {tour.excludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="inclusions__sub">Optional, at own cost</h3>
            <p className="inclusions__optional">
              {tour.optionalActivities.join(' · ')}
            </p>
          </div>
        </div>

        <div className="tours__actions">
          <ActionLink
            href={packageWhatsappLink(tour)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enquire about this tour
          </ActionLink>
          <ActionLink href="#enquire" onClick={onEnquire}>
            Send a written enquiry
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
