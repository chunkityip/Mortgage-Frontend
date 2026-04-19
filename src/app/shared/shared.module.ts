import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from './status-badge/status-badge.component';
import { AsyncStateComponent } from './async-state/async-state.component';

@NgModule({
  declarations: [StatusBadgeComponent, AsyncStateComponent],
  imports: [CommonModule],
  exports: [StatusBadgeComponent, AsyncStateComponent],
})
export class SharedModule {}
