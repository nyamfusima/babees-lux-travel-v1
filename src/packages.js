/**
 * Babee's Lux Travel — published travel packages.
 *
 * SOURCE OF TRUTH: three trip posters supplied by the client, originally
 * published on TikTok. Everything in this file was read directly off those
 * posters. Nothing here is inferred, rounded, modernised or invented.
 *
 * Poster A — "Mozambique Tour · 2026 Travel Dates"
 *            departure dates, summary inclusions, booking contacts
 * Poster B — "Mozambique · 4 Days - 3 Nights · R6900 per person"
 *            price, deposit, summary inclusions, booking contacts
 * Poster C — "4 Day trip to Mozambique · Maputo & Bilene"
 *            day-by-day itinerary, full inclusions and exclusions,
 *            dated 27–30 November
 *
 * The poster images themselves are NOT published on the site — only the
 * information read off them. Keep the originals with the client.
 *
 * Where the posters disagree, the conflict is recorded in `openQuestions`
 * below and the more specific poster is used on the page. Resolve these with
 * the client and update this file — do not paper over them in the components.
 */

/**
 * Departure dates, exactly as listed on Poster A under "Upcoming Tours".
 * The poster is headed "2026 Travel Dates", so each is pinned to 2026.
 * `status` is derived at runtime in `getDepartures()` — four of these had
 * already passed when the posters were supplied, and a past date must never
 * be presented as bookable.
 */
const departures2026 = [
  { label: '22 – 25 May', start: '2026-05-22', end: '2026-05-25', nights: 3 },
  { label: '29 May – 1 June', start: '2026-05-29', end: '2026-06-01', nights: 3 },
  { label: '28 – 31 August', start: '2026-08-28', end: '2026-08-31', nights: 3 },
  { label: '18 – 21 September', start: '2026-09-18', end: '2026-09-21', nights: 3 },
  { label: '23 – 26 October', start: '2026-10-23', end: '2026-10-26', nights: 3 },
  { label: '27 – 30 November', start: '2026-11-27', end: '2026-11-30', nights: 3 },
  { label: '4 – 7 December', start: '2026-12-04', end: '2026-12-07', nights: 3 }
];

export const mozambiqueTour = {
  id: 'mozambique-maputo-bilene',
  name: 'Mozambique Tour',
  subtitle: 'Maputo & Bilene',
  duration: '4 days',
  /* Poster A and C both route from Johannesburg; Poster B says "from RSA". */
  departsFrom: 'Johannesburg',
  destinations: ['Maputo', 'Bilene'],

  price: {
    amount: 6900,
    currency: 'ZAR',
    display: 'R6 900',
    basis: 'per person',
    source: 'Posters B and C'
  },

  deposit: {
    amount: 1200,
    display: 'R1 200',
    label: 'booking deposit',
    source: 'Poster B'
  },

  /**
   * Full inclusion list from Poster C, which is the most specific of the
   * three. Poster A summarises the same package as "Accommodation &
   * Breakfast, Transport, Guided City Tours, Boat Cruise" and Poster B as
   * "Transport from RSA, Maputo boat cruise, Breakfast daily, Restaurant,
   * City tour" — consistent, just less detailed.
   *
   * The poster prints the transfer line with a double-headed arrow; it is
   * spelled out here because that glyph is missing from the body typeface.
   */
  includes: [
    '1 night in Maputo and 3 nights in Bilene',
    'Daily breakfast',
    'Maputo city tour, taking in the railway station, the fish market and Praça da Independência',
    'Visit to Costa do Sol (South Beach)',
    'Sunset cruise in Maputo Bay',
    'Boat cruise to Koko Beach on day two',
    'Leisure time at the Bilene lagoon',
    'Return road transfer between Johannesburg and Maputo / Bilene'
  ],

  /** Poster C, "Package Exclusions / Optional Activities (Own Cost)". */
  excludes: [
    'Lunches and dinners',
    'Drinks and personal expenses'
  ],

  /**
   * Listed on Poster C as optional activities in Bilene at own cost. They also
   * appear on the day-three panel of the itinerary, so the itinerary must make
   * clear they are not part of the price.
   */
  optionalActivities: [
    'Horse riding on the beach',
    'Jet ski rides',
    'Quad biking',
    'Tubing / banana boat rides',
    'Kayaking / paddleboarding',
    'Deep sea fishing trips',
    'Ocean side boat trips'
  ],

  /**
   * Day-by-day from Poster C. That poster is dated 27–30 November, so the
   * dates below belong to the November departure; the shape of the days is
   * the same tour on every date.
   */
  itinerary: [
    {
      day: 'Day 1',
      title: 'Maputo',
      date: '27 Nov',
      items: [
        'Johannesburg to Maputo',
        'Maputo city tour',
        'Sunset cruise',
        'Visit South Beach',
        'Overnight: StayEasy Maputo'
      ]
    },
    {
      day: 'Day 2',
      title: 'Bilene',
      date: '28 Nov',
      items: [
        'Breakfast at the hotel',
        'Maputo to Bilene',
        'Visit to Bilene market',
        'Boat cruise to Koko Beach',
        'Overnight: San Martinho Beach Club'
      ]
    },
    {
      day: 'Day 3',
      title: 'Optional activities',
      date: '29 Nov',
      optional: true,
      items: [
        'Horse riding on the beach',
        'Jet ski rides',
        'Quad biking',
        'Tubing',
        'Kayaking / paddleboarding'
      ]
    },
    {
      day: 'Day 4',
      title: 'Relaxation',
      date: '30 Nov',
      items: [
        'Visit Bilene market',
        'Relax by the pool',
        'Time at the lagoon',
        'Visit the spa'
      ]
    }
  ],

  /** Named on Poster C only. Not a star rating or a review — just the names. */
  accommodation: [
    { place: 'Maputo', property: 'StayEasy Maputo' },
    { place: 'Bilene', property: 'San Martinho Beach Club' }
  ],

  departures: departures2026
};

export const packages = [mozambiqueTour];

/**
 * Splits the published departures into upcoming and past, against today.
 * A departure is "upcoming" until the day it ends.
 */
export function getDepartures(now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const upcoming = [];
  const past = [];
  for (const d of mozambiqueTour.departures) {
    const [y, m, day] = d.end.split('-').map(Number);
    (new Date(y, m - 1, day) >= today ? upcoming : past).push(d);
  }
  return { upcoming, past };
}

/**
 * Things the posters do not settle. These are for the client to confirm; they
 * are deliberately NOT guessed at in the components.
 */
export const openQuestions = [
  {
    topic: 'Nights included',
    detail:
      'Poster B says "4 Days - 3 Nights". Poster C lists "1 Night Maputo + 3 Nights Bilene", which is four nights. The page uses Poster C because it is the more specific document.'
  },
  {
    topic: 'Departure dates beyond 2026',
    detail:
      'Poster A is headed "2026 Travel Dates". Four of the seven listed departures (May, late May/June, August and September) had already passed when the posters were supplied, so only the remaining dates are shown as bookable. 2027 dates have not been supplied.'
  },
  {
    topic: 'Year on the itinerary poster',
    detail:
      'Poster C gives the itinerary as 27–30 November with no year printed. It matches the 27–30 November departure on Poster A, but the year should be confirmed before it is relied on.'
  },
  {
    topic: '"Restaurant" on Poster B',
    detail:
      'Poster B lists "Restaurant" among its INCLUDES, but Poster C excludes lunches and dinners outright. It most likely means there is a restaurant at the property rather than that meals are covered, so it is deliberately NOT listed under what the price covers — saying otherwise would promise meals the other poster rules out.'
  },
  {
    topic: '"Activities" on Poster B',
    detail:
      'Poster B lists "Activities ( own cost)" inside its INCLUDES list, which contradicts itself. Poster C is unambiguous that the Bilene activities are optional extras, so the page treats them that way.'
  },
  {
    topic: 'Accommodation on the itinerary',
    detail:
      'Poster C ends day one with "StayEasy Maputo" and day two with "San Martinho Beach Club" without saying they are the overnight stops. The page labels them "Overnight", which follows from the inclusion line "1 Night Maputo + 3 Nights Bilene", but it is a reading of the poster rather than something it states outright.'
  },
  {
    topic: 'Group and custom trips',
    detail:
      'The posters only cover the Mozambique tour. Group bookings and custom itineraries are offered on the site as enquiry routes with no price or dates attached, because no poster supports any specific detail for them.'
  }
];
