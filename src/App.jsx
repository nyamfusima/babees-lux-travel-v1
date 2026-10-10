import React, { useCallback, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Approach from './components/Approach.jsx';
import Journeys from './components/Journeys.jsx';
import Stays from './components/Stays.jsx';
import Planning from './components/Planning.jsx';
import Enquiry from './components/Enquiry.jsx';
import Closing from './components/Closing.jsx';
import Footer from './components/Footer.jsx';

/* Journeys whose titles map onto a destination the form already offers, so a
   trip-specific enquiry arrives with the right option pre-selected. */
const DESTINATION_FOR_JOURNEY = {
  'Mozambique, slowly': 'Mozambique'
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [interest, setInterest] = useState(null);

  /**
   * Moves the visitor to the enquiry form, optionally carrying the journey
   * they came from. `key` forces the prefill effect to run again when the
   * same journey is chosen twice.
   */
  const goToEnquiry = useCallback((title) => {
    setMenuOpen(false);

    if (typeof title === 'string') {
      setInterest({
        title,
        destination: DESTINATION_FOR_JOURNEY[title],
        key: Date.now()
      });
    }

    const target = document.getElementById('enquire');
    if (!target) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  }, []);

  /* Anchor links keep their native behaviour and the URL hash; this only adds
     the prefill and the menu close. */
  const handleEnquiryLink = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onEnquire={handleEnquiryLink}
      />

      <main id="main">
        <Hero onEnquire={handleEnquiryLink} />
        <Approach onEnquire={handleEnquiryLink} />
        <Journeys onEnquire={goToEnquiry} />
        <Stays />
        <Planning />
        <Enquiry interest={interest} />
        <Closing onEnquire={handleEnquiryLink} />
      </main>

      <Footer onEnquire={handleEnquiryLink} />
    </>
  );
}
