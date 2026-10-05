import { Category, Division } from '../core/models/product.model';

/** Top-level groupings used on the Categories page and the product filter. */
export const DIVISIONS: Division[] = [
  {
    slug: 'knitted',
    name: 'Knitted & cut resistant',
    description: 'Seamless knitted gloves, cut and heat resistant gloves, and arm sleeves.',
  },
  {
    slug: 'leather',
    name: 'Leather gloves & welding',
    description: 'Drivers, Canadian and welders gloves, lined leather gloves and welding protection.',
  },
  {
    slug: 'workwear',
    name: 'Workwear',
    description: 'Coveralls, jackets, trousers, shirts, vests and uniforms.',
  },
  {
    slug: 'piping',
    name: 'Piping',
    description: 'Flanges to ASME, API, EN, BS, IS, JIS, AS and AWWA standards.',
  },
];

/** Category order here is the order used everywhere on the site. */
export const CATEGORIES: Category[] = [
  {
    slug: 'knitted-gloves',
    name: 'Knitted Gloves',
    division: 'knitted',
    description: 'Seamless knitted gloves in cotton, polyester and nylon, including PVC dotted and PU coated options.',
    image: 'products/sa-35.webp',
  },
  {
    slug: 'cut-resistant-gloves',
    name: 'Cut Resistant Gloves',
    division: 'knitted',
    description: 'Para-aramid, aramid-polyamide and high-tenacity fibre gloves rated from cut level 2 to cut level 5.',
    image: 'products/k300.webp',
  },
  {
    slug: 'heat-resistant-gloves',
    name: 'Heat Resistant Gloves',
    division: 'knitted',
    description: 'Para-aramid knitted gloves with cotton lining, and split leather gloves with a para-aramid knitted lining.',
    image: 'products/kd.webp',
  },
  {
    slug: 'protective-sleeves',
    name: 'Protective Sleeves',
    division: 'knitted',
    description: 'Knitted arm sleeves in para-aramid, aramid-polyamide and high-tenacity yarns.',
    image: 'products/as-t-l.webp',
  },
  {
    slug: 'lined-leather-gloves',
    name: 'Aramid-Lined Leather Gloves',
    division: 'leather',
    description: 'Leather work and welder gloves with a para-aramid knitted or fabric lining.',
    image: 'products/lk2.webp',
  },
  {
    slug: 'drivers-gloves',
    name: 'Drivers Gloves',
    division: 'leather',
    description: 'Cow grain, buffalo grain, goat grain and cow split drivers gloves in sizes 7–11 and XS–2XL.',
    image: 'products/l228.webp',
  },
  {
    slug: 'canadian-gloves',
    name: 'Canadian Gloves',
    division: 'leather',
    description: 'Leather palm work gloves with drill or fabric backs and rubberised or canvas cuffs.',
    image: 'products/l225.webp',
  },
  {
    slug: 'welders-gloves',
    name: 'Welders Gloves',
    division: 'leather',
    description: 'Split and grain leather welding gloves with 8 cm and 15 cm cuffs, lined and unlined.',
    image: 'products/lbw-r.webp',
  },
  {
    slug: 'welding-protection',
    name: 'Welding Protection',
    division: 'leather',
    description: 'Leather aprons, leg and arm guards, jackets and trousers in grain or split leather.',
    image: 'products/split-grain-jacket.webp',
  },
  {
    slug: 'coveralls',
    name: 'Coveralls',
    division: 'workwear',
    description: 'Cotton and poly-cotton coveralls, including hi-vis styles with reflective tape.',
    image: 'products/coverall-orange-navy.webp',
  },
  {
    slug: 'jackets-trousers',
    name: 'Jackets & Trousers',
    division: 'workwear',
    description: 'Work jackets, a parka, jacket-and-trouser sets, and stretch, cargo, carpenter and bib trousers.',
    image: 'products/jacket-trousers-orange-navy.webp',
  },
  {
    slug: 'shirts-tshirts-vests',
    name: 'Shirts, T-Shirts & Vests',
    division: 'workwear',
    description: 'Hi-vis work shirts, cotton polo T-shirts and work vests.',
    image: 'products/shirt-yellow-navy.webp',
  },
  {
    slug: 'uniforms-lab-coats',
    name: 'Uniforms & Lab Coats',
    division: 'workwear',
    description: 'Chef coat and pajama set, cotton lab coat and cotton tunic.',
    image: 'products/royal-blue-tunic.webp',
  },
  {
    slug: 'flanges',
    name: 'Flanges',
    division: 'piping',
    description: 'Weld neck, slip-on, blind, threaded, orifice and plate flanges, plus fire fighting and dairy flanges.',
    image: 'products/flanges/weld-neck-flanges.webp',
  },
];
