import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Link } from 'src/app/links';

@Component({
  selector: 'Bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  @Output() linkClick: EventEmitter<Link> = new EventEmitter();
  @Input() bookmarks!: Link[];

  constructor() {}

  ngOnInit(): void {}
  onLinkClick(link: Link) {
    this.linkClick.emit(link);
  }
}
