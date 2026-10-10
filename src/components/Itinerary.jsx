import React from 'react';
import { Label, Figure } from './primitives.jsx';
import { mozambiqueTour } from '../packages.js';
import { dayMedia } from '../media.js';

/**
 * Day-by-day itinerary, read off the client's itinerary poster.
 *
 * Each day gets its own composition rather than four matching cards:
 *   day 1  large city photograph, then a strip of three smaller frames
 *   day 2  a full-width lagoon photograph carries the day
 *   day 3  the optional-activity gallery
 *   day 4  a calm, open two-image close
 *
 * Day three is the optional-activities day. The poster lists those same
 * activities under "own cost", so the day says so plainly rather than
 * implying the jet skis and quad bikes are in the price.
 */

function DayHead({ day }) {
  return (
    <div className="day__head">
      <span className="day__num">{day.day}</span>
      <span className="day__date">{day.date}</span>
      <h3 id={`day-${day.day.replace(/\s/g, '-').toLowerCase()}`}>{day.title}</h3>
    </div>
  );
}

function DayList({ items, className = '' }) {
  return (
    <ul className={`day__items ${className}`.trim()}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/* ---- Day 1: a big Maputo frame, then three smaller ones ---------------- */
function DayOne({ day, media }) {
  return (
    <article className="day day--one reveal" aria-labelledby="day-day-1">
      <div className="shell grid12 day__top">
        <Figure
          media={media.lead}
          className="day__lead"
          sizes="(max-width: 48rem) 92vw, 54vw"
          caption={media.lead.caption}
        />
        <div className="day__body">
          <DayHead day={day} />
          <DayList items={day.items} />
        </div>
      </div>

      <div className="shell day__strip">
        {media.strip.map((m) => (
          <Figure
            key={m.src}
            media={m}
            sizes="(max-width: 48rem) 45vw, 28vw"
            caption={m.caption}
          />
        ))}
      </div>
    </article>
  );
}

/* ---- Day 2: the lagoon runs full width and carries the day ------------- */
function DayTwo({ day, media }) {
  return (
    <article className="day day--two reveal" aria-labelledby="day-day-2">
      <div className="day__bleed">
        <img
          src={media.lead.src}
          srcSet={media.lead.srcSet}
          sizes="100vw"
          width={media.lead.width}
          height={media.lead.height}
          alt={media.lead.alt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="shell grid12 day__two-body">
        <div className="day__body">
          <DayHead day={day} />
          <DayList items={day.items} />
        </div>
        <Figure
          media={media.strip[0]}
          className="day__aside"
          sizes="(max-width: 48rem) 92vw, 34vw"
          caption={media.strip[0].caption}
        />
      </div>
    </article>
  );
}

/* ---- Day 3: the optional-activity gallery ------------------------------ */
function DayThree({ day, media }) {
  return (
    <article className="day day--three reveal" aria-labelledby="day-day-3">
      <div className="shell">
        <div className="day__body day__body--centreless">
          <DayHead day={day} />
          <p className="day__lede">
            Nothing is scheduled. The lagoon is calm enough for most of these,
            so you can decide on the morning.
          </p>
        </div>

        <ul className="activities">
          {media.activities.map((a) => (
            <li className="activity" key={a.id}>
              <div className="frame">
                <img
                  src={a.src}
                  srcSet={a.srcSet}
                  sizes="(max-width: 30rem) 45vw, (max-width: 64rem) 30vw, 18vw"
                  width={a.width}
                  height={a.height}
                  alt={a.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h4 className="activity__name">{a.name}</h4>
            </li>
          ))}
        </ul>

        <p className="day__note">
          These activities are optional and at your own cost. Availability is
          not guaranteed on any particular date, so ask Babee’s Lux Travel what
          can be arranged for your departure. The photographs above are
          illustrative.
        </p>
      </div>
    </article>
  );
}

/* ---- Day 4: calm and open -------------------------------------------- */
function DayFour({ day, media }) {
  return (
    <article className="day day--four reveal" aria-labelledby="day-day-4">
      <div className="shell grid12 day__four-body">
        <div className="day__body">
          <DayHead day={day} />
          <DayList items={day.items} />
        </div>

        <Figure
          media={media.lead}
          className="day__four-a"
          sizes="(max-width: 48rem) 92vw, 44vw"
        />
        <Figure
          media={media.strip[0]}
          className="day__four-b"
          sizes="(max-width: 48rem) 45vw, 24vw"
          caption={media.strip[0].caption}
        />
        <Figure
          media={media.strip[1]}
          className="day__four-c"
          sizes="(max-width: 48rem) 45vw, 24vw"
        />
      </div>
    </article>
  );
}

const LAYOUTS = { 1: DayOne, 2: DayTwo, 3: DayThree, 4: DayFour };

export default function Itinerary() {
  const days = mozambiqueTour.itinerary;

  return (
    <section className="itinerary" id="itinerary" aria-labelledby="itinerary-title">
      <div className="shell">
        <div className="grid12 itinerary__head reveal">
          <h2 id="itinerary-title">
            Your trip,
            <br />
            <span className="em">day by day.</span>
          </h2>
          <p className="itinerary__intro">
            As published for the 27 to 30 November departure. Other departures
            follow the same shape, though the calendar dates differ. Confirm
            yours when you enquire.
          </p>
        </div>
      </div>

      {days.map((day, i) => {
        const Layout = LAYOUTS[i + 1];
        return <Layout key={day.day} day={day} media={dayMedia[i + 1]} />;
      })}

      <div className="shell grid12 itinerary__foot reveal">
        <div className="stayin">
          <Label as="h3" className="stayin__label">
            Where you stay
          </Label>
          <ul className="stayin__list">
            {mozambiqueTour.accommodation.map((a) => (
              <li key={a.property}>
                <span className="stayin__place">{a.place}</span>
                <span className="stayin__property">{a.property}</span>
              </li>
            ))}
          </ul>
          <p className="stayin__note">
            Both are named on the tour poster. Confirm the exact property for
            your date when you book. There are no photographs of either property
            on this page, because those images belong to the properties
            themselves.
          </p>
        </div>
      </div>
    </section>
  );
}
