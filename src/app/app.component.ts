import { Component, OnInit } from '@angular/core';
import { Link } from './links';
import { ApiService } from './services/api.service';
import { HistoryService } from './services/history.service';
import { VideoService } from './services/video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HistoryService],
})
export class AppComponent implements OnInit {
  video: Link = { id: '', title: '' };
  history: Link[] = [];
  bookmarks: Link[] = [];
  showBookmarks = false;

  constructor(
    private historyService: HistoryService,
    private apiService: ApiService,
    private videoService: VideoService
  ) {}

  toggleBookmarks() {
    this.showBookmarks = !this.showBookmarks;
  }

  addToBookmarks() {
    // when already bookmarked, removes bookmark
    if (this.isBookmarked()) {
      this.apiService.toggleBookmark(this.video);
      this.bookmarks = this.bookmarks.filter((bookmark) => {
        console.log('bid', bookmark.id, '\nvid', this.video.id);
        return bookmark.id !== this.video.id;
      });
    } else {
      this.apiService.toggleBookmark(this.video);
      this.bookmarks.unshift(this.video);
    }
  }

  isBookmarked() {
    return this.bookmarks.some((bookmark) => bookmark.id === this.video.id);
  }

  ngOnInit(): void {
    this.videoService.subscribe((video) => {
      this.video = video;
    });
    this.historyService.subscribe((history) => {
      this.history = history;
    });
    this.apiService.fetchBookmarks().subscribe((bookmarks) => {
      const linkArr = bookmarks.map((link) => ({
        id: link.videoID,
        title: link.title,
      }));
      this.bookmarks = linkArr;
    });
  }
}
