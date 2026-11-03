import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavComponent } from './shell/nav/nav';
import { HeroComponent } from './sections/hero/hero';
import { AboutComponent } from './sections/about/about';
import { ExperienceComponent } from './sections/experience/experience';
import { WorkComponent } from './sections/work/work';
import { ContactComponent } from './sections/contact/contact';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    NavComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    WorkComponent,
    ContactComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  constructor() {
    // Re-apply the persisted theme so the class matches the pre-paint script
    // in index.html once Angular takes over the DOM.
    inject(ThemeService).init();
  }
}
