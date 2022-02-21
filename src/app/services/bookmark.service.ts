import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link } from '../links';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

interface resInterface {
  id: string;
}
@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private apiUrl = '/api/bookmarks/';

  constructor(private http: HttpClient) {}

  getBookmarks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.apiUrl);
  }

  addToBookmarks(link: Link): Observable<Link> {
    return this.http.post<Link>(this.apiUrl, link, httpOptions);
  }

  removeBookmark(link: Link): Observable<{}> {
    return this.http.delete<{}>(`${this.apiUrl}/${link.id}/`, httpOptions);
  }
}
