import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import parseYoutube from 'src/app/helpers/parseYoutube';

@Component({
  selector: 'VideoView',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css'],
})
export class VideoViewComponent implements OnInit, OnChanges {
  @Input() url: string = '';
  validUrl: SafeUrl;
  isUrlValid: boolean = false;

  constructor(private sanitizer: DomSanitizer) {
    this.validUrl = sanitizer.bypassSecurityTrustUrl('');
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    const { url } = changes;
    const { parsedUrl: validUrl, valid: isUrlValid } = parseYoutube(
      url.currentValue
    );
    this.isUrlValid = isUrlValid;
    if (isUrlValid)
      this.validUrl = this.sanitizer.bypassSecurityTrustResourceUrl(validUrl);
  }
}
