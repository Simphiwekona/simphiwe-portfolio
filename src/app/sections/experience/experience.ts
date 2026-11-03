import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EDUCATION, EXPERIENCE } from '../../core/content';
import { RevealDirective } from '../../core/reveal.directive';
import { SpotlightDirective } from '../../core/spotlight.directive';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective, SpotlightDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  protected readonly experience = EXPERIENCE;
  protected readonly education = EDUCATION;
}
