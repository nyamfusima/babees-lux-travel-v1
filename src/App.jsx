import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TripIntro from './components/TripIntro.jsx';
import Itinerary from './components/Itinerary.jsx';
import Tours from './components/Tours.jsx';
import Gallery from './components/Gallery.jsx';
import Planning from './components/Planning.jsx';
import OtherTrips from './components/OtherTrips.jsx';
import Enquiry from './components/Enquiry.jsx';
import Contact from './components/Contact.jsx';
import BookingCta from './components/BookingCta.jsx';
import Footer from './components/Footer.jsx';
import { initReveal } from './reveal.js';

/* Maps an enquiry-only route onto the matching option in the form's
   "Which trip" select, so a trip-specific enquiry arrives pre-set. */
const TRIP_FOR_TITLE = {
  'Group bookings': 'Group booking',
  'Custom itineraries': 'Custom itinerary'
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [interest, setInterest] = useState(null);

  /**
   * Moves the visitor to the enquiry form, carrying the trip they came from.
   * `key` forces the prefill effect to run again if the same trip is picked
   * twice in a row.
   */
  const goToEnquiry = useCallback((title) => {
    setMenuOpen(false);

    if (typeof title === 'string') {
      setInterest({ title, destination: TRIP_FOR_TITLE[title], key: Date.now() });
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

  /* One observer for the whole page. Returns a teardown. */
  useEffect(() => initReveal(), []);

  /* Anchor links keep their native behaviour and the URL hash; this only
     closes the mobile menu. */
  const handleEnquiryLink = useCallback(() => setMenuOpen(false), []);

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
        <Hero />
        <TripIntro onEnquire={handleEnquiryLink} />
        <Itinerary />
        <Tours onEnquire={handleEnquiryLink} />
        <Gallery />
        <Planning />
        <OtherTrips onEnquire={goToEnquiry} />
        <Enquiry interest={interest} />
        <Contact />
        <BookingCta />
      </main>

      <Footer onEnquire={handleEnquiryLink} />
    </>
  );
}
