import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReferenceData } from '../types/reference-data.type';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ReferenceDataService {

  private readonly baseUrl = `${environment.apiUrl}/reference`;

  constructor(private http: HttpClient) {}

  getAllPropertyTypes(): Observable<ReferenceData[]> {
    return this.http.get<ReferenceData[]>(`${this.baseUrl}/property-types`);
  }

  getAllLoanTypes(): Observable<ReferenceData[]> {
    return this.http.get<ReferenceData[]>(`${this.baseUrl}/loan-types`);
  }

  getAllEmploymentStatuses(): Observable<ReferenceData[]> {
    return this.http.get<ReferenceData[]>(`${this.baseUrl}/employment-statuses`);
  }
}
