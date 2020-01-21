import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  constructor(private http: HttpClient) { }

  private apiURL = 'https://127.0.0.1:5001/sell';

  create(user: User, transaction: Transaction): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('username', user.username).set('password', user.password);
    return this.http.post<User>(this.apiURL, transaction, {headers: headers});
  }

}
