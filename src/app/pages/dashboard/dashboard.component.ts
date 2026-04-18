import { Component } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from '../../services/user.service';

interface DashboardCard {
  title: string;
  description: string;
  routerLink: string;
}

const CARDS_BY_ROLE: Record<string, DashboardCard[]> = {
  LOAN_OFFICER: [
    { title: 'My Applications', description: 'Loans you created', routerLink: '/my-applications' },
    { title: 'New Loan',        description: 'Start a new application', routerLink: '/loan-form' },
    { title: 'All Loans',       description: 'Browse every loan',        routerLink: '/loan-list' },
  ],
  UNDERWRITER: [
    { title: 'Pending Review', description: 'Loans waiting for review', routerLink: '/pending-review' },
  ],
  SENIOR_APPROVER: [
    { title: 'Pending Senior Approval', description: 'Loans > $500k awaiting your sign-off', routerLink: '/pending-senior-approval' },
    { title: 'Cycle Management',        description: 'Lock the active loan cycle',            routerLink: '/cycle-management' },
  ],
  DISBURSEMENT_OFFICER: [
    { title: 'Approved Loans',  description: 'Ready to disburse', routerLink: '/approved-loans' },
    { title: 'Disbursed Loans', description: 'History',            routerLink: '/disbursed-loans' },
  ],
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  readonly user$ = this.userService.user$;

  readonly cards$ = this.user$.pipe(
    map(user => {
      if (!user) return [];
      const role = user.roles[0];
      return CARDS_BY_ROLE[role] ?? [];
    }),
  );

  constructor(private userService: UserService) {}
}
