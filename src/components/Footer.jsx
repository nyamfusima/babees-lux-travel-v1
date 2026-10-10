import React from 'react';
import { Wordmark, ActionLink } from './primitives.jsx';
import { brand, nav, socials } from '../site.config.js';

/**
 * Footer. Only genuinely verified information appears here — no invented
 * address, registration number, phone line, awards or opening hours.
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
            <h3>Elsewhere</h3>
            <ul className="footer__list">
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
            <h3>Enquiries</h3>
            <ActionLink light href="#enquire" onClick={onEnquire}>
              Start an enquiry
            </ActionLink>
          </div>
        </div>

        <p className="footer__note">
          Photography on this site is temporary, licensed stock used to show the
          intended look and feel. It does not depict Babee’s Lux Travel trips,
          properties or destinations, and none of it was photographed in
          Mozambique.
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
