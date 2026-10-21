/**
 * Product data model.
 * Every field except id/name/slug/category/image is optional — only fill in
 * what the source catalogue actually states.
 */
export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  /** Order / model code used in enquiries. Optional — some items have none. */
  code?: string;
  name: string;
  slug: string;
  category: CategorySlug;
  /** One-line summary shown on product cards. */
  shortDescription: string;
  description: string;
  specifications?: ProductSpec[];
  sizes?: string[];
  materials?: string[];
  colours?: string[];
  standards?: string[];
  /** Construction / garment features (mainly workwear). */
  features?: string[];
  /** Industries / uses (flanges). */
  applications?: string[];
  /** Path relative to /public, e.g. "products/sa-24.webp" */
  image: string;
  /** Shown in "Explore Our Products" on the home page. */
  featured?: boolean;
}

export type CategorySlug =
  | 'knitted-gloves'
  | 'cut-resistant-gloves'
  | 'heat-resistant-gloves'
  | 'protective-sleeves'
  | 'lined-leather-gloves'
  | 'drivers-gloves'
  | 'canadian-gloves'
  | 'welders-gloves'
  | 'welding-protection'
  | 'coveralls'
  | 'jackets-trousers'
  | 'shirts-tshirts-vests'
  | 'uniforms-lab-coats'
  | 'safety-shoes'
  | 'flanges';

export type DivisionSlug = 'knitted' | 'leather' | 'workwear' | 'piping';

export interface Division {
  slug: DivisionSlug;
  name: string;
  description: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  division: DivisionSlug;
  description: string;
  /** Search-optimised <title> for the category page (site name is appended). */
  seoTitle: string;
  /** H1 on the category page — the category name plus the terms buyers search for. */
  heading: string;
  /** Meta description for the category page (~150 characters; shown under the title in Google). `{phone}` is replaced with the phone number from company.config. */
  seoDescription: string;
  /** Representative image, path relative to /public */
  image: string;
}
