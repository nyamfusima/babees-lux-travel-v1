import React from 'react';
import { Label, ActionLink, Figure } from './primitives.jsx';
import { bileneShore } from '../media.js';
import { mozambiqueTour, getDepartures } from '../packages.js';
import { departureLabel } from '../enquiry.js';

/**
 * Trip introduction.
 *
 * The facts strip carries only what the client's posters actually state.
 * Nothing here is rounded, inferred or filled in.
 */
export default function TripIntro({ onEnquire }) {
  const tour = mozambiqueTour;
  const next = getDepartures().upcoming[0];

  const facts = [
    { label: 'Duration', value: tour.duration },
    { label: 'Route', value: 'Johannesburg · Maputo · Bilene' },
    {
      label: 'You stay at',
      value: tour.accommodation.map((a) => a.property).join(' · ')
    },
    {
      label: next ? 'Next departure' : 'Departures',
      value: next ? departureLabel(next) : 'On enquiry'
    }
  ];

  return (
    <section className="section trip-intro" id="about" aria-labelledby="trip-intro-title">
      <div className="shell">
        <div className="grid12 trip-intro__body">
          <Figure
            media={bileneShore}
            className="trip-intro__figure"
            sizes="(max-width: 48rem) 92vw, 52vw"
            caption={bileneShore.caption}
          />

          <div className="trip-intro__text">
            <Label as="div">The journey</Label>
            <h2 id="trip-intro-title">
              Your Mozambique
              <br />
              <span className="em">escape.</span>
            </h2>

            <p className="trip-intro__lede">
              The road north out of Johannesburg, a night in Maputo, then on to
              the lagoon at Bilene — four days that start in a capital city and
              end on quiet water.
            </p>

            <p className="trip-intro__p">
              Day one is Maputo: the railway station, the fish market, Praça da
              Independência and a sunset cruise on the bay. The next morning you
              cross to Bilene and stay put, with three nights on the lagoon and
              as little or as much to do as you want.
            </p>

            <div className="trip-intro__actions">
              <ActionLink href="#itinerary">See the full itinerary</ActionLink>
              <ActionLink href="#enquire" onClick={onEnquire}>
                Enquire about this trip
              </ActionLink>
            </div>
          </div>
        </div>

        {/* Verified facts only — each one is printed on a poster. */}
        <dl className="factstrip">
          {facts.map((f) => (
            <div className="factstrip__item" key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
