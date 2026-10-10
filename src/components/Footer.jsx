import React from 'react';
import { Wordmark, ActionLink } from './primitives.jsx';
import {
  brand,
  nav,
  socials,
  PHONE_DISPLAY,
  PHONE_E164,
  EMAIL
} from '../site.config.js';
import { generalWhatsappLink } from '../enquiry.js';

/**
 * Footer. Only information printed on the client's own posters appears here —
 * no invented address, registration number, opening hours or awards.
 */
export default function Footer({ onEnquire }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="grid12">
          <div className="footer__brand">
            <a href="#top" aria-label={`${brand.name} — back to top`}>
              <Wordmark />
            </a>
            <p className="footer__tagline">{brand.tagline}</p>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <h3>Explore</h3>
            <ul className="footer__list">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
              <li>
                <a href="#enquire" onClick={onEnquire}>
                  Enquire
                </a>
              </li>
            </ul>
          </nav>

          <div className="footer__col">
            <h3>Get in touch</h3>
            <ul className="footer__list">
              <li>
                <a href={generalWhatsappLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_E164}`}>Call {PHONE_DISPLAY}</a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              {socials.map((social) => (
                <li key={social.label}>
                  {social.href ? (
                    <a href={social.href} rel="me noopener noreferrer" target="_blank">
                      {social.label}
                    </a>
                  ) : (
                    <span>
                      {social.label}
                      <span className="footer__pending">{social.note}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3>Bookings</h3>
            <ActionLink
              light
              href={generalWhatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp
            </ActionLink>
          </div>
        </div>

        <p className="footer__note">
          Trip details, prices and dates on this site are taken from Babee’s Lux
          Travel’s own trip posters. Photographs of Maputo and Bilene are real
          images of those places. Images illustrating activities, pools and spas
          are stock, and do not show a specific property or departure. No
          booking or payment is taken on this website.
        </p>

        <div className="footer__bottom">
          <span>
            © {year} {brand.name}
          </span>
          <span>
            <a href="#top">Back to top</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
