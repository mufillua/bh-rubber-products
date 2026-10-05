import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { SeoService } from '../../core/services/seo.service';
import { Icon } from '../../shared/components/icon/icon';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { CtaSection } from '../../shared/components/cta-section/cta-section';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'bh-categories',
  imports: [RouterLink, PageHeader, Icon, CtaSection, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bh-page-header
      title="Categories"
      [intro]="catalog.categories.length + ' categories, grouped into gloves, leather protection, workwear and flanges. Choose one to see every product in it.'"
      [crumbs]="[{ label: 'Categories' }]"
    />

    <div class="container body">
      @for (d of divisions; track d.slug) {
        <section class="division" [attr.aria-labelledby]="'div-' + d.slug">
          <header class="div-head" bhReveal>
            <h2 [id]="'div-' + d.slug">{{ d.name }}</h2>
            <p>{{ d.description }}</p>
          </header>
          <ul class="tiles" role="list">
            @for (c of d.categories; track c.slug; let i = $index) {
              <li bhReveal [revealDelay]="i * 60">
                <a class="tile" routerLink="/products" [queryParams]="{ category: c.slug }">
                  <span class="tile-img">
                    <img [src]="c.image" alt="" width="640" height="640" loading="lazy" decoding="async" />
                  </span>
                  <span class="tile-body">
                    <span class="tile-top">
                      <span class="tile-name">{{ c.name }}</span>
                      <span class="tile-count">{{ catalog.countFor(c.slug) }}</span>
                    </span>
                    <span class="tile-desc">{{ c.description }}</span>
                    <span class="tile-go">View products <bh-icon name="chevron-right" /></span>
                  </span>
                </a>
              </li>
            }
          </ul>
        </section>
      }
    </div>

    <bh-cta-section />
  `,
  styleUrl: './categories.scss',
})
export class Categories {
  readonly catalog = inject(CatalogService);
  readonly divisions = this.catalog.divisions.map((d) => ({ ...d, categories: this.catalog.categoriesIn(d.slug) }));

  constructor() {
    inject(SeoService).set({
      title: 'Categories',
      description:
        'Browse B H Rubber Products by category: knitted, cut resistant and heat resistant gloves, leather drivers, Canadian and welders gloves, welding protection, workwear and flanges.',
      path: '/categories',
    });
  }
}
