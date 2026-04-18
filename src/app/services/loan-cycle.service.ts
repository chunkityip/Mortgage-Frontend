import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanCycle } from '../types/loan-cycle.type';

@Injectable({ providedIn: 'root' })
export class LoanCycleService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<LoanCycle[]> {
    throw new Error('Not implemented');
  }

  getActive(): Observable<LoanCycle> {
    throw new Error('Not implemented');
  }

  getById(id: number): Observable<LoanCycle> {
    throw new Error('Not implemented');
  }

  lock(id: number, username: string): Observable<void> {
    throw new Error('Not implemented');
  }
}
