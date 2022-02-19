import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
      this.onPlay.emit(this.url);
    }
  }
}
