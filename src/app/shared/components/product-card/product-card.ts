import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { CatalogService } from '../../../core/services/catalog.service';
import { EnquiryService } from '../../../core/services/enquiry.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'bh-product-card',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.--i]': 'index()' },
  template: `
    <article class="card">
      <a class="media" [routerLink]="['/products', product().slug]" tabindex="-1" aria-hidden="true">
        <img
          [src]="product().image"
          [alt]="product().name"
          width="640"
          height="640"
          loading="lazy"
          decoding="async"
        />
        @if (product().code) {
          <span class="code-tag">{{ product().code }}</span>
        }
      </a>
      <div class="body">
        <p class="category">{{ categoryName() }}</p>
        <h3 class="name">
          <a [routerLink]="['/products', product().slug]">{{ product().name }}</a>
        </h3>
        <p class="summary">{{ product().shortDescription }}</p>
        <div class="actions">
          <a class="view" [routerLink]="['/products', product().slug]" [attr.aria-label]="'View product: ' + product().name">
            View product
            <bh-icon name="chevron-right" />
          </a>
          <a
            class="enquire"
            [href]="whatsapp()"
            target="_blank"
            rel="noopener"
            [attr.aria-label]="'Enquire on WhatsApp about ' + product().name"
            title="Enquire on WhatsApp"
          >
            <bh-icon name="whatsapp" />
          </a>
        </div>
      </div>
    </article>
  `,
  styleUrl: './product-card.scss',
})
export class ProductCard {
  private readonly catalog = inject(CatalogService);
  private readonly enquiry = inject(EnquiryService);

  readonly product = input.required<Product>();
  /** Position in the grid, used to stagger the entrance animation. */
  readonly index = input(0);

  readonly categoryName = computed(() => this.catalog.getCategory(this.product().category)?.name ?? '');
  readonly whatsapp = computed(() => this.enquiry.productWhatsapp(this.product()));
}
