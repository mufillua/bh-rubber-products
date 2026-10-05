import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { COMPANY } from '../../core/config/company.config';
import { EnquiryService } from '../../core/services/enquiry.service';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'bh-header',
  imports: [RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.scrolled]': 'scrolled()',
    '[class.menu-open]': 'menuOpen()',
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'closeMenu()',
  },
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly company = COMPANY;
  readonly enquiry = inject(EnquiryService);
  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  readonly links = [
    { label: 'Products', path: '/products', exact: false },
    { label: 'Categories', path: '/categories', exact: true },
    { label: 'About Us', path: '/about', exact: true },
  ];

  constructor() {
    const doc = inject(DOCUMENT);
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => this.menuOpen.set(false));

    // Lock page scroll behind the mobile menu
    effect(() => doc.body.style.setProperty('overflow', this.menuOpen() ? 'hidden' : ''));
  }

  onScroll(): void {
    const s = window.scrollY > 8;
    if (s !== this.scrolled()) this.scrolled.set(s);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
