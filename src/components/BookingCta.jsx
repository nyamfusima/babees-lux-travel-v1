import React from 'react';
import { Label, ActionLink } from './primitives.jsx';
import { ctaMedia } from '../media.js';
import { mozambiqueTour, getDepartures } from '../packages.js';
import { whatsappLink } from '../site.config.js';
import { PHONE_DISPLAY, PHONE_E164, EMAIL, brand } from '../site.config.js';
import { departureLabel } from '../enquiry.js';

/**
 * Closing call to action over a full-width client-supplied photograph.
 *
 * The photograph's location is not confirmed, so the eyebrow states the trip
 * rather than naming a place the image may not show.
 *
 * The WhatsApp message names the trip and, where one is still ahead, the next
 * published departure. Nothing here claims a booking, a held place or an
 * availability status.
 */
export default function BookingCta() {
  const next = getDepartures().upcoming[0];

  const message = next
    ? `Hi ${brand.name}, I am interested in the 4-day Maputo and Bilene trip departing ${departureLabel(next)}. Please share the package details and booking information.`
    : `Hi ${brand.name}, I am interested in the 4-day Maputo and Bilene trip. Please share the package details, upcoming dates and booking information.`;

  return (
    <section className="booking" aria-labelledby="booking-title">
      <div className="booking__media">
        <img
          src={ctaMedia.src}
          srcSet={ctaMedia.srcSet}
          sizes="100vw"
          width={ctaMedia.width}
          height={ctaMedia.height}
          alt={ctaMedia.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="booking__scrim" aria-hidden="true" />

      <div className="shell booking__inner reveal">
        <h2 id="booking-title">
          Let’s plan your
          <br />
          <span className="em">Mozambique escape.</span>
        </h2>

        <p className="booking__p">
          Interested in this trip? Get in touch with {brand.name} for the
          package details and booking information.
        </p>

        <div className="booking__actions">
          <ActionLink
            light
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enquire on WhatsApp
          </ActionLink>
          <ActionLink light href={`tel:${PHONE_E164}`}>
            Call {PHONE_DISPLAY}
          </ActionLink>
          <ActionLink light href={`mailto:${EMAIL}`}>
            Email us
          </ActionLink>
        </div>

        <p className="booking__note">
          {mozambiqueTour.price.display} {mozambiqueTour.price.basis}. The
          booking deposit is {mozambiqueTour.deposit.display}. No payment is
          taken on this website.
        </p>
      </div>
    </section>
  );
}
