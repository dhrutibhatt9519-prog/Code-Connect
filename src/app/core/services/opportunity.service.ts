import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_BASE_URL, DEPLOYED_DATA_URL, usesLocalJsonServer } from '../constants/api.constants';
import { Opportunity } from '../models/opportunity.model';

interface SeedDatabase {
  opportunities: Opportunity[];
}

@Injectable({ providedIn: 'root' })
export class OpportunityService {
  private readonly http = inject(HttpClient);

  getOpportunities(): Observable<Opportunity[]> {
    if (usesLocalJsonServer()) {
      return this.http.get<Opportunity[]>(`${API_BASE_URL}/opportunities`);
    }

    return this.http.get<SeedDatabase>(DEPLOYED_DATA_URL).pipe(
      map(database => database.opportunities)
    );
  }

  getOpportunity(id: string): Observable<Opportunity> {
    if (usesLocalJsonServer()) {
      return this.http.get<Opportunity>(`${API_BASE_URL}/opportunities/${id}`);
    }

    return this.http.get<SeedDatabase>(DEPLOYED_DATA_URL).pipe(
      map(database => {
        const opportunity = database.opportunities.find(item => item.id === id);
        if (!opportunity) throw new Error(`Opportunity ${id} was not found`);
        return opportunity;
      })
    );
  }
}
