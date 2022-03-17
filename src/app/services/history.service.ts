import { Injectable } from '@angular/core';
import { Link } from '../links';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  protected subject = new BehaviorSubject<Link[]>([]);
  protected model: Link[] = [];

  constructor(
    private api: ApiService,
    private localStorage: LocalStorageService
  ) {
    this.model = this.localStorage.getSnapshot('history');
    this.subject.next(this.model);

    this.api.fetchHistory().subscribe({
      next: (resp) => {
        if (resp.ok && resp.body) {
          const body = resp.body;
          const history = body.map((video) => ({
            id: video.videoID,
            title: video.title,
          }));

          // shouldn't ever happen, but just in case it does...
          if (history.length > this.model.length) {
            this.localStorage.setSnapshot('history', history);
            this.model = history;
            this.subject.next(history);
          }

          const unpropagated = this.localStorage.getUnpropagated('history');
          if (unpropagated)
            this.api.addToHistory(unpropagated).subscribe((resp) => {
              if (resp.ok) this.localStorage.clearUnpropagated('history');
            });
        }
      },
      error: (e) => {
        console.log('Error fetching history: ', e);
      },
    });
  }

  public subscribe(callback: (model: Link[]) => void): Subscription {
    return this.subject.subscribe(callback);
  }

  public addToHistory(link: Link): void {
    this.model.unshift(link);
    this.subject.next(this.model);
    this.localStorage.setSnapshot('history', this.model);

    const unpropagated = this.localStorage.getUnpropagated('history');
    this.api.addToHistory([...unpropagated, link]).subscribe({
      next: () => {
        this.localStorage.clearUnpropagated('history');
      },
      error: () => {
        this.localStorage.addToUnpropagated('history', link);
      },
    });
  }
}
