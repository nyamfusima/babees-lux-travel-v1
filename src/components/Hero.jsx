import React, { useEffect, useState } from 'react';
import { ActionLink } from './primitives.jsx';
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
          <h1>Four days in Mozambique.</h1>

          <p className="hero__lede">
            From the streets of Maputo to the clear waters of Bilene, four days
            of coastal experiences, local culture and time to unwind.
          </p>

          <div className="hero__actions">
            <ActionLink light href="#itinerary">
              Explore the trip
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

        {/* One line only. The hero carries a headline, a paragraph and two
            actions; anything more stacked over the photograph is clutter. */}
        <p className="hero__foot">
          {next ? `Next departure: ${departureLabel(next)}` : `${mozambiqueTour.duration} from Johannesburg`}
        </p>
      </div>
    </section>
  );
}
