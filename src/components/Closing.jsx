import React from 'react';
import { Label, ActionLink, Figure } from './primitives.jsx';
import { closingMedia } from '../media.js';

/**
 * Closing invitation. An ivory panel overlaps the lower-left of a wide,
 * near-empty photograph — the one deliberate overlap on the page.
 *
 * No urgency, scarcity or "limited availability" language here: none of that
 * has been verified with the client, and inventing it would be a lie to the
 * visitor.
 */
export default function Closing({ onEnquire }) {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="shell">
        <Figure
          media={closingMedia}
          className="closing__figure"
          sizes="(max-width: 48rem) 100vw, 90vw"
        />

        <div className="closing__panel">
          <Label as="div">No decision needed yet</Label>
          <h2 id="closing-title">
            An idea is
            <br />
            <span className="em">enough to start.</span>
          </h2>
          <p>
            You do not need fixed dates, a budget or even a destination to send
            the first message. If the trip is still only a thought, this is a
            good moment to say so.
          </p>
          <ActionLink href="#enquire" onClick={onEnquire}>
            Start an enquiry
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
