import { Injectable } from '@angular/core';
import { Link } from '../links';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storage: Storage;

  // unpropagated history
  history: Link[] = [];

  // unpropagated bookmarks
  bookmarks: Link[] = [];

  constructor() {
    this.storage = window.localStorage;

    const localHistory = this.storage.getItem('history');
    if (localHistory) this.history = JSON.parse(localHistory);

    const localBookmarks = this.storage.getItem('bookmarks');
    if (localBookmarks) this.bookmarks = JSON.parse(localBookmarks);
  }

  /**
   * Adds a link to an unpropagated links array, to be used when a request to the backend fails
   * @param link Link to be added to the unpropagated array
   * @param target Which array it'll be added to
   */
  addToUnpropagated(link: Link, target: 'history' | 'bookmarks') {
    this[target].push(link);
    this.storage.setItem(target, JSON.stringify(this[target]));
  }

  /**
   * Returns the unpropagated arr of links for that target
   * @param target Which array it'll be added to
   */
  getUnpropagated(target: 'history' | 'bookmarks'): Link[] {
    const arr = this.storage.getItem(target);
    if (arr) return JSON.parse(arr);
    return [];
  }
}
