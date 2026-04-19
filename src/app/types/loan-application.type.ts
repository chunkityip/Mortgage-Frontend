export type LoanStatus =
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'UNDER_REVIEW'
  | 'PENDING_SENIOR_APPROVAL'
  | 'APPROVED'
  | 'REJECTED'
  | 'DISBURSED'
  | 'EXPIRED';

export const LOAN_STATUS_LABEL: Record<LoanStatus, string> = {
  DRAFT:                   'Draft',
  PENDING_REVIEW:          'Pending Review',
  UNDER_REVIEW:            'Under Review',
  PENDING_SENIOR_APPROVAL: 'Pending Senior Approval',
  APPROVED:                'Approved',
  REJECTED:                'Rejected',
  DISBURSED:               'Disbursed',
  EXPIRED:                 'Expired',
};

export interface LoanApplication {
  id?: number;
  applicationNumber?: string;
  cycleId?: number;

  borrowerFirstName?: string;
  borrowerLastName?: string;
  borrowerEmail?: string;
  borrowerPhone?: string;
  borrowerDob?: string;
  borrowerCreditScore?: number;
  borrowerAnnualIncome?: number;
  borrowerMonthlyDebt?: number;
  borrowerEmploymentStatus?: string;
  borrowerEmployer?: string;
  borrowerYearsEmployed?: number;

  propertyAddress?: string;
  propertyCity?: string;
  propertyState?: string;
  propertyZip?: string;
  propertyType?: string;
  propertyValue?: number;

  loanAmount?: number;
  loanTermYears?: number;
  loanType?: string;
  interestRate?: number;
  downPayment?: number;

  status?: LoanStatus;
  rejectionReason?: string;
  returnReason?: string;

  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface ActionRequest {
  reason: string;
  performedBy?: string;
}

export interface AuditLog {
  id: number;
  loanApplicationId: number;
  fromStatus: string;
  toStatus: string;
  action: string;
  performedBy: string;
  performedAt: string;
  notes?: string;
}
