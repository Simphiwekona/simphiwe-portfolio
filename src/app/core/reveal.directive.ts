import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Scroll entry animation driver.
 *
 * Uses IntersectionObserver rather than window scroll listeners, which would
 * cause continuous reflows and tank mobile performance. The visual transition
 * itself lives in the `.reveal` class in styles.scss so that only transform,
 * opacity and filter are animated (no layout-triggering properties).
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnInit, OnDestroy {
  /** Stagger offset in milliseconds, applied via the --reveal-delay custom property. */
  @Input() revealDelay = 0;

  /** Fires once, then unobserves. Set false to keep re-animating on every re-entry. */
  @Input() revealOnce = true;

  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const el = this.host.nativeElement as HTMLElement;
    el.classList.add('reveal');

    if (this.revealDelay > 0) {
      el.style.setProperty('--reveal-delay', `${this.revealDelay}ms`);
    }

    // Respect the user's motion preference: show immediately, never animate.
    const prefersReduced =
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            if (this.revealOnce) {
              this.observer?.unobserve(el);
            }
          } else if (!this.revealOnce) {
            el.classList.remove('is-visible');
          }
        }
      },
      {
        // Trigger slightly before the element is fully on screen so the
        // animation resolves as it settles into view.
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.08,
      },
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
