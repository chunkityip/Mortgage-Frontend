import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColDef, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { Subject, finalize, takeUntil } from 'rxjs';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
import {
  LOAN_STATUS_LABEL,
  LoanApplication,
  LoanStatus,
} from 'src/app/types/loan-application.type';

const USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const formatAmount = (p: ValueFormatterParams): string =>
  typeof p.value === 'number' ? USD.format(p.value) : '';

const formatStatus = (p: ValueFormatterParams): string =>
  p.value ? LOAN_STATUS_LABEL[p.value as LoanStatus] ?? p.value : '';

const formatDateTime = (p: ValueFormatterParams): string => {
  if (!p.value) return '';
  const d = new Date(p.value);
  return isNaN(d.getTime())
    ? String(p.value)
    : d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
};

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss'],
})
export class MyApplicationsComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();

  rowData: LoanApplication[] = [];
  isLoading = false;
  loadError: string | null = null;

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  columnDefs: ColDef<LoanApplication>[] = [
    { field: 'applicationNumber', headerName: 'Application #', width: 160 },
    {
      headerName: 'Borrower',
      valueGetter: (p: ValueGetterParams<LoanApplication>) =>
        `${p.data?.borrowerFirstName ?? ''} ${p.data?.borrowerLastName ?? ''}`.trim(),
      width: 180,
    },
    { field: 'loanAmount', headerName: 'Loan Amount', width: 140, valueFormatter: formatAmount,   type: 'rightAligned' },
    { field: 'status',     headerName: 'Status',      width: 200, valueFormatter: formatStatus },
    { field: 'createdAt',  headerName: 'Created At',  width: 200, valueFormatter: formatDateTime },
  ];

  constructor(private service: LoanApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadApplications(): void {
    this.isLoading = true;
    this.loadError = null;
    this.service.getCustomerApplications()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe({
        next: apps => (this.rowData = apps),
        error: (err: Error) => (this.loadError = err?.message ?? 'Failed to load applications'),
      });
  }
}
