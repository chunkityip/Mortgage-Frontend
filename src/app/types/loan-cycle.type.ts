export interface LoanCycle {
  id: number;
  cycleName: string;
  startDate: string;
  endDate: string;
  baseInterestRate: number;
  isLocked: boolean;
}
