/**
 * Central media configuration for Babee's Lux Travel.
 *
 * Every image and video used on the site is declared here so the client's own
 * photography can be dropped in later without touching component code.
 *
 * TO REPLACE AN ASSET: put the new file in `public/assets/img` (or
 * `public/assets/video`), then change the `src` / `srcSet` paths below and
 * update `width`, `height`, `alt` and `credit`.
 *
 * PROVENANCE NOTE — IMPORTANT.
 * None of this photography belongs to Babee's Lux Travel, and none of it was
 * taken in Mozambique. It is temporary, illustrative stock from Pexels used to
 * establish the visual tone only. `location` records where each frame was
 * actually taken, so nothing is ever captioned as somewhere it is not and no
 * image implies that a specific hotel, villa, boat or beach is part of a
 * package. Captions and alt text must stay descriptive, never promissory.
 *
 * Licence: Pexels Licence (free for commercial use, no attribution required).
 * Credits are recorded here as good practice and for the client's records.
 */

const IMG = '/assets/img';
const VID = '/assets/video';

/** Hero — golden-hour aerial of a thatched coastal lodge. */
export const heroMedia = {
  video: `${VID}/hero-coast-lodge.mp4`,
  poster: `${IMG}/hero-coast-lodge-1600.jpg`,
  fallback: {
    src: `${IMG}/hero-coast-lodge-1600.jpg`,
    srcSet: `${IMG}/hero-coast-lodge-800.jpg 800w, ${IMG}/hero-coast-lodge-1600.jpg 1600w`,
    width: 1600,
    height: 900
  },
  alt: 'Aerial view at golden hour of a low thatched beach lodge beside a turquoise pool, framed by palms and white sand.',
  credit: { author: '23 Audiovisual', source: 'Pexels', id: '29912326' },
  location: 'Tropical coastline, exact location not stated by the photographer'
};

/** Closing invitation — two dhows on a near-empty shoreline. */
export const closingMedia = {
  src: `${IMG}/closing-dhows-1800.jpg`,
  srcSet: `${IMG}/closing-dhows-900.jpg 900w, ${IMG}/closing-dhows-1800.jpg 1800w`,
  width: 1800,
  height: 770,
  alt: 'Two traditional dhows resting on pale shallow water under a wide, almost empty sky.',
  credit: { author: 'Keegan Checks', source: 'Pexels', id: '29889182' },
  location: 'Zanzibar, Tanzania'
};

/** Brand introduction — a single quiet editorial frame. */
export const introMedia = {
  src: `${IMG}/intro-dhow-beach-1000.jpg`,
  srcSet: `${IMG}/intro-dhow-beach-600.jpg 600w, ${IMG}/intro-dhow-beach-1000.jpg 1000w`,
  width: 1000,
  height: 1250,
  alt: 'A traditional dhow under sail close to a wide, pale sand beach in soft hazy light.',
  credit: { author: 'Una Laurencic', source: 'Pexels', id: '34930007' },
  location: 'Zanzibar, Tanzania'
};

/**
 * Featured journeys.
 * `layout` drives a deliberately different composition per journey so the three
 * are never rendered as three identical cards.
 */
export const journeys = [
  {
    id: 'mozambique',
    index: '01',
    kicker: 'Coastal escapes',
    title: 'Mozambique, slowly',
    lede:
      'The Indian Ocean coast, planned around long mornings and short drives. Tell us the stretch of coastline you have in mind and we will shape the days around it.',
    note: 'Routed from South Africa.',
    layout: 'wide',
    media: {
      src: `${IMG}/journey-coast-bay-1000.jpg`,
      srcSet: `${IMG}/journey-coast-bay-600.jpg 600w, ${IMG}/journey-coast-bay-1000.jpg 1000w`,
      width: 1000,
      height: 1250,
      alt: 'Aerial view of a curved bay with small wooden boats moored over clear turquoise shallows.',
      credit: { author: 'Ahmed', source: 'Pexels', id: '31309581' },
      location: 'Tropical coastline, exact location not stated by the photographer'
    }
  },
  {
    id: 'group',
    index: '02',
    kicker: 'Travelling together',
    title: 'Group getaways',
    lede:
      'Birthdays, friends who have been promising each other a trip for years, families travelling in two generations. One itinerary that still leaves everyone room to do their own thing.',
    note: 'Built around your group size.',
    layout: 'offset',
    media: {
      src: `${IMG}/journey-dhow-crew-1400.jpg`,
      srcSet: `${IMG}/journey-dhow-crew-800.jpg 800w, ${IMG}/journey-dhow-crew-1400.jpg 1400w`,
      width: 1400,
      height: 932,
      alt: 'Two people aboard a small wooden fishing boat on calm, clear water.',
      credit: { author: 'Taryn Elliott', source: 'Pexels', id: '5859000' },
      location: 'Zanzibar, Tanzania'
    }
  },
  {
    id: 'custom',
    index: '03',
    kicker: 'Planned from scratch',
    title: 'Custom itineraries',
    lede:
      'Somewhere already in mind, or only a feeling and a rough window of dates. Either is a good place to begin. We work from your idea rather than a fixed catalogue.',
    note: 'Dates and destination open.',
    layout: 'full',
    media: {
      src: `${IMG}/journey-villa-palms-1400.jpg`,
      srcSet: `${IMG}/journey-villa-palms-800.jpg 800w, ${IMG}/journey-villa-palms-1400.jpg 1400w`,
      width: 1400,
      height: 932,
      alt: 'Overhead view of a thatched villa roof set among dense palm canopy.',
      credit: { author: 'Keegan Checks', source: 'Pexels', id: '34104609' },
      location: 'Tropical setting, exact location not stated by the photographer'
    }
  }
];

/** Editorial pair used in the "where you stay" spread. */
export const stayMedia = [
  {
    src: `${IMG}/stay-terrace-1000.jpg`,
    srcSet: `${IMG}/stay-terrace-600.jpg 600w, ${IMG}/stay-terrace-1000.jpg 1000w`,
    width: 1000,
    height: 1332,
    alt: 'Overhead view of a white rooftop terrace with loungers and a low table, enclosed by palm trees.',
    credit: { author: 'Keegan Checks', source: 'Pexels', id: '31362223' },
    location: 'Zanzibar, Tanzania'
  },
  {
    src: `${IMG}/stay-pool-1000.jpg`,
    srcSet: `${IMG}/stay-pool-600.jpg 600w, ${IMG}/stay-pool-1000.jpg 1000w`,
    width: 1000,
    height: 1250,
    alt: 'A long curved swimming pool edged with lawn and palms under soft overcast light.',
    credit: { author: 'Jeremy Li', source: 'Pexels', id: '30169370' },
    location: 'Tropical resort, exact location not stated by the photographer'
  }
];

/**
 * Inspected but NOT used on the site.
 *
 * safariNamibia — a safari vehicle in Namibian savannah. Held back on purpose:
 * Babee's Lux Travel has not confirmed that it sells safari trips, and putting
 * safari imagery on the page would advertise a product that may not exist.
 * Enable only once the client confirms a safari offering.
 *
 * Three further candidates were reviewed and rejected on image quality:
 * Pexels 30216901 and 31309609 (dense high-rise resort blocks and car parks —
 * reads as mass tourism) and 35652135 (flat overcast light, snapshot feel).
 */
export const unusedCandidates = {
  safariNamibia: {
    src: 'https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg',
    credit: { author: 'BOVISTAS', source: 'Pexels', id: '34845589' },
    location: 'Namibia',
    heldBackBecause: 'Safari trips are not a confirmed Babee’s Lux Travel offering.'
  }
};
