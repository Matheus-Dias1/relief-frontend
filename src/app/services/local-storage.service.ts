import { Injectable } from '@angular/core';
import { Link } from '../links';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storage: Storage;

  // unpropagated history
  uHistory: Link[] = [];

  // unpropagated bookmarks
  uBookmarks: Link[] = [];

  constructor() {
    this.storage = window.localStorage;

    const localHistory = this.storage.getItem('uHistory');
    if (localHistory) this.uHistory = JSON.parse(localHistory);

    const localBookmarks = this.storage.getItem('uBookmarks');
    if (localBookmarks) this.uBookmarks = JSON.parse(localBookmarks);
  }

  /**
   * Adds a link to an unpropagated links array, to be used when a request to the backend fails
   * @param link Link to be added to the unpropagated array
   * @param target Which array it'll be added to
   */
  addToUnpropagated(target: 'history' | 'bookmarks', link: Link) {
    const mappedTarget = target === 'history' ? 'uHistory' : 'uBookmarks';

    this[mappedTarget].unshift(link);
    this.storage.setItem(mappedTarget, JSON.stringify(this[mappedTarget]));
  }

  /**
   * Returns the unpropagated arr of links for that target
   * @param target Which array it'll be added to
   */
  getUnpropagated(target: 'history' | 'bookmarks'): Link[] {
    const mappedTarget = target === 'history' ? 'uHistory' : 'uBookmarks';

    const arr = this.storage.getItem(mappedTarget);
    if (arr) return JSON.parse(arr);
    return [];
  }

  /**
   *
   * @param target Which array to be cleared
   */
  clearUnpropagated(target: 'history' | 'bookmarks') {
    const mappedTarget = target === 'history' ? 'uHistory' : 'uBookmarks';
    this.storage.setItem(mappedTarget, '[]');
  }

  getSnapshot(target: 'history' | 'bookmarks'): Link[] {
    const arr = this.storage.getItem(target);
    if (arr) return JSON.parse(arr);
    return [];
  }

  setSnapshot(target: 'history' | 'bookmarks', snapshot: Link[]) {
    this.storage.setItem(target, JSON.stringify(snapshot));
  }
}
