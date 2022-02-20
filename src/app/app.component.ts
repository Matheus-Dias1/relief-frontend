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
  bookmarks: Link[] = [];
  history: Link[] = LINKS;

  onVideoSubmit(event: string) {
    this.url = event;
  }

  linkClickHandler(link: Link) {
    this.onVideoSubmit(link.url);
  }
}
