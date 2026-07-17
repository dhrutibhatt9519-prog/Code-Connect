import { DatePipe, CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Opportunity } from '../../../core/models/opportunity.model';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({ selector: 'app-opportunity-card', imports: [RouterLink, DatePipe, CurrencyPipe], templateUrl: './opportunity-card.html', styleUrl: './opportunity-card.scss' })
export class OpportunityCardComponent {
  readonly opportunity = input.required<Opportunity>(); readonly favorites = inject(FavoritesService); private readonly router = inject(Router);
  toggleFavorite(event: Event): void { event.preventDefault(); event.stopPropagation(); this.favorites.toggle(this.opportunity().id); }
  openDetails(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('a, button')) return;
    void this.router.navigate(['/opportunities', this.opportunity().id]);
  }
}
