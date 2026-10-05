import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet, Scroll } from '@angular/router';
import { filter } from 'rxjs';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <bh-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <bh-footer />
  `,
  styles: `
    :host { display: flex; flex-direction: column; min-height: 100dvh; }
    main { flex: 1; outline: none; }
  `,
})
export class App {
  private readonly router = inject(Router);
  private readonly scroller = inject(ViewportScroller);
  private lastPath = '';

  constructor() {
    // Scroll to top on a real page change; restore position on back/forward;
    // leave the scroll alone when only query params change (search, filters).
    this.router.events
      .pipe(
        filter((e): e is Scroll => e instanceof Scroll),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe((e) => {
        // Skipped navigations (link to the current URL) carry no URL to compare
        if (!(e.routerEvent instanceof NavigationEnd)) return;
        const path = e.routerEvent.urlAfterRedirects.split(/[?#]/)[0];
        const pathChanged = path !== this.lastPath;
        this.lastPath = path;
        if (e.position) {
          setTimeout(() => this.scroller.scrollToPosition(e.position!), 30);
        } else if (e.anchor) {
          this.scroller.scrollToAnchor(e.anchor);
        } else if (pathChanged) {
          this.scroller.scrollToPosition([0, 0]);
        }
      });
  }
}
