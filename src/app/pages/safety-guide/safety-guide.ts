import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../core/config/company.config';
import { CatalogService } from '../../core/services/catalog.service';
import { SeoService, breadcrumbLd } from '../../core/services/seo.service';
import { CtaSection } from '../../shared/components/cta-section/cta-section';
import { PageHeader } from '../../shared/components/page-header/page-header';

interface Link {
  label: string;
  path: string;
}

/**
 * /industrial-safety-products — a guide to industrial safety products and PPE that answers the
 * questions people search ("what are industrial safety products", "7 types of PPE", "type 5 and 6
 * coverall", "safety rules in industry") and links each answer to the matching catalogue pages.
 * General background only: no prices, certifications or claims about the business.
 */
@Component({
  selector: 'bh-safety-guide',
  imports: [RouterLink, PageHeader, CtaSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './safety-guide.html',
  styleUrl: './safety-guide.scss',
})
export class SafetyGuide {
  readonly company = COMPANY;
  private readonly catalog = inject(CatalogService);
  readonly productCount = this.catalog.products.length;

  readonly ppeTypes: { name: string; against: string; examples: string; links: Link[] }[] = [
    {
      name: 'Head protection',
      against: 'Falling objects and knocks to the head.',
      examples: 'Safety helmets, bump caps.',
      links: [],
    },
    {
      name: 'Eye and face protection',
      against: 'Flying particles, chemical splashes, and the bright light and spatter of welding.',
      examples: 'Safety glasses, goggles, face shields, welding shields.',
      links: [],
    },
    {
      name: 'Hearing protection',
      against: 'Loud, continuous noise from machinery.',
      examples: 'Ear plugs, ear muffs.',
      links: [],
    },
    {
      name: 'Respiratory protection',
      against: 'Dust, fumes, mists and gases.',
      examples: 'Dust masks, respirators.',
      links: [],
    },
    {
      name: 'Hand and arm protection',
      against: 'Cuts, abrasion, punctures, hot surfaces, sparks and spatter.',
      examples: 'Safety gloves, welding gauntlets, arm sleeves.',
      links: [
        { label: 'Knitted gloves', path: '/categories/knitted-gloves' },
        { label: 'Cut resistant gloves', path: '/categories/cut-resistant-gloves' },
        { label: 'Heat resistant gloves', path: '/categories/heat-resistant-gloves' },
        { label: 'Leather drivers gloves', path: '/categories/drivers-gloves' },
        { label: 'Canadian gloves', path: '/categories/canadian-gloves' },
        { label: 'Welding gloves', path: '/categories/welders-gloves' },
        { label: 'Arm sleeves', path: '/categories/protective-sleeves' },
      ],
    },
    {
      name: 'Foot and leg protection',
      against: 'Heavy objects falling on the feet, slips, and welding spatter on the shins.',
      examples: 'Safety shoes and boots, leg guards.',
      links: [
        { label: 'Safety shoes', path: '/categories/safety-shoes' },
        { label: 'Leg guards', path: '/categories/welding-protection' },
      ],
    },
    {
      name: 'Body protection',
      against: 'Heat, sparks, dirt and grease, and not being seen near moving vehicles.',
      examples: 'Coveralls, aprons, welding jackets, hi-vis jackets, shirts and vests.',
      links: [
        { label: 'Coveralls', path: '/categories/coveralls' },
        { label: 'Welding aprons & jackets', path: '/categories/welding-protection' },
        { label: 'Safety jackets', path: '/categories/jackets-trousers' },
        { label: 'Hi-vis shirts & vests', path: '/categories/shirts-tshirts-vests' },
        { label: 'Lab coats & uniforms', path: '/categories/uniforms-lab-coats' },
      ],
    },
  ];

  readonly equipment: { name: string; use: string; link?: Link }[] = [
    { name: 'Safety helmet', use: 'protects the head from falling objects on sites and in plants.' },
    { name: 'Safety glasses or goggles', use: 'keep flying particles and splashes out of the eyes.' },
    { name: 'Face or welding shield', use: 'covers the whole face from spatter, sparks and arc light.' },
    { name: 'Ear plugs or ear muffs', use: 'cut the noise reaching the ears around loud machinery.' },
    { name: 'Dust mask or respirator', use: 'filters dust, fumes or gases out of the air you breathe.' },
    {
      name: 'Safety gloves',
      use: 'knitted, cut resistant, heat resistant, leather and welding gloves for the hands.',
      link: { label: 'Browse gloves', path: '/categories/cut-resistant-gloves' },
    },
    {
      name: 'Safety shoes',
      use: 'a steel toe cap against falling objects, and a slip-resistant sole.',
      link: { label: 'Browse safety shoes', path: '/categories/safety-shoes' },
    },
    {
      name: 'Coverall',
      use: 'a one-piece suit that keeps dirt, grease and sparks off the body.',
      link: { label: 'Browse coveralls', path: '/categories/coveralls' },
    },
    {
      name: 'Hi-vis vest or jacket',
      use: 'fluorescent fabric and reflective tape so the wearer is seen by drivers.',
      link: { label: 'Browse hi-vis wear', path: '/categories/shirts-tshirts-vests' },
    },
    { name: 'Safety harness', use: 'stops a fall when working at height.' },
  ];

  readonly hazards: { hazard: string; protection: string; link: Link }[] = [
    {
      hazard: 'Cuts from sheet metal, glass, blades and sharp castings',
      protection: 'Cut resistant gloves and arm sleeves. EN 388 is the rating to check.',
      link: { label: 'Cut resistant gloves', path: '/categories/cut-resistant-gloves' },
    },
    {
      hazard: 'Handling hot parts and hot surfaces',
      protection: 'Heat resistant gloves. EN 407 is the rating to check, especially contact heat.',
      link: { label: 'Heat resistant gloves', path: '/categories/heat-resistant-gloves' },
    },
    {
      hazard: 'Welding sparks, spatter and radiant heat',
      protection: 'Leather welding gloves, aprons, jackets, arm guards and leg guards.',
      link: { label: 'Welding protection', path: '/categories/welding-protection' },
    },
    {
      hazard: 'Abrasion, splinters and rough material handling',
      protection: 'Leather drivers gloves and Canadian (leather palm) gloves.',
      link: { label: 'Leather drivers gloves', path: '/categories/drivers-gloves' },
    },
    {
      hazard: 'Heavy objects falling on the feet',
      protection: 'Steel toe safety shoes to EN ISO 20345, with a 200 J toe cap.',
      link: { label: 'Safety shoes', path: '/categories/safety-shoes' },
    },
    {
      hazard: 'Vehicles in yards, docks and on roads',
      protection: 'Hi-vis jackets, shirts and vests with reflective tape.',
      link: { label: 'Safety jackets', path: '/categories/jackets-trousers' },
    },
    {
      hazard: 'Dirt, grease and wear on clothing',
      protection: 'Coveralls (boiler suits) and work trousers.',
      link: { label: 'Coveralls', path: '/categories/coveralls' },
    },
  ];

  readonly rules: string[] = [
    'Choose PPE for the hazard, and check its rating — EN 388 for cuts, EN 407 for heat, EN ISO 20345 for safety shoes.',
    'Get the right size. Loose gloves can catch in machinery; tight ones tire the hands and wear through at the fingertips.',
    'Inspect it before every use. Replace gloves with holes or worn palms, and shoes with split soles or an exposed toe cap.',
    'Wear it for the whole job, not just the moments that feel risky.',
    'Make sure items overlap — sleeves and glove cuffs, apron and trousers — so there are no gaps at the wrists or waist.',
    'Keep it clean and store it dry. Dirty hi-vis clothing is much harder to see.',
    'Show people how to wear it and explain why. PPE only works when it is worn properly.',
  ];

  constructor() {
    inject(SeoService).set({
      title: 'Industrial Safety Products & PPE — 7 Types of PPE, Examples and Uses',
      description:
        'What industrial safety products and PPE are, the 7 types of PPE, 10 common pieces of safety equipment, Type 5 and 6 coveralls, and the right protection for each hazard.',
      path: '/industrial-safety-products',
      jsonLd: [
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Industrial Safety Products & PPE', path: '/industrial-safety-products' },
        ]),
      ],
    });
  }
}
