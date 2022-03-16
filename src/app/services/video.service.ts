import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Link } from '../links';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  protected video = new BehaviorSubject<Link>({
    id: '',
    embed_url: '',
    title: '',
    url: '',
  });
  constructor() {}

  setVideo(video: Link): void {
    this.video.next(video);
  }

  subscribe(callback: (video: Link) => void): Subscription {
    return this.video.subscribe(callback);
  }
}
