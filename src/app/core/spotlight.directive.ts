import { Directive, ElementRef, OnDestroy, inject } from '@angular/core';

/**
 * Tracks the pointer inside the host element and publishes its position as
 * --mx / --my custom properties. The `.spotlight` class in styles.scss reads
 * those to illuminate the card border under the cursor.
 *
 * Writes straight to a CSS custom property, so no change detection runs and
 * no layout is recalculated on pointer move.
 */
@Directive({
  selector: '[appSpotlight]',
  host: {
    '(pointermove)': 'onMove($event)',
    '(pointerleave)': 'onLeave()',
  },
})
export class SpotlightDirective implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private frame = 0;

  onMove(event: PointerEvent): void {
    // Coalesce to one write per frame; pointermove can fire far more often.
    if (this.frame) {
      return;
    }

    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      const el = this.host.nativeElement as HTMLElement;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  }

  onLeave(): void {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
    const el = this.host.nativeElement as HTMLElement;
    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
  }

  ngOnDestroy(): void {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }
}
