import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Link } from '../links';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchHistory(): Observable<Link[]> {
    return this.http.get<Link[]>(environment.apiUrl);
  }

  addToHistory(link: Link): Observable<Link> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Link>(environment.apiUrl, link, httpOptions);
  }
}
