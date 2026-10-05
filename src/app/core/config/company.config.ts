/**
 * ─────────────────────────────────────────────────────────────
 *  COMPANY CONFIGURATION — the single place to edit contact details.
 *  Every component (navbar, footer, enquiry buttons, contact page,
 *  SEO tags) reads from here. Nothing is hard-coded elsewhere.
 * ─────────────────────────────────────────────────────────────
 */
export const COMPANY = {
  name: 'B H Rubber Products',
  tagline: 'Industrial Rubber & Safety Solutions',
  owner: 'Yusuf Golwala',

  /** Shown on screen */
  phoneDisplay: '+91 98301 64487',
  /** Used for tel: links — country code, no spaces */
  phoneHref: '+919830164487',

  /**
   * WhatsApp number: digits only, including country code, no "+" or spaces.
   * Currently set to the business phone number — change here if WhatsApp
   * uses a different number.
   */
  whatsappNumber: '919830164487',

  /** ⚠ PLACEHOLDER — replace with the real business email address */
  email: 'bhrpkol@gmail.com',

  address: {
    line1: '6A, Clive Row',
    city: 'Kolkata',
    postcode: '700001',
    region: 'West Bengal',
    country: 'India',
  },

  hours: [
    { days: 'Monday – Friday', time: '10:00 am – 6:00 pm' },
    { days: 'Saturday', time: '10:00 am – 5:00 pm' },
    { days: 'Sunday', time: 'Closed' },
  ],

  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=6A%2C%20Clive%20Row%2C%20Kolkata%20700001',

  /** ⚠ PLACEHOLDER — set to the live domain once known (used for canonical / OG tags) */
  siteUrl: 'https://www.example.com',

  seo: {
    defaultTitle: 'B H Rubber Products | Industrial Rubber Solutions',
    defaultDescription:
      'B H Rubber Products provides industrial product solutions with a focus on quality, reliability and dependable service.',
    ogImage: 'brand/og-image.jpg',
  },
} as const;

export type CompanyConfig = typeof COMPANY;
