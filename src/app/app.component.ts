import { Component } from '@angular/core';
import { Link } from './links';
import LINKS from './mock/links';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  url: string = '';
  history: Link[] = LINKS;
  bookmarks: Link[] = [
    {
      url: 'https://www.youtube.com/watch?v=IKAPotGYTV4',
      title: 'Bookamark 1',
    },
    {
      url: 'https://www.youtube.com/watch?v=ONrideBdiZA',
      title: 'Bookamark 2',
    },
  ];
  showBookmarks: boolean = false;

  onVideoSubmit(event: string) {
    this.url = event;
  }

  linkClickHandler(link: Link) {
    this.onVideoSubmit(link.url);
  }

  toggleBookmarks() {
    this.showBookmarks = !this.showBookmarks;
  }
}
