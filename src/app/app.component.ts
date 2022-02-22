import { Component, OnInit } from '@angular/core';
import { Link } from './links';
import { BookmarkService } from './services/bookmark.service';
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

  constructor(
    private historyService: HistoryService,
    private bookmarkService: BookmarkService
  ) {}

  onVideoSubmit(link: Link) {
    this.video = link;
    this.historyService.addToHistory(link).subscribe((link) => {
      this.history.unshift(link);
      this.video = link;
    });
  }

  linkClickHandler(link: Link) {
    this.video = link;
  }

  toggleBookmarks() {
    this.showBookmarks = !this.showBookmarks;
  }

  addToBookmarks() {
    // when already bookmarked, removes bookmark
    if (this.isBookmarked()) {
      this.bookmarkService.removeBookmark(this.video).subscribe(() => {
        this.bookmarks = this.bookmarks.filter(
          (bookmark) => bookmark.id !== this.video.id
        );
      });
    } else {
      this.bookmarkService
        .addToBookmarks(this.video)
        .subscribe((link) => this.bookmarks.unshift(link));
    }
  }

  isBookmarked() {
    return this.bookmarks.some(
      (bookmark) => bookmark.embed_url === this.video.embed_url
    );
  }

  ngOnInit(): void {
    this.historyService.getHistory().subscribe((history) => {
      this.history = history.reverse();
    });
    this.bookmarkService.getBookmarks().subscribe((bookmarks) => {
      this.bookmarks = bookmarks.reverse();
    });
  }
}
