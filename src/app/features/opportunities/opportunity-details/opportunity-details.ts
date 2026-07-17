import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { Opportunity } from '../../../core/models/opportunity.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { OpportunityService } from '../../../core/services/opportunity.service';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state';
import { LoadingStateComponent } from '../../../shared/components/loading-state/loading-state';

@Component({ selector: 'app-opportunity-details', imports: [DatePipe, CurrencyPipe, RouterLink, LoadingStateComponent, EmptyStateComponent], templateUrl: './opportunity-details.html', styleUrl: './opportunity-details.scss' })
export class OpportunityDetailsComponent {
  private readonly route = inject(ActivatedRoute); private readonly service = inject(OpportunityService); readonly favorites = inject(FavoritesService);
  readonly opportunity = signal<Opportunity | null>(null); readonly loading = signal(true); readonly error = signal(false);
  constructor() {
    this.route.paramMap.pipe(
      switchMap(params => this.service.getOpportunity(params.get('id') ?? ''))
    ).subscribe({
      next: value => {
        this.opportunity.set(value);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}
