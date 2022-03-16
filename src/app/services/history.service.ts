import { Injectable } from '@angular/core';
import { Link } from '../links';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  protected subject = new BehaviorSubject<Link[]>([]);
  protected model: Link[] = [];

  constructor(private api: ApiService) {
    this.api.fetchHistory().subscribe((history) => {
      this.model = history.map((video) => ({
        id: video.videoID,
        title: video.title,
      }));
      this.subject.next(this.model);
    });
  }

  public subscribe(callback: (model: Link[]) => void): Subscription {
    return this.subject.subscribe(callback);
  }

  public addToHistory(link: Link): void {
    this.model.unshift(link);
    this.subject.next(this.model);
    this.api.addToHistory(link);
  }
}
