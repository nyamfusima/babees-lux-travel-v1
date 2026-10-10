import React, { useCallback, useEffect, useRef, useState } from 'react';
import { galleryItems } from '../media.js';

/**
 * "A glimpse of Mozambique" — an editorial grid with deliberately uneven
 * tiles, plus a lightbox.
 *
 * The lightbox is a real dialog: it traps focus, closes on Escape, moves with
 * the arrow keys, restores focus to the thumbnail that opened it, and locks
 * the page behind it. Everything stays usable with the keyboard alone.
 */
export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const openerRef = useRef(null);

  const isOpen = openIndex !== null;
  const total = galleryItems.length;

  const close = useCallback(() => {
    setOpenIndex(null);
    openerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta) => setOpenIndex((i) => (i === null ? i : (i + delta + total) % total)),
    [total]
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      } else if (event.key === 'Tab') {
        /* Keep focus inside the dialog. */
        const focusable = dialogRef.current?.querySelectorAll('button');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, close, step]);

  const openAt = (index, event) => {
    openerRef.current = event.currentTarget;
    setOpenIndex(index);
  };

  const current = isOpen ? galleryItems[openIndex] : null;

  return (
    <section className="section gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="shell">
        <div className="grid12 gallery__head reveal">
          <h2 id="gallery-title">
            A glimpse of
            <br />
            <span className="em">Mozambique.</span>
          </h2>
          <p className="gallery__intro">
            Maputo and Bilene as they actually look. Select any frame to see
            it larger.
          </p>
        </div>

        <ul className="gallery__grid reveal reveal--media" style={{ '--reveal-delay': '110ms' }}>
          {galleryItems.map((item, i) => (
            <li className={`gallery__cell gallery__cell--${item.span}`} key={item.src}>
              <button
                type="button"
                className="gallery__btn"
                onClick={(event) => openAt(i, event)}
              >
                <img
                  src={item.src}
                  srcSet={item.srcSet}
                  sizes="(max-width: 48rem) 92vw, 45vw"
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="sr-only">{`View larger: ${item.caption ?? item.alt}`}</span>
                {item.caption ? (
                  <span className="gallery__caption" aria-hidden="true">
                    {item.caption}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isOpen ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${openIndex + 1} of ${total}`}
          ref={dialogRef}
        >
          {/* Clicking the backdrop closes; it is not the only way out. */}
          <div className="lightbox__backdrop" onClick={close} aria-hidden="true" />

          <div className="lightbox__inner">
            <figure className="lightbox__figure">
              <img
                src={current.src}
                srcSet={current.srcSet}
                sizes="92vw"
                width={current.width}
                height={current.height}
                alt={current.alt}
              />
              <figcaption className="lightbox__caption">
                <span>{current.caption ?? current.alt}</span>
                <span className="lightbox__count">
                  {openIndex + 1} / {total}
                </span>
              </figcaption>
            </figure>

            <div className="lightbox__controls">
              <button type="button" className="lightbox__nav" onClick={() => step(-1)}>
                <span aria-hidden="true">←</span>
                <span className="sr-only">Previous image</span>
              </button>
              <button type="button" className="lightbox__nav" onClick={() => step(1)}>
                <span aria-hidden="true">→</span>
                <span className="sr-only">Next image</span>
              </button>
            </div>

            <button
              type="button"
              className="lightbox__close"
              onClick={close}
              ref={closeRef}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
