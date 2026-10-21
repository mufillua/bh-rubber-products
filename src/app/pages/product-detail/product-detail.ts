import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, untracked } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { COMPANY } from '../../core/config/company.config';
import { Product } from '../../core/models/product.model';
import { CatalogService } from '../../core/services/catalog.service';
import { explainStandards } from '../../core/utils/standards';
import { SeoService, breadcrumbLd } from '../../core/services/seo.service';
import { EmailButton, WhatsappButton } from '../../shared/components/enquiry-buttons/enquiry-buttons';
import { Icon } from '../../shared/components/icon/icon';
import { ProductGrid } from '../../shared/components/product-grid/product-grid';

@Component({
  selector: 'bh-product-detail',
  imports: [RouterLink, WhatsappButton, EmailButton, Icon, ProductGrid],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private readonly catalog = inject(CatalogService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  /** Bound from the :slug route param (withComponentInputBinding). */
  readonly slug = input.required<string>();

  readonly product = computed(() => this.catalog.getBySlug(this.slug()));
  readonly category = computed(() => this.catalog.getCategory(this.product()?.category));
  readonly related = computed(() => {
    const p = this.product();
    return p ? this.catalog.related(p, 4) : [];
  });

  /** Plain-English breakdown of the product's EN 388 / EN 407 / EN ISO 20345 etc. ratings. */
  readonly standardsExplained = computed(() => explainStandards(this.product()?.standards));

  /** Spec rows shown in the table: the product's specifications plus its key facts. */
  readonly specRows = computed(() => {
    const p = this.product();
    if (!p) return [];
    const rows = [...(p.specifications ?? [])];
    if (p.code) rows.unshift({ label: 'Product code', value: p.code });
    rows.splice(p.code ? 1 : 0, 0, { label: 'Category', value: this.category()?.name ?? '' });
    return rows;
  });

  constructor() {
    effect(() => {
      const p = this.product();
      const cat = this.category();
      untracked(() => {
        if (!p) {
          this.seo.set({ title: 'Product not found', path: `/products/${this.slug()}`, noindex: true });
          return;
        }
        const name = p.code ? `${p.name} (${p.code})` : p.name;
        this.seo.set({
          // "Supplier in Kolkata" matches how buyers search; skipped when the name is already long.
          title: name.length <= 42 ? `${name} Supplier in Kolkata` : name,
          description: productMetaDescription(p),
          path: `/products/${p.slug}`,
          image: p.image,
          jsonLd: [
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Products', path: '/products' },
              ...(cat ? [{ name: cat.name, path: `/categories/${cat.slug}` }] : []),
              { name: p.name, path: `/products/${p.slug}` },
            ]),
          ],
        });
      });
    });
  }

  /** Go back to the filtered product list if that's where the visitor came from. */
  back(): void {
    // Angular stamps each in-app navigation with an incrementing id in history.state
    const cameFromSite = (history.state?.navigationId ?? 1) > 1;
    if (cameFromSite) {
      this.location.back();
    } else {
      const cat = this.product()?.category;
      this.router.navigate(cat ? ['/categories', cat] : ['/products']);
    }
  }
}

/**
 * Meta description (the text under the title in Google): what the product is, then where to buy it.
 * Kept to ~160 characters so the call to action isn't cut off.
 */
function productMetaDescription(p: Product): string {
  const cta = ` Kolkata supplier — WhatsApp ${COMPANY.phoneDisplay} for a quote.`;
  const lead = p.code ? `${p.code}: ` : '';
  const room = 160 - cta.length - lead.length;
  let text = p.description.trim();
  if (text.length > room) {
    const firstSentence = text.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? text;
    text = firstSentence.length <= room ? firstSentence : firstSentence.slice(0, room - 1).replace(/[\s,;:–—-]+\S*$/, '') + '…';
  }
  return lead + text + cta;
}

