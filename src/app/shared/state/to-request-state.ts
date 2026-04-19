import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { RequestState, failed, loading, success } from './request-state';

export function toRequestState<T>() {
  return (source: Observable<T>): Observable<RequestState<T>> =>
    source.pipe(
      map(data => success(data)),
      startWith(loading<T>()),
      catchError((err: unknown) => of(failed<T>(toErrorMessage(err)))),
    );
}

function toErrorMessage(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    const body = err.error;
    if (body && typeof body === 'object' && 'message' in body) {
      return String((body as { message: unknown }).message);
    }
    return `${err.status} ${err.statusText || 'Request failed'}`;
  }
  if (err instanceof Error) return err.message;
  return 'Something went wrong';
}
