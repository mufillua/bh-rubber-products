import { CategorySlug, Product, ProductSpec } from '../core/models/product.model';
import { FLANGE_PRODUCTS } from './flanges.data';

/**
 * ─────────────────────────────────────────────────────────────
 *  PRODUCT CATALOGUE — all product data lives in this file.
 *
 *  To add or edit a product, change an entry in RAW_PRODUCTS below.
 *  `id`, `slug` and `shortDescription` are filled in automatically
 *  (you can still set `slug` / `shortDescription` by hand if you want).
 *
 *  Rules followed when transcribing the source catalogue:
 *   • Only information printed in the catalogue is included.
 *   • Fibre / trim brand names are replaced with their generic
 *     material (e.g. para-aramid, reflective tape, hook-and-loop).
 *   • Images: public/products/<file>.webp, one photo per product.
 * ─────────────────────────────────────────────────────────────
 */

export interface RawProduct {
  code?: string;
  name: string;
  category: CategorySlug;
  description: string;
  image: string;
  specs?: Record<string, string>;
  sizes?: string[];
  materials?: string[];
  colours?: string[];
  standards?: string[];
  features?: string[];
  applications?: string[];
  featured?: boolean;
  slug?: string;
  shortDescription?: string;
}

/* ---------- small helpers to keep the data readable ---------- */
const NUM_7_11 = ['7', '8', '9', '10', '11'];
const NUM_6_10 = ['6', '7', '8', '9', '10'];
const XS_2XL = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
const PARA = ['Para-aramid'];
const img = (file: string) => `products/${file}.webp`;

const RAW_PRODUCTS: RawProduct[] = [
  /* ═══════════════ KNITTED GLOVES ═══════════════ */
  {
    code: 'SA-24', name: '100% Cotton Seamless Knitted Gloves', category: 'knitted-gloves',
    description: 'Seamless knitted gloves in 100% cotton, offered in 7 or 10 gauge and in light, medium and heavy qualities.',
    specs: { Gauge: '7 / 10', Quality: 'Light / Medium / Heavy' }, sizes: NUM_6_10, materials: ['100% cotton'],
    image: img('sa-24'),
  },
  {
    code: 'SA-28', name: 'Polyester Cotton Seamless Knitted Gloves', category: 'knitted-gloves',
    description: 'Seamless knitted gloves in a polyester-cotton blend, offered in 7 or 10 gauge.',
    specs: { Gauge: '7 / 10' }, sizes: NUM_6_10, materials: ['Polyester cotton'],
    image: img('sa-28'),
  },
  {
    code: 'SA-35', name: 'Polyester Melange Seamless Knitted Gloves', category: 'knitted-gloves',
    description: 'Seamless knitted gloves in polyester melange yarn, 10 gauge.',
    specs: { Gauge: '10' }, sizes: NUM_7_11, materials: ['Polyester melange'],
    image: img('sa-35'),
  },
  {
    code: 'SA-21', name: '100% Polyamide (Nylon) Seamless Knitted Gloves', category: 'knitted-gloves',
    description: 'Seamless knitted gloves in 100% polyamide (nylon), offered in 10 or 13 gauge, in white or grey.',
    specs: { Gauge: '10 / 13' }, sizes: NUM_6_10, materials: ['100% polyamide (nylon)'], colours: ['White', 'Grey'],
    image: img('sa-21'), featured: true,
  },
  {
    code: 'SA-34', name: '100% Cotton PVC Dotted Gloves', category: 'knitted-gloves',
    description: 'Cotton knitted gloves with PVC dots, available dotted on a single side or on both sides.',
    specs: { 'PVC dots': 'Single side / Both sides' }, sizes: NUM_6_10, materials: ['100% cotton', 'PVC dots'],
    image: img('sa-34'),
  },
  {
    code: 'SA-50', name: 'Nylon Gloves with PU Coating', category: 'knitted-gloves',
    description: 'Nylon knitted gloves with a PU coating, in white, grey or black.',
    specs: { Coating: 'PU' }, sizes: NUM_6_10, materials: ['Nylon', 'PU coating'], colours: ['White', 'Grey', 'Black'],
    image: img('sa-50'),
  },

  /* ═══════════════ CUT RESISTANT GLOVES ═══════════════ */
  {
    code: 'SA-50/12', name: '100% Para-Aramid Seamless Knitted Gloves, Light Weight', category: 'cut-resistant-gloves',
    description: 'Light-weight seamless knitted gloves in 100% para-aramid yarn, 13 gauge.',
    specs: { 'Cut level': '2', Gauge: '13', Weight: 'Light' }, sizes: NUM_7_11, materials: PARA,
    image: img('sa-50-12'),
  },
  {
    code: 'SA-48', name: 'Grey Polyamide Knitted Gloves with Para-Aramid Plating', category: 'cut-resistant-gloves',
    description: 'Grey polyamide knitted gloves plated with para-aramid yarn, 13 gauge.',
    specs: { 'Cut level': '2', Gauge: '13' }, sizes: NUM_7_11, materials: ['Polyamide', 'Para-aramid plating'], colours: ['Grey'],
    image: img('sa-48'),
  },
  {
    code: 'SA-53', name: '100% Para-Aramid Seamless Knitted Gloves', category: 'cut-resistant-gloves',
    description: 'Seamless knitted gloves in 100% para-aramid yarn, 10 gauge.',
    specs: { 'Cut level': '3', Gauge: '10' }, sizes: NUM_7_11, materials: PARA,
    image: img('sa-53'),
  },
  {
    code: 'POWER', name: 'Aramid Polyamide Seamless Knitted Gloves', category: 'cut-resistant-gloves',
    description: 'Seamless knitted gloves in an aramid-polyamide blend, 10 gauge.',
    specs: { 'Cut level': '3', Gauge: '10' }, sizes: NUM_7_11, materials: ['Aramid polyamide'],
    standards: ['CE', 'EN 388 (2-3-4-X)'],
    image: img('power'),
  },
  {
    code: 'ASPF-10', name: '100% Para-Aramid Seamless Knitted Gloves with Cow Split Leather Reinforcement', category: 'cut-resistant-gloves',
    description: 'Seamless knitted gloves in 100% para-aramid yarn, reinforced with natural cow split leather.',
    specs: { 'Cut level': '3' }, sizes: NUM_7_11, materials: ['Para-aramid', 'Natural cow split leather'],
    standards: ['CE', 'EN 388 (4-3-4-3)'],
    image: img('aspf-10'),
  },
  {
    code: 'K-221', name: '100% Para-Aramid Seamless Knitted Gloves with Leather on Palm and Fourchettes', category: 'cut-resistant-gloves',
    description: 'Seamless knitted gloves in 100% para-aramid yarn with natural cow split leather reinforcement on the palm and fourchettes.',
    specs: { 'Cut level': '3', Reinforcement: 'Palm and fourchettes' }, sizes: NUM_7_11, materials: ['Para-aramid', 'Natural cow split leather'],
    standards: ['CE', 'EN 388 (4-3-4-3)'],
    image: img('k-221'),
  },
  {
    code: 'A10/F', name: '100% Para-Aramid Seamless Knitted Gloves with Leather Palm and Nail Guard', category: 'cut-resistant-gloves',
    description: 'Seamless knitted gloves in 100% para-aramid yarn with natural cow split leather on the palm and a nail guard.',
    specs: { 'Cut level': '3', Reinforcement: 'Palm and nail guard' }, sizes: NUM_7_11, materials: ['Para-aramid', 'Natural cow split leather'],
    image: img('a10-f'),
  },
  {
    code: 'K300', name: 'Para-Aramid Mix Polyamide Gloves with Cow Split Leather Reinforcement', category: 'cut-resistant-gloves',
    description: 'Para-aramid and polyamide blend gloves with natural cow split leather reinforcement, 35 cm long.',
    specs: { 'Cut level': '3', Length: '35 cm' }, materials: ['Para-aramid / polyamide blend', 'Natural cow split leather'],
    standards: ['CE', 'EN 388:2016 (4-3-4-3-X)'],
    image: img('k300'), featured: true,
  },
  {
    code: 'POWER TECH', name: 'Aramid Polyamide Seamless Gloves with Cow Split Leather Reinforcement', category: 'cut-resistant-gloves',
    description: 'Seamless aramid-polyamide gloves reinforced with natural cow split leather.',
    specs: { 'Cut level': '3' }, sizes: NUM_6_10, materials: ['Aramid polyamide', 'Natural cow split leather'],
    standards: ['CE', 'EN 388 (4-3-4-4)'],
    image: img('power-tech'),
  },
  {
    code: 'SA-56', name: '100% Para-Aramid Seamless Knitted Gloves, Heavy Weight', category: 'cut-resistant-gloves',
    description: 'Heavy-weight seamless knitted gloves in 100% para-aramid yarn, 7 gauge.',
    specs: { 'Cut level': '4', Gauge: '7', Weight: 'Heavy' }, sizes: NUM_7_11, materials: PARA,
    image: img('sa-56'),
  },
  {
    code: 'ASPF-7', name: '100% Para-Aramid Seamless Knitted Gloves with Leather Reinforcement, Heavy Weight', category: 'cut-resistant-gloves',
    description: 'Heavy-weight seamless knitted gloves in 100% para-aramid yarn, reinforced with natural cow split leather.',
    specs: { 'Cut level': '4', Weight: 'Heavy' }, sizes: NUM_7_11, materials: ['Para-aramid', 'Natural cow split leather'],
    image: img('aspf-7'),
  },
  {
    code: 'SA-45', name: 'High Tenacity Polyamide Mix Seamless Knitted Gloves', category: 'cut-resistant-gloves',
    description: 'Seamless knitted gloves in a high-tenacity polyamide blend, 10 gauge.',
    specs: { 'Cut level': '4', Gauge: '10' }, sizes: NUM_7_11, materials: ['High-tenacity polyamide blend'],
    image: img('sa-45'),
  },
  {
    code: 'CMAS', name: 'High Tenacity Fibre Seamless Knitted Gloves', category: 'cut-resistant-gloves',
    description: 'Seamless knitted gloves in high-tenacity fibre, 10 gauge.',
    specs: { 'Cut level': '5', Gauge: '10' }, sizes: NUM_7_11, materials: ['High-tenacity fibre'],
    standards: ['CE', 'EN 388:2016 (354XC)'],
    image: img('cmas'),
  },
  {
    code: 'FPG-10', name: 'High Tenacity Fibre Knitted Gloves with Cow Grain Leather Reinforcement', category: 'cut-resistant-gloves',
    description: 'High-tenacity fibre knitted gloves reinforced with cow grain leather.',
    specs: { 'Cut level': '5' }, sizes: NUM_7_11, materials: ['High-tenacity fibre', 'Cow grain leather'],
    standards: ['CE', 'EN 388 (4-5-4-2)'],
    image: img('fpg-10'),
  },
  {
    code: 'DL/7', name: 'High Tenacity Fibre Seamless Knitted Gloves with Leather Palm and Nail Guard', category: 'cut-resistant-gloves',
    description: 'Seamless high-tenacity fibre gloves with natural cow split leather on the palm and a nail guard.',
    specs: { 'Cut level': '5', Reinforcement: 'Palm and nail guard' }, sizes: NUM_7_11, materials: ['High-tenacity fibre', 'Natural cow split leather'],
    standards: ['CE', 'EN 388:2016 (4544D)'],
    image: img('dl-7'),
  },
  {
    code: 'KK/CR', name: 'High Tenacity Fibre Seamless Knitted Gloves with Leather Palm and Canvas Cuff', category: 'cut-resistant-gloves',
    description: 'Seamless high-tenacity fibre gloves with natural cow split leather on the palm and fingertips, finished with a canvas cuff.',
    specs: { 'Cut level': '5', Reinforcement: 'Palm and fingertips', Cuff: 'Canvas' }, sizes: NUM_7_11,
    materials: ['High-tenacity fibre', 'Natural cow split leather', 'Canvas'],
    standards: ['CE', 'EN 388:2016 (4544D)'],
    image: img('kk-cr'),
  },
  {
    code: 'MASTER CUT', name: 'Aramid with Stainless Steel Seamless Knitted Gloves with Leather Palm', category: 'cut-resistant-gloves',
    description: 'Seamless knitted gloves in aramid with stainless steel (inox) yarn, with natural cow split leather on the palm.',
    specs: { 'Cut level': '5' }, sizes: NUM_7_11, materials: ['Aramid with stainless steel (inox)', 'Natural cow split leather'],
    image: img('master-cut'),
  },
  {
    code: 'LD 5', name: 'Split Welder Gloves with Cut Resistant Liner', category: 'cut-resistant-gloves',
    description: 'Split leather welder gloves with a cut resistant liner inside, stitched with para-aramid thread.',
    specs: { 'Cut level': '5', Lining: 'Cut resistant liner', Stitching: 'Para-aramid thread' },
    materials: ['Split leather', 'Cut resistant liner'],
    standards: ['CE', 'EN 388 (4544)'],
    image: img('ld-5'),
  },

  /* ═══════════════ HEAT RESISTANT GLOVES ═══════════════ */
  {
    code: 'KCDC', name: 'Para-Aramid Cotton Seamless Knitted Gloves with Cotton Lining', category: 'heat-resistant-gloves',
    description: 'Heavy-weight (250) seamless knitted gloves in para-aramid and cotton with a 100% cotton lining, for temperatures up to 250°.',
    specs: { Temperature: '250°', Weight: 'Heavy weight 250', Lining: '100% cotton' }, sizes: NUM_7_11,
    materials: ['Para-aramid / cotton', '100% cotton lining'],
    image: img('kcdc'),
  },
  {
    code: 'KD', name: '100% Para-Aramid Seamless Knitted Gloves with Cotton Lining', category: 'heat-resistant-gloves',
    description: 'Seamless knitted gloves in 100% para-aramid yarn with a 100% cotton lining, for temperatures up to 350°. Also available with a longer wrist.',
    specs: { Temperature: '350°', Lining: '100% cotton', Option: 'Also available with longer wrist' }, sizes: NUM_7_11,
    materials: ['100% para-aramid', '100% cotton lining'],
    standards: ['CE', 'EN 388:2016 (244XD)', 'EN 407:2004 (43313X)'],
    image: img('kd'), featured: true,
  },
  {
    code: 'FRK', name: 'Blue Split Gloves Lined with Para-Aramid Knitted Gloves', category: 'heat-resistant-gloves',
    description: 'Blue split leather gloves lined with 100% para-aramid knitted gloves, with a para-aramid wrist and para-aramid thread stitching.',
    specs: { Lining: '100% para-aramid knitted glove', Wrist: 'Para-aramid', Stitching: 'Para-aramid thread' },
    materials: ['Split leather', 'Para-aramid'], colours: ['Blue'],
    image: img('frk'),
  },

  /* ═══════════════ PROTECTIVE SLEEVES ═══════════════ */
  {
    code: 'SS-45', name: '100% Para-Aramid Knitted Sleeves', category: 'protective-sleeves',
    description: 'Knitted arm sleeves in 100% para-aramid yarn.',
    materials: PARA, standards: ['CE', 'EN 388 (1-3-4-X)'],
    image: img('ss-45'),
  },
  {
    code: 'CMSLV', name: 'High Tenacity Knitted Sleeves', category: 'protective-sleeves',
    description: 'Knitted arm sleeves in high-tenacity yarn.',
    materials: ['High-tenacity yarn'], standards: ['CE', 'EN 388:2016 (4543C)'],
    image: img('cmslv'),
  },
  {
    code: 'POWER SLEEVES', name: 'Aramid Polyamide Knitted Sleeves', category: 'protective-sleeves',
    description: 'Knitted arm sleeves in an aramid-polyamide blend.',
    materials: ['Aramid polyamide'],
    image: img('power-sleeves'),
  },
  {
    code: 'AS T/L', name: 'Aramid Polyamide Knitted Sleeves with Leather', category: 'protective-sleeves',
    description: 'Knitted aramid-polyamide arm sleeves with leather.',
    materials: ['Aramid polyamide', 'Leather'],
    image: img('as-t-l'),
  },

  /* ═══════════════ ARAMID-LINED LEATHER GLOVES ═══════════════ */
  {
    code: 'LKG', name: 'Cow Split 5 Finger Gloves Lined with Para-Aramid Knitted Gloves', category: 'lined-leather-gloves',
    description: 'Cow split five-finger gloves lined with 100% para-aramid knitted gloves, with an elastic wrist, stitched with para-aramid thread.',
    specs: { Lining: '100% para-aramid knitted glove', Wrist: 'Elastic', Stitching: 'Para-aramid thread' }, sizes: NUM_7_11,
    materials: ['Cow split leather', 'Para-aramid'],
    image: img('lkg'),
  },
  {
    code: 'LCK', name: 'Natural Grain Work Gloves with Para-Aramid Fabric Lining', category: 'lined-leather-gloves',
    description: 'Natural grain leather work gloves with a para-aramid fabric lining inside and a canvas cuff.',
    specs: { Lining: 'Para-aramid fabric', Cuff: 'Canvas' },
    materials: ['Natural grain leather', 'Para-aramid fabric', 'Canvas'],
    image: img('lck'),
  },
  {
    code: 'LK1', name: 'Split Welder Gloves with Knitted Para-Aramid Lining', category: 'lined-leather-gloves',
    description: 'Split leather welder gloves with knitted para-aramid gloves inside as a lining, stitched with para-aramid thread. Available in 28, 35 and 42 cm lengths.',
    specs: { Length: '28 / 35 / 42 cm', Lining: 'Knitted para-aramid glove', Stitching: 'Para-aramid thread' },
    materials: ['Split leather', 'Para-aramid'],
    image: img('lk1'),
  },
  {
    code: 'LK2', name: 'Para-Aramid Knitted Gloves with Split Leather Cuff', category: 'lined-leather-gloves',
    description: 'Para-aramid knitted gloves with cotton inside and a 15 cm split leather cuff.',
    specs: { Cuff: 'Split leather, 15 cm' },
    materials: ['Para-aramid', 'Cotton', 'Split leather'],
    image: img('lk2'),
  },

  /* ═══════════════ DRIVERS GLOVES ═══════════════ */
  {
    code: 'L227A', name: 'Natural Cow Grain Drivers Gloves', category: 'drivers-gloves',
    description: 'Natural cow grain leather drivers gloves, available with or without binding.',
    specs: { Binding: 'With / without' }, sizes: NUM_7_11, materials: ['Natural cow grain leather'],
    standards: ['CE', 'EN 388:2016 (3133X)'],
    image: img('l227a'), featured: true,
  },
  {
    code: 'L127A', name: 'Natural Buffalo Grain Drivers Gloves', category: 'drivers-gloves',
    description: 'Natural buffalo grain leather drivers gloves, available with or without binding.',
    specs: { Binding: 'With / without' }, sizes: NUM_7_11, materials: ['Natural buffalo grain leather'],
    standards: ['CE', 'EN 388:2016 (3133X)'],
    image: img('l127a'),
  },
  {
    code: 'L127G', name: 'Goat Grain Drivers Gloves', category: 'drivers-gloves',
    description: 'Goat grain leather drivers gloves, available with or without binding.',
    specs: { Binding: 'With / without' }, sizes: NUM_7_11, materials: ['Goat grain leather'],
    standards: ['CE', 'EN 388:2016 (2122X)'],
    image: img('l127g'),
  },
  {
    code: 'L227/B3', name: 'Natural Cow Grain Drivers Gloves with Split Back', category: 'drivers-gloves',
    description: 'Natural cow grain leather drivers gloves with a split leather back.',
    sizes: NUM_7_11, materials: ['Natural cow grain leather', 'Split leather back'],
    standards: ['CE', 'EN 388:2016 (3133X)'],
    image: img('l227-b3'),
  },
  {
    code: 'L227/B4', name: 'Natural Cow Grain Drivers Gloves with Split Back', category: 'drivers-gloves',
    description: 'Natural cow grain leather drivers gloves with a split leather back.',
    sizes: NUM_7_11, materials: ['Natural cow grain leather', 'Split leather back'],
    standards: ['CE', 'EN 388:2016 (3133X)'],
    image: img('l227-b4'),
  },
  {
    code: 'L228', name: 'Yellow Cow Grain Drivers Gloves', category: 'drivers-gloves',
    description: 'Yellow cow grain leather drivers gloves, available with or without binding.',
    specs: { Binding: 'With / without' }, sizes: NUM_7_11, materials: ['Cow grain leather'], colours: ['Yellow'],
    standards: ['CE', 'EN 388 (3132)'],
    image: img('l228'),
  },
  {
    code: 'L230', name: 'Natural Cow Grain Drivers Gloves, Fully Lined', category: 'drivers-gloves',
    description: 'Natural cow grain leather drivers gloves, fully lined inside.',
    specs: { Lining: 'Fully lined' }, sizes: NUM_7_11, materials: ['Natural cow grain leather'],
    image: img('l230'),
  },
  {
    code: 'L229', name: 'Yellow Cow Grain Drivers Gloves, Fully Lined', category: 'drivers-gloves',
    description: 'Yellow cow grain leather drivers gloves, fully lined inside.',
    specs: { Lining: 'Fully lined' }, sizes: NUM_7_11, materials: ['Cow grain leather'], colours: ['Yellow'],
    image: img('l229'),
  },
  {
    code: 'L232', name: 'Natural Leather Gloves with Grain Palm and Cotton Fabric Back', category: 'drivers-gloves',
    description: 'Natural leather gloves with grain leather on the palm, thumb and fingertips and a cotton fabric back.',
    sizes: NUM_7_11, materials: ['Natural grain leather', 'Cotton fabric back'],
    standards: ['CE', 'EN 388:2016 (3122X)'],
    image: img('l232'),
  },
  {
    code: 'L236', name: 'Goat Grain Gloves with Knitted Back and Hook-and-Loop Cuff', category: 'drivers-gloves',
    description: 'Goat grain leather gloves with a knitted fabric back and an elastic cuff with hook-and-loop closure.',
    specs: { Back: 'Knitted fabric', Cuff: 'Elastic with hook-and-loop closure' }, sizes: NUM_7_11,
    materials: ['Goat grain leather', 'Knitted fabric'],
    standards: ['CE', 'EN 388:2016 (3122X)'],
    image: img('l236'),
  },
  {
    code: 'L236R', name: 'Goat Grain Gloves with Knitted Back and Knitted Cuff', category: 'drivers-gloves',
    description: 'Goat grain leather gloves with a knitted fabric back and a knitted cuff.',
    specs: { Back: 'Knitted fabric', Cuff: 'Knitted' }, sizes: NUM_7_11,
    materials: ['Goat grain leather', 'Knitted fabric'],
    standards: ['CE', 'EN 388:2016 (3122X)'],
    image: img('l236r'),
  },
  {
    code: 'L237', name: 'Natural Cow Grain Leather Gloves with Vein Guard and Wing Thumb', category: 'drivers-gloves',
    description: 'Natural cow grain leather gloves with an extra 5.5 cm vein guard, elastic cuff and wing thumb.',
    specs: { 'Vein guard': '5.5 cm', Cuff: 'Elastic', Thumb: 'Wing thumb' }, sizes: NUM_7_11,
    materials: ['Natural cow grain leather'],
    image: img('l237'),
  },
  {
    code: 'L231.3', name: 'Cow Split Drivers Gloves', category: 'drivers-gloves',
    description: 'Cow split leather drivers gloves, available with or without binding.',
    specs: { Binding: 'With / without' }, sizes: NUM_7_11, materials: ['Cow split leather'],
    standards: ['CE', 'EN 388:2016 (3133X)'],
    image: img('l231-3'),
  },
  {
    code: 'L231.4', name: 'Cow Split Drivers Gloves', category: 'drivers-gloves',
    description: 'Cow split leather drivers gloves, available with or without binding.',
    specs: { Binding: 'With / without' }, sizes: NUM_7_11, materials: ['Cow split leather'],
    standards: ['CE', 'EN 388:2016 (3133X)'],
    image: img('l231-4'),
  },
  {
    code: 'L238', name: 'Cow Grain Gloves with Ventilation Holes and Round Thumb', category: 'drivers-gloves',
    description: 'Cow grain leather gloves with holes at the back, a round thumb and self binding.',
    specs: { Back: 'Holes at the back', Thumb: 'Round thumb', Binding: 'Self binding' }, sizes: NUM_7_11,
    materials: ['Cow grain leather'],
    image: img('l238'),
  },
  {
    code: 'L233', name: 'Beige Cow Grain Drivers Gloves, Straight Thumb', category: 'drivers-gloves',
    description: 'Beige cow grain leather drivers gloves with a straight thumb.',
    specs: { Thumb: 'Straight thumb' }, sizes: NUM_7_11, materials: ['Cow grain leather'], colours: ['Beige'],
    image: img('l233'),
  },
  {
    code: 'L234', name: 'Water Repellent Cow Grain Leather Gloves', category: 'drivers-gloves',
    description: 'Water repellent cow grain leather gloves.',
    specs: { Finish: 'Water repellent' }, sizes: NUM_7_11, materials: ['Cow grain leather'],
    image: img('l234'),
  },
  {
    code: 'L235', name: 'Water Repellent Beige Drivers Gloves with Elastic Rib', category: 'drivers-gloves',
    description: 'Water repellent beige leather drivers gloves with an elastic rib cuff.',
    specs: { Finish: 'Water repellent', Cuff: 'Elastic rib' }, sizes: NUM_7_11, colours: ['Beige'],
    image: img('l235'),
  },
  {
    code: 'L241', name: 'Cow Grain Drivers Gloves with Keystone Thumb', category: 'drivers-gloves',
    description: 'Cow grain leather drivers gloves with a keystone thumb, in natural, beige or yellow.',
    specs: { Thumb: 'Keystone thumb' }, sizes: XS_2XL, materials: ['Cow grain leather'], colours: ['Natural', 'Beige', 'Yellow'],
    image: img('l241'),
  },
  {
    code: 'L242', name: 'Cow Grain Drivers Gloves with Keystone Thumb, Fleece Lined', category: 'drivers-gloves',
    description: 'Fleece-lined cow grain leather drivers gloves with a keystone thumb, in natural, beige or yellow.',
    specs: { Thumb: 'Keystone thumb', Lining: 'Fleece' }, sizes: XS_2XL, materials: ['Cow grain leather', 'Fleece lining'],
    colours: ['Natural', 'Beige', 'Yellow'],
    image: img('l242'),
  },
  {
    code: 'L243', name: 'Cow Grain Drivers Gloves with Rust Split Back and Keystone Thumb', category: 'drivers-gloves',
    description: 'Cow grain leather drivers gloves with a rust split leather back and a keystone thumb.',
    specs: { Back: 'Rust split leather', Thumb: 'Keystone thumb' }, sizes: XS_2XL,
    materials: ['Cow grain leather', 'Split leather back'], colours: ['Natural', 'Beige', 'Yellow'],
    image: img('l243'),
  },
  {
    code: 'L244', name: 'Cow Grain Drivers Gloves with Split Palm Reinforcement', category: 'drivers-gloves',
    description: 'Cow grain leather drivers gloves with split leather reinforcement on the palm.',
    specs: { Reinforcement: 'Split leather on palm' }, sizes: XS_2XL, materials: ['Cow grain leather', 'Split leather'],
    colours: ['Natural', 'Beige'],
    image: img('l244'),
  },
  {
    code: 'L245', name: 'Cow Grain Drivers Gloves with Reflective Fingertips', category: 'drivers-gloves',
    description: 'Cow grain leather drivers gloves with a keystone thumb and fingertips stitched with reflective fabric.',
    specs: { Thumb: 'Keystone thumb', Fingertips: 'Stitched with reflective fabric' }, sizes: XS_2XL,
    materials: ['Cow grain leather', 'Reflective fabric'],
    image: img('l245'),
  },
  {
    code: 'L246', name: 'Cow Grain Drivers Gloves with TPR Protection', category: 'drivers-gloves',
    description: 'Cow grain leather drivers gloves with TPR protection. Also available with a cut resistant liner.',
    specs: { Protection: 'TPR', Option: 'Also available with cut resistant liner' }, sizes: XS_2XL,
    materials: ['Cow grain leather', 'TPR'], colours: ['Natural', 'Beige', 'Yellow'],
    image: img('l246'),
  },

  /* ═══════════════ CANADIAN GLOVES ═══════════════ */
  {
    code: 'L224', name: 'Natural Cow Grain Work Gloves with Fabric Back and Rubberised Cuff', category: 'canadian-gloves',
    description: 'Natural cow grain leather work gloves with a fabric back and rubberised cuff.',
    specs: { Back: 'Fabric', Cuff: 'Rubberised' }, sizes: NUM_7_11, materials: ['Natural cow grain leather', 'Fabric back'],
    standards: ['CE', 'EN 388 (2-1-3-2)'],
    image: img('l224'),
  },
  {
    code: 'L224.2', name: 'Natural Cow Grain Work Gloves with Drill Back, Double Stitched', category: 'canadian-gloves',
    description: 'Natural cow grain leather work gloves with a drill fabric back and cuff, double stitched.',
    specs: { Back: 'Drill fabric', Stitching: 'Double stitched' }, sizes: NUM_7_11, materials: ['Natural cow grain leather', 'Drill fabric'],
    standards: ['CE', 'EN 388 (2-1-3-2)'],
    image: img('l224-2'),
  },
  {
    code: 'L225', name: 'Yellow Cow Grain Work Gloves with Fabric Back and Rubberised Cuff', category: 'canadian-gloves',
    description: 'Yellow cow grain leather work gloves with a fabric back and rubberised cuff.',
    specs: { Back: 'Fabric', Cuff: 'Rubberised' }, materials: ['Cow grain leather', 'Fabric back'], colours: ['Yellow'],
    image: img('l225'),
  },
  {
    code: 'L224/B', name: 'Beige Cow Grain Work Gloves with Drill Back and Canvas Cuff', category: 'canadian-gloves',
    description: 'Beige cow grain leather work gloves with a drill fabric back and canvas cuff.',
    specs: { Back: 'Drill fabric', Cuff: 'Canvas' }, materials: ['Cow grain leather', 'Drill fabric', 'Canvas'], colours: ['Beige'],
    image: img('l224-b'),
  },
  {
    code: 'L224/RP', name: 'Natural Cow Grain Work Gloves with Grain Reinforcement', category: 'canadian-gloves',
    description: 'Natural cow grain leather work gloves with grain leather reinforcement, a fabric back and rubberised cuff.',
    specs: { Reinforcement: 'Grain leather', Back: 'Fabric', Cuff: 'Rubberised' },
    materials: ['Natural cow grain leather', 'Fabric back'],
    image: img('l224-rp'),
  },
  {
    code: 'L252', name: 'Beige Cow Grain Work Gloves with Coloured Fabric Back', category: 'canadian-gloves',
    description: 'Beige cow grain leather work gloves with a coloured fabric back and rubberised cuff.',
    specs: { Back: 'Coloured fabric', Cuff: 'Rubberised' }, materials: ['Cow grain leather', 'Fabric back'], colours: ['Beige'],
    image: img('l252'),
  },
  {
    code: 'L253', name: 'Natural Cow Grain Gloves with Full Cotton Lining', category: 'canadian-gloves',
    description: 'Natural cow grain leather gloves with a full cotton lining and rubberised cuff.',
    specs: { Lining: 'Full cotton', Cuff: 'Rubberised' }, materials: ['Natural cow grain leather', 'Cotton lining'],
    image: img('l253'),
  },
  {
    code: 'L256', name: 'Natural Cow Grain Canadian Gloves with High Visibility Back', category: 'canadian-gloves',
    description: 'Natural cow grain leather Canadian gloves with a high visibility fabric cuff and back.',
    specs: { Back: 'High visibility fabric', Cuff: 'High visibility fabric' }, materials: ['Natural cow grain leather', 'High visibility fabric'],
    image: img('l256'),
  },
  {
    code: 'L226', name: 'Natural Cow Split Work Gloves with Coloured Drill Back', category: 'canadian-gloves',
    description: 'Natural cow split leather work gloves with a coloured drill back and rubberised cuff.',
    specs: { Back: 'Coloured drill', Cuff: 'Rubberised' }, materials: ['Natural cow split leather', 'Drill fabric'],
    standards: ['CE', 'EN 388:2016 (4244X)'],
    image: img('l226'),
  },
  {
    code: 'L226G', name: 'Natural Cow Split Work Gloves with Green Split Reinforcement', category: 'canadian-gloves',
    description: 'Natural cow split leather work gloves with green split leather reinforcement, a drill back and rubberised cuff.',
    specs: { Reinforcement: 'Green split leather', Back: 'Drill', Cuff: 'Rubberised' },
    materials: ['Natural cow split leather', 'Drill fabric'],
    standards: ['CE', 'EN 388:2016 (4244X)'],
    image: img('l226g'),
  },
  {
    code: 'L254', name: 'Natural Cow Split Work Gloves with Striped Fabric Back', category: 'canadian-gloves',
    description: 'Natural cow split leather work gloves with a striped fabric back and rubberised cuff.',
    specs: { Back: 'Striped fabric', Cuff: 'Rubberised' }, materials: ['Natural cow split leather', 'Fabric back'],
    standards: ['CE', 'EN 388:2016 (4244X)'],
    image: img('l254'),
  },
  {
    code: 'L255', name: 'Yellow Cow Split Work Gloves with Coloured Drill Back', category: 'canadian-gloves',
    description: 'Yellow cow split leather work gloves with a coloured drill back and rubberised cuff.',
    specs: { Back: 'Coloured drill', Cuff: 'Rubberised' }, materials: ['Cow split leather', 'Drill fabric'], colours: ['Yellow'],
    image: img('l255'),
  },
  {
    code: 'L250', name: 'Natural Cow Grain Combi Work Gloves with Knuckle Protection', category: 'canadian-gloves',
    description: 'Combination work gloves with a white cow grain palm, split leather back of thumb, nail guards and knuckle protection.',
    specs: { Palm: 'White cow grain leather', 'Back of thumb': 'Split leather', Protection: 'Nail guards and knuckle protection' },
    materials: ['Cow grain leather', 'Split leather'],
    image: img('l250'),
  },
  {
    code: 'L224/C', name: 'Cow Split Canadian Gloves with Grain Reinforcement', category: 'canadian-gloves',
    description: 'Cow split leather Canadian gloves with grain leather reinforcement, a white drill back and rubberised cuff.',
    specs: { Reinforcement: 'Grain leather', Back: 'White drill', Cuff: 'Rubberised' },
    materials: ['Cow split leather', 'Grain leather', 'Drill fabric'],
    image: img('l224-c'),
  },
  {
    code: 'L257', name: 'Split Leather Canadian Gloves with Denim Back', category: 'canadian-gloves',
    description: 'Canadian gloves made from split leather, with a canvas cuff and denim back.',
    specs: { Back: 'Denim', Cuff: 'Canvas' }, materials: ['Split leather', 'Denim', 'Canvas'],
    standards: ['CE', 'EN 388:2016 (4244X)'],
    image: img('l257'),
  },

  /* ═══════════════ WELDERS GLOVES ═══════════════ */
  {
    code: 'L119', name: 'Natural Cow Split Welder Gloves with 8 cm Cuff', category: 'welders-gloves',
    description: 'Natural cow split leather welder gloves with an 8 cm cuff, 28 cm total length.',
    specs: { Cuff: '8 cm', 'Total length': '28 cm' }, materials: ['Natural cow split leather'],
    standards: ['CE', 'EN 388:2016 (3122X)'],
    image: img('l119'),
  },
  {
    code: 'L219R', name: 'Natural Cow Split Welder Gloves with Palm Reinforcement', category: 'welders-gloves',
    description: 'Natural cow split leather welder gloves with reinforcement on the palm and an 8 cm cuff.',
    specs: { Cuff: '8 cm', Reinforcement: 'Palm' }, materials: ['Natural cow split leather'],
    standards: ['CE', 'EN 388:2016 (3122X)'],
    image: img('l219r'),
  },
  {
    code: 'L218', name: 'Natural Cow Grain Welder Gloves with Split Back and Cuff', category: 'welders-gloves',
    description: 'Natural cow grain leather welder gloves with the back and cuff in split leather, 28 cm total length.',
    specs: { 'Total length': '28 cm', 'Back and cuff': 'Split leather' }, materials: ['Natural cow grain leather', 'Split leather'],
    image: img('l218'),
  },
  {
    code: 'L221', name: 'Natural Cow Split Welder Gloves with 15 cm Cuff', category: 'welders-gloves',
    description: 'Natural cow split leather welder gloves with a 15 cm cuff, 35 cm total length.',
    specs: { Cuff: '15 cm', 'Total length': '35 cm' }, materials: ['Natural cow split leather'],
    standards: ['CE', 'EN 388:2016 (3122X)'],
    image: img('l221'),
  },
  {
    code: 'L222', name: 'All Cow Grain Welder Gloves with 15 cm Split Cuff', category: 'welders-gloves',
    description: 'All cow grain leather welder gloves with a 15 cm split leather cuff, 35 cm total length.',
    specs: { Cuff: 'Split leather, 15 cm', 'Total length': '35 cm' }, materials: ['Cow grain leather', 'Split leather cuff'],
    image: img('l222'),
  },
  {
    code: 'L223', name: 'Natural Cow Grain Welder Gloves with Split Back and Cuff', category: 'welders-gloves',
    description: 'Natural cow grain leather welder gloves with the back and cuff in split leather.',
    specs: { 'Back and cuff': 'Split leather' }, materials: ['Natural cow grain leather', 'Split leather'],
    image: img('l223'),
  },
  {
    code: 'L220', name: 'Goat Welder TIG Gloves with 15 cm Split Cuff', category: 'welders-gloves',
    description: 'Goat leather TIG welding gloves with a 15 cm split leather cuff, stitched with para-aramid thread.',
    specs: { Cuff: 'Split leather, 15 cm', Stitching: 'Para-aramid thread' }, materials: ['Goat leather', 'Split leather cuff'],
    image: img('l220'),
  },
  {
    code: 'LBW/R', name: 'Blue Welder Gloves with Lining and Knuckle Protection', category: 'welders-gloves',
    description: 'Blue welder gloves with an inside lining, reinforcement on the palm and knuckle protection.',
    specs: { Lining: 'Inside lining', Reinforcement: 'Palm', Protection: 'Knuckle protection' }, colours: ['Blue'],
    image: img('lbw-r'), featured: true,
  },
  {
    code: 'LGW/R', name: 'Dyed Split Welder Gloves with Thumb Reinforcement', category: 'welders-gloves',
    description: 'Dyed split leather welder gloves with the back and thumb made from a single piece of leather and reinforcement on the thumb.',
    specs: { Construction: 'Back and thumb from a single piece of leather', Reinforcement: 'Thumb' }, materials: ['Dyed split leather'],
    image: img('lgw-r'),
  },
  {
    code: 'LRW', name: 'Fully Lined Red Welted Cow Split Welder Gloves', category: 'welders-gloves',
    description: 'Fully lined, welted red cow split leather welder gloves with a 15 cm cuff, stitched with para-aramid thread.',
    specs: { Cuff: '15 cm', Lining: 'Fully lined', Stitching: 'Para-aramid thread' }, materials: ['Cow split leather'], colours: ['Red'],
    standards: ['CE', 'EN 388:2016 (3233X)', 'EN 407:2004 (413X4X)'],
    image: img('lrw'),
  },
  {
    code: 'LYW', name: 'Fully Lined Yellow Welder Gloves with Cow Grain Palm', category: 'welders-gloves',
    description: 'Fully lined yellow welder gloves with a cow grain leather palm, back and cuff in split leather, and a 15 cm cuff.',
    specs: { Cuff: '15 cm', Lining: 'Fully lined', Palm: 'Cow grain leather', 'Back and cuff': 'Split leather' },
    materials: ['Cow grain leather', 'Split leather'], colours: ['Yellow'],
    image: img('lyw'),
  },
  {
    code: 'LK1H', name: 'Heat Resistant Yellow Split Welder Gloves with Para-Aramid Palm Lining', category: 'welders-gloves',
    description: 'Heat resistant yellow split leather welder gloves with a 15 cm cuff, a seamless para-aramid lining on the palm and para-aramid stitching.',
    specs: { Cuff: '15 cm', Lining: 'Seamless para-aramid on the palm', Stitching: 'Para-aramid thread' },
    materials: ['Split leather', 'Para-aramid'], colours: ['Yellow'],
    image: img('lk1h'),
  },

  /* ═══════════════ WELDING PROTECTION ═══════════════ */
  {
    name: 'Leather Leg Guard / Arm Guard', category: 'welding-protection',
    description: 'Leg guards and arm guards made from grain or split leather.',
    materials: ['Grain leather', 'Split leather'],
    image: img('leg-guard-arm-guard'), slug: 'leather-leg-guard-arm-guard',
  },
  {
    name: 'Leather Apron', category: 'welding-protection',
    description: 'Apron made from grain or split leather, available in different sizes.',
    sizes: ['Available in different sizes'], materials: ['Grain leather', 'Split leather'],
    image: img('apron'), slug: 'leather-apron',
  },
  {
    name: 'Split & Grain Leather Jacket', category: 'welding-protection',
    description: 'Natural split or grain leather jacket with hook-and-loop closure at the front opening, available in different sizes.',
    specs: { Closure: 'Hook-and-loop at front opening' }, sizes: ['Available in different sizes'],
    materials: ['Natural split leather', 'Grain leather'],
    image: img('split-grain-jacket'), slug: 'split-grain-leather-jacket',
  },
  {
    name: 'Split Leather Trousers', category: 'welding-protection',
    description: 'Natural split or grain leather trousers, available in different sizes.',
    sizes: ['Available in different sizes'], materials: ['Natural split leather', 'Grain leather'],
    image: img('split-trousers'), slug: 'split-leather-trousers',
  },

  /* ═══════════════ COVERALLS ═══════════════ */
  {
    code: 'SC/CVL-2', name: 'Coverall (Royal Blue)', category: 'coveralls',
    description: 'Royal blue 100% cotton coverall with a front placket zip, chest zip pocket and elasticated waist.',
    materials: ['100% cotton', 'Polyester rib at sleeve cuff'], colours: ['Royal blue'],
    features: ['100% cotton', 'Polyester rib at sleeve cuff', '2 down patch pockets', 'Chest pocket with zipper closure',
      'Front placket closing with double puller nylon zipper', 'Elasticated waist'],
    image: img('coverall-royal-blue'),
  },
  {
    code: 'SC/CVL-1', name: 'Coverall (Orange/Navy)', category: 'coveralls',
    description: 'Orange and navy coverall with contrast collar, reflective tape and an action back pleat for easy movement.',
    colours: ['Orange / navy'],
    features: ['Contrast fabric at collar & sleeve pocket', 'Front placket closing with double puller nylon zipper', 'Elasticated waist',
      '2 back pockets with flap & one rule pocket', 'Action back pleat at back and arm hole for easy movement', 'Reflective tape'],
    image: img('coverall-orange-navy'), featured: true,
  },
  {
    code: 'SC/CVL-3', name: 'Coverall (Grey/Black)', category: 'coveralls',
    description: 'Grey and black coverall with stand collar, contrast pockets and a walkie-talkie pocket at the right chest.',
    colours: ['Grey / black'],
    features: ['Stand collar', 'Contrast fabric at all pockets', 'Walkie-talkie pocket at right chest',
      'Front placket closing with double puller nylon zipper', 'Elasticated waist', 'Bartack at all stress points'],
    image: img('coverall-grey-black'),
  },
  {
    code: 'SC/CVL-4', name: 'Coverall (Hi-Vis Yellow/Grey)', category: 'coveralls',
    description: 'Hi-vis coverall with fluorescent yellow fabric at the top, PC fabric at the bottom and 50 mm reflective tape.',
    materials: ['Fluorescent yellow fabric (top)', 'PC fabric (bottom)'], colours: ['Hi-vis yellow / grey'],
    features: ['Hi-vis coverall with fluorescent yellow fabric at top and PC fabric at bottom', '2 chest pockets with zipper closure',
      'Front placket closing with double puller nylon zipper', 'Elasticated waist', '50 mm reflective at sleeve, shoulder & leg',
      'Bartack at all stress points'],
    image: img('coverall-hi-vis-yellow-grey'),
  },

  /* ═══════════════ JACKETS & TROUSERS ═══════════════ */
  {
    code: 'SC/JK-TR-1', name: 'Jacket & Trousers (Orange/Navy)', category: 'jackets-trousers',
    description: 'Cotton jacket and trousers set for outdoor work, with reflective piping and knee patches.',
    materials: ['Cotton'], colours: ['Orange / navy'],
    features: ['Cotton jacket & trousers', 'Suitable for outdoor work', 'Reflective piping at pocket, shoulder and under arm',
      'Additional knee patch', 'Elasticated waist', 'Bartack at all stress points'],
    image: img('jacket-trousers-orange-navy'),
  },
  {
    code: 'SC/JK-TR-2', name: 'Jacket & Trousers (Grey/Navy)', category: 'jackets-trousers',
    description: 'Cotton jacket and trousers set for outdoor work, with knee patches and an elasticated waist.',
    materials: ['Cotton'], colours: ['Grey / navy'],
    features: ['Cotton jacket & trousers', 'Suitable for outdoor work', 'Additional knee patch', 'Elasticated waist',
      'Bartack at all stress points'],
    image: img('jacket-trousers-grey-navy'),
  },
  {
    code: 'SC/JKT-1', name: 'Jacket (Navy/Grey)', category: 'jackets-trousers',
    description: 'Navy and grey stand collar jacket with double stripe reflective tape on the body and arms.',
    colours: ['Navy / grey'],
    features: ['Stand collar jacket', 'Double stripe reflective tape at body and arm', 'Front closure with nylon zipper',
      'Hook-and-loop adjustable waist'],
    image: img('jacket-navy-grey'),
  },
  {
    code: 'SC/PJKT-1', name: 'Parka Jacket (Orange)', category: 'jackets-trousers',
    description: 'Orange hi-vis parka with reflective tape, a hood under the collar and a quilted inner lining.',
    colours: ['Orange'], materials: ['Taffeta quilted polyfill inner lining'],
    standards: ['AS/NZS 1906.4:2010 Class D', 'EN 471 (day-time visibility)'],
    features: ['Napoleon pocket at chest', '2 down pockets with flap', 'Hook-and-loop closure', 'Reflective tape',
      'Taffeta hood under collar', 'Taffeta quilted polyfill inner lining'],
    image: img('parka-jacket-orange'),
  },
  {
    code: 'SC/TR-1', name: 'PC Stretch Trousers', category: 'jackets-trousers',
    description: 'PC stretch work trousers with cargo pockets, extra ease at the knee and reflective piping at the bottom.',
    materials: ['PC stretch'],
    features: ['2 side swing pockets', '2 hip welt pockets', '2 cargo pockets with hook-and-loop closure', 'Extra ease at knee point',
      'Reflective piping at bottom', 'Bartack at all stress points'],
    image: img('pc-stretch-trousers'),
  },
  {
    code: 'SC/TR-2', name: 'Carpenter Trousers', category: 'jackets-trousers',
    description: 'Carpenter trousers with hanging pockets and heavy-duty nylon reinforcement at the pockets and hem.',
    features: ['2 side hanging pockets', '2 hip pockets with heavy-duty nylon patch and reflective piping',
      '2 cargo pockets with heavy-duty nylon facing', 'Extra heavy-duty nylon reinforcement at bottom hem', 'Bartack at all stress points'],
    image: img('carpenter-trousers'),
  },
  {
    code: 'SC/TR-3', name: 'Cotton Stretch Trousers', category: 'jackets-trousers',
    description: 'Cotton stretch work trousers (97% cotton, 3% spandex) with a hammer loop and reinforced seat.',
    materials: ['97% cotton, 3% spandex'],
    features: ['97% cotton, 3% spandex', '2 side swing pockets', '2 hip patch pockets, hammer loop', 'Extra ease at knee point',
      'Extra fabric reinforcement at buttocks', 'Elasticated waist', 'Bartack at all stress points'],
    image: img('cotton-stretch-trousers'),
  },
  {
    code: 'SC/TR-4', name: 'Camouflage Trousers', category: 'jackets-trousers',
    description: '100% cotton 250 gsm camouflage trousers with cargo pockets and knee pad pockets.',
    specs: { Fabric: '100% cotton, 250 gsm' }, materials: ['100% cotton'], colours: ['Camouflage'],
    features: ['100% cotton, 250 gsm', '2 side swing pockets', '2 hip pockets', '2 cargo pockets', 'Elasticated waist',
      'Knee pad pockets', 'Extra fabric reinforcement at bottom hem', 'Bartack at all stress points'],
    image: img('camouflage-trousers'),
  },
  {
    code: 'SC/Bib-1', name: 'Bib-Trousers (Beige/Black)', category: 'jackets-trousers',
    description: 'Beige and black bib-trousers with a zipped chest pocket, adjustable waist and contrast knee patch.',
    colours: ['Beige / black'],
    features: ['Chest pocket with metal zipper', 'Adjustable waist with metal snap', 'Contrast knee patch', 'Bartack at all stress points'],
    image: img('bib-trousers-beige-black'),
  },

  /* ═══════════════ SHIRTS, T-SHIRTS & VESTS ═══════════════ */
  {
    code: 'SC/SRT-1', name: 'Shirt (Yellow-Navy)', category: 'shirts-tshirts-vests',
    description: '100% cotton regular-fit hi-vis work shirt with reflective tape and a ventilated yoke. Also available in orange/navy.',
    materials: ['100% cotton'], colours: ['Yellow / navy', 'Orange / navy'],
    standards: ['AS/NZS 1906.4:2010 Class D', 'EN 471 (day-time visibility)'],
    features: ['100% cotton, regular fit', '2 chest pockets with flap', 'Front closure with button', 'Adjustable cuffs, reflective tape',
      'Ventilated yoke and underarm with mesh', 'Bartack at all stress points adding strength', 'Also available in orange/navy'],
    image: img('shirt-yellow-navy'),
  },
  {
    code: 'SC/Polo-T-1', name: 'Polo T-Shirt', category: 'shirts-tshirts-vests',
    description: '100% cotton pre-shrunk mercerised yarn polo with contrast rib collar and sleeves. Logo embroidery or print available.',
    materials: ['100% cotton pre-shrunk mercerised yarn'], colours: ['Available in multiple colours'],
    features: ['100% cotton pre-shrunk mercerised yarn polo', 'Double pin contrast rib collar', 'Contrast rib at sleeve', '1 chest pocket',
      'Available in multiple colours & GSM', 'Customised logo embroidery or print also available'],
    image: img('polo-t-shirt'),
  },
  {
    code: 'SC/V2', name: 'Vest (Yellow-Navy)', category: 'shirts-tshirts-vests',
    description: '100% cotton work vest with zip front and back yoke ventilation, available in multiple colour options.',
    materials: ['100% cotton'], colours: ['Yellow / navy', 'Multiple colour options'],
    features: ['100% cotton', 'Front closure with zipper', 'Ventilation at back yoke', 'Available in multiple colour options'],
    image: img('vest-yellow-navy'),
  },
  {
    code: 'SC/V1', name: 'Vest Quilted Black', category: 'shirts-tshirts-vests',
    description: 'Black quilted vest in 98% cotton, 2% spandex with a quilted polyfill lining and elasticated underarm.',
    materials: ['98% cotton, 2% spandex', 'Taffeta quilted polyfill inner lining'], colours: ['Black'],
    features: ['98% cotton, 2% spandex', 'Front closure with moulded plastic zipper', '2 chest pockets', '2 down pockets',
      'Elasticated underarm for close fit', 'Bartack at all stress points', 'Taffeta quilted polyfill inner lining'],
    image: img('vest-quilted-black'),
  },

  /* ═══════════════ UNIFORMS & LAB COATS ═══════════════ */
  {
    code: 'SC/Chef-PJ-1', name: 'Chef Coat & Pajama', category: 'uniforms-lab-coats',
    description: 'Polyester-cotton chef coat and pajama set with black piping at the chest and a metal snap front.',
    materials: ['Polyester / cotton'],
    features: ['Polyester/cotton fabric', 'Black piping at chest', 'Pocket at sleeve', 'Front closure with metal snap'],
    image: img('chef-coat-pajama'),
  },
  {
    code: 'SC/Lbc-1', name: 'Long Coat', category: 'uniforms-lab-coats',
    description: '100% cotton lab coat with polyester button front and two down pockets.',
    materials: ['100% cotton'],
    features: ['100% cotton lab coat', 'Front closure with polyester buttons', '2 down pockets'],
    image: img('long-coat'),
  },
  {
    code: 'SC/Tunic-1', name: 'Royal Blue Tunic', category: 'uniforms-lab-coats',
    description: '100% cotton royal blue tunic with contrast piping at the collar, sleeves and pockets.',
    materials: ['100% cotton'], colours: ['Royal blue'],
    features: ['100% cotton tunic', 'Contrast piping at collar, sleeve and down pocket', 'Front closure with polyester buttons'],
    image: img('royal-blue-tunic'),
  },
];

/* ---------- build the final, typed product list ---------- */

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/%/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toSpecs(specs?: Record<string, string>): ProductSpec[] | undefined {
  if (!specs) return undefined;
  return Object.entries(specs).map(([label, value]) => ({ label, value }));
}

function sizeSummary(sizes?: string[]): string | undefined {
  if (!sizes?.length) return undefined;
  if (sizes.length === 1) return sizes[0];
  return `Sizes ${sizes[0]}–${sizes[sizes.length - 1]}`;
}

/** Card summary: the most useful 2–3 facts, built only from the data above. */
function buildShortDescription(p: RawProduct): string {
  const s = p.specs ?? {};
  const bits: string[] = [];
  if (s['Cut level']) bits.push(`Cut level ${s['Cut level']}`);
  if (s['Temperature']) bits.push(`Up to ${s['Temperature']}`);
  if (s['Gauge']) bits.push(`${s['Gauge']} gauge`);
  if (s['Length']) bits.push(`${s['Length']} length`);
  else if (s['Total length']) bits.push(`${s['Total length']} total length`);
  const size = sizeSummary(p.sizes);
  if (size && size !== 'Available in different sizes') bits.push(size);
  if (bits.length < 2 && p.features?.length) {
    bits.push(...p.features.slice(0, 2 - bits.length));
  }
  if (bits.length < 2 && p.materials?.length) bits.push(p.materials[0]);
  return bits.slice(0, 3).join(' · ') || p.description;
}

export const PRODUCTS: Product[] = [...RAW_PRODUCTS, ...FLANGE_PRODUCTS].map((p, i) => ({
  id: `bh-${String(i + 1).padStart(3, '0')}`,
  code: p.code,
  name: p.name,
  slug: p.slug ?? slugify(p.code ? `${p.code} ${p.name}` : p.name),
  category: p.category,
  shortDescription: p.shortDescription ?? buildShortDescription(p),
  description: p.description,
  specifications: toSpecs(p.specs),
  sizes: p.sizes,
  materials: p.materials,
  colours: p.colours,
  standards: p.standards,
  features: p.features,
  applications: p.applications,
  image: p.image,
  featured: p.featured,
}));
