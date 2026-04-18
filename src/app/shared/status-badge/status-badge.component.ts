import { Component, Input } from '@angular/core';
import { LoanStatus } from '../../types/loan-application.type';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss'],
})
export class StatusBadgeComponent {
  @Input() status?: LoanStatus;

  get label(): string {
    if (!this.status) return 'UNKNOWN';
    return this.status.replace(/_/g, ' ');
  }

  get cssClass(): string {
    return `badge badge--${(this.status ?? 'unknown').toLowerCase().replace(/_/g, '-')}`;
  }
}
