import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, untracked } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { SeoService } from '../../core/services/seo.service';
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
          this.seo.set({ title: 'Product not found', path: `/products/${this.slug()}` });
          return;
        }
        const name = p.code ? `${p.name} (${p.code})` : p.name;
        this.seo.set({
          title: name,
          description: `${p.description} ${cat ? cat.name + ' from' : 'From'} B H Rubber Products — enquire on WhatsApp or email.`,
          path: `/products/${p.slug}`,
          image: p.image,
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
      this.router.navigate(['/products'], { queryParams: { category: this.product()?.category ?? null } });
    }
  }
}
