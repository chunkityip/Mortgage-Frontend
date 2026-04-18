import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user.type';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    throw new Error('Not implemented');
  }

  me(username: string): Observable<User> {
    throw new Error('Not implemented');
  }
}
