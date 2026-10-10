import React from 'react';
import { Label, Figure } from './primitives.jsx';
import { stayMedia } from '../media.js';

/**
 * A quiet two-photograph spread sitting on different baselines.
 * The captions are doing real work here: they keep the imagery illustrative
 * and stop it reading as a portfolio of properties already on offer.
 */
export default function Stays() {
  return (
    <section className="section stays" aria-labelledby="stays-title">
      <div className="shell grid12">
        <div className="stays__copy">
          <Label as="div">Where you stay</Label>
          <h2 id="stays-title">
            Shortlisted,
            <br />
            <span className="em">not assigned.</span>
          </h2>
          <p>
            Somewhere small and quiet, or somewhere with enough going on to keep
            a group happy. We put a shortlist in front of you that matches the
            trip you have described, and you choose from there.
          </p>
        </div>

        <Figure
          media={stayMedia[0]}
          className="stays__a"
          sizes="(max-width: 48rem) 92vw, (max-width: 64rem) 48vw, 32vw"
          caption="Illustrative photography — not a property in a confirmed package"
        />

        <Figure
          media={stayMedia[1]}
          className="stays__b"
          sizes="(max-width: 48rem) 92vw, (max-width: 64rem) 40vw, 24vw"
        />
      </div>
    </section>
  );
}
