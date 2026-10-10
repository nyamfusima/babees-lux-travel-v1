import React, { useEffect, useRef, useState } from 'react';
import { Wordmark } from './primitives.jsx';
import { nav, brand } from '../site.config.js';

export default function Header({ menuOpen, setMenuOpen, onEnquire }) {
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const headerRef = useRef(null);
  const [solid, setSolid] = useState(false);

  /**
   * The bar is transparent while the hero is behind it and picks up an ivory
   * background once you scroll past it.
   *
   * Driven by an IntersectionObserver rather than a scroll listener, so
   * nothing runs on every frame. Shrinking the root from the top by the
   * header's own height means the hero stops intersecting at exactly the
   * moment its bottom edge slides under the bar.
   *
   * If there is no hero, or no observer, the bar stays solid: legible
   * everywhere is the safe default.
   */
  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero || !('IntersectionObserver' in window)) {
      setSolid(true);
      return undefined;
    }

    let observer;
    const attach = () => {
      observer?.disconnect();
      const height = headerRef.current?.offsetHeight ?? 84;
      observer = new IntersectionObserver(
        ([entry]) => setSolid(!entry.isIntersecting),
        { rootMargin: `-${Math.round(height)}px 0px 0px 0px`, threshold: 0 }
      );
      observer.observe(hero);
    };

    attach();
    window.addEventListener('resize', attach);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', attach);
    };
  }, []);

  /* While the mobile panel is open: lock the page, close on Escape, and send
     focus into the panel so keyboard users are not left behind it. */
  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector('a')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, setMenuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header className="header" data-solid={solid} ref={headerRef}>
      <div className="shell header__inner">
        <a href="#top" aria-label={`${brand.name}, home`} onClick={close}>
          <Wordmark />
        </a>

        <button
          type="button"
          className="nav__toggle"
          ref={toggleRef}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="nav__bars" aria-hidden="true">
            <span />
            <span />
          </span>
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <nav
          id="primary-navigation"
          className="nav"
          data-open={menuOpen}
          aria-label="Primary"
          ref={panelRef}
        >
          <button type="button" className="nav__close" onClick={close}>
            Close
          </button>

          {nav.map((item) => (
            <a key={item.href} className="nav__link" href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}

          <a
            className="nav__cta"
            href="#enquire"
            onClick={(event) => {
              close();
              onEnquire(event);
            }}
          >
            Start an enquiry
          </a>
        </nav>
      </div>
    </header>
  );
}
