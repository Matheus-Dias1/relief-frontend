import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Link } from 'src/app/links';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'History',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  @Input() history!: Link[];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {}
  onLinkClick(link: Link) {
    this.videoService.setVideo(link);
  }
}
