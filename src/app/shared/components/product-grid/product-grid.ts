import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProductCard } from '../product-card/product-card';

/** Responsive grid of product cards: 2 columns on phones, auto-fill from 640px. */
@Component({
  selector: 'bh-product-grid',
  imports: [ProductCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="product-grid" role="list">
      @for (p of products(); track p.id; let i = $index) {
        <li><bh-product-card [product]="p" [index]="i" /></li>
      }
    </ul>
  `,
  styles: `
    :host { display: block; }
    ul { list-style: none; }
    li { display: flex; min-width: 0; }
    li > * { flex: 1; }
  `,
})
export class ProductGrid {
  readonly products = input.required<readonly Product[]>();
}
