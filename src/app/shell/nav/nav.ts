import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { PROFILE, NAV } from '../../core/content';
import { ScrollSpyService } from '../../core/scroll-spy.service';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-nav',
  imports: [NgIcon],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class NavComponent {
  protected readonly profile = PROFILE;
  protected readonly nav = NAV;

  protected readonly scrollSpy = inject(ScrollSpyService);
  protected readonly theme = inject(ThemeService);

  protected readonly menuOpen = signal(false);

  private readonly firstLink = viewChild<ElementRef<HTMLAnchorElement>>('firstLink');

  /** Desktop nav hides the link that matches the section you are already in. */
  protected readonly isActive = (fragment: string) => this.scrollSpy.active() === fragment;

  protected readonly progressStyle = computed(
    () => `scaleX(${Math.min(Math.max(this.scrollSpy.progress(), 0), 1)})`,
  );

  toggleMenu(): void {
    const next = !this.menuOpen();
    this.menuOpen.set(next);
    this.lockScroll(next);
  }

  closeMenu(): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    this.lockScroll(false);
  }

  goTo(fragment: string, event: Event): void {
    const wasOpen = this.menuOpen();
    this.closeMenu();
    this.scrollSpy.scrollTo(fragment, event);

    if (wasOpen) {
      // Return focus to the page, not to the now-hidden overlay.
      (document.activeElement as HTMLElement | null)?.blur();
    }
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  private lockScroll(locked: boolean): void {
    document.documentElement.classList.toggle('overflow-hidden', locked);
  }
}
