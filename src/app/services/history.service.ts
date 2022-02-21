import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link } from '../links';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private apiUrl = '/api/history/';

  constructor(private http: HttpClient) {}

  getHistory(): Observable<Link[]> {
    return this.http.get<Link[]>(this.apiUrl);
  }

  addToHistory(link: Link): Observable<Link> {
    return this.http.post<Link>(this.apiUrl, link, httpOptions);
  }
}
