import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';

export interface Crumb {
  label: string;
  link?: string | unknown[];
  queryParams?: Record<string, string>;
}

/** Page title band with breadcrumb trail. Extra content can be projected below the title. */
@Component({
  selector: 'bh-page-header',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-header">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ol class="crumbs">
            <li><a routerLink="/">Home</a></li>
            @for (c of crumbs(); track c.label; let last = $last) {
              <li>
                <bh-icon name="chevron-right" />
                @if (c.link && !last) {
                  <a [routerLink]="c.link" [queryParams]="c.queryParams">{{ c.label }}</a>
                } @else {
                  <span [attr.aria-current]="last ? 'page' : null">{{ c.label }}</span>
                }
              </li>
            }
          </ol>
        </nav>
        <div class="title-row">
          <div class="seg-rule" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
          <h1>{{ title() }}</h1>
          @if (intro()) {
            <p class="intro">{{ intro() }}</p>
          }
          <ng-content />
        </div>
      </div>
    </header>
  `,
  styles: `
    .page-header {
      position: relative;
      padding: clamp(28px, 4vw, 48px) 0 clamp(32px, 4vw, 52px);
      background:
        linear-gradient(var(--c-peach-soft), var(--c-peach-soft)) padding-box;
      border-bottom: 1px solid var(--c-line);
      overflow: hidden;
    }
    .crumbs {
      display: flex; flex-wrap: wrap; align-items: center; gap: 4px;
      list-style: none; font-size: var(--fs-sm); color: var(--c-muted);
      margin-bottom: clamp(20px, 3vw, 32px);
    }
    .crumbs li { display: inline-flex; align-items: center; gap: 4px; min-width: 0; }
    .crumbs bh-icon { width: 14px; height: 14px; opacity: 0.6; }
    .crumbs a { color: var(--c-ink-2); }
    .crumbs a:hover { color: var(--c-orange-strong); text-decoration: underline; text-underline-offset: 3px; }
    .crumbs span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60vw; }
    .title-row { display: grid; gap: 14px; max-width: 760px; }
    .intro { color: var(--c-muted); font-size: var(--fs-md); max-width: 640px; }
    h1 { font-size: clamp(2rem, 1.5rem + 2vw, 3rem); }
  `,
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly intro = input('');
  readonly crumbs = input<Crumb[]>([]);
}
