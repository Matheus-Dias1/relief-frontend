import { Component, OnInit } from '@angular/core';
import LINKS, { Links } from 'src/app/mock/links';

@Component({
  selector: 'History',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  links: Links[] = LINKS;
  constructor() {}

  ngOnInit(): void {}
}
