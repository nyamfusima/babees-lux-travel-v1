/**
 * Business details for Babee's Lux Travel.
 *
 * The phone number, email address and business name below were read directly
 * off the client's own trip posters. Nothing here is invented. Anything the
 * posters do not settle is marked and left unlinked rather than guessed.
 */

/**
 * WhatsApp booking number — VERIFIED from the posters.
 *
 * Printed as "0835506183" (Poster C) and "083 550 6183" (Posters A and B).
 * Poster A places it beside a WhatsApp icon under "Booking & Enquiries" and
 * Poster B repeats it under "Book Now", so this is unambiguously the number
 * that should receive bookings. It is the only number on any poster.
 *
 * wa.me needs international format, digits only: the South African national
 * leading 0 is dropped and country code 27 prepended.
 *   0835506183  ->  27835506183
 */
export const WHATSAPP_NUMBER = '27835506183';

/** Human-readable forms of the same number. */
export const PHONE_DISPLAY = '083 550 6183';
export const PHONE_E164 = '+27835506183';

/** VERIFIED from Posters A and B. */
export const EMAIL = 'babeesluxtravels@gmail.com';

/** Guard kept in place so the form degrades safely if the number is ever reset. */
export const whatsappIsPlaceholder = WHATSAPP_NUMBER === '27000000000';

export const brand = {
  name: 'Babee’s Lux Travel',
  wordmarkTop: 'Babee’s',
  wordmarkBottom: 'Lux Travel',
  descriptor: 'Mozambique tours from South Africa',
  tagline: 'Journeys planned one conversation at a time.'
};

export const nav = [
  { href: '#about', label: 'The trip' },
  { href: '#itinerary', label: 'Itinerary' },
  { href: '#tours', label: 'Dates & price' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' }
];

/**
 * TikTok — CONFIRMED by the client as @babees_luxtravel (singular "travel"),
 * which matches the watermark on the itinerary poster. Poster A's TikTok
 * interface showed "Babees_Luxtravels" (plural); that reading is wrong.
 *
 * Any entry with `href: null` renders as plain text rather than a link, so an
 * unconfirmed channel can never send customers to the wrong account.
 */
export const socials = [
  {
    label: 'TikTok',
    handle: '@babees_luxtravel',
    href: 'https://www.tiktok.com/@babees_luxtravel'
  }
];

/**
 * Builds a wa.me link with a pre-filled message. encodeURIComponent keeps
 * newlines, ampersands, percent signs and dashes intact through the URL.
 */
export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
