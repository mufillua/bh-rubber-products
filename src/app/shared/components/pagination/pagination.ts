import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
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
        <button
          type="button"
          class="step"
          [disabled]="page() <= 1"
          (click)="go(page() - 1)"
          aria-label="Previous page"
        >
          <bh-icon name="chevron-left" />
          <span class="step-label">Previous</span>
        </button>

        <ol class="pages">
          @for (item of items(); track item.type === 'page' ? item.value : item.key) {
            @if (item.type === 'page') {
              <li>
                <button
                  type="button"
                  class="num"
                  [class.active]="item.value === page()"
                  [attr.aria-current]="item.value === page() ? 'page' : null"
                  [attr.aria-label]="'Page ' + item.value"
                  (click)="go(item.value)"
                >
                  {{ item.value }}
                </button>
              </li>
            } @else {
              <li class="gap" aria-hidden="true">…</li>
            }
          }
        </ol>

        <button
          type="button"
          class="step"
          [disabled]="page() >= totalPages()"
          (click)="go(page() + 1)"
          aria-label="Next page"
        >
          <span class="step-label">Next</span>
          <bh-icon name="chevron-right" />
        </button>
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

  go(p: number): void {
    if (p >= 1 && p <= this.totalPages() && p !== this.page()) this.pageChange.emit(p);
  }
}
