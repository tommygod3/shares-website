import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  private apiURL = 'https://127.0.0.1:5001/stock';

  getAll(currency: string): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiURL}?currency=${currency}`)
      .pipe(
        catchError(this.handleError<Stock[]>('get', {}))
      );
  }

  get(symbol: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiURL}/${symbol}`)
      .pipe(
        catchError(this.handleError<Stock>('get', {}))
      );
  }

  update(symbol: string, stockItem: Object): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiURL}/${symbol}`, stockItem)
      .pipe(
        catchError(this.handleError<Stock>('update', {}))
      );
  }

  add(stockItem: Object): Observable<Stock> {
    return this.http.post<Stock>(this.apiURL, stockItem)
      .pipe(
        catchError(this.handleError<Stock>('add', {}))
      );
  }

  delete(symbol: string): Observable<Stock>{
    return this.http.delete<Stock>(`${this.apiURL}/${symbol}`)
      .pipe(
        catchError(this.handleError<Stock>('delete', {}))
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
