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
import { COMPANY } from '../../core/config/company.config';
import { CATEGORY_GUIDES } from '../../data/category-guides.data';
import { CatalogService, SortOption } from '../../core/services/catalog.service';
import { SeoService, breadcrumbLd } from '../../core/services/seo.service';
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
  /** Category from the path on /categories/:slug (null on /products). */
  private readonly pathSlug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug'))), { requireSync: true });
  /** True on /categories/<slug> when the slug isn't a real category. */
  readonly unknownCategory = computed(() => !!this.pathSlug() && !this.catalog.isCategory(this.pathSlug()));

  readonly query = computed(() => (this.params().get('q') ?? '').trim());
  readonly categorySlug = computed<CategorySlug | null>(() => {
    const c = this.pathSlug();
    return this.catalog.isCategory(c) ? c : null;
  });
  readonly category = computed(() => this.catalog.getCategory(this.categorySlug()));
  /**
   * Every product in the category as plain links, shown when the category runs to more than one
   * page. Pages 2+ of the grid only exist once JavaScript runs, so without this list those
   * products would have no link in the prerendered HTML that search engines read first.
   */
  readonly categoryIndex = computed(() => {
    const c = this.category();
    if (!c || this.query()) return null;
    const items = this.catalog.products.filter((p) => p.category === c.slug);
    return items.length > PAGE_SIZE ? items : null;
  });

  /** Buying guide under the grid: category pages only, first page, not while searching. */
  readonly guide = computed(() => {
    const c = this.category();
    return c && this.page() === 1 && !this.query() ? CATEGORY_GUIDES[c.slug] : null;
  });

  /** Page intro: category description plus where it's supplied from (useful to visitors and search engines). */
  readonly intro = computed(() => {
    if (this.unknownCategory()) return 'That category doesn’t exist. Browse all products or pick a category below.';
    const cat = this.category();
    return cat
      ? `${cat.description} Supplied from Clive Row, Kolkata — enquire on WhatsApp or email for availability and pricing.`
      : 'Industrial gloves, protective sleeves, welding protection, workwear, safety shoes and flanges, supplied from Clive Row, Kolkata. Search by name, code or standard, or narrow down by category.';
  });
  readonly sort = computed<SortOption>(() => {
    const s = this.params().get('sort') as SortOption | null;
    return SORTS.some((o) => o.value === s) ? s! : 'catalogue';
  });

  readonly results = computed(() =>
    this.unknownCategory()
      ? []
      : this.catalog.query({ search: this.query(), category: this.categorySlug(), sort: this.sort() }),
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
        // Skip if this value is already in the URL (or was just cleared by a button),
        // otherwise a late debounce could undo a navigation the visitor just made.
        if (q === this.lastSentQuery) return;
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

    // Old links like /products?category=flanges now live at /categories/flanges.
    const legacy = this.route.snapshot.queryParamMap.get('category');
    if (!this.pathSlug() && this.catalog.isCategory(legacy)) {
      this.router.navigate(['/categories', legacy], {
        queryParams: { category: null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    }

    effect(() => {
      const cat = this.category();
      const page = this.page();
      const searching = !!this.query();
      const unknown = this.unknownCategory();
      untracked(() => {
        if (unknown) {
          this.seo.set({ title: 'Category not found', path: `/categories/${this.pathSlug()}`, noindex: true });
          return;
        }
        const base = cat ? `/categories/${cat.slug}` : '/products';
        const crumbs = [
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          ...(cat ? [{ name: cat.name, path: base }] : []),
        ];
        this.seo.set({
          title: cat
            ? cat.seoTitle + (page > 1 ? ` — Page ${page}` : '')
            : 'Safety Gloves, Safety Shoes, Workwear & Flanges — All Products' + (page > 1 ? ` — Page ${page}` : ''),
          description: cat
            ? cat.seoDescription.replace('{phone}', COMPANY.phoneDisplay)
            : `${this.totalCount} products: safety gloves (cut resistant, leather, welding), safety shoes, coveralls, workwear and MS/SS flanges. Kolkata supplier — WhatsApp for a quote.`,
          path: base + (page > 1 ? `?page=${page}` : ''),
          image: cat?.image,
          // Internal search results shouldn't be indexed; the products themselves are.
          noindex: searching,
          jsonLd: [breadcrumbLd(crumbs)],
        });
      });
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
    this.router.navigate(['/products']);
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
