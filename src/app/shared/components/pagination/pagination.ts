import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Icon } from '../icon/icon';

type PageItem = { type: 'page'; value: number } | { type: 'gap'; key: string };

/** Previous · 1 2 3 … n · Next. Emits the requested page number. */
@Component({
  selector: 'bh-pagination',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (totalPages() > 1) {
      <nav class="pagination" aria-label="Product pages">
        @if (page() > 1) {
          <a class="step" [href]="hrefFor(page() - 1)" (click)="go(page() - 1, $event)" rel="prev" aria-label="Previous page">
            <bh-icon name="chevron-left" />
            <span class="step-label">Previous</span>
          </a>
        } @else {
          <span class="step disabled" aria-disabled="true">
            <bh-icon name="chevron-left" />
            <span class="step-label">Previous</span>
          </span>
        }

        <ol class="pages">
          @for (item of items(); track item.type === 'page' ? item.value : item.key) {
            @if (item.type === 'page') {
              <li>
                <a
                  class="num"
                  [href]="hrefFor(item.value)"
                  [class.active]="item.value === page()"
                  [attr.aria-current]="item.value === page() ? 'page' : null"
                  [attr.aria-label]="'Page ' + item.value"
                  (click)="go(item.value, $event)"
                >
                  {{ item.value }}
                </a>
              </li>
            } @else {
              <li class="gap" aria-hidden="true">…</li>
            }
          }
        </ol>

        @if (page() < totalPages()) {
          <a class="step" [href]="hrefFor(page() + 1)" (click)="go(page() + 1, $event)" rel="next" aria-label="Next page">
            <span class="step-label">Next</span>
            <bh-icon name="chevron-right" />
          </a>
        } @else {
          <span class="step disabled" aria-disabled="true">
            <span class="step-label">Next</span>
            <bh-icon name="chevron-right" />
          </span>
        }
      </nav>
    }
  `,
  styleUrl: './pagination.scss',
})
export class Pagination {
  readonly page = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly pageChange = output<number>();

  /** First, last, and one page either side of the current one; gaps become "…". */
  readonly items = computed<PageItem[]>(() => {
    const total = this.totalPages();
    const current = this.page();
    const pages = new Set<number>([1, total, current, current - 1, current + 1]);
    if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p));
    if (current >= total - 2) [total - 1, total - 2, total - 3].forEach((p) => pages.add(p));
    const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
    const out: PageItem[] = [];
    sorted.forEach((p, i) => {
      if (i > 0 && p - sorted[i - 1] > 1) out.push({ type: 'gap', key: `gap-${p}` });
      out.push({ type: 'page', value: p });
    });
    return out;
  });

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /** Real link for each page, so search engines can follow pagination. */
  hrefFor(p: number): string {
    return this.router.serializeUrl(
      this.router.createUrlTree([], {
        relativeTo: this.route,
        queryParams: { page: p > 1 ? p : null },
        queryParamsHandling: 'merge',
      }),
    );
  }

  /** Plain clicks are handled in-app (smooth scroll); ctrl/cmd-click still opens a new tab. */
  go(p: number, event?: MouseEvent): void {
    if (event && (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)) return;
    event?.preventDefault();
    if (p >= 1 && p <= this.totalPages() && p !== this.page()) this.pageChange.emit(p);
  }
}
