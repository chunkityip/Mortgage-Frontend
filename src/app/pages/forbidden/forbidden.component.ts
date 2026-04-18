import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  template: `
    <div class="forbidden">
      <h1>403 — Forbidden</h1>
      <p>You don't have permission to view this page.</p>
    </div>
  `,
  styles: [`.forbidden { padding: 24px; }`],
})
export class ForbiddenComponent {}
