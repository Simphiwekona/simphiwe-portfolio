import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'sk-theme';

/**
 * Theme state for the whole site.
 *
 * Dark is the designed default. Light is a real, fully tokenised mode rather
 * than an inverted afterthought, and the choice is persisted. The initial
 * value is resolved by an inline script in index.html so the correct theme is
 * painted on the first frame without a flash.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly mode = signal<ThemeMode>(this.readInitial());

  readonly current = this.mode.asReadonly();
  readonly isDark = computed(() => this.mode() === 'dark');

  init(): void {
    this.apply(this.mode());
  }

  toggle(): void {
    this.set(this.mode() === 'dark' ? 'light' : 'dark');
  }

  set(next: ThemeMode): void {
    this.mode.set(next);
    this.apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode, hardened browser). Non-fatal.
    }
  }

  private apply(next: ThemeMode): void {
    const root = this.doc.documentElement;
    root.classList.toggle('theme-light', next === 'light');
    root.style.colorScheme = next;
  }

  private readInitial(): ThemeMode {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // Fall through to the system preference.
    }
    return 'dark';
  }
}
