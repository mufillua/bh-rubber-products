import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, skip } from 'rxjs';
import { CategorySlug } from '../../core/models/product.model';
import { CatalogService, SortOption } from '../../core/services/catalog.service';
import { SeoService } from '../../core/services/seo.service';
import { Icon } from '../../shared/components/icon/icon';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { Pagination } from '../../shared/components/pagination/pagination';
import { ProductGrid } from '../../shared/components/product-grid/product-grid';

/** Exactly 12 products per page, as specified. */
export const PAGE_SIZE = 12;

const SORTS: { value: SortOption; label: string }[] = [
  { value: 'catalogue', label: 'Catalogue order' },
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'code', label: 'Product code' },
];

@Component({
  selector: 'bh-products',
  imports: [RouterLink, PageHeader, ProductGrid, Pagination, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  readonly catalog = inject(CatalogService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly resultsTop = viewChild<ElementRef<HTMLElement>>('resultsTop');

  readonly sorts = SORTS;
  readonly divisions = this.catalog.divisions.map((d) => ({ ...d, categories: this.catalog.categoriesIn(d.slug) }));
  readonly totalCount = this.catalog.products.length;

  /* ---------- State, read from the URL so it survives refresh / back ---------- */
  private readonly params = toSignal(this.route.queryParamMap, { requireSync: true });

  readonly query = computed(() => (this.params().get('q') ?? '').trim());
  readonly categorySlug = computed<CategorySlug | null>(() => {
    const c = this.params().get('category');
    return this.catalog.isCategory(c) ? c : null;
  });
  readonly category = computed(() => this.catalog.getCategory(this.categorySlug()));
  readonly sort = computed<SortOption>(() => {
    const s = this.params().get('sort') as SortOption | null;
    return SORTS.some((o) => o.value === s) ? s! : 'catalogue';
  });

  readonly results = computed(() =>
    this.catalog.query({ search: this.query(), category: this.categorySlug(), sort: this.sort() }),
  );
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.results().length / PAGE_SIZE)));
  readonly page = computed(() => {
    const n = Number.parseInt(this.params().get('page') ?? '1', 10);
    return Number.isFinite(n) ? Math.min(Math.max(1, n), this.totalPages()) : 1;
  });
  readonly pageItems = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.results().slice(start, start + PAGE_SIZE);
  });
  readonly rangeStart = computed(() => (this.results().length ? (this.page() - 1) * PAGE_SIZE + 1 : 0));
  readonly rangeEnd = computed(() => Math.min(this.page() * PAGE_SIZE, this.results().length));

  /* ---------- Search box (debounced into the URL) ---------- */
  readonly searchTerm = signal(this.query());
  private lastSentQuery = this.query();

  readonly filtersOpen = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);

    toObservable(this.searchTerm)
      .pipe(
        skip(1),
        map((v) => v.trim()),
        debounceTime(250),
        distinctUntilChanged(),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe((q) => {
        this.lastSentQuery = q;
        this.update({ q: q || null }, true);
      });

    // If the URL query changes from outside the box (back button, links), mirror it.
    effect(() => {
      const q = this.query();
      untracked(() => {
        if (q !== this.lastSentQuery) {
          this.lastSentQuery = q;
          this.searchTerm.set(q);
        }
      });
    });

    effect(() => {
      const cat = this.category();
      const page = this.page();
      untracked(() =>
        this.seo.set({
          title: cat ? cat.name : 'Products',
          description: cat
            ? `${cat.name} from B H Rubber Products: ${cat.description}`
            : `Browse the B H Rubber Products catalogue of ${this.totalCount} industrial gloves, protective sleeves, welding protection, workwear and flanges.`,
          path: '/products' + (cat ? `?category=${cat.slug}` : '') + (page > 1 ? `${cat ? '&' : '?'}page=${page}` : ''),
        }),
      );
    });
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  clearSearch(input?: HTMLInputElement): void {
    this.searchTerm.set('');
    this.lastSentQuery = '';
    this.update({ q: null }, true);
    input?.focus();
  }

  setSort(value: string): void {
    this.update({ sort: value === 'catalogue' ? null : value }, true);
  }

  toggleFilters(): void {
    this.filtersOpen.update((v) => !v);
  }

  goToPage(p: number): void {
    this.update({ page: p > 1 ? p : null }, false, false);
    const el = this.resultsTop()?.nativeElement;
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  }

  resetAll(): void {
    this.searchTerm.set('');
    this.lastSentQuery = '';
    this.router.navigate([], { relativeTo: this.route, queryParams: {} });
  }

  /** Merge params into the URL. Filter/search changes always reset to page 1. */
  private update(patch: Params, resetPage: boolean, replaceUrl = true): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: resetPage ? { ...patch, page: null } : patch,
      queryParamsHandling: 'merge',
      replaceUrl,
    });
  }
}
