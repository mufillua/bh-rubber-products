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

  /**
   * Live domain — the ONE address search engines should index (no trailing slash).
   * Used for canonical links, structured data, social previews, sitemap.xml and
   * robots.txt. In Vercel → Domains, make bhrubberproducts.com redirect to this.
   */
  siteUrl: 'https://www.bhrubberproducts.com',

  seo: {
    /** Home page title — business name first, then what people search for, then the city. */
    defaultTitle: 'B H Rubber Products, Kolkata | Industrial Gloves, Safety Shoes & Flanges',
    defaultDescription:
      'B H Rubber Products, Clive Row, Kolkata: cut resistant, heat resistant, leather and welding gloves, safety shoes, coveralls, workwear and industrial flanges. Enquire on WhatsApp.',
    ogImage: 'brand/og-image.jpg',
  },
} as const;

export type CompanyConfig = typeof COMPANY;
