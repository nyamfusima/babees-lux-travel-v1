import React, { useEffect, useRef, useState } from 'react';
import { ActionLink } from './primitives.jsx';
import { heroMedia } from '../media.js';
import { mozambiqueTour, getDepartures } from '../packages.js';
import { packageWhatsappLink, departureLabel } from '../enquiry.js';

/**
 * Cinematic hero.
 *
 * The video plays on phones as well as desktop. It is 1.2 MB, muted and
 * inline, which modern handsets handle comfortably.
 *
 * It is still an enhancement rather than a requirement. The poster still is
 * preloaded and painted first, and we fall back to it silently in three cases:
 *
 *   1. the visitor has asked for reduced motion;
 *   2. the browser is reporting Save-Data;
 *   3. the file fails to load, OR autoplay is refused.
 *
 * That third case matters on phones. iOS Low Power Mode and some data savers
 * reject `play()` even when a video is muted and inline, and the result is a
 * frozen first frame. Catching the rejected promise swaps the still back in.
 */
export default function Hero() {
  const [useVideo, setUseVideo] = useState(false);
  const videoRef = useRef(null);
  const next = getDepartures().upcoming[0];

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = navigator.connection?.saveData === true;

    const decide = () => setUseVideo(!motionQuery.matches && !saveData);

    decide();
    motionQuery.addEventListener('change', decide);
    return () => motionQuery.removeEventListener('change', decide);
  }, []);

  /* Autoplay is a request, not a guarantee. If the browser refuses, show the
     still rather than leaving a stopped video on screen. */
  useEffect(() => {
    if (!useVideo) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    let cancelled = false;
    const attempt = video.play();

    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        if (!cancelled) setUseVideo(false);
      });
    }

    return () => {
      cancelled = true;
    };
  }, [useVideo]);

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__media">
        {useVideo ? (
          <video
            ref={videoRef}
            poster={heroMedia.poster}
            autoPlay
            muted
            loop
            playsInline
            /* Older iOS and some Android WebViews read the vendor-prefixed
               attribute instead, and will otherwise open a fullscreen player. */
            webkit-playsinline="true"
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
          <h1 className="reveal" style={{ '--reveal-delay': '0ms' }}>
            Four days in Mozambique.
          </h1>

          <p className="hero__lede reveal" style={{ '--reveal-delay': '110ms' }}>
            From the streets of Maputo to the clear waters of Bilene, four days
            of coastal experiences, local culture and time to unwind.
          </p>

          <div className="hero__actions reveal" style={{ '--reveal-delay': '220ms' }}>
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
        <p className="hero__foot reveal" style={{ '--reveal-delay': '330ms' }}>
          {next
            ? `Next departure: ${departureLabel(next)}`
            : `${mozambiqueTour.duration} from Johannesburg`}
        </p>
      </div>
    </section>
  );
}
