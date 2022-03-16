import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Link } from 'src/app/links';

@Component({
  selector: 'VideoView',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css'],
})
export class VideoViewComponent implements OnInit, OnChanges {
  @Input() video: Link = { id: '', title: '' };
  validUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.validUrl = sanitizer.bypassSecurityTrustUrl('');
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    const { video } = changes;
    this.validUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video.currentValue.id}`
    );
  }
}
