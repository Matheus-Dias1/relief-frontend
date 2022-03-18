import { Component, OnInit } from '@angular/core';
import { Link } from './links';
import { ApiService } from './services/api.service';
import { HistoryService } from './services/history.service';
import { LocalStorageService } from './services/local-storage.service';
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
    private videoService: VideoService,
    private localStorageService: LocalStorageService
  ) {}

  toggleBookmarks() {
    this.showBookmarks = !this.showBookmarks;
  }

  addToBookmarks() {
    // when already bookmarked, removes bookmark
    if (this.isBookmarked()) {
      this.bookmarks = this.bookmarks.filter((bookmark) => {
        return bookmark.id !== this.video.id;
      });
    } else {
      this.bookmarks.unshift(this.video);
    }

    this.localStorageService.setSnapshot('bookmarks', this.bookmarks);

    const unpropagated = this.localStorageService.getUnpropagated('bookmarks');
    this.apiService.toggleBookmark([...unpropagated, this.video]).subscribe({
      next: () => {
        this.localStorageService.clearUnpropagated('bookmarks');
      },
      error: () => {
        this.localStorageService.addToUnpropagated('bookmarks', this.video);
      },
    });
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

    // Ideally should be outsourced to a service
    this.bookmarks = this.localStorageService.getSnapshot('bookmarks');
    this.apiService.fetchBookmarks().subscribe((bookmarks) => {
      const linkArr = bookmarks.map((link) => ({
        id: link.videoID,
        title: link.title,
      }));
      if (linkArr.length > this.bookmarks.length) this.bookmarks = linkArr;
      const unpropagated =
        this.localStorageService.getUnpropagated('bookmarks');
      if (unpropagated.length)
        this.apiService.toggleBookmark(unpropagated).subscribe(() => {
          this.localStorageService.clearUnpropagated('bookmarks');
        });
    });
  }
}
