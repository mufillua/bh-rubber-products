import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../core/config/company.config';
import { CatalogService } from '../../core/services/catalog.service';
import { EnquiryService } from '../../core/services/enquiry.service';
import { SeoService } from '../../core/services/seo.service';
import { CtaSection } from '../../shared/components/cta-section/cta-section';
import { Icon, IconName } from '../../shared/components/icon/icon';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'bh-about',
  imports: [RouterLink, PageHeader, Icon, CtaSection, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  readonly company = COMPANY;
  readonly enquiry = inject(EnquiryService);
  private readonly catalog = inject(CatalogService);

  readonly productCount = this.catalog.products.length;
  readonly categoryCount = this.catalog.categories.length;

  /** Collage: one product from each part of the range */
  readonly collage = ['cmas', 'l228', 'lbw-r', 'coverall-grey-black'].map((f) => `products/${f}.webp`);

  readonly features: { icon: IconName; title: string; text: string }[] = [
    {
      icon: 'award',
      title: 'Quality Focus',
      text: 'Every listing sets out its construction, materials, sizes and stated ratings, so you can compare products on the details.',
    },
    {
      icon: 'truck',
      title: 'Reliable Supply',
      text: 'Share your quantities and timelines when you enquire, and we will confirm what we can supply and when.',
    },
    {
      icon: 'layers',
      title: 'Product Range',
      text: `${this.catalog.products.length} products across ${this.catalog.categories.length} categories — from seamless knitted gloves and coveralls to flanges.`,
    },
    {
      icon: 'headset',
      title: 'Customer Support',
      text: 'Reach us by phone, WhatsApp or email, Monday to Saturday, for product questions and quotes.',
    },
  ];

  constructor() {
    inject(SeoService).set({
      title: 'About Us',
      description:
        'B H Rubber Products, 6A Clive Row, Kolkata, supplies industrial gloves, welding protection, workwear and flanges with a focus on quality, reliability and dependable service.',
      path: '/about',
    });
  }
}
