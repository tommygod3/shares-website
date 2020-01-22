import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';
import { MatDialog } from '@angular/material/dialog';
import { News } from './news';
import { NewsComponent } from '../news/news.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private newsService: NewsService,
  public dialog: MatDialog) { }

  ngOnInit() {
    this.newsService.get().subscribe(retrievedNews => {
      this.allNews = retrievedNews;
      console.log(this.allNews);
    });
  }
  allNews: News;

  news(): void {
    const dialogRef = this.dialog.open(NewsComponent, {
      width: '60%',
      height: '60%',
      data: this.allNews.articles
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

}
