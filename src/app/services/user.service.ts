import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../types/user.type';
import { environment } from 'src/environments/environment';

const STORAGE_KEY = 'mortgage.currentUser';

@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly baseUrl = `${environment.apiUrl}/user`;

  private readonly currentUser$ = new BehaviorSubject<User | null>(this.loadFromStorage());
  readonly user$: Observable<User | null> = this.currentUser$.asObservable();

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getCurrentUserAccount(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`).pipe(
      tap(user => this.setCurrentUser(user))
    );
  }

  setCurrentUser(user: User | null): void {
    this.currentUser$.next(user);
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  clearCurrentUser(): void {
    this.setCurrentUser(null);
  }

  getCurrentUser(): User | null {
    return this.currentUser$.value;
  }

  getCurrentUsername(): string | null {
    return this.currentUser$.value?.username ?? null;
  }

  getCurrentRoles(): string[] {
    return this.currentUser$.value?.roles ?? [];
  }

  getCurrentRole(): string | null {
    return this.getCurrentRoles()[0] ?? null;
  }

  hasRole(role: string): boolean {
    return this.getCurrentRoles().includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    const current = this.getCurrentRoles();
    return roles.some(r => current.includes(r));
  }

  private loadFromStorage(): User | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
}
