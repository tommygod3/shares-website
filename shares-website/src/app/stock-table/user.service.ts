import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

    return this.http.get<User>(this.apiURL, {headers: headers});
  }

  create(user: LoginDetails): Observable<User> {
    return this.http.post<User>(this.apiURL, user);
  }

  delete(user: LoginDetails): Observable<User>{
    let headers = new HttpHeaders();
    headers = headers.set('username', user.username).set('password', user.password);
    return this.http.delete<User>(this.apiURL, {headers: headers});
  }
}
