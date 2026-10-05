import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Fades an element up the first time it scrolls into view.
 * Usage: <section bhReveal> or <div bhReveal [revealDelay]="120">
 * Respects prefers-reduced-motion (handled in global CSS).
 */
@Directive({
  selector: '[bhReveal]',
  host: { class: 'reveal', '[style.--reveal-delay]': 'revealDelay()' },
})
export class RevealDirective {
  readonly revealDelay = input(0);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const node = this.el.nativeElement;
      if (!('IntersectionObserver' in window)) {
        node.classList.add('is-visible');
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.classList.add('is-visible');
              io.disconnect();
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      );
      io.observe(node);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
