import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import parseYoutube from 'src/app/helpers/parseYoutube';
import { Link } from 'src/app/links';
@Component({
  selector: 'SearchBar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Output() onPlay: EventEmitter<Link> = new EventEmitter();
  url: string = '';

  constructor() {}

  ngOnInit(): void {}

  async onSearch() {
    if (!!this.url) {
      const { valid, parsedUrl, title } = await parseYoutube(this.url);
      if (valid) {
        const link: Link = {
          url: this.url,
          embed_url: parsedUrl,
          title: title,
        };
        this.onPlay.emit(link);
      } else {
        alert('Invalid url, only youtube links are supported');
      }
    }
  }
}
