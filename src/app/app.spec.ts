import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import {
  phosphorArrowUpRightLight,
  phosphorMoonLight,
  phosphorSunLight,
} from '@ng-icons/phosphor-icons/light';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        // The nav renders icons on first paint, so the visual unit test runner
        // needs them registered even though most icons come from app.config.
        provideIcons({ phosphorMoonLight, phosphorSunLight, phosphorArrowUpRightLight }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all five sections', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    for (const id of ['home', 'about', 'experience', 'work', 'contact']) {
      expect(el.querySelector(`#${id}`), `section #${id} should exist`).toBeTruthy();
    }
  });

  it('should render the hero headline', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h1')?.textContent).toContain('Enterprise systems');
  });
});
