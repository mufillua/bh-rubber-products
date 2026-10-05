import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../../core/models/product.model';
import { CatalogService } from '../../../core/services/catalog.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'bh-category-card',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="card" [routerLink]="['/products']" [queryParams]="{ category: category().slug }">
      <span class="thumb">
        <img [src]="category().image" alt="" width="640" height="640" loading="lazy" decoding="async" />
      </span>
      <span class="body">
        <span class="name">{{ category().name }}</span>
        <span class="desc">{{ category().description }}</span>
        <span class="meta">
          <span class="count">{{ count() }} {{ count() === 1 ? 'product' : 'products' }}</span>
          <span class="go">View products <bh-icon name="chevron-right" /></span>
        </span>
      </span>
    </a>
  `,
  styleUrl: './category-card.scss',
})
export class CategoryCard {
  private readonly catalog = inject(CatalogService);
  readonly category = input.required<Category>();
  readonly count = computed(() => this.catalog.countFor(this.category().slug));
}
