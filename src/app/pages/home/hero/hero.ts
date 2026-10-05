import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../../core/config/company.config';
import { CatalogService } from '../../../core/services/catalog.service';
import { Icon } from '../../../shared/components/icon/icon';
import { SegmentRing } from '../../../shared/components/segment-ring/segment-ring';

@Component({
  selector: 'bh-hero',
  imports: [RouterLink, SegmentRing, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly catalog = inject(CatalogService);
  readonly company = COMPANY;

  readonly productCount = this.catalog.products.length;
  readonly categoryCount = this.catalog.categories.length;

  /** Products shown in the hero visual — real catalogue items, linked to their pages. */
  readonly centre = computed(() => this.catalog.products.find((p) => p.code === 'LBW/R')!);
  readonly tags = computed(() =>
    [
      { code: 'K300', image: 'hero/k300.webp', pos: 'tag-a' },
      { code: 'SC/CVL-1', image: 'hero/coverall-orange-navy.webp', pos: 'tag-b' },
      { code: 'L228', image: 'hero/l228.webp', pos: 'tag-c' },
    ].map((t) => ({ ...t, product: this.catalog.products.find((p) => p.code === t.code)! })),
  );
}
