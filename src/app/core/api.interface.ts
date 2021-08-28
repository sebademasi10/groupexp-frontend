import { Observable } from 'rxjs';

export interface Api<T> {
  get(parameters?: any): Observable<T>;

  delete(parameters?: any): Observable<void>;

  post(body: T, parameters?: any): Observable<T>;

  put(body: T, parameters?: any): Observable<T>;

  patch(body: T, parameters?: any): Observable<T>;
}
