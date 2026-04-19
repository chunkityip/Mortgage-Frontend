import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { LoginComponent } from './pages/login/login.component';
import { MyApplicationsComponent } from './pages/my-applications/my-applications.component';

export const ROLES = {
  LOAN_OFFICER: 'LOAN_OFFICER',
  UNDERWRITER: 'UNDERWRITER',
  SENIOR_APPROVER: 'SENIOR_APPROVER',
  DISBURSEMENT_OFFICER: 'DISBURSEMENT_OFFICER',
} as const;

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard] },
  { path: 'my-applications' , component: MyApplicationsComponent , canActivate: [RoleGuard] , data: { roles: ['LOAN_OFFICER']}},
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
