import { brand, whatsappLink } from './site.config.js';

/**
 * Pre-filled WhatsApp messages.
 *
 * Every message names the package the visitor was looking at, and the
 * departure where one was chosen, so the enquiry arrives with enough context
 * to answer. Nothing is stated as booked or held — these open a conversation.
 */

/** "23 – 26 October 2026" */
export function departureLabel(departure) {
  const year = departure.start.slice(0, 4);
  return `${departure.label} ${year}`;
}

export function packageMessage(pkg, departure) {
  const lines = [
    `Hello ${brand.name}, I would like to enquire about the ${pkg.name} (${pkg.subtitle}).`,
    '',
    `Package: ${pkg.name} — ${pkg.subtitle}`,
    `Duration: ${pkg.duration}`,
    `Price listed: ${pkg.price.display} ${pkg.price.basis}`
  ];

  if (departure) {
    lines.push(`Departure I am interested in: ${departureLabel(departure)}`);
  } else {
    lines.push('Departure: I am still deciding on dates');
  }

  lines.push('', 'Could you confirm availability and what the next step is?');
  return lines.join('\n');
}

export function packageWhatsappLink(pkg, departure) {
  return whatsappLink(packageMessage(pkg, departure));
}

/** Used by the general contact buttons, where no package is in context. */
export function generalMessage() {
  return `Hello ${brand.name}, I would like to enquire about a trip.`;
}

export function generalWhatsappLink() {
  return whatsappLink(generalMessage());
}

/** Built from the enquiry form's own fields. */
export function formMessage(values) {
  return [
    `Hello ${brand.name}, I would like to enquire about a trip.`,
    '',
    `Name: ${values.name.trim()}`,
    `Contact: ${values.contact.trim()}`,
    `Trip: ${values.destination}`,
    `Travellers: ${values.travellers}`,
    `Preferred dates: ${values.dates.trim() || 'Flexible'}`,
    `Notes: ${values.details.trim() || '—'}`
  ].join('\n');
}
