import { HttpClient, HttpParams } from '@angular/common/http';
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

  updateLoan(id: number, dto: LoanApplication): Observable<LoanApplication> {
    return this.http.put<LoanApplication>(`${this.baseUrl}/${id}`, dto);
  }

  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getLoanByLoanId(id: number): Observable<LoanApplication> {
    return this.http.get<LoanApplication>(`${this.baseUrl}/${id}`);
  }

  getAllLoan(status?: string): Observable<LoanApplication[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<LoanApplication[]>(this.baseUrl, { params });
  }

  getCustomerApplications(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.baseUrl}/my-applications`);
  }

  getLoanAuditLog(id: number): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.baseUrl}/${id}/audit-log`);
  }

  // ---------- LOAN OFFICER ----------

  submitLoan(id: number): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(`${this.baseUrl}/${id}/submit`, {});
  }

  withdraw(id: number): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(`${this.baseUrl}/${id}/withdraw`, {});
  }

  // ---------- UNDERWRITER ----------

  pendingReview(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.baseUrl}/pending-review`);
  }

  startReview(id: number): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(`${this.baseUrl}/${id}/start-review`, {});
  }

  approve(id: number): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(`${this.baseUrl}/${id}/approve`, {});
  }

  reject(id: number, reason: string): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(`${this.baseUrl}/${id}/reject`, { reason });
  }

  returnForChanges(id: number, reason: string): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(`${this.baseUrl}/${id}/return`, { reason });
  }

  // ---------- SENIOR APPROVER ----------

  pendingSeniorApproval(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.baseUrl}/pending-senior-approval`);
  }

  seniorApprove(id: number): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(`${this.baseUrl}/${id}/senior-approve`, {});
  }

  // ---------- DISBURSEMENT ----------

  approved(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.baseUrl}/approved`);
  }

  disburse(id: number): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(`${this.baseUrl}/${id}/disburse`, {});
  }
}
