import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanCycle } from '../types/loan-cycle.type';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LoanCycleService {

  private readonly baseUrl = `${environment.apiUrl}/cycles`;

  constructor(private http: HttpClient) {}

  getAllCycle(): Observable<LoanCycle[]> {
    return this.http.get<LoanCycle[]>(this.baseUrl);
  }

  getCycleActive(): Observable<LoanCycle> {
    return this.http.get<LoanCycle>(`${this.baseUrl}/active`);
  }

  getCycleByCycleId(id: number): Observable<LoanCycle> {
    return this.http.get<LoanCycle>(`${this.baseUrl}/${id}`);
  }

  lockCycle(id: number, username: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/lock`, { username });
  }
}
