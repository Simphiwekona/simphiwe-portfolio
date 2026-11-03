import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { WORK, type WorkItem } from '../../core/content';
import { RevealDirective } from '../../core/reveal.directive';
import { SpotlightDirective } from '../../core/spotlight.directive';

type Filter = 'all' | 'project' | 'certification';

interface FilterOption {
  key: Filter;
  label: string;
}

@Component({
  selector: 'app-work',
  imports: [NgIcon, RevealDirective, SpotlightDirective],
  templateUrl: './work.html',
  styleUrl: './work.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkComponent {
  protected readonly filters: FilterOption[] = [
    { key: 'all', label: 'Everything' },
    { key: 'project', label: 'Projects' },
    { key: 'certification', label: 'Certifications' },
  ];

  protected readonly activeFilter = signal<Filter>('all');

  protected readonly items = computed<WorkItem[]>(() => {
    const filter = this.activeFilter();
    return filter === 'all' ? WORK : WORK.filter((item) => item.kind === filter);
  });

  protected readonly counts = computed(() => ({
    all: WORK.length,
    project: WORK.filter((i) => i.kind === 'project').length,
    certification: WORK.filter((i) => i.kind === 'certification').length,
  }));

  protected setFilter(filter: Filter): void {
    this.activeFilter.set(filter);
  }

  protected countFor(filter: Filter): number {
    return this.counts()[filter];
  }
}
