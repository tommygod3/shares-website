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
    return this.http.get<Stock[]>(`${this.apiURL}?currency=${currency}`);
  }

  get(symbol: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiURL}/${symbol}`);
  }

  update(symbol: string, stockItem: Object): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiURL}/${symbol}`, stockItem);
  }

  add(stockItem: Object): Observable<Stock> {
    return this.http.post<Stock>(this.apiURL, stockItem);
  }

  delete(symbol: string): Observable<Stock>{
    return this.http.delete<Stock>(`${this.apiURL}/${symbol}`);
  }

}
