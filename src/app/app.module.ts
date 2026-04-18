import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHeaderInterceptor } from './interceptors/user-header.interceptor';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { LoginComponent } from './pages/login/login.component';
import { RoleSwitcherComponent } from './dev-tools/role-switcher/role-switcher.component';
import { SharedModule } from './shared/shared.module';
import { MyApplicationsComponent } from './pages/my-applications/my-applications.component';
import { NewLoanComponent } from './pages/new-loan/new-loan.component';
import { AllLoanComponent } from './pages/all-loan/all-loan.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ForbiddenComponent,
    LoginComponent,
    RoleSwitcherComponent,
    MyApplicationsComponent,
    NewLoanComponent,
    AllLoanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserHeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
