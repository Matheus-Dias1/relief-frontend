import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Link } from '../../links';

@Component({
  selector: 'app-links-list',
  templateUrl: './links-list.component.html',
  styleUrls: ['./links-list.component.css'],
})
export class LinksListComponent implements OnInit {
  @Input() links: Link[] = [];
  @Output() LinkClick: EventEmitter<Link> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onLinkClick(link: Link) {
    this.LinkClick.emit(link);
  }
}
