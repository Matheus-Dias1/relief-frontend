import { Component, OnInit } from '@angular/core';
import { Link } from './links';
import { HistoryService } from './services/history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  video: Link = { url: '', embed_url: '', title: '' };
  history: Link[] = [];
  bookmarks: Link[] = [];
  showBookmarks: boolean = false;

  constructor(private historyService: HistoryService) {}

  onVideoSubmit(link: Link) {
    this.video = link;
    this.historyService
      .addToHistory(link)
      .subscribe((link) => this.history.unshift(link));
    // sendToHistory
  }

  linkClickHandler(link: Link) {
    this.video = link;
  }

  toggleBookmarks() {
    this.showBookmarks = !this.showBookmarks;
  }

  ngOnInit(): void {
    this.historyService.getHistory().subscribe((history) => {
      this.history = history;
    });
  }
}
