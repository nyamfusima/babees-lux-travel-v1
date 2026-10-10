/**
 * Single source of truth for everything the client still has to confirm.
 * Nothing in here should be invented — leave a value as a placeholder until
 * Babee's Lux Travel supplies the real one.
 */

/**
 * PLACEHOLDER — NOT A REAL NUMBER.
 *
 * Replace with the client's WhatsApp number in international format, digits
 * only: no "+", spaces, brackets or dashes. A South African mobile such as
 * 082 123 4567 becomes '27821234567'.
 *
 * While this is left at the placeholder value the enquiry form still validates
 * and still builds the message, but it does NOT open a dead WhatsApp chat —
 * it tells the visitor the channel is not connected yet and offers the message
 * to copy instead. Set the real number and the normal flow resumes.
 */
export const WHATSAPP_NUMBER = '27000000000';

/** True while the number above is still the stand-in. */
export const whatsappIsPlaceholder = WHATSAPP_NUMBER === '27000000000';

export const brand = {
  name: 'Babee’s Lux Travel',
  wordmarkTop: 'Babee’s',
  wordmarkBottom: 'Lux Travel',
  /* Factual, drawn only from the brief: trips from South Africa to Mozambique. */
  descriptor: 'Travel planning from South Africa',
  tagline: 'Journeys planned one conversation at a time.'
};

export const nav = [
  { href: '#journeys', label: 'Journeys' },
  { href: '#approach', label: 'Approach' },
  { href: '#planning', label: 'Planning' }
];

/**
 * Only verified channels belong here.
 * TikTok is the one presence confirmed in the brief, but the handle itself has
 * not been supplied — `href: null` renders it as plain text rather than a
 * broken link. Add the URL to turn it into a link.
 * Do not add Instagram, Facebook, an email address, a phone number or an
 * office address until the client provides them.
 */
export const socials = [
  { label: 'TikTok', href: null, note: 'handle to be supplied' }
];
