import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link } from '../links';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private apiUrl = '/api/history';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.apiUrl);
  }
}
