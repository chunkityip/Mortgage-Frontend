import { User } from '../../types/user.type';

export const TEST_USERS: ReadonlyArray<User> = [
  { id: 1, username: 'john.officer',     email: 'john@example.com',  fullName: 'John Officer',     roles: ['LOAN_OFFICER'] },
  { id: 2, username: 'mary.underwriter', email: 'mary@example.com',  fullName: 'Mary Underwriter', roles: ['UNDERWRITER'] },
  { id: 3, username: 'sam.senior',       email: 'sam@example.com',   fullName: 'Sam Senior',       roles: ['SENIOR_APPROVER'] },
  { id: 4, username: 'tom.disburse',     email: 'tom@example.com',   fullName: 'Tom Disburse',     roles: ['DISBURSEMENT_OFFICER'] },
];
