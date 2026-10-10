import React from 'react';
import { Label, ActionLink, Figure } from './primitives.jsx';
import { otherTrips } from '../media.js';

const SIZES = {
  wide: '(max-width: 48rem) 92vw, (max-width: 64rem) 48vw, 38vw',
  offset: '(max-width: 48rem) 92vw, (max-width: 64rem) 48vw, 54vw'
};

/**
 * Group bookings and custom itineraries.
 *
 * These are enquiry routes, not packages. No price, date, inclusion or
 * duration appears here, because the client's posters cover only the
 * Mozambique tour and nothing else has been supplied.
 */
export default function OtherTrips({ onEnquire }) {
  return (
    <section className="section other" id="other" aria-labelledby="other-title">
      <div className="shell">
        <div className="grid12 other__head">
          <h2 id="other-title">
            Travelling on
            <br />
            <span className="em">other terms.</span>
          </h2>
          <p className="other__intro">
            Not every trip fits a published date. Both of these start as a
            conversation rather than a price.
          </p>
        </div>

        {otherTrips.map((trip) => {
          const figure = (
            <Figure
              media={trip.media}
              className="journey__figure"
              sizes={SIZES[trip.layout]}
            />
          );
          const content = (
            <div className="journey__content">
              <Label as="div" plain>
                {trip.kicker}
              </Label>
              <h3 id={`trip-${trip.id}`}>{trip.title}</h3>
              <p className="journey__lede">{trip.lede}</p>
              <p className="journey__note">{trip.note}</p>
              <div className="journey__actions">
                <ActionLink onClick={() => onEnquire(trip.title)}>
                  <span aria-hidden="true">Start an enquiry</span>
                  <span className="sr-only">{`Start an enquiry about ${trip.title}`}</span>
                </ActionLink>
              </div>
            </div>
          );

          return (
            <article
              className={`grid12 journey journey--${trip.layout}`}
              key={trip.id}
              aria-labelledby={`trip-${trip.id}`}
            >
              {trip.layout === 'offset' ? (
                <>
                  {content}
                  {figure}
                </>
              ) : (
                <>
                  {figure}
                  {content}
                </>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
