import React, { useEffect, useRef, useState } from 'react';
import { Label, ActionLink } from './primitives.jsx';
import { heroMedia } from '../media.js';

/**
 * Cinematic hero.
 *
 * The video is an enhancement, never a requirement. The poster image is the
 * real content: it is in the markup from the first paint, and the video is
 * only mounted when it is actually appropriate — a large viewport, no
 * reduced-motion preference, and no data-saver request. If it fails to load
 * or decode, we drop back to the still without the visitor noticing.
 */
export default function Hero({ onEnquire }) {
  const [useVideo, setUseVideo] = useState(false);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef(null);

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

  const toggleMotion = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(
        () => setPlaying(true),
        () => setPlaying(false)
      );
    } else {
      video.pause();
      setPlaying(false);
    }
  };

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
            preload="metadata"
            /* Decorative: the still below carries the description. */
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

      {useVideo ? (
        <button type="button" className="hero__motion" onClick={toggleMotion}>
          {playing ? 'Pause motion' : 'Play motion'}
        </button>
      ) : null}

      <div className="hero__inner">
        <div className="hero__copy">
          <Label light>Travel planning from South Africa</Label>

          <h1>
            The coast is
            <br />
            <span className="em">closer</span> than you think.
          </h1>

          <p className="hero__lede">
            Coastal journeys shaped around your dates, your people and the pace
            you actually want to travel at.
          </p>

          <div className="hero__actions">
            <ActionLink light href="#enquire" onClick={onEnquire}>
              Start an enquiry
            </ActionLink>
            <ActionLink light href="#journeys">
              See the journeys
            </ActionLink>
          </div>
        </div>

        <div className="hero__foot">
          <span>Enquiry-led planning</span>
          <span>South Africa — Mozambique</span>
        </div>
      </div>
    </section>
  );
}
