
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { News } from './news';



@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  private apiURL = 'https://newsapi.org/v2/everything?q=MSFT&sortBy=publishedAt&apiKey=dc7a3451f097418cbdb125a4af9d3f73&language=en';

    get(): Observable<News> {
      return this.http.get<News>(this.apiURL);
    }

}
