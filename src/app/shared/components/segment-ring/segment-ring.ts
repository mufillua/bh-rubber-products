import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

interface Segment {
  d: string;
  accent: boolean;
  i: number;
}

const SEGMENTS = 30;
/** Same placement as the logo: three orange blocks at 9 o'clock and three at 3–4 o'clock. */
const ACCENTS = new Set([8, 9, 10, 21, 22, 23]);

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

/**
 * The segmented ring from the B H logo, drawn as SVG so it can be reused
 * at any size as the site's decorative motif. When `animate` is set the
 * segments draw in once, in order, with the orange blocks landing last.
 */
@Component({
  selector: 'bh-segment-ring',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', '[class.animate]': 'animate()', '[class.muted]': 'tone() === "muted"' },
  template: `
    <svg viewBox="0 0 400 400">
      @for (s of segments(); track s.i) {
        <path [attr.d]="s.d" [class.accent]="s.accent" [style.--i]="s.i" />
      }
      @if (innerRing()) {
        <circle cx="200" cy="200" r="148" class="inner" />
      }
    </svg>
  `,
  styles: `
    :host { display: block; aspect-ratio: 1; }
    svg { width: 100%; height: 100%; overflow: visible; }
    path { fill: var(--ring-ink, var(--c-ink)); }
    path.accent { fill: var(--ring-accent, var(--c-orange)); }
    .inner { fill: none; stroke: var(--ring-ink, var(--c-ink)); stroke-width: 14; }
    :host(.muted) path { fill: var(--c-line-strong); }
    :host(.muted) path.accent { fill: var(--c-peach-line); }
    :host(.muted) .inner { stroke: var(--c-line); }

    :host(.animate) path {
      opacity: 0;
      transform-origin: 200px 200px;
      animation: seg-in 420ms var(--ease-out) forwards;
      animation-delay: calc(var(--i) * 22ms + 120ms);
    }
    :host(.animate) path.accent { animation-delay: calc(var(--i) * 22ms + 520ms); }
    :host(.animate) .inner { stroke-dasharray: 930; stroke-dashoffset: 930; animation: ring-draw 1100ms var(--ease-out) 200ms forwards; }

    @keyframes seg-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: none; } }
    @keyframes ring-draw { to { stroke-dashoffset: 0; } }
  `,
})
export class SegmentRing {
  readonly animate = input(false);
  readonly innerRing = input(true);
  readonly tone = input<'brand' | 'muted'>('brand');

  readonly segments = computed<Segment[]>(() => {
    const cx = 200, cy = 200, outer = 196, inner = 166;
    const step = 360 / SEGMENTS;
    const gap = 2.6;
    return Array.from({ length: SEGMENTS }, (_, i) => {
      const a0 = i * step - step / 2 + gap / 2;
      const a1 = i * step + step / 2 - gap / 2;
      const [x1, y1] = polar(cx, cy, outer, a0);
      const [x2, y2] = polar(cx, cy, outer, a1);
      const [x3, y3] = polar(cx, cy, inner, a1);
      const [x4, y4] = polar(cx, cy, inner, a0);
      const f = (n: number) => n.toFixed(2);
      return {
        i,
        accent: ACCENTS.has(i),
        d: `M${f(x1)} ${f(y1)} A${outer} ${outer} 0 0 1 ${f(x2)} ${f(y2)} L${f(x3)} ${f(y3)} A${inner} ${inner} 0 0 0 ${f(x4)} ${f(y4)} Z`,
      };
    });
  });
}
