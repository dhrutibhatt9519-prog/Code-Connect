import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import { Opportunity } from '../models/opportunity.model';

@Injectable({ providedIn: 'root' })
export class OpportunityService {
  private readonly http = inject(HttpClient);

  getOpportunities(): Observable<Opportunity[]> {
    return this.http.get<Opportunity[]>(`${API_BASE_URL}/opportunities`);
  }

  getOpportunity(id: string): Observable<Opportunity> {
    return this.http.get<Opportunity>(`${API_BASE_URL}/opportunities/${id}`);
  }
}
