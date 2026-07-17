import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { API_BASE_URL, DEPLOYED_DATA_URL, usesLocalJsonServer } from '../constants/api.constants';
import { CreateRegistration, Registration, RegistrationStatus } from '../models/registration.model';

interface SeedDatabase {
  registrations: Registration[];
}

const DEPLOYED_REGISTRATIONS_KEY = 'codeconnect-registrations';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private readonly http = inject(HttpClient);

  getForUser(userId: string): Observable<Registration[]> {
    if (usesLocalJsonServer()) {
      return this.http.get<Registration[]>(`${API_BASE_URL}/registrations`, { params: { userId } });
    }

    return this.getDeployedRegistrations().pipe(
      map(registrations => registrations.filter(item => item.userId === userId))
    );
  }

  create(registration: CreateRegistration): Observable<Registration> {
    if (usesLocalJsonServer()) {
      return this.http.post<Registration>(`${API_BASE_URL}/registrations`, registration);
    }

    const created: Registration = { ...registration, id: crypto.randomUUID() };
    return this.getDeployedRegistrations().pipe(
      tap(registrations => this.saveDeployedRegistrations([...registrations, created])),
      map(() => created)
    );
  }

  updateStatus(id: string, status: RegistrationStatus): Observable<Registration> {
    if (usesLocalJsonServer()) {
      return this.http.patch<Registration>(`${API_BASE_URL}/registrations/${id}`, { status });
    }

    return this.getDeployedRegistrations().pipe(
      switchMap(registrations => {
        const existing = registrations.find(item => item.id === id);
        if (!existing) throw new Error(`Registration ${id} was not found`);
        const updated = { ...existing, status };
        this.saveDeployedRegistrations(registrations.map(item => item.id === id ? updated : item));
        return of(updated);
      })
    );
  }

  private getDeployedRegistrations(): Observable<Registration[]> {
    const stored = localStorage.getItem(DEPLOYED_REGISTRATIONS_KEY);
    if (stored) {
      try {
        return of(JSON.parse(stored) as Registration[]);
      } catch {
        localStorage.removeItem(DEPLOYED_REGISTRATIONS_KEY);
      }
    }

    return this.http.get<SeedDatabase>(DEPLOYED_DATA_URL).pipe(
      map(database => database.registrations),
      tap(registrations => this.saveDeployedRegistrations(registrations))
    );
  }

  private saveDeployedRegistrations(registrations: Registration[]): void {
    localStorage.setItem(DEPLOYED_REGISTRATIONS_KEY, JSON.stringify(registrations));
  }
}
