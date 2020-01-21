import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from './user';
import { LoginDetails } from './login-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiURL = 'https://127.0.0.1:5001/user';

  get(user: LoginDetails): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('username', user.username).set('password', user.password);

    return this.http.get<User>(this.apiURL, {headers: headers})
      .pipe(
        catchError(this.handleError<User>('get', {}))
      );
  }

  create(user: LoginDetails): Observable<User> {
    return this.http.post<User>(this.apiURL, user)
      .pipe(
        catchError(this.handleError<User>('create', {}))
      );
  }

  delete(user: LoginDetails): Observable<User>{
    let headers = new HttpHeaders();
    headers = headers.set('username', user.username).set('password', user.password);
    return this.http.delete<User>(this.apiURL, {headers: headers})
      .pipe(
        catchError(this.handleError<User>('delete', {}))
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
