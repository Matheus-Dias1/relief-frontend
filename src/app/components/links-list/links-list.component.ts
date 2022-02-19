import { Component, OnInit, Input } from '@angular/core';
import { Links } from './links';

@Component({
  selector: 'app-links-list',
  templateUrl: './links-list.component.html',
  styleUrls: ['./links-list.component.css'],
})
export class LinksListComponent implements OnInit {
  @Input() links: Links[] = [];
  constructor() {}

  ngOnInit(): void {}
}
