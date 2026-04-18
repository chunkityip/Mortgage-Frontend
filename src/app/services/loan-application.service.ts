import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AuditLog,
  LoanApplication,
  LoanStatus,
} from '../types/loan-application.type';

@Injectable({ providedIn: 'root' })
export class LoanApplicationService {

  private readonly baseUrl = `${environment.apiUrl}/loans`;

  constructor(private http: HttpClient) {}

  createLoan(dto: LoanApplication): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(this.baseUrl, dto);
  }

  updateLoan(id: number, dto: LoanApplication, username: string): Observable<LoanApplication> {
    return this.http.put<LoanApplication>(`{this.baseUrl}$/{id}}`, dto);
  }

  deleteLaon(id: number, username: string): Observable<void> {
    return this.http.delete<void>(`{this.baseUrl}/${id}`);
  }

  getById(id: number): Observable<LoanApplication> {
    throw new Error('Not implemented');
  }

  getAll(status?: LoanStatus): Observable<LoanApplication[]> {
    throw new Error('Not implemented');
  }

  myApplications(username: string): Observable<LoanApplication[]> {
    throw new Error('Not implemented');
  }

  auditLog(id: number): Observable<AuditLog[]> {
    throw new Error('Not implemented');
  }

  // ---------- LOAN OFFICER ----------

  submit(id: number, username: string): Observable<LoanApplication> {
    throw new Error('Not implemented');
  }

  withdraw(id: number, username: string): Observable<LoanApplication> {
    throw new Error('Not implemented');
  }

  // ---------- UNDERWRITER ----------

  pendingReview(): Observable<LoanApplication[]> {
    throw new Error('Not implemented');
  }

  startReview(id: number, username: string): Observable<LoanApplication> {
    throw new Error('Not implemented');
  }

  approve(id: number, username: string): Observable<LoanApplication> {
    throw new Error('Not implemented');
  }

  reject(id: number, username: string, reason: string): Observable<LoanApplication> {
    throw new Error('Not implemented');
  }

  returnForChanges(id: number, username: string, reason: string): Observable<LoanApplication> {
    throw new Error('Not implemented');
  }

  // ---------- SENIOR APPROVER ----------

  pendingSeniorApproval(): Observable<LoanApplication[]> {
    throw new Error('Not implemented');
  }

  seniorApprove(id: number, username: string): Observable<LoanApplication> {
    throw new Error('Not implemented');
  }

  // ---------- DISBURSEMENT ----------

  approved(): Observable<LoanApplication[]> {
    throw new Error('Not implemented');
  }

  disburse(id: number, username: string): Observable<LoanApplication> {
    throw new Error('Not implemented');
  }
}
