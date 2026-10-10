import React from 'react';
import { Label, Arrow } from './primitives.jsx';
import {
  PHONE_DISPLAY,
  PHONE_E164,
  EMAIL,
  brand,
  socials
} from '../site.config.js';
import { generalWhatsappLink } from '../enquiry.js';

/**
 * Contact details, all taken straight from the posters.
 * WhatsApp is the primary action because both posters put that number under
 * "Booking & Enquiries" and "Book Now".
 */
export default function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="shell grid12">
        <div className="contact__copy reveal">
          <Label light as="div">
            Booking &amp; enquiries
          </Label>
          <h2 id="contact-title">
            Message Babee’s
            <br />
            <span className="em">directly.</span>
          </h2>
          <p className="contact__p">
            WhatsApp is the quickest way to reach {brand.name}. Bookings and
            questions both go to the same number.
          </p>
        </div>

        <div className="contact__channels reveal" style={{ '--reveal-delay': '110ms' }}>
          <ul className="channels">
            <li className="channel channel--primary">
              <a href={generalWhatsappLink()} target="_blank" rel="noopener noreferrer">
                <span className="channel__label">WhatsApp</span>
                <span className="channel__value">{PHONE_DISPLAY}</span>
                <span className="channel__arrow" aria-hidden="true">
                  <Arrow />
                </span>
              </a>
            </li>

            <li className="channel">
              <a href={`tel:${PHONE_E164}`}>
                <span className="channel__label">Phone</span>
                <span className="channel__value">{PHONE_DISPLAY}</span>
                <span className="channel__arrow" aria-hidden="true">
                  <Arrow />
                </span>
              </a>
            </li>

            <li className="channel">
              <a href={`mailto:${EMAIL}`}>
                <span className="channel__label">Email</span>
                <span className="channel__value channel__value--email">{EMAIL}</span>
                <span className="channel__arrow" aria-hidden="true">
                  <Arrow />
                </span>
              </a>
            </li>

            {socials.map((s) => (
              <li className="channel channel--flat" key={s.label}>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="me noopener noreferrer">
                    <span className="channel__label">{s.label}</span>
                    <span className="channel__value channel__value--handle">
                      {s.handle ?? 'Follow'}
                    </span>
                    <span className="channel__arrow" aria-hidden="true">
                      <Arrow />
                    </span>
                  </a>
                ) : (
                  <div>
                    <span className="channel__label">{s.label}</span>
                    <span className="channel__value channel__value--pending">
                      {s.note}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
