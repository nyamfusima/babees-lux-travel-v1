/**
 * Central media configuration for Babee's Lux Travel.
 *
 * Every image and video on the site is declared here, so the client's own
 * photography can replace any of it without touching component code.
 *
 * TO REPLACE AN ASSET: drop the new file into `public/assets/img` (or
 * `public/assets/video`), then change `src`/`srcSet` and update `width`,
 * `height`, `alt` and `credit`.
 *
 * TWO KINDS OF PHOTOGRAPHY, AND THE DIFFERENCE MATTERS
 *
 *   onLocation: true   Genuinely photographed at the place named — Maputo and
 *                      Bilene, from Wikimedia Commons under CC licences. These
 *                      may be captioned with the real place name.
 *
 *   onLocation: false  Illustrative stock (Pexels) standing in for an activity
 *                      or a mood. These must NEVER be captioned as a specific
 *                      Mozambican place, property or departure. The components
 *                      label them "illustrative".
 *
 * NOT USED, DELIBERATELY: photographs from San Martinho Beach Club
 * (smbc.co.za, © The Beekman Group) and South Beach Maputo
 * (southbeach.co.mz, © Digital Reach Out). Both are third-party copyright and
 * neither grants reuse. The properties are named in text, which is factual,
 * but their photography is not reproduced. If the client wants real pictures
 * of the places guests actually stay, she should request a media kit from
 * each property — suppliers normally grant travel agents written permission.
 *
 * ATTRIBUTION — ACTION NEEDED BEFORE LAUNCH.
 *
 * The visible credits block was removed from the footer at the client's
 * request. The seven Wikimedia Commons photographs below are CC BY or
 * CC BY-SA, and both licences REQUIRE attribution, so as it stands the site
 * uses them outside their licence terms.
 *
 * Two ways to put that right, whichever the client prefers:
 *
 *   1. Re-enable a credit. It need not be the large block — the CC licences
 *      accept 'any reasonable manner for the medium', so a single line, or
 *      one link to a credits page, is enough. `imageCredits` below still
 *      holds everything needed to render it.
 *
 *   2. Replace these seven with images that need no attribution: Pexels, or
 *      better, the client's own photographs of the trip. That removes the
 *      obligation entirely, but it also loses the real Maputo and Bilene
 *      photography, which is the main reason this page does not look like
 *      generic tropical stock.
 *
 * Until one of those happens, treat this as an open licensing issue.
 */

const IMG = '/assets/img';
const VID = '/assets/video';

/* -------------------------------------------------------------------------
   Hero
   ------------------------------------------------------------------------- */

/**
 * Client-supplied footage (`hero.mp4` from the project), re-encoded for the
 * web: 15s, 1600x900, 25fps, no audio, 1.2 MB. The 4K original is 43 MB and
 * must not be served from `public/`.
 *
 * SOURCE TO CONFIRM: this came from the client. If it is not Babee's Lux
 * Travel's own footage, confirm its origin and that the licence allows
 * commercial use before launch.
 */
export const heroMedia = {
  video: `${VID}/hero-dhow-sandbar.mp4`,
  poster: `${IMG}/hero-dhow-sandbar-1600.jpg`,
  fallback: {
    src: `${IMG}/hero-dhow-sandbar-1600.jpg`,
    srcSet: `${IMG}/hero-dhow-sandbar-800.jpg 800w, ${IMG}/hero-dhow-sandbar-1600.jpg 1600w`,
    width: 1600,
    height: 900
  },
  alt: 'A traditional dhow moored in shallow turquoise water beside a curving white sandbar, under a bright sky.',
  credit: { author: 'Supplied by the client', source: 'hero.mp4' },
  onLocation: false,
  location: 'Not stated — confirm with the client'
};

/* -------------------------------------------------------------------------
   Maputo — real photographs of the places on day one
   ------------------------------------------------------------------------- */

export const maputoSquare = {
  src: `${IMG}/maputo-square-1400.jpg`,
  srcSet: `${IMG}/maputo-square-800.jpg 800w, ${IMG}/maputo-square-1400.jpg 1400w`,
  width: 1400,
  height: 933,
  alt: 'Praça da Independência in Maputo, with the statue of Samora Machel on its plinth and the white Catedral de Nossa Senhora da Conceição behind it.',
  caption: 'Praça da Independência, Maputo',
  onLocation: true,
  credit: { author: 'Salazar Sérgio', source: 'Wikimedia Commons', licence: 'CC BY-SA 4.0' }
};

export const maputoStation = {
  src: `${IMG}/maputo-station-1000.jpg`,
  srcSet: `${IMG}/maputo-station-600.jpg 600w, ${IMG}/maputo-station-1000.jpg 1000w`,
  width: 1000,
  height: 667,
  alt: 'The domed Caminhos de Ferro de Moçambique railway station in Maputo, seen across Praça dos Trabalhadores.',
  caption: 'The CFM railway station',
  onLocation: true,
  credit: { author: 'Claus Wonnemann', source: 'Wikimedia Commons', licence: 'CC BY-SA 4.0' }
};

export const maputoWaterfront = {
  src: `${IMG}/maputo-waterfront-1000.jpg`,
  srcSet: `${IMG}/maputo-waterfront-600.jpg 600w, ${IMG}/maputo-waterfront-1000.jpg 1000w`,
  width: 1000,
  height: 667,
  alt: 'The Maputo shoreline looking back towards the city, with the beach in the foreground and apartment blocks along the skyline.',
  caption: 'The Maputo waterfront',
  onLocation: true,
  credit: { author: 'Cyr~commonswiki', source: 'Wikimedia Commons', licence: 'CC BY-SA 3.0' }
};

export const costaDoSol = {
  src: `${IMG}/costa-do-sol-1000.jpg`,
  srcSet: `${IMG}/costa-do-sol-600.jpg 600w, ${IMG}/costa-do-sol-1000.jpg 1000w`,
  width: 1000,
  height: 667,
  alt: 'Two palm trees silhouetted against a pale sky, photographed from the Costa do Sol restaurant on the Maputo seafront.',
  caption: 'Costa do Sol, Maputo',
  onLocation: true,
  credit: { author: 'nklette', source: 'Wikimedia Commons', licence: 'CC BY 3.0' }
};

/* -------------------------------------------------------------------------
   Bilene — real photographs of the lagoon and shoreline
   ------------------------------------------------------------------------- */

export const bileneLagoon = {
  src: `${IMG}/bilene-lagoon-1800.jpg`,
  srcSet: `${IMG}/bilene-lagoon-900.jpg 900w, ${IMG}/bilene-lagoon-1800.jpg 1800w`,
  width: 1800,
  height: 771,
  alt: 'The wide turquoise lagoon at Bilene, with pale sand in the foreground and a low green shoreline on the far side.',
  caption: 'The lagoon at Bilene',
  onLocation: true,
  credit: { author: 'Meraj Chhaya', source: 'Wikimedia Commons', licence: 'CC BY 2.0' }
};

export const bileneShore = {
  src: `${IMG}/bilene-shore-1400.jpg`,
  srcSet: `${IMG}/bilene-shore-800.jpg 800w, ${IMG}/bilene-shore-1400.jpg 1400w`,
  width: 1400,
  height: 933,
  alt: 'Thatched chalets set along a green dune above the Bilene lagoon, with palms and calm turquoise water below.',
  caption: 'The Bilene shoreline',
  onLocation: true,
  credit: { author: 'Meraj Chhaya', source: 'Wikimedia Commons', licence: 'CC BY 2.0' }
};

export const bileneBoats = {
  src: `${IMG}/bilene-boats-1000.jpg`,
  srcSet: `${IMG}/bilene-boats-600.jpg 600w, ${IMG}/bilene-boats-1000.jpg 1000w`,
  width: 1000,
  height: 667,
  alt: 'Small open boats pulled up at the edge of the Bilene lagoon, with people boarding from the shallows.',
  caption: 'Boats on the lagoon, Bilene',
  onLocation: true,
  credit: { author: 'René C. Nielsen', source: 'Wikimedia Commons', licence: 'CC BY-SA 2.0' }
};

export const bileneSunset = {
  src: `${IMG}/bilene-sunset-800.jpg`,
  srcSet: `${IMG}/bilene-sunset-500.jpg 500w, ${IMG}/bilene-sunset-800.jpg 800w`,
  width: 800,
  height: 1000,
  alt: 'Sunset over the water at Nhabanga Beach, Bilene, with a band of orange sky above a dark, still lagoon.',
  caption: 'Nhabanga Beach, Bilene',
  onLocation: true,
  credit: { author: 'Wisneyykarin', source: 'Wikimedia Commons', licence: 'CC BY-SA 4.0' }
};

/* -------------------------------------------------------------------------
   Closing call to action
   ------------------------------------------------------------------------- */

/**
 * Client-supplied photograph used as the closing background.
 *
 * SOURCE TO CONFIRM: this came from the client, like the hero video. Its
 * origin and licence are not known here, so it is marked onLocation: false
 * and is never captioned as Bilene, Maputo or anywhere else. Confirm before
 * launch; if it turns out to be the client's own photograph of the trip, set
 * onLocation: true and give it a real caption.
 */
export const ctaMedia = {
  src: `${IMG}/cta-boats-sunset-1800.jpg`,
  srcSet: `${IMG}/cta-boats-sunset-900.jpg 900w, ${IMG}/cta-boats-sunset-1800.jpg 1800w`,
  width: 1800,
  height: 1200,
  alt: 'Two small wooden boats pulled up on a sandy shore at sunset, with palms silhouetted against a deep orange sky and still water alongside.',
  onLocation: false,
  credit: { author: 'Supplied by the client', source: 'client upload' },
  location: 'Not stated — confirm with the client'
};

/* -------------------------------------------------------------------------
   Day three — the optional activities.
   Illustrative: these are NOT photographs of Bilene, and the component says so.
   ------------------------------------------------------------------------- */

export const activityMedia = [
  {
    id: 'horse',
    name: 'Horse riding on the beach',
    src: `${IMG}/act-horse-700.jpg`,
    srcSet: `${IMG}/act-horse-420.jpg 420w, ${IMG}/act-horse-700.jpg 700w`,
    width: 700,
    height: 875,
    alt: 'A line of riders on horseback walking along wet sand at the edge of a calm sea.',
    onLocation: false,
    credit: { author: 'Pexels', source: 'Pexels', id: '38248250' }
  },
  {
    id: 'jetski',
    name: 'Jet ski rides',
    src: `${IMG}/act-jetski-700.jpg`,
    srcSet: `${IMG}/act-jetski-420.jpg 420w, ${IMG}/act-jetski-700.jpg 700w`,
    width: 700,
    height: 875,
    alt: 'Aerial view of a jet ski curving across clear turquoise water, leaving a white wake behind it.',
    onLocation: false,
    credit: { author: 'Pexels', source: 'Pexels', id: '2646747' }
  },
  {
    id: 'quad',
    name: 'Quad biking',
    src: `${IMG}/act-quad-700.jpg`,
    srcSet: `${IMG}/act-quad-420.jpg 420w, ${IMG}/act-quad-700.jpg 700w`,
    width: 700,
    height: 875,
    alt: 'A quad bike on an empty stretch of beach, with a line of palm trees along the dune behind it.',
    onLocation: false,
    credit: { author: 'Pexels', source: 'Pexels', id: '30684765' }
  },
  {
    id: 'tubing',
    name: 'Tubing and banana boat rides',
    src: `${IMG}/act-tube-700.jpg`,
    srcSet: `${IMG}/act-tube-420.jpg 420w, ${IMG}/act-tube-700.jpg 700w`,
    width: 700,
    height: 875,
    alt: 'Aerial view of a small boat towing an inflatable banana boat with riders across open water.',
    onLocation: false,
    credit: { author: 'Pexels', source: 'Pexels', id: '29850160' }
  },
  {
    id: 'kayak',
    name: 'Kayaking and paddleboarding',
    src: `${IMG}/act-kayak-700.jpg`,
    srcSet: `${IMG}/act-kayak-420.jpg 420w, ${IMG}/act-kayak-700.jpg 700w`,
    width: 700,
    height: 875,
    alt: 'Two kayaks seen from above, gliding across bright shallow turquoise water.',
    onLocation: false,
    credit: { author: 'Pexels', source: 'Pexels', id: '1036864' }
  }
];

/* -------------------------------------------------------------------------
   Day four — pool and spa. Illustrative, not the booked property.
   ------------------------------------------------------------------------- */

export const resortPool = {
  src: `${IMG}/resort-pool-1200.jpg`,
  srcSet: `${IMG}/resort-pool-700.jpg 700w, ${IMG}/resort-pool-1200.jpg 1200w`,
  width: 1200,
  height: 800,
  alt: 'A long curving swimming pool edged with lawn and palm trees under soft overcast light.',
  onLocation: false,
  credit: { author: 'Jeremy Li', source: 'Pexels', id: '30169370' }
};

export const resortSpa = {
  src: `${IMG}/resort-spa-900.jpg`,
  srcSet: `${IMG}/resort-spa-540.jpg 540w, ${IMG}/resort-spa-900.jpg 900w`,
  width: 900,
  height: 1125,
  alt: 'An open-sided treatment pavilion with a therapist preparing a massage table, bamboo screens and potted plants around it.',
  onLocation: false,
  credit: { author: 'Pexels', source: 'Pexels', id: '6127264' }
};

/* -------------------------------------------------------------------------
   Supporting imagery carried over
   ------------------------------------------------------------------------- */

export const introMedia = {
  src: `${IMG}/intro-dhow-beach-1000.jpg`,
  srcSet: `${IMG}/intro-dhow-beach-600.jpg 600w, ${IMG}/intro-dhow-beach-1000.jpg 1000w`,
  width: 1000,
  height: 1250,
  alt: 'A traditional dhow under sail close to a wide, pale sand beach in soft hazy light.',
  onLocation: false,
  credit: { author: 'Una Laurencic', source: 'Pexels', id: '34930007' }
};

export const stayMedia = {
  src: `${IMG}/stay-terrace-1000.jpg`,
  srcSet: `${IMG}/stay-terrace-600.jpg 600w, ${IMG}/stay-terrace-1000.jpg 1000w`,
  width: 1000,
  height: 1332,
  alt: 'Overhead view of a white rooftop terrace with loungers and a low table, enclosed by palm trees.',
  onLocation: false,
  credit: { author: 'Keegan Checks', source: 'Pexels', id: '31362223' }
};

/**
 * Ways to travel that are NOT a published package. No price, date or inclusion
 * appears for either, because no source material supports one.
 */
export const otherTrips = [
  {
    id: 'group',
    kicker: 'Travelling together',
    title: 'Group bookings',
    lede:
      'Birthdays, friends who have been promising each other a trip for years, families travelling in two generations. Ask what a group rate would look like for your numbers.',
    note: 'Price on enquiry',
    layout: 'offset',
    media: {
      src: `${IMG}/journey-dhow-crew-1400.jpg`,
      srcSet: `${IMG}/journey-dhow-crew-800.jpg 800w, ${IMG}/journey-dhow-crew-1400.jpg 1400w`,
      width: 1400,
      height: 932,
      alt: 'Two people aboard a small wooden fishing boat on calm, clear water.',
      onLocation: false,
      credit: { author: 'Taryn Elliott', source: 'Pexels', id: '5859000' }
    }
  },
  {
    id: 'custom',
    kicker: 'Planned from scratch',
    title: 'Custom itineraries',
    lede:
      'Different dates to the ones listed, a longer stay, or somewhere else along the coast. Start with the idea and we will come back to you on what is possible.',
    note: 'Dates and destination open',
    layout: 'wide',
    media: {
      src: `${IMG}/journey-villa-palms-1400.jpg`,
      srcSet: `${IMG}/journey-villa-palms-800.jpg 800w, ${IMG}/journey-villa-palms-1400.jpg 1400w`,
      width: 1400,
      height: 932,
      alt: 'Overhead view of a thatched villa roof set among dense palm canopy.',
      onLocation: false,
      credit: { author: 'Keegan Checks', source: 'Pexels', id: '34104609' }
    }
  }
];

/* -------------------------------------------------------------------------
   Per-day media for the itinerary
   ------------------------------------------------------------------------- */

export const dayMedia = {
  1: { lead: maputoSquare, strip: [maputoStation, maputoWaterfront, costaDoSol] },
  2: { lead: bileneLagoon, strip: [bileneBoats, bileneShore] },
  3: { activities: activityMedia },
  4: { lead: resortPool, strip: [bileneSunset, resortSpa] }
};

/* -------------------------------------------------------------------------
   "A glimpse of Mozambique" — gallery, deliberately varied in size
   ------------------------------------------------------------------------- */

export const galleryItems = [
  { ...bileneLagoon, span: 'wide' },
  { ...maputoSquare, span: 'tall' },
  { ...bileneShore, span: 'normal' },
  { ...bileneBoats, span: 'normal' },
  { ...maputoStation, span: 'normal' },
  { ...bileneSunset, span: 'tall' },
  { ...costaDoSol, span: 'normal' },
  { ...maputoWaterfront, span: 'normal' },
  { ...activityMedia[4], span: 'normal', caption: 'Illustrative: kayaking' },
  { ...resortPool, span: 'wide', caption: 'Illustrative: a resort pool' }
];

/* -------------------------------------------------------------------------
   Attribution
   ------------------------------------------------------------------------- */

/** Links for the licences actually in use. */
export const licenceUrls = {
  'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/',
  'CC BY-SA 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/'
};

/**
 * Credit lines for every Creative Commons image on the page.
 *
 * NOT CURRENTLY RENDERED — the footer block was removed at the client's
 * request. Kept here because CC BY and CC BY-SA still require attribution:
 * this is the data needed to restore a credit in one place. See the
 * ATTRIBUTION note at the top of this file.
 */
export const imageCredits = [
  { subject: 'Praça da Independência, Maputo', author: 'Salazar Sérgio', licence: 'CC BY-SA 4.0' },
  { subject: 'Maputo railway station', author: 'Claus Wonnemann', licence: 'CC BY-SA 4.0' },
  { subject: 'Maputo waterfront', author: 'Cyr~commonswiki', licence: 'CC BY-SA 3.0' },
  { subject: 'Costa do Sol, Maputo', author: 'nklette', licence: 'CC BY 3.0' },
  { subject: 'Bilene lagoon and shoreline', author: 'Meraj Chhaya', licence: 'CC BY 2.0' },
  { subject: 'Boats on the Bilene lagoon', author: 'René C. Nielsen', licence: 'CC BY-SA 2.0' },
  { subject: 'Nhabanga Beach, Bilene', author: 'Wisneyykarin', licence: 'CC BY-SA 4.0' }
];

/**
 * Inspected but NOT used.
 *
 * safariNamibia — no Babee's Lux Travel poster offers a safari, so putting
 * safari imagery on the page would advertise a product that does not exist.
 */
export const unusedCandidates = {
  safariNamibia: {
    src: 'https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg',
    credit: { author: 'BOVISTAS', source: 'Pexels', id: '34845589' },
    location: 'Namibia',
    heldBackBecause: 'No safari trip appears on any Babee’s Lux Travel poster.'
  }
};
