import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Currency } from './currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  private apiURL = 'http://localhost:8000/currency/?format=json';

  getAll(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiURL)
      .pipe(
        catchError(this.handleError<Currency[]>('get', {}))
      );
  }

  private handleError<T> (operation = 'operation', result?: Object) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
