import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.type';
import { TEST_USERS } from './test-users';

@Component({
  selector: 'app-role-switcher',
  templateUrl: './role-switcher.component.html',
  styleUrls: ['./role-switcher.component.scss'],
})
export class RoleSwitcherComponent {

  readonly users = TEST_USERS;
  readonly user$ = this.userService.user$;

  constructor(private userService: UserService, private router: Router) {}

  onChange(event: Event): void {
    const username = (event.target as HTMLSelectElement).value;
    const user = this.users.find(u => u.username === username) ?? null;
    this.userService.setCurrentUser(user as User | null);
    if (user) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  signOut(): void {
    this.userService.clearCurrentUser();
    this.router.navigateByUrl('/login');
  }
}
