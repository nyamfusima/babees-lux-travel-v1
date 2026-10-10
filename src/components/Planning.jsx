import React from 'react';
import { Label } from './primitives.jsx';

/* Four steps, set as an editorial list with hairline rules — not a row of
   rounded boxes. The numerals carry the hierarchy. */
const steps = [
  {
    numeral: '01',
    title: 'Message on WhatsApp',
    text: 'Tell us which departure you are looking at and how many of you are travelling. The short form on this page sends the same details.'
  },
  {
    numeral: '02',
    title: 'We confirm the detail',
    text: 'Availability for your date, what the price covers, what it does not, and anything that has to work around a person or a passport.'
  },
  {
    numeral: '03',
    title: 'Secure your place',
    text: 'The published booking deposit is R1 200. Babee’s Lux Travel will confirm the amount, how to pay it and by when. None of that happens on this website.'
  },
  {
    numeral: '04',
    title: 'Travel',
    text: 'Road transfer from Johannesburg, four days between Maputo and Bilene, and back again.'
  }
];

export default function Planning() {
  return (
    <section className="section planning" id="planning" aria-labelledby="planning-title">
      <div className="shell">
        <div className="grid12 planning__head reveal">
          <h2 id="planning-title">
            How the planning
            <br />
            <span className="em">actually works.</span>
          </h2>
          <p className="planning__intro">
            No booking or payment is taken on this website. Everything is
            confirmed directly with Babee’s Lux Travel before anything is owed.
          </p>
        </div>

        <ol className="steps reveal" style={{ '--reveal-delay': '110ms' }}>
          {steps.map((step) => (
            <li className="step" key={step.numeral}>
              <span className="step__numeral" aria-hidden="true">
                {step.numeral}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
