import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { PROFILE } from '../../core/content';
import { ScrollSpyService } from '../../core/scroll-spy.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [NgIcon],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly profile = PROFILE;
  protected readonly scrollSpy = inject(ScrollSpyService);
}
