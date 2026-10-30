import { CategorySlug } from '../core/models/product.model';

/**
 * Short buying guides shown under the product grid on each category page (page 1 only).
 *
 * General, factual background on the product type and how to choose — useful to buyers
 * and gives each category page its own substantial text for search engines.
 * Keep it generic: no prices, stock levels, certifications or claims about the business.
 */
export const CATEGORY_GUIDES: Record<CategorySlug, string[]> = {
  'knitted-gloves': [
    'Seamless knitted gloves are knitted in one piece, so there are no stitched seams to rub the hand or split open. The gauge is the number of needles per inch: a 7 or 10 gauge glove is thicker and more cushioned, while 13 and 15 gauge gloves are thinner and give better dexterity and feel.',
    'Cotton knits are breathable and comfortable for light handling and packing. Polyester and nylon knits are lighter and keep their shape after washing. PVC dots on the palm add grip on dry parts and cartons; a PU (polyurethane) palm coating gives a thin, flexible grip layer for assembly and precision work.',
    'When you enquire, give the product code, size and quantity, and mention the job the gloves are for if you want help choosing between styles.',
  ],
  'cut-resistant-gloves': [
    'Cut resistant gloves are rated under EN 388, the European standard for mechanical risks. The rating is a row of figures: abrasion (1–4), blade cut (1–5), tear (1–4) and puncture (1–4), and since the 2016 revision a letter from A to F for the ISO 13997 (TDM) cut test. Higher numbers and later letters mean more protection; X means the test was not carried out. Each product page on this site breaks its rating down line by line.',
    'Lower cut levels suit general handling and assembly. Sheet metal, glass, sharp castings and blade handling call for the higher levels. Para-aramid yarn is inherently flame resistant and does not melt, so it also helps where parts are warm; a leather palm or nail guard adds wear resistance where the glove takes the most abuse.',
    'Fit matters as much as rating: a glove that is too loose catches, and one that is too tight wears through at the fingertips. Give the size and quantity when you enquire.',
  ],
  'heat-resistant-gloves': [
    'Heat resistant gloves are rated under EN 407, the European standard for thermal risks. Its six figures cover burning behaviour, contact heat, convective heat, radiant heat, small splashes of molten metal and large quantities of molten metal, each from 1 to 4 (X = not tested).',
    'Contact heat is usually the deciding figure for handling hot parts. Level 1 is tested at 100 °C, level 2 at 250 °C, level 3 at 350 °C and level 4 at 500 °C, each for at least 15 seconds before the heat comes through. Para-aramid knitted gloves with a cotton lining stay flexible for handling hot components; split leather with a para-aramid knitted lining combines leather’s abrasion resistance with the lining’s heat resistance.',
  ],
  'protective-sleeves': [
    'Knitted arm sleeves protect the forearm, the part most often cut when reaching into machines or carrying sheet metal, glass and sharp-edged parts. They are worn together with cut resistant gloves and rated under the same EN 388 scheme.',
    'Choose a length that overlaps the glove cuff so no skin is exposed at the wrist, and match the sleeve’s cut level to the gloves worn with it. Para-aramid sleeves also give some protection against brief contact with heat.',
  ],
  'lined-leather-gloves': [
    'These gloves combine a leather outer with a para-aramid knitted or fabric lining. The leather takes abrasion, sparks and rough handling; the aramid lining adds cut and heat resistance that leather on its own does not give.',
    'They suit welding, fabrication, foundry and maintenance work where an unlined leather glove is not enough but a knitted glove would wear out too quickly. Give the size, cuff length and quantity when you enquire.',
  ],
  'drivers-gloves': [
    'Drivers gloves are close-fitting leather gloves with a short cuff, originally made for drivers and now used wherever a thin leather glove with good feel is needed: loading, assembly, maintenance, rigging and general material handling.',
    'Grain leather is the smooth outer side of the hide: supple, tough and comfortable. Split leather is the inner layer: rougher and well suited to abrasive work. Cow grain is the most common choice; goat grain is softer and thinner for fine work; buffalo grain is heavier and thicker. Split-back styles keep a grain palm for feel with a split leather back.',
    'Sizes on this site run from 7 to 11 or XS to 2XL. Leather stretches slightly with wear, so a snug fit to begin with is normal.',
  ],
  'canadian-gloves': [
    'Canadian gloves, also known as leather palm gloves, pair a leather palm with a fabric back, usually cotton drill, and a canvas or rubberised cuff. The fabric back keeps the hand cooler and the glove lighter than an all-leather glove, while the leather palm takes the wear.',
    'A rubberised safety cuff is stiffer, protects the wrist and lets the glove be pulled off quickly; a canvas cuff is lighter and more flexible. They are a common choice for construction, loading, scrap handling and general industrial work.',
  ],
  'welders-gloves': [
    'Welders gloves are gauntlet-style leather gloves with long cuffs that protect the wrist and lower arm from spatter, sparks and radiant heat. Mechanical protection is rated under EN 388 and heat under EN 407; each product page explains the figures.',
    'Thick split leather is tolerant of heat and spatter for stick (MMA) and MIG welding; grain leather is thinner and gives more feel for TIG work. Choose a 15 cm cuff where spatter reaches the forearm and an 8 cm cuff for lighter work. Lined gloves add insulation for long or heavy welding runs.',
  ],
  'welding-protection': [
    'Beyond gloves, welders need cover for the parts of the body that face the arc and spatter: an apron for the chest and lap, leg guards over the shin and boot, arm guards for the forearms and, for heavy or overhead welding, a full leather jacket and trousers.',
    'Leather does not melt or drip the way synthetic fabrics can. Split leather is the usual choice because it is thick and tolerant of spatter; grain leather is smoother and lighter. Make sure items overlap — sleeves and glove cuffs, apron and trousers — so sparks cannot get in at the joins.',
  ],
  coveralls: [
    'A coverall (boiler suit) covers the body in one piece, so there is no gap at the waist to catch on machinery or let dust in. 100% cotton is breathable and comfortable in heat; poly-cotton blends are harder wearing, shrink less and hold their colour through industrial washing.',
    'Hi-vis coveralls add fluorescent colour and retro-reflective tape, so the wearer can be seen in daylight and in vehicle headlights at night. Give chest size, height and quantity when you enquire so the right sizes can be confirmed.',
  ],
  'jackets-trousers': [
    'Work jackets and trousers are a two-piece alternative to coveralls: easier to put on and take off, easier to wash, and the part that wears out first can be replaced on its own.',
    'Cargo and carpenter trousers add pockets and loops for tools; stretch trousers move with the wearer when kneeling and climbing; bib trousers have a chest piece and braces to stay in place when bending. For roads, yards and anywhere with moving vehicles, choose hi-vis styles with reflective tape.',
  ],
  'shirts-tshirts-vests': [
    'Hi-vis work shirts and vests make the wearer visible to vehicle drivers and machine operators. Fluorescent fabric is what makes them stand out in daylight; retro-reflective tape bounces headlights back at night.',
    'Some styles here quote AS/NZS 1906.4 or EN 471 for day-time visibility, and each product page explains what the rating means. Cotton polo T-shirts suit indoor teams and staff uniforms.',
  ],
  'uniforms-lab-coats': [
    'Uniforms for kitchens, laboratories, clinics and service staff. A traditional chef coat is double-breasted so it can be re-buttoned to hide stains, with thick cotton to protect against heat and splashes; chef pajama trousers are loose and cool for long shifts.',
    'Lab coats are worn over everyday clothes to keep spills and dust off them. A cotton tunic is a simple, short uniform top. Cotton is breathable and stands up to frequent hot washing. Give sizes and quantities when you enquire.',
  ],
  'safety-shoes': [
    'Safety footwear to EN ISO 20345 has a toe cap tested against a 200 joule impact. The class that follows adds features: SB is the basic shoe; S1 adds a closed heel area, antistatic properties and energy absorption in the heel; S2 adds resistance to water penetration; S3 adds a penetration-resistant midsole and a cleated sole.',
    'Under the 2011 version of the standard, slip resistance is marked SRA (tested on ceramic tile with a soap solution), SRB (on steel with glycerine) or SRC (both). The ISI mark is the certification mark of the Bureau of Indian Standards.',
    'Give the shoe size and quantity when you enquire; each product page lists the sizes it comes in.',
  ],
  flanges: [
    'A flange joins pipes, valves, pumps and equipment with a bolted, gasketed joint that can be taken apart for inspection and maintenance. Weld neck flanges have a long tapered hub butt-welded to the pipe and suit high pressure and temperature; slip-on flanges slide over the pipe and are fillet welded; socket weld flanges suit small-bore pipe; threaded (screwed) flanges need no welding; lap joint flanges turn freely for easy bolt alignment; blind flanges close off a pipe end; orifice flanges have tappings for flow measurement; plate flanges are flat discs for lower pressures.',
    'Each flange is made to a standard that fixes its dimensions and bolt pattern — for example ASME B16.5 and B16.47, API 6A, EN 1092, BS 10, IS 6392, JIS, AS 2129 and AWWA C207 — so a flange must match the standard of the flange it bolts to.',
    'When you enquire, give the standard, type, pipe size (NB or NPS), pressure class or rating, facing (raised face, flat face or ring type joint), material and quantity.',
  ],
};
