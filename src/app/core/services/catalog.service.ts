import { Injectable } from '@angular/core';
import { CATEGORIES, DIVISIONS } from '../../data/categories.data';
import { PRODUCTS } from '../../data/products.data';
import { Category, CategorySlug, Division, Product } from '../models/product.model';

export type SortOption = 'catalogue' | 'name' | 'code';

export interface ProductQuery {
  search?: string;
  category?: CategorySlug | null;
  sort?: SortOption;
}

/**
 * Read-only access to the catalogue. Components never import the data
 * files directly — they go through this service.
 */
@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly products: readonly Product[] = PRODUCTS;
  readonly categories: readonly Category[] = CATEGORIES;
  readonly divisions: readonly Division[] = DIVISIONS;

  private readonly bySlug = new Map(PRODUCTS.map((p) => [p.slug, p]));
  private readonly categoryMap = new Map(CATEGORIES.map((c) => [c.slug, c]));
  private readonly counts = PRODUCTS.reduce((acc, p) => {
    acc.set(p.category, (acc.get(p.category) ?? 0) + 1);
    return acc;
  }, new Map<CategorySlug, number>());

  /** Pre-computed lowercase search text per product */
  private readonly haystack = new Map(
    PRODUCTS.map((p) => [
      p.id,
      [
        p.name,
        p.code ?? '',
        this.categoryMap.get(p.category)?.name ?? '',
        p.description,
        p.shortDescription,
        ...(p.materials ?? []),
        ...(p.applications ?? []),
        ...(p.specifications ?? []).map((s) => s.value),
      ]
        .join(' ')
        .toLowerCase(),
    ]),
  );

  getBySlug(slug: string): Product | undefined {
    return this.bySlug.get(slug);
  }

  getCategory(slug: string | null | undefined): Category | undefined {
    return slug ? this.categoryMap.get(slug as CategorySlug) : undefined;
  }

  isCategory(slug: string | null | undefined): slug is CategorySlug {
    return !!slug && this.categoryMap.has(slug as CategorySlug);
  }

  countFor(slug: CategorySlug): number {
    return this.counts.get(slug) ?? 0;
  }

  categoriesIn(division: Division['slug']): Category[] {
    return this.categories.filter((c) => c.division === division);
  }

  featured(limit = 8): Product[] {
    return this.products.filter((p) => p.featured).slice(0, limit);
  }

  related(product: Product, limit = 4): Product[] {
    return this.products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
  }

  query({ search = '', category = null, sort = 'catalogue' }: ProductQuery): Product[] {
    const terms = this.normalise(search).split(' ').filter(Boolean);
    let list = this.products.filter((p) => {
      if (category && p.category !== category) return false;
      if (!terms.length) return true;
      const text = this.normalise(this.haystack.get(p.id) ?? '');
      return terms.every((t) => text.includes(t));
    });
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'code')
      list = [...list].sort((a, b) =>
        (a.code ?? '~').localeCompare(b.code ?? '~', undefined, { numeric: true, sensitivity: 'base' }),
      );
    return list;
  }

  /** Lower-case, and treat punctuation in codes ("L227/B3", "SA-24") as spaces-insensitive. */
  private normalise(value: string): string {
    return value
      .toLowerCase()
      .replace(/[\/\-.]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
