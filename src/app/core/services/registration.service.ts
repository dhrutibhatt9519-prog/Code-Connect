import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import { CreateRegistration, Registration, RegistrationStatus } from '../models/registration.model';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private readonly http = inject(HttpClient);

  getForUser(userId: string): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${API_BASE_URL}/registrations`, { params: { userId } });
  }

  create(registration: CreateRegistration): Observable<Registration> {
    return this.http.post<Registration>(`${API_BASE_URL}/registrations`, registration);
  }

  updateStatus(id: string, status: RegistrationStatus): Observable<Registration> {
    return this.http.patch<Registration>(`${API_BASE_URL}/registrations/${id}`, { status });
  }
}
