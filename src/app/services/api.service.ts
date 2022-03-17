import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ContentChild, Injectable } from '@angular/core';
import { HttpLinkPayload, Link } from '../links';
import { environment } from 'src/environments/environment';
import { Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchHistory(): Observable<HttpResponse<HttpLinkPayload[]>> {
    return this.http.get<HttpLinkPayload[]>(`${environment.apiUrl}/history/`, {
      observe: 'response',
    });
  }

  fetchBookmarks(): Observable<HttpLinkPayload[]> {
    return this.http.get<HttpLinkPayload[]>(`${environment.apiUrl}/bookmarks/`);
  }

  toggleBookmark(links: Link[]): void {
    const ids = links.map((link) => link.id);
    this.http.put(`${environment.apiUrl}/bookmarks/`, ids);
  }

  addToHistory(links: Link[]): Observable<HttpResponse<string>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response' as const,
      responseType: 'text' as const,
    };
    const payload: HttpLinkPayload[] = links.map((link) => ({
      videoID: link.id,
      title: link.title,
    }));
    return this.http.post(
      `${environment.apiUrl}/history/`,
      payload,
      httpOptions
    );
  }
}
