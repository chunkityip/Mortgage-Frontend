export type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

export const idle = <T>(): RequestState<T> => ({ status: 'idle' });
export const loading = <T>(): RequestState<T> => ({ status: 'loading' });
export const success = <T>(data: T): RequestState<T> => ({ status: 'success', data });
export const failed  = <T>(error: string): RequestState<T> => ({ status: 'error', error });

export function isLoading<T>(s: RequestState<T> | null): boolean {
  return s?.status === 'loading';
}
export function isSuccess<T>(s: RequestState<T> | null): s is { status: 'success'; data: T } {
  return s?.status === 'success';
}
export function isError<T>(s: RequestState<T> | null): s is { status: 'error'; error: string } {
  return s?.status === 'error';
}
