import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  // API call
  public getGames(username: string): Observable<Game[]> {
    const params = new HttpParams().set('playerusername', username);
    return this.http.get<Game[]>(`${environment.chessComApiUrl}`, { params });
  }
}
