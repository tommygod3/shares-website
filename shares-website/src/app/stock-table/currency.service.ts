import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Currency } from './currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  private apiURL = 'http://localhost:8000/currency/?format=json';

  getAll(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiURL);
  }
}
