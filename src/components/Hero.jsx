import React, { useEffect, useState } from 'react';
import { Label, ActionLink } from './primitives.jsx';
import { heroMedia } from '../media.js';
import { mozambiqueTour, getDepartures } from '../packages.js';
import { packageWhatsappLink, departureLabel } from '../enquiry.js';

/**
 * Cinematic hero.
 *
 * The video is an enhancement, never a requirement. The poster still is in the
 * markup from the first paint and is preloaded; the video is only mounted when
 * it is actually appropriate — a large viewport, no reduced-motion preference,
 * and no data-saver request. If it fails to load or decode we fall back to the
 * still without the visitor noticing.
 */
export default function Hero() {
  const [useVideo, setUseVideo] = useState(false);
  const next = getDepartures().upcoming[0];

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sizeQuery = window.matchMedia('(min-width: 40.0625rem)');
    const saveData = navigator.connection?.saveData === true;

    const decide = () => {
      setUseVideo(!motionQuery.matches && sizeQuery.matches && !saveData);
    };

    decide();
    motionQuery.addEventListener('change', decide);
    sizeQuery.addEventListener('change', decide);
    return () => {
      motionQuery.removeEventListener('change', decide);
      sizeQuery.removeEventListener('change', decide);
    };
  }, []);

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__media">
        {useVideo ? (
          <video
            poster={heroMedia.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            onError={() => setUseVideo(false)}
          >
            <source src={heroMedia.video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={heroMedia.fallback.src}
            srcSet={heroMedia.fallback.srcSet}
            sizes="100vw"
            width={heroMedia.fallback.width}
            height={heroMedia.fallback.height}
            alt={heroMedia.alt}
            fetchpriority="high"
            decoding="sync"
          />
        )}
      </div>

      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__copy">
          <Label light>Mozambique · 4 days</Label>

          <h1>
            Four days.
            <br />
            A <span className="em">different</span> world.
          </h1>

          <p className="hero__lede">
            From the energy of Maputo to the turquoise waters of Bilene, a
            coastal escape built around the things you will actually remember.
          </p>

          <div className="hero__actions">
            <ActionLink light href="#itinerary">
              Explore the itinerary
            </ActionLink>
            <ActionLink
              light
              href={packageWhatsappLink(mozambiqueTour, next)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp
            </ActionLink>
          </div>
        </div>

        <div className="hero__foot">
          <span>
            {next
              ? `Next departure — ${departureLabel(next)}`
              : 'Maputo & Bilene — 4 days'}
          </span>
          <span>Johannesburg — Mozambique</span>
        </div>
      </div>
    </section>
  );
}
