import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import parseYoutube from 'src/app/helpers/parseYoutube';
import { Link } from 'src/app/links';
import { HistoryService } from 'src/app/services/history.service';
import { VideoService } from 'src/app/services/video.service';
@Component({
  selector: 'SearchBar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  url: string = '';

  constructor(
    private historyService: HistoryService,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {}

  async onSearch() {
    if (!!this.url) {
      const { valid, id, title } = await parseYoutube(this.url);
      if (valid) {
        const link: Link = { id, title };
        this.videoService.setVideo(link);
        this.historyService.addToHistory(link);
      } else {
        alert('Invalid url, only youtube links are supported');
      }
    }
  }
}
