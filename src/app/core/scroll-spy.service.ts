import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, afterNextRender, inject, signal } from '@angular/core';

export type SectionFragment = 'home' | 'about' | 'experience' | 'work' | 'contact';

const FRAGMENTS: SectionFragment[] = ['home', 'about', 'experience', 'work', 'contact'];

/**
 * Tracks which section is currently in view, and handles section navigation.
 *
 * Nav links are real <a href="#fragment"> elements so they stay keyboard
 * accessible and crawlable; this service only adds the smooth-scroll
 * behaviour and the active-section state.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private observer?: IntersectionObserver;

  private readonly activeSignal = signal<SectionFragment>('home');
  readonly active = this.activeSignal.asReadonly();

  /** Tracks how far down the page we are, 0 to 1, for the progress rail. */
  private readonly progressSignal = signal(0);
  readonly progress = this.progressSignal.asReadonly();

  constructor() {
    afterNextRender(() => {
      this.observeSections();
      this.observeProgress();
    });
  }

  scrollTo(fragment: SectionFragment | string, event?: Event): void {
    const target = this.doc.getElementById(fragment);
    if (!target) {
      return;
    }

    event?.preventDefault();

    const prefersReduced =
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    target.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });

    // Keep the hash in sync without triggering the browser's own jump.
    this.doc.defaultView?.history.replaceState(null, '', `#${fragment}`);
    this.activeSignal.set(fragment as SectionFragment);
  }

  private observeSections(): void {
    const sections = FRAGMENTS.map((f) => this.doc.getElementById(f)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (!sections.length || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          this.activeSignal.set(visible[0].target.id as SectionFragment);
        }
      },
      {
        // A thin band near the top of the viewport decides the active section.
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    );

    for (const section of sections) {
      this.observer.observe(section);
    }

    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }

  private observeProgress(): void {
    const view = this.doc.defaultView;
    if (!view) {
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = this.doc.documentElement.scrollHeight - view.innerHeight;
      this.progressSignal.set(scrollable > 0 ? view.scrollY / scrollable : 0);
    };

    const onScroll = () => {
      if (!frame) {
        // rAF-throttled: one read per frame, and only a custom transform is written.
        frame = view.requestAnimationFrame(update);
      }
    };

    view.addEventListener('scroll', onScroll, { passive: true });
    update();

    this.destroyRef.onDestroy(() => {
      view.removeEventListener('scroll', onScroll);
      if (frame) {
        view.cancelAnimationFrame(frame);
      }
    });
  }
}
