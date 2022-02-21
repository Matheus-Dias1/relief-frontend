import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Link } from 'src/app/links';
import LINKS from 'src/app/mock/links';

@Component({
  selector: 'History',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  @Output() linkClick: EventEmitter<Link> = new EventEmitter();
  @Input() history!: Link[];

  constructor() {}

  ngOnInit(): void {}
  onLinkClick(link: Link) {
    this.linkClick.emit(link);
  }
}
