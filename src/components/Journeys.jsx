import React from 'react';
import { Label, ActionLink, Figure } from './primitives.jsx';
import { journeys } from '../media.js';

/* Each journey gets its own crop and its own place on the grid. */
const SIZES = {
  wide: '(max-width: 48rem) 92vw, (max-width: 64rem) 48vw, 38vw',
  offset: '(max-width: 48rem) 92vw, (max-width: 64rem) 48vw, 54vw',
  full: '(max-width: 48rem) 92vw, 90vw'
};

function JourneyContent({ journey, onEnquire }) {
  return (
    <>
      <div className="journey__meta">
        <span className="journey__numeral" aria-hidden="true">
          {journey.index}
        </span>
        <Label as="span" plain>
          {journey.kicker}
        </Label>
      </div>
      <h3 id={`journey-${journey.id}`}>{journey.title}</h3>
      <p className="journey__lede">{journey.lede}</p>
      <p className="journey__note">{journey.note}</p>
      <div className="journey__actions">
        <ActionLink onClick={() => onEnquire(journey.title)}>
          <span aria-hidden="true">Enquire about this</span>
          <span className="sr-only">{`Enquire about ${journey.title}`}</span>
        </ActionLink>
      </div>
    </>
  );
}

function Journey({ journey, onEnquire }) {
  const figure = (
    <Figure
      media={journey.media}
      className="journey__figure"
      sizes={SIZES[journey.layout]}
    />
  );

  /* Layout 03 puts the photograph across the full grid and splits the text
     underneath it, so the three journeys never line up as matching cards. */
  if (journey.layout === 'full') {
    return (
      <article
        className="grid12 journey journey--full"
        aria-labelledby={`journey-${journey.id}`}
      >
        {figure}
        <div className="journey__content">
          <div className="journey__head">
            <div className="journey__meta">
              <span className="journey__numeral" aria-hidden="true">
                {journey.index}
              </span>
              <Label as="span" plain>
                {journey.kicker}
              </Label>
            </div>
            <h3 id={`journey-${journey.id}`}>{journey.title}</h3>
          </div>
          <div className="journey__tail">
            <p className="journey__lede">{journey.lede}</p>
            <p className="journey__note">{journey.note}</p>
            <div className="journey__actions">
              <ActionLink onClick={() => onEnquire(journey.title)}>
                <span aria-hidden="true">Enquire about this</span>
                <span className="sr-only">{`Enquire about ${journey.title}`}</span>
              </ActionLink>
            </div>
          </div>
        </div>
      </article>
    );
  }

  const content = (
    <div className="journey__content">
      <JourneyContent journey={journey} onEnquire={onEnquire} />
    </div>
  );

  /* 01 reads photograph-then-text; 02 reverses it. */
  return (
    <article
      className={`grid12 journey journey--${journey.layout}`}
      aria-labelledby={`journey-${journey.id}`}
    >
      {journey.layout === 'offset' ? (
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
}

export default function Journeys({ onEnquire }) {
  return (
    <section className="section journeys" id="journeys" aria-labelledby="journeys-title">
      <div className="shell">
        <div className="grid12 journeys__head">
          <h2 id="journeys-title">
            Three ways to
            <br />
            <span className="em">begin.</span>
          </h2>
          <p className="journeys__intro">
            A starting point rather than a fixed menu. Each one is shaped around
            what you tell us.
          </p>
        </div>

        {journeys.map((journey) => (
          <Journey key={journey.id} journey={journey} onEnquire={onEnquire} />
        ))}

        <p className="journeys__disclaimer">
          These three are concept directions, not confirmed packages. Prices,
          dates, accommodation, transport, inclusions and availability have not
          been set yet — ask and we will confirm what is actually possible for
          your dates. Photography on this page is illustrative and does not show
          a specific property or trip.
        </p>
      </div>
    </section>
  );
}
