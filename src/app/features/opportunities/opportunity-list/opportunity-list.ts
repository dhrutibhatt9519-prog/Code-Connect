import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Opportunity, OpportunityCategory, OpportunityFormat, SkillLevel } from '../../../core/models/opportunity.model';
import { OpportunityService } from '../../../core/services/opportunity.service';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state';
import { LoadingStateComponent } from '../../../shared/components/loading-state/loading-state';
import { OpportunityCardComponent } from '../opportunity-card/opportunity-card';

type DateFilter = 'All' | 'Upcoming' | 'This Week' | 'This Month'; type PriceFilter = 'All' | 'Free' | 'Under $50' | '$50+'; type SortOption = 'date' | 'price-asc' | 'price-desc' | 'title';
@Component({ selector: 'app-opportunity-list', imports: [ReactiveFormsModule, OpportunityCardComponent, LoadingStateComponent, EmptyStateComponent], templateUrl: './opportunity-list.html', styleUrl: './opportunity-list.scss' })
export class OpportunityListComponent {
  private readonly service = inject(OpportunityService);
  readonly searchControl = new FormControl('', { nonNullable: true }); readonly search = signal(''); readonly opportunities = signal<Opportunity[]>([]); readonly loading = signal(true); readonly error = signal(false);
  readonly category = signal<OpportunityCategory | 'All'>('All'); readonly level = signal<SkillLevel | 'All'>('All'); readonly format = signal<OpportunityFormat | 'All'>('All'); readonly dateFilter = signal<DateFilter>('All'); readonly priceFilter = signal<PriceFilter>('All'); readonly sort = signal<SortOption>('date'); readonly filtersOpen = signal(false);
  readonly categories: Array<OpportunityCategory | 'All'> = ['All','Workshop','Hackathon','Conference','Mentorship','Career Event','Bootcamp','Open Source']; readonly levels: Array<SkillLevel | 'All'> = ['All','Beginner','Intermediate','Advanced']; readonly formats: Array<OpportunityFormat | 'All'> = ['All','Online','In Person','Hybrid'];
  readonly filtered = computed(() => {
    const term = this.search().trim().toLowerCase(); const now = new Date(); const weekEnd = new Date(now); weekEnd.setDate(now.getDate() + 7); const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return [...this.opportunities().filter(item => {
      const searchable = `${item.title} ${item.organizer} ${item.technologies.join(' ')}`.toLowerCase(); const date = new Date(item.startDate); const dateMatch = this.dateFilter() === 'All' || (this.dateFilter() === 'Upcoming' && date >= now) || (this.dateFilter() === 'This Week' && date >= now && date <= weekEnd) || (this.dateFilter() === 'This Month' && date >= now && date < monthEnd);
      const priceMatch = this.priceFilter() === 'All' || (this.priceFilter() === 'Free' && item.startingPrice === 0) || (this.priceFilter() === 'Under $50' && item.startingPrice > 0 && item.startingPrice < 50) || (this.priceFilter() === '$50+' && item.startingPrice >= 50);
      return (!term || searchable.includes(term)) && (this.category() === 'All' || item.category === this.category()) && (this.level() === 'All' || item.level === this.level()) && (this.format() === 'All' || item.format === this.format()) && dateMatch && priceMatch;
    })].sort((a,b) => this.sort() === 'price-asc' ? a.startingPrice-b.startingPrice : this.sort() === 'price-desc' ? b.startingPrice-a.startingPrice : this.sort() === 'title' ? a.title.localeCompare(b.title) : new Date(a.startDate).getTime()-new Date(b.startDate).getTime());
  });
  constructor() { this.searchControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => this.search.set(value)); this.load(); }
  load(): void { this.loading.set(true); this.error.set(false); this.service.getOpportunities().pipe(finalize(() => this.loading.set(false))).subscribe({ next: data => this.opportunities.set(data), error: () => this.error.set(true) }); }
  clearFilters(): void { this.searchControl.setValue(''); this.category.set('All'); this.level.set('All'); this.format.set('All'); this.dateFilter.set('All'); this.priceFilter.set('All'); this.sort.set('date'); }
}
