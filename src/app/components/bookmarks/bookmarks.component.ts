import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Link } from 'src/app/links';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'Bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  @Output() linkClick: EventEmitter<Link> = new EventEmitter();
  @Input() bookmarks!: Link[];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {}
  onLinkClick(link: Link) {
    this.videoService.setVideo(link);
  }
}
