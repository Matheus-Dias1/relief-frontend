import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpLinkResponse, Link } from '../links';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchHistory(): Observable<HttpLinkResponse[]> {
    return this.http.get<HttpLinkResponse[]>(`${environment.apiUrl}/history/`);
  }

  fetchBookmarks(): Observable<HttpLinkResponse[]> {
    return this.http.get<HttpLinkResponse[]>(
      `${environment.apiUrl}/bookmarks/`
    );
  }

  toggleBookmark(link: Link): void {
    this.http.put(`${environment.apiUrl}/bookmarks/${link.id}`, {});
  }

  addToHistory(link: Link): Observable<HttpLinkResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const payload = {
      videoID: link.id,
      title: link.title,
    };
    return this.http.post<HttpLinkResponse>(
      environment.apiUrl,
      payload,
      httpOptions
    );
  }
}
