import React from 'react';
import { Label } from './primitives.jsx';

/* Four steps, set as an editorial list with hairline rules — not a row of
   rounded boxes. The numerals carry the hierarchy. */
const steps = [
  {
    numeral: '01',
    title: 'Send the enquiry',
    text: 'Fill in the short form below, or message directly. Destination, rough dates and how many of you there are is enough to start.'
  },
  {
    numeral: '02',
    title: 'We talk it through',
    text: 'A conversation about what you want from the trip — the pace, the budget you have in mind and anything that has to work around a date or a person.'
  },
  {
    numeral: '03',
    title: 'You get the detail in writing',
    text: 'The proposed itinerary with what is included, what is not, and what it costs. Ask for changes as many times as you need.'
  },
  {
    numeral: '04',
    title: 'Confirm when it is right',
    text: 'Only once you are happy with the detail does anything get arranged. Nothing is held or paid for on this website.'
  }
];

export default function Planning() {
  return (
    <section className="section planning" id="planning" aria-labelledby="planning-title">
      <div className="shell">
        <div className="grid12 planning__head">
          <h2 id="planning-title">
            How the planning
            <br />
            <span className="em">actually works.</span>
          </h2>
          <p className="planning__intro">
            Four steps, no obligation at any of them. You can stop the
            conversation at any point and nothing will have been booked.
          </p>
        </div>

        <ol className="steps">
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
