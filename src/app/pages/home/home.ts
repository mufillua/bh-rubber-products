import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { SeoService } from '../../core/services/seo.service';
import { CategoryCard } from '../../shared/components/category-card/category-card';
import { CtaSection } from '../../shared/components/cta-section/cta-section';
import { Icon } from '../../shared/components/icon/icon';
import { ProductGrid } from '../../shared/components/product-grid/product-grid';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Hero } from './hero/hero';

@Component({
  selector: 'bh-home',
  imports: [RouterLink, Hero, CategoryCard, ProductGrid, CtaSection, Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly catalog = inject(CatalogService);
  readonly featured = this.catalog.featured(8);
  readonly divisions = this.catalog.divisions.map((d) => ({
    ...d,
    categories: this.catalog.categoriesIn(d.slug),
  }));

  readonly steps = [
    { title: 'Find the product', text: 'Browse by category or search by product name or code.' },
    { title: 'Check the details', text: 'Each product page lists construction, materials, sizes and stated ratings.' },
    { title: 'Send an enquiry', text: 'Tap WhatsApp or email — the product name and code are filled in for you.' },
  ];

  constructor() {
    inject(SeoService).set({ path: '/' });
  }
}
