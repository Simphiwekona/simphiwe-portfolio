import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Counts a numeric value up when the host scrolls into view.
 *
 * The host text is split into a leading number and a trailing suffix so that
 * labels like "6+" animate the 6 and keep the "+" intact.
 *
 * The element is given tabular figures by the template to keep the glyph
 * advance identical for every digit, which stops the width from oscillating
 * as the number climbs.
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements OnInit, OnDestroy {
  /** Final value, e.g. "6+" or "12". */
  @Input({ required: true }) appCountUp!: string;

  /** Animation length in milliseconds. */
  @Input() countDuration = 1400;

  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private frame = 0;

  ngOnInit(): void {
    const el = this.host.nativeElement as HTMLElement;
    const { target, suffix, prefix } = this.parse(this.appCountUp);

    const prefersReduced =
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      el.textContent = this.appCountUp;
      return;
    }

    // Hold the final width from the start so nothing reflows mid-count.
    el.textContent = `${prefix}0${suffix}`;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          this.observer?.unobserve(el);
          this.run(el, target, suffix, prefix);
        }
      },
      { threshold: 0.5 },
    );

    this.observer.observe(el);
  }

  private run(el: HTMLElement, target: number, suffix: string, prefix: string): void {
    const start = performance.now();
    // easeOutExpo: fast arrival, long settle. Matches the spring motion used site-wide.
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (now: number) => {
      const progress = Math.min((now - start) / this.countDuration, 1);
      const value = Math.round(ease(progress) * target);
      el.textContent = `${prefix}${value}${suffix}`;

      if (progress < 1) {
        this.frame = requestAnimationFrame(step);
      } else {
        el.textContent = this.appCountUp;
        this.frame = 0;
      }
    };

    this.frame = requestAnimationFrame(step);
  }

  private parse(raw: string): { target: number; suffix: string; prefix: string } {
    const match = raw.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) {
      return { target: 0, suffix: '', prefix: raw };
    }
    return {
      prefix: match[1] ?? '',
      target: Number.parseInt(match[2], 10),
      suffix: match[3] ?? '',
    };
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }
}
