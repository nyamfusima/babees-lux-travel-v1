# Babee’s Lux Travel — website

An editorial, enquiry-led site for a boutique travel business running four-day
Mozambique tours from Johannesburg. React + Vite. No backend, no payments, no
fake booking flow.

## Run it

```bash
npm install
npm run dev
```

Production build and a local preview of that build:

```bash
npm run build
npm run preview
```

---

## Where the content comes from

**The trip posters are the source of truth.** Three posters supplied by the
client (originally published on TikTok) were transcribed into
[`src/packages.js`](src/packages.js). Nothing on the page is inferred, rounded
or invented — if a poster does not say it, the site does not claim it.

| | Poster | What it supplied |
| --- | --- | --- |
| **A** | *Mozambique Tour · 2026 Travel Dates* | the seven departure dates, summary inclusions, WhatsApp number, email |
| **B** | *Mozambique · 4 Days - 3 Nights · R6900 per person* | price, R1 200 booking deposit, summary inclusions, booking contacts |
| **C** | *4 Day trip to Mozambique · Maputo & Bilene* | the day-by-day itinerary, full inclusions and exclusions, accommodation names |

The poster images themselves are **not published on the site** — only the facts
read off them. Keep the originals safe with the client; everything the visitor
sees is real HTML text, not a picture of text.

### Verified contact details

| | Value | Source |
| --- | --- | --- |
| WhatsApp / phone | `083 550 6183` → `wa.me/27835506183` | Posters A, B and C |
| Email | `babeesluxtravels@gmail.com` | Posters A and B |
| TikTok | `@babees_luxtravel` | Poster C watermark, confirmed by the client |

Only one number appears on any poster, and Poster A prints it beside a WhatsApp
icon under “Booking & Enquiries”, so there is no ambiguity about which number
takes bookings. All three live in [`src/site.config.js`](src/site.config.js).

The posters disagreed on the TikTok username — Poster C is watermarked
`@babees_luxtravel` (singular) while Poster A’s TikTok interface showed
`Babees_Luxtravels` (plural), and TikTok soft-200s both URLs so neither could be
verified from the code. The client has since confirmed `@babees_luxtravel`, and
it is now a live link. Any social entry left with `href: null` still renders as
plain text rather than risking a link to the wrong account.

### Still to confirm with the client

These are recorded in code as `openQuestions` in
[`src/packages.js`](src/packages.js) so they cannot quietly get lost:

1. **Nights.** Poster B says “4 Days - 3 Nights”; Poster C lists “1 Night Maputo
   + 3 Nights Bilene”, which is four. The page follows Poster C as the more
   specific document.
2. **Dates.** Poster A is headed “2026 Travel Dates”. Four of its seven
   departures had already travelled when the posters were supplied, so only the
   remaining dates are shown as bookable. No 2027 dates have been supplied.
3. **Year on the itinerary.** Poster C gives 27–30 November with no year.
4. **“Activities ( own cost)”** appears inside Poster B’s *INCLUDES* list, which
   contradicts itself. Poster C is unambiguous that the Bilene activities are
   optional extras, so the page treats them that way.
5. **“Restaurant”** appears in Poster B’s *INCLUDES* list while Poster C excludes
   lunches and dinners outright. It is deliberately **not** listed under what the
   price covers — saying otherwise would promise meals the other poster rules out.
6. **Accommodation labels.** Poster C ends day one with “StayEasy Maputo” and day
   two with “San Martinho Beach Club” without calling them overnight stops. The
   page labels them “Overnight”, which follows from “1 Night Maputo + 3 Nights
   Bilene”, but it is a reading rather than something the poster states.
7. **Group and custom trips** have no poster behind them, so they appear only as
   enquiry routes with no price, dates or inclusions attached.

### Things deliberately not on the page

No testimonials, reviews, ratings, awards, statistics, years of experience,
qualifications, founder biography, live availability or countdown. None of it
was supplied, so none of it was invented. The posters’ own “Limited Seats
Available” line is not reproduced as a live availability status.

---

## Editing the content

**Packages, dates, prices, itinerary** — [`src/packages.js`](src/packages.js).
Everything the visitor reads about the tour comes from this one file. Adding a
2027 departure is one line in `departures2026`; past dates drop off the page
automatically via `getDepartures()`, which compares each departure's end date
against today.

**Contacts, brand strings, navigation** — [`src/site.config.js`](src/site.config.js).

**Photography and video** — [`src/media.js`](src/media.js). Put the new file in
`public/assets/img` or `public/assets/video`, change the `src`/`srcSet` and
update `width`, `height` and `alt`.

---

## Photography

There are **two kinds of photography on this site**, and the difference is
enforced in code. Every entry in [`src/media.js`](src/media.js) carries an
`onLocation` flag:

| | What it is | How it may be captioned |
| --- | --- | --- |
| `onLocation: true` | Genuinely photographed in **Maputo and Bilene**, from Wikimedia Commons under Creative Commons licences | May carry the real place name — “Praça da Independência, Maputo”, “The lagoon at Bilene” |
| `onLocation: false` | Illustrative stock (Pexels) standing in for an activity or a mood | Never captioned as a Mozambican place or property; the page labels it “illustrative” |

That is why the Maputo and Bilene frames are named and the jet skis, kayaks,
pool and spa are not.

### ⚠ Open licensing issue — attribution

The visible “Photography credits” block was **removed from the footer at the
client's request**. The seven Wikimedia Commons photographs are CC BY or
CC BY-SA, and **both licences require attribution**, so as the site stands it
uses them outside their terms. This needs resolving before launch.

Two ways to put it right:

1. **Re-enable a credit.** It does not have to be the large block — the CC
   licences accept “any reasonable manner for the medium”, so a single line,
   or one link to a credits page, is enough. `imageCredits` and `licenceUrls`
   in `src/media.js` still hold everything needed to render it.
2. **Replace those seven images** with ones that need no attribution — Pexels,
   or better, the client's own photographs of the trip. That removes the
   obligation entirely, but also loses the real Maputo and Bilene photography,
   which is the main reason this page does not look like generic tropical
   stock.

The full position is written up at the top of `src/media.js` so it cannot get
lost. A test asserts the block is absent, so its removal is deliberate and
visible rather than accidental.

### Photography deliberately *not* used

The itinerary names two real properties, and both have galleries online:

- **San Martinho Beach Club** — smbc.co.za, © The Beekman Group, all rights reserved
- **South Beach, Maputo** — southbeach.co.mz, © Digital Reach Out

Neither grants reuse, so **none of their photographs appear here.** The
properties are *named* in text, which is factual and fine, but no image on the
page claims to show them, and a test asserts that no caption names a property.

If the client wants real pictures of where guests actually stay, the right move
is to ask each property for a media kit — suppliers normally give travel agents
written permission, and that permission is what makes those images usable.

### A note on the hero video source

The hero footage came from the client as `hero.mp4`. If it is not Babee's Lux
Travel's own footage, confirm where it came from and that the licence permits
commercial use before launch. This is the one asset whose provenance is still
unverified.

### Hero video

Client-supplied footage (`hero.mp4`) of a dhow moored off a white sandbar,
re-encoded for the web: 15 seconds, 1600×900, 25fps, no audio track, **1.2 MB**
(down from a 43 MB 4K original). The 4K master is **not** in `public/` — Vite
copies that folder straight into `dist/`, so it would have been shipped to every
visitor. It was moved to `Downloads/hero-original-4k.mp4`; keep that master
somewhere safe.

**Source to confirm:** if this is not Babee’s Lux Travel’s own footage, confirm
where it came from and that the licence permits commercial use before launch.

The video is an enhancement over a still, never a requirement:

- the poster still is in the markup and preloaded, so it is the first paint
- the video mounts only above 640px, when the visitor has not asked for reduced
  motion, and when the browser is not reporting Save-Data
- if it fails to load or decode, the component falls back to the still

There is no pause control. The hero still respects `prefers-reduced-motion` by
not mounting the video at all, which covers visitors who need motion stopped.
Strictly, WCAG 2.2.2 also wants a visible pause affordance for looping motion —
worth revisiting if the site is ever formally audited.

Hero text was measured against the rendered footage rather than assumed:
headline 8.8:1, standfirst 7.4:1, footer meta 9.0:1 left and 5.7:1 right (the
right-hand label sits over bright sand, so the bottom scrim and that label were
both strengthened until it cleared AA).

### One asset reviewed and deliberately unused

`unusedCandidates.safariNamibia` in `src/media.js` — a safari photograph. No
poster offers a safari, so putting it on the page would advertise a product that
does not exist. Its URL and credit are kept so it can be switched on if that
changes.

---

## How the code is organised

```
index.html              fonts, metadata, hero preload
vite.config.js
public/assets/img       destination photography (2 widths each, for srcset)
public/assets/video     hero loop (web-encoded; 4K master kept outside the repo)
src/
  main.jsx              entry
  App.jsx               page composition and enquiry prefill wiring
  packages.js           ← the tour: dates, price, itinerary, open questions
  site.config.js        ← WhatsApp, phone, email, TikTok, brand strings, nav
  enquiry.js            ← pre-filled WhatsApp message builders
  media.js              ← every image and video, with provenance and credits
  styles.css            imports the seven stylesheets below
  styles/
    tokens.css          colour, type, spacing, motion — the single source
    base.css            reset, typography, focus, shared primitives
    layout.css          page shell, header, hero
    sections.css        tours, other trips, planning, enquiry, contact, footer
    trip.css            trip intro, itinerary, gallery, lightbox, booking call
    form.css            enquiry form
    responsive.css      all breakpoints, in one place
  components/
    primitives.jsx      Label, Wordmark, ActionLink, Figure, Arrow
    Header.jsx   Hero.jsx       TripIntro.jsx  Itinerary.jsx
    Tours.jsx    Gallery.jsx    Planning.jsx   OtherTrips.jsx
    Enquiry.jsx  Contact.jsx    BookingCta.jsx Footer.jsx
```

Design tokens are centralised in `tokens.css`; no component hard-codes a colour
or a type size. Breakpoints live only in `responsive.css`.

### The booking journey

Discover the tour → read price, dates and inclusions → pick a departure →
WhatsApp with that departure already named in the message. Every departure row
has its own `wa.me` link carrying the package name, duration, price and chosen
dates. The written form sends the same details to the same number. Nothing is
booked, held or paid for on the site.

### Typography

| Role | Font | Licence |
| --- | --- | --- |
| Display / headings | **Bodoni Moda** | SIL OFL, via Google Fonts |
| Text / nav / labels | **Archivo** | SIL OFL, via Google Fonts |

These are deliberate stand-ins, not matches. The reference site's own faces were
inspected directly in its stylesheets and are **Questa Grande** (display) and
**Apparat Light** (text) — commercial Adobe Fonts / Fatype licences that cannot
be redistributed here. Bodoni Moda is the closest freely licensable
high-contrast didone; Archivo is the closest neutral grotesque that holds up at
light weights. Swapping in the originals is two lines in `tokens.css` plus the
`<link>` in `index.html`.

### Accessibility

Semantic landmarks and heading order, a skip link, labelled form controls tied
to their inputs, `aria-invalid` plus `aria-describedby` on errors, a polite live
region for form status, focus moved to the first invalid field on a failed
submit, Escape and scroll-lock on the mobile menu, a visible focus ring
everywhere, and `prefers-reduced-motion` honoured for the hero video and all
scrolling. All text meets WCAG 2.1 AA contrast.

### What was checked

Driven through a real Chrome instance, against both the dev server and the
production build served by `vite preview`:

- **Content accuracy** — every one of the 19 activities on the itinerary poster
  appears on the page; price, deposit, named properties, city-tour detail and
  exclusions all present; past departures absent from the bookable list and
  acknowledged in a note.
- **Honesty guards** — a test asserts that no caption names StayEasy Maputo,
  San Martinho Beach Club, Koko Beach or South Beach, so stock photography can
  never drift into claiming to be a named property; another asserts the poster
  images themselves are not republished.
- **Contact links** — every `wa.me` link uses the verified number; each
  departure link names its own departure, package and price and is distinct;
  `tel:` is correct E.164, `mailto:` is correct, TikTok points at the confirmed
  username with `noopener`; no placeholder number remains in the markup.
- **Form** — validation, focus management, and a real submit opening WhatsApp
  with `&`, `%`, en-dashes and curly apostrophes surviving encoding intact.
- **Gallery lightbox** — opens on click, is a labelled modal dialog, moves
  focus in and traps it, navigates with the arrow keys and the buttons, shows a
  position counter, closes on Escape, restores page scroll and returns focus to
  the thumbnail that opened it.
- **Layout** at 360 / 390 / 414 / 768 / 1024 / 1280 / 1440 / 1920 — no
  horizontal overflow, no console errors, no failed requests.
- **Accessibility** — one `h1` with no skipped heading levels, labelled
  landmarks and sections, every in-page link resolving, a full keyboard tab
  order with a visible focus ring at every stop and no keyboard trap.
- **Contrast** — all computable text meets WCAG AA. Text sitting on photography
  (the hero and the gallery captions) cannot be measured from computed styles,
  so it was sampled from the **rendered pixels**: hero 5.7–8.8:1, gallery
  captions 5.7–14.5:1. That measurement caught two real failures — the hero
  meta over bright sand at 3.3:1 and three gallery captions at 4.2–4.5:1 — both
  since fixed by strengthening the scrims.
- **Performance** — LCP ~0.4s, CLS 0.007; all 27 photographs lazy-loaded below
  the fold with explicit width and height, and the hero still preloaded.
- **Media integrity** — every `width`/`height` in `src/media.js` verified
  against the actual pixel dimensions of the file on disk.
