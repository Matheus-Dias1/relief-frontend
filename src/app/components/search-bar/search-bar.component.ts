import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import parseYoutube from 'src/app/helpers/parseYoutube';
import { Link } from 'src/app/links';
@Component({
  selector: 'SearchBar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Output() onPlay = new EventEmitter();
  url: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch() {
    if (!!this.url) {
      const { valid, parsedUrl, id } = parseYoutube(this.url);
      if (valid) {
        const link: Link = {
          url: this.url,
          embed_url: parsedUrl,
          title: 'PLACEHOLDER TITLE',
        };
        this.onPlay.emit(link);
      }
    }
  }
}
