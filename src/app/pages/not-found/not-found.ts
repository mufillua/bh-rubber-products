import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { SegmentRing } from '../../shared/components/segment-ring/segment-ring';

@Component({
  selector: 'bh-not-found',
  imports: [RouterLink, SegmentRing],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container nf">
      <div class="ring"><bh-segment-ring tone="muted" /></div>
      <div class="copy">
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or has moved. Try the product catalogue instead.</p>
        <div class="actions">
          <a class="btn btn--primary" routerLink="/products">Browse products</a>
          <a class="btn btn--outline" routerLink="/">Go to home page</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .nf { display: grid; gap: 32px; align-items: center; padding-block: clamp(56px, 10vw, 120px); }
    @media (min-width: 800px) { .nf { grid-template-columns: 280px 1fr; gap: 56px; } }
    .ring { width: min(220px, 60%); }
    @media (min-width: 800px) { .ring { width: 100%; } }
    .copy { display: grid; gap: 16px; max-width: 520px; }
    p { color: var(--c-muted); font-size: var(--fs-md); }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; }
  `,
})
export class NotFound {
  constructor() {
    inject(SeoService).set({ title: 'Page not found' });
  }
}
