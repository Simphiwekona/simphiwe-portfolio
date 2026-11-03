import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ABOUT_PARAGRAPHS,
  MARQUEE_STACK,
  METRICS,
  PROFILE,
  SKILL_GROUPS,
} from '../../core/content';
import { CountUpDirective } from '../../core/count-up.directive';
import { RevealDirective } from '../../core/reveal.directive';
import { SpotlightDirective } from '../../core/spotlight.directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective, CountUpDirective, SpotlightDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  protected readonly profile = PROFILE;
  protected readonly paragraphs = ABOUT_PARAGRAPHS;
  protected readonly metrics = METRICS;
  protected readonly skillGroups = SKILL_GROUPS;

  /** Duplicated once so the marquee can loop seamlessly at -50%. */
  protected readonly marquee = [...MARQUEE_STACK, ...MARQUEE_STACK];
}
