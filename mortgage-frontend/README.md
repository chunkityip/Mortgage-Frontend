# Mortgage Loan Application Frontend

Angular 14 frontend for the Mortgage Loan Application workflow project.

## Tech Stack
- Angular 14
- Angular Material 14
- ag-Grid Community 28
- RxJS
- SCSS
- Karma + Jasmine (unit tests)
- Playwright (e2e tests)

## Prerequisites
- Node.js 16 or 18
- Angular CLI 14: `npm install -g @angular/cli@14`
- Backend running on `http://localhost:8080` (see [mortgage-backend](../mortgage-backend))

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install
```

## Run

```bash
# Dev server on http://localhost:4200
ng serve

# Or with auto-open browser
ng serve --open
```

The app expects the Spring Boot backend running on `http://localhost:8080`. Make sure Docker + backend are up first:

```bash
cd ../mortgage-backend
docker-compose up -d
./gradlew bootRun
```

## Testing

```bash
# Unit tests (Karma + Jasmine)
ng test

# E2E tests (Playwright)
npx playwright test

# E2E tests in UI mode (recommended for debugging)
npx playwright test --ui
```

## Project Structure

```
src/
├── environments/        -> environment.ts, environment.prod.ts
└── app/
    ├── models/          -> TypeScript interfaces + enums
    ├── interceptors/    -> HTTP interceptors (X-User header, error handling)
    ├── services/        -> API services + state management
    ├── shared/          -> Reusable components (StatusBadge, dialogs, banners)
    ├── dev-tools/       -> RoleSwitcher (for testing different roles)
    ├── components/      -> Feature-specific components (AuditLog)
    └── pages/           -> Route-level components (each page = one folder)
        ├── dashboard/
        ├── loan-list/
        ├── loan-form/
        ├── loan-detail/
        ├── my-applications/
        ├── pending-review/
        ├── pending-senior-approval/
        ├── approved-loans/
        ├── disbursed-loans/
        └── cycle-management/

e2e/
├── pages/               -> Page Objects (Playwright pattern)
├── tests/               -> Test specs
└── fixtures/            -> Test data
```

## User Roles (for testing)

The backend seeds 4 test users. Use the **RoleSwitcher** dev tool in the app header to switch:

| Username | Role | What they can do |
|---|---|---|
| `john.officer` | LOAN_OFFICER | Create/edit/submit/withdraw loans |
| `mary.underwriter` | UNDERWRITER | Review, approve, reject, return |
| `sam.senior` | SENIOR_APPROVER | Approve loans > $500k |
| `tom.disburse` | DISBURSEMENT_OFFICER | Disburse approved loans |

Selected user is sent in the `X-User` HTTP header on every API call (handled by `UserHeaderInterceptor`).

## Loan Workflow

```
DRAFT → PENDING_REVIEW → UNDER_REVIEW → APPROVED → DISBURSED
              ↓               ↑
          REJECTED      PENDING_SENIOR_APPROVAL (if > $500k)
              ↓
            DRAFT (Return for Changes)
```

When a cycle is locked, all non-disbursed loans automatically move to `EXPIRED`.

## Build

```bash
# Development build
ng build

# Production build
ng build --configuration production
```

Output goes to `dist/mortgage-frontend/`.

## Useful Commands

```bash
# Generate a new component
ng generate component pages/my-new-page

# Generate a new service
ng generate service services/my-service

# Lint
ng lint

# Run tests in watch mode
ng test --watch

# Run a single test file
ng test --include='**/loan.service.spec.ts'
```

## Environment Config

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

## Notes

- **Forms** use Angular `FormGroup` + Reactive Forms pattern
- **State management** uses RxJS `BehaviorSubject` (no NgRx — kept simple)
- **Tables** use ag-Grid Community for sorting, filtering, pagination
- **Dropdowns/dialogs** use Angular Material
- **All action buttons** check both `entitlement` (role) AND `cycleLocked` status before enabling
