import React from 'react';
import { Label, ActionLink, Figure } from './primitives.jsx';
import { introMedia } from '../media.js';

/**
 * Brand introduction.
 *
 * Describes how the planning works and nothing else. No founder biography,
 * years of experience, qualifications or company history appear here, because
 * none of that has been supplied by the client.
 */
export default function Approach({ onEnquire }) {
  return (
    <section className="section approach" id="approach" aria-labelledby="approach-title">
      <div className="shell">
        <div className="grid12 approach__head">
          <Label as="div" className="approach__label">
            The approach
          </Label>
          <h2 className="approach__title" id="approach-title">
            Planned in conversation,
            <br />
            not in a <span className="em">checkout.</span>
          </h2>
        </div>

        <div className="grid12 approach__body">
          <Figure
            media={introMedia}
            className="approach__figure"
            sizes="(max-width: 48rem) 92vw, (max-width: 64rem) 48vw, 38vw"
          />

          <div className="approach__text">
            <p className="approach__lede">
              Every trip here starts as a message rather than a booking form.
              You say where you would like to go and roughly when. We work
              through the options together until the itinerary genuinely fits.
            </p>

            <p className="approach__p">
              So there is no instant price on this page and no catalogue to
              scroll through. There is a short conversation instead, and an
              itinerary written around your answers.
            </p>

            <ul className="tenets">
              <li>
                <span className="index">01</span>
                <div>
                  <h3>You describe the shape of it</h3>
                  <p>
                    Where you are headed, when, who is travelling and what you
                    would rather avoid.
                  </p>
                </div>
              </li>
              <li>
                <span className="index">02</span>
                <div>
                  <h3>We come back with options</h3>
                  <p>
                    Routes, places to stay and what each one would involve, set
                    out in plain terms.
                  </p>
                </div>
              </li>
              <li>
                <span className="index">03</span>
                <div>
                  <h3>Nothing moves until you say so</h3>
                  <p>
                    You see the detail and the cost in writing before anything
                    is arranged on your behalf.
                  </p>
                </div>
              </li>
            </ul>

            <div className="approach__actions">
              <ActionLink href="#enquire" onClick={onEnquire}>
                Begin a conversation
              </ActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
